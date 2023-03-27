<template>
    <a-layout class="layout-demo">

        <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
            <div class="logo" style="display: flex; align-items: center; justify-content: center;">
                <img id="fish-logo" src="../assets/logo.svg" alt="logo" :style="{height: fish_style}">
            </div>
            <a-menu :defaultSelectedKeys="['1']" :style="{ width: '100%' }" @menuItemClick="onClickMenuItem">
                <a-menu-item key="1">
                    <IconHome/>
                    抓包
                </a-menu-item>
                <a-menu-item key="2">
                    <IconSearch/>
                    分析
                </a-menu-item>
                <a-menu-item key="3">
                    <IconSettings/>
                    设置
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="padding-left: 20px;">
                <a-space size="medium">
                    <a-button shape="square" @click="onCollapse">
                        <IconCaretRight v-if="collapsed"/>
                        <IconCaretLeft v-else/>
                    </a-button>
                    <a-typography-text>WireFish</a-typography-text>
                </a-space>
            </a-layout-header>

            <a-layout style="padding: 10px 10px;">
                <a-layout-content>
                    <DataInput></DataInput>
                    <DataTable></DataTable>
                    <DataTree></DataTree>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import {ref} from 'vue';
import {Message} from '@arco-design/web-vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconSearch,
    IconSettings,
} from '@arco-design/web-vue/es/icon';
import DataTable from "./DataTable.vue"
import DataInput from "./DataInput.vue"
import DataTree from "./DataTree.vue"

const collapsed = ref(false);
let fish_style = ref("80%")
const onCollapse = () => {
    fish_style = collapsed.value ? "80%" : "50%";
    collapsed.value = !collapsed.value;
};
const onClickMenuItem = (key) => {
    Message.info({content: `You select key ${key}`, showIcon: true});
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
    background: rgba(255, 255, 255, 0.2);
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
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    /* text-align: center; */
}
</style>
  