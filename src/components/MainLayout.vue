<template>
    <a-layout class="layout-demo">

        <a-layout-sider hide-trigger collapsible :collapsed="isNavCollapsed">
            <div class="logo" style="display: flex; align-items: center; justify-content: center;">
                <img src="../assets/logo.svg" alt="logo" :style="{ height: styleFishLogo }" />
            </div>
            <a-menu :defaultSelectedKeys="['1']" :style="{ width: '100%' }" @menuItemClick="onClickMenuItem">
                <a-menu-item key="抓包">
                    <IconHome />
                    抓包
                </a-menu-item>
                <a-menu-item key="分析">
                    <IconSearch />
                    分析
                </a-menu-item>
                <a-menu-item key="设置">
                    <IconSettings />
                    设置
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>

            <!-- 顶部界面 -->
            <a-layout-header style="padding-left: 20px;">
                <a-space size="medium">
                    <a-button shape="square" @click="onCollapse">
                        <IconCaretRight v-if="isNavCollapsed" />
                        <IconCaretLeft v-else />
                    </a-button>
                    <!-- <a-typography-text style="font-size: larger;">WireFish</a-typography-text> -->
                    <img src="../assets/logo-text.svg" alt="logo-e=text" style="height: 28px" />
                </a-space>
            </a-layout-header>

            <!-- 抓包界面 -->
            <a-layout style="margin: 10px;">
                <a-layout-content v-if="currentNav === '抓包'">
                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-input :style="{ width: '400px' }" placeholder="过滤规则" allow-clear v-model="packetFilter" />
                        <a-button @click="applyFilter">设置规则</a-button>
                    </a-space>

                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-select :style="{ width: '400px' }" placeholder="网卡" allow-clear :scrollbar="true"
                            v-model="networkInterface" @popup-visible-change="getInterfaces">
                            <a-option v-for="(item, index) in interfaceList">{{ item }}</a-option>
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
                        <div style="height: 240px; display: flex;">
                            <a-table :columns="packetDataTableColumns" :data="packetDataTableData"
                                :bordered="{ cell: true }" :scrollbar="true" :pagination="false" size="mini" sticky-header
                                column-resizable stripe :row-selection="{ type: 'radio' }" @select="refreshDataTree">
                            </a-table>
                        </div>
                    </a-space>
                    <a-space style="margin: 10px 10px 10px 10px;" direction="vertical">
                        <a-button @click="onPacketDataTreeExpanded" v-show="showPacketDataTreeExpandButton">
                            {{ packetDataTreeExpandedKeys?.length ? '全部折叠' : '全部展开' }}
                        </a-button>
                        <div class="deeper-color">
                            <a-tree :data="packetDataTreeData" show-line
                                v-model:expanded-keys="packetDataTreeExpandedKeys" />
                        </div>
                    </a-space>
                </a-layout-content>

                <!-- 分析界面 -->
                <a-layout-content v-if="currentNav === '分析'">
                    <a-space style="margin: 10px 10px 0 10px;">
                        <a-button type="primary" @click="getSessions" :disabled="sessionButtonDisabled">开始分析</a-button>
                        <a-button @click="onSessionDataTreeExpanded" v-show="showSessionDataTreeExpandButton">
                            {{ sessionDataTreeExpandedKeys?.length ? '全部折叠' : '全部展开' }}
                        </a-button>
                    </a-space>
                    <a-space style="margin: 10px 10px 0 10px;" class="deeper-color">
                        <a-tree :data="sessionDataTreeData" :show-line="true"
                            v-model:expanded-keys="sessionDataTreeExpandedKeys" />
                    </a-space>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { ref } from 'vue'
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
let currentNav = ref("抓包")
let useMock = ref(true)
let startButtonDisabled = ref(false)
let sessionButtonDisabled = ref(false)
let styleFishLogo = ref("50%")
let packetFilter = ref("")
let networkInterface = ref("")
let maxCount = ref(80)
let maxTimeout = ref(8)
let showPacketDataTreeExpandButton = ref(false)
let showSessionDataTreeExpandButton = ref(false)

const packetDataTableColumns = [
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
        width: 240,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '宿',
        dataIndex: 'dst',
        width: 240,
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
]
let interfaceList = ref([])
let packetDataTableData = ref([])
let packetInfoCache = ref([])
let packetDataTreeData = ref([])
let sessionDataTreeData = ref([])
let packetDataTreeExpandedKeys = ref([])
let sessionDataTreeExpandedKeys = ref([])

const onCollapse = () => {
    styleFishLogo = isNavCollapsed.value ? "80%" : "50%";
    isNavCollapsed.value = !isNavCollapsed.value;
};

const onClickMenuItem = (key) => {
    if (["抓包", "分析"].includes(key)) {
        currentNav.value = key
    }
    else {
        Message.warning({ content: `导航栏<${key}>施工中` });
    }
}

const onSwitchUseMock = () => {
    // Message.info({ content: `useMock：${useMock.value} -> ${!useMock.value}` });
}

const onPacketDataTreeExpanded = () => {
    packetDataTreeExpandedKeys.value = packetDataTreeExpandedKeys?.value.length ? [] : Object.keys(packetDataTreeData.value)
}

const onSessionDataTreeExpanded = () => {
    sessionDataTreeExpandedKeys.value = sessionDataTreeExpandedKeys?.value.length ? [] : Object.keys(sessionDataTreeData.value)
}

const getInterfaces = () => {
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/get_interfaces`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
        interfaceList.value = res.data.data
    })
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
    packetDataTableData.value = []
    packetDataTreeData.value = []
    sessionDataTreeData.value = []
    startButtonDisabled.value = true
    showPacketDataTreeExpandButton.value = false
    showSessionDataTreeExpandButton.value = false
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/start_sniffer?count=${maxCount.value}&timeout=${maxTimeout.value}`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
        startButtonDisabled.value = false
    })
    getUpdate(2000)
}

const getSessions = () => {
    sessionDataTreeData.value = []
    sessionButtonDisabled.value = true
    axiosRequest({
        url: `/${useMock.value ? "mock" : "api"}/sessions`,
        method: "get"
    }).then((res) => {
        Message.info(res.data.result)
        refreshSessionDataTree(res.data.data)
        sessionButtonDisabled.value = false
    })
}

const getUpdate = (updateInterval = 2000) => {
    const updateDelayer = setTimeout(() => {
        let countDown = maxTimeout.value * 1000
        const updateReprater = setInterval(() => {
            // Message.info(`[=] count down: ${countDown}/${maxTimeout.value * 1000}`)
            countDown -= updateInterval
            if (countDown < 0) {
                clearInterval(updateReprater)
                Message.warning("update aborted.")
                startButtonDisabled.value = false
            }
            axiosRequest({
                url: `/${useMock.value ? "mock" : "api"}/update?num_current=${packetInfoCache.value.length}`,
                method: "get"
            }).then((res) => {
                Message.info(res.data.result)
                if (res.data.result === "updated.") {
                    packetInfoCache.value = packetInfoCache.value.concat(res.data.data)
                    refreshDataTable(res.data.data)
                } else if (res.data.result === "sniffer has stopped.") {
                    clearInterval(updateReprater)
                } else if (res.data.result === "this is the last update.") {
                    packetInfoCache.value = packetInfoCache.value.concat(res.data.data)
                    refreshDataTable(res.data.data)
                    clearInterval(updateReprater)
                }
            })
        }, updateInterval)
    }, 200)

}

const refreshDataTable = (incrementDataArray) => {
    incrementDataArray.forEach(element => {
        packetDataTableData.value.push({
            key: packetDataTableData.value.length.toString(),
            idx: packetDataTableData.value.length,
            cap_time: element.cap_time,
            src: element.src,
            dst: element.dst,
            protocol: element.protocol,
            summary: element.summary
        })
    })
}

const refreshDataTree = (rowKey) => {
    packetDataTreeData.value = []
    showPacketDataTreeExpandButton.value = true
    let counterLv1 = 0
    for (let titleLv1 in packetInfoCache.value[Number(rowKey)]) {
        if (["cap_time", "src", "dst", "protocol", "summary", "Padding", "Raw"].includes(titleLv1)) {
            continue
        }
        packetDataTreeData.value.push({
            title: titleLv1,
            key: counterLv1.toString(),
            children: []
        })
        let counterLv2 = 0
        for (let titleLv2 in packetInfoCache.value[Number(rowKey)][titleLv1]) {
            packetDataTreeData.value[counterLv1].children.push({
                title: `${titleLv2}: ${packetInfoCache.value[Number(rowKey)][titleLv1][titleLv2]}`,
                key: `${counterLv1}-${counterLv2}`
            })
            counterLv2 += 1
        }
        counterLv1 += 1
    }
}

const refreshSessionDataTree = (sessionGroups) => {
    if (packetInfoCache.value.length === 0) {
        Message.warning("no packet to analysis yet.")
    } else {
        sessionDataTreeData.value = []
        showSessionDataTreeExpandButton.value = true
        let counterLv1 = 0
        for (let sessionKey in sessionGroups) {
            sessionDataTreeData.value.push({
                title: sessionKey,
                key: counterLv1.toString(),
                children: []
            })
            let counterLv2 = 0
            for (let packetIndexes in sessionGroups[sessionKey]) {
                sessionDataTreeData.value[counterLv1.toString()].children.push({
                    title: packetInfoCache.value[Number(sessionGroups[sessionKey][packetIndexes])].summary,
                    key: `${counterLv1}-${counterLv2}`
                })
                counterLv2 += 1
            }
            counterLv1 += 1
        }
    }
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
  