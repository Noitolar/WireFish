<template>
    <a-space style="margin: 10px 10px 0 10px;">
        <a-input :style="{ width: '400px' }" placeholder="过滤规则" allow-clear :v-model="packet_filter" />
        <a-button @click="applyFilter">设置规则</a-button>
    </a-space>

    <a-space style="margin: 10px 10px 0 10px;">
        <a-select :style="{ width: '400px' }" placeholder="网卡" allow-clear :scrollbar="true">
            <a-option>All</a-option>
            <a-option>Realtek RTL8852AE WiFi 6 802.11ax PCIe Adapter</a-option>
            <a-option>Realtek Gaming 2.5GbE Family Controller</a-option>
        </a-select>
        <a-button @click="applyInterface">设置网卡</a-button>
    </a-space>

    <a-space style="margin: 10px 10px 0 10px;">
        <a-typography-text>最大捕获数量：</a-typography-text>
        <a-slider :default-value="max_count" :style="{ width: '200px' }" show-input />
    </a-space>

    <a-space style="margin: 10px 10px 0 10px;">
        <a-typography-text>最大捕获时间：</a-typography-text>
        <a-slider :default-value="max_timeout" :style="{ width: '200px' }" show-input />
    </a-space>

    <a-space style="margin: 10px 10px 0 10px;">
        <a-button type="primary" @click="startSniffer">开始抓包</a-button>
    </a-space>
</template>
  
<script setup>
import { ref } from "vue"
let packet_filter = ref("")
let max_count = ref(100)
let max_timeout = ref(100)
const applyFilter = () => { }
const applyInterface = () => { }
const startSniffer = () => { }
</script>
  