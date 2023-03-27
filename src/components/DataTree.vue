<template>
    <a-space style="margin: 10px 10px 10px 10px;" direction="vertical">
        <a-button @click="toggleExpanded">
            {{ expandedKeys?.length ? '全部折叠' : '全部展开' }}
        </a-button>
        <div class="deeper-color">
            <a-tree :data="treeData" :show-line="true" v-model:expanded-keys="expandedKeys" />
        </div>
    </a-space>
</template>

<script setup>
import { ref } from "vue"
const allExpandedKeys = ['0-0', '0-1', "0-2"];
const expandedKeys = ref(allExpandedKeys);
const toggleExpanded = () => {
    expandedKeys.value = expandedKeys?.value.length ? [] : allExpandedKeys;
}
const treeData = [
    {
        title: 'ETH',
        key: '0-0',
        children: [
            {
                title: 'MAC',
                key: '0-0-1',
            },
        ],
    },
    {
        title: 'IP',
        key: '0-1',
        children: [
            {
                title: 'IP.src',
                key: '0-1-1',
            },
            {
                title: 'IP.dst',
                key: '0-1-2',
            },
        ],
    },
    {
        title: 'TCP',
        key: '0-2',
        children: [
            {
                title: 'TCP.sport',
                key: '0-2-1',
            },
            {
                title: 'TCP.dport',
                key: '0-2-2',
            },
        ],
    },
];
</script>

<style scoped>
.deeper-color {
    background: var(--color-fill-2);
}
</style>