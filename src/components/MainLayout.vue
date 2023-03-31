<template>
    <a-layout class="layout-demo">

        <a-layout-sider hide-trigger collapsible :collapsed="isNavCollapsed">
            <div class="logo" style="display: flex; align-items: center; justify-content: center;">
                <img id="fish-logo" src="../assets/logo.svg" alt="logo" :style="{ height: styleFishLogo }">
            </div>
            <a-menu :defaultSelectedKeys="['1']" :style="{ width: '100%' }" @menuItemClick="onClickMenuItem">
                <a-menu-item key="1">
                    <IconHome />
                    抓包
                </a-menu-item>
                <a-menu-item key="2">
                    <IconSearch />
                    分析
                </a-menu-item>
                <a-menu-item key="3">
                    <IconSettings />
                    设置
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="padding-left: 20px;">
                <a-space size="medium">
                    <a-button shape="square" @click="onCollapse">
                        <IconCaretRight v-if="isNavCollapsed" />
                        <IconCaretLeft v-else />
                    </a-button>
                    <a-typography-text>WireFish</a-typography-text>
                </a-space>
            </a-layout-header>

            <a-layout style="margin: 10px;">
                <a-layout-content>
                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-input :style="{ width: '400px' }" placeholder="过滤规则" allow-clear v-model="packetFilter" />
                        <a-button @click="applyFilter">设置规则</a-button>
                    </a-space>

                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-select :style="{ width: '400px' }" placeholder="网卡" allow-clear :scrollbar="true"
                            v-model="networkInterface">
                            <a-option>All</a-option>
                            <a-option>Realtek RTL8852AE WiFi 6 802.11ax PCIe Adapter</a-option>
                            <a-option>Realtek Gaming 2.5GbE Family Controller</a-option>
                        </a-select>
                        <a-button @click="applyInterface">设置网卡</a-button>
                    </a-space>

                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-typography-text>最大捕获数量：</a-typography-text>
                        <a-slider :style="{ width: '200px' }" show-input v-model="maxCount" />
                    </a-space>

                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-typography-text>最大捕获时间：</a-typography-text>
                        <a-slider :style="{ width: '200px' }" show-input v-model="maxTimeout" />
                    </a-space>

                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-button type="primary" @click="startSniffer" :disabled="startButtonDisabled">开始抓包</a-button>
                        <a-typography-text>使用虚拟接口：</a-typography-text>
                        <a-switch type="round" v-model="useMock" :before-change="onSwitchUseMock" />
                    </a-space>
                    <a-space style="margin: 10px 10px 0 10px;" direction="vertical">
                        <a-table :columns="myDataTableColumns" :data="myDataTableData" :bordered="{ cell: true }"
                            :scrollbar="true" :virtual-list-props="{ height: 240 }" :pagination="false" size="mini"
                            :row-selection="{ type: 'radio' }">
                        </a-table>
                    </a-space>
                    <a-space style="margin: 10px 10px 10px 10px;" direction="vertical">
                        <!--            <a-button @click="toggleExpanded">-->
                        <!--              {{ expandedKeys?.length ? '全部折叠' : '全部展开' }}-->
                        <!--            </a-button>-->
                        <div class="deeper-color">
                            <!--              <a-tree :data="treeData" :show-line="true" v-model:expanded-keys="expandedKeys"/>-->
                            <a-tree :data="myDataTreeData" :show-line="true" />
                        </div>
                    </a-space>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconSearch,
    IconSettings,
} from '@arco-design/web-vue/es/icon'
import axiosRequest from "../plugins/axiosInstance"

let isNavCollapsed = ref(true)
let useMock = ref(true)
let startButtonDisabled = ref(false)
let styleFishLogo = ref("50%")
let packetFilter = ref("")
let networkInterface = ref("")
let maxCount = ref(10)
let maxTimeout = ref(5)

const myDataTableColumns = reactive([
    {
        title: '序号',
        dataIndex: 'idx',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '捕获时间',
        dataIndex: 'cap_time',
        width: 240,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '源',
        dataIndex: 'src',
        width: 120,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '宿',
        dataIndex: 'dst',
        width: 120,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '协议',
        dataIndex: 'protocol',
        width: 240,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '其他',
        dataIndex: 'others',
        // width: 200,
        ellipsis: true,
        tooltip: true,
    },
])
let myDataTableData = ref([])
let packetInfoCache = ref([])
let myDataTreeData = ref([])


const onCollapse = () => {
    styleFishLogo = isNavCollapsed.value ? "80%" : "50%";
    isNavCollapsed.value = !isNavCollapsed.value;
};

const onClickMenuItem = (key) => {
    Message.info({ content: `导航栏${key}施工中`, showIcon: true });
}

const onSwitchUseMock = () => {
    Message.info({ content: `useMock：${useMock.value} -> ${!useMock.value}`, showIcon: true });
}

const applyFilter = () => {
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/set_filter?new_filter=${packetFilter.value}`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
    })
}

const applyInterface = () => {
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/set_interface?new_interface=${networkInterface.value}`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
    })
}

const startSniffer = () => {
    packetInfoCache.value = []
    myDataTableData.value = []
    myDataTreeData.value = []
    startButtonDisabled.value = true
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/${useMock.value ? "test_sniffer" : "start_sniffer"}?count=${maxCount.value}&timeout=${maxTimeout.value}`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
        startButtonDisabled.value = false
    })
    getUpdate(2000)
}

const getUpdate = (updateInterval = 2000) => {
    const updateDelayer = setTimeout(() => {
        let countDown = maxTimeout.value * 1000
        const updateReprater = setInterval(() => {
            // Message.info(`[=] count down: ${countDown}/${maxTimeout.value * 1000}`)
            countDown -= updateInterval
            if (countDown < 0) {
                clearInterval(updateReprater)
                Message.warning("[!] update aborted.")
                startButtonDisabled.value = false
            }
            axiosRequest({
                url: `/${useMock.value ? "mock" : "api"}/update?num_current=${packetInfoCache.value.length}`,
                method: "get"
            }).then((res) => {
                Message.info(res.data.result)
                if (res.data.result === "[o] updated.") {
                    packetInfoCache.value = packetInfoCache.value.concat(res.data.data)
                    refreshDataTable(res.data.data)
                } else if (res.data.result === "[o] sniffer has stopped.") {
                    clearInterval(updateReprater)
                } else if (res.data.result === "[o] this is the last update.") {
                    packetInfoCache.value = packetInfoCache.value.concat(res.data.data)
                    refreshDataTable(res.data.data)
                    clearInterval(updateReprater)
                }
            })
        }, updateInterval)
    }, 1000)

}

const refreshDataTable = (incrementDataArray) => {
    incrementDataArray.forEach(element => {
        myDataTableData.value.push({
            key: myDataTableData.value.length.toString(),
            idx: myDataTableData.value.length,
            cap_time: element.cap_time,
            src: element.src,
            dst: element.dst,
            protocol: element.protocol,
            summary: element.summary
        })
    })
}

</script>


<style scoped>
.layout-demo {
    /* height: 500px; */
    height: 100%;
    background: var(--color-fill-2);
    /* border: 1px solid var(--color-border); */
}

.layout-demo :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    /* background: rgba(255, 255, 255, 0.2); */
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* color: var(--color-white); */
    font-size: 16px;
    font-stretch: condensed;
    /* text-align: center; */
}

.deeper-color {
    background: var(--color-fill-2);
}
</style>
  