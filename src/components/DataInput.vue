<template>
    <a-space style="margin: 10px 10px 0 10px;">
        <a-input size="medium" :style="{ width: '400px' }" placeholder="设置自定义过滤器" allow-clear :model-value="bpf_filter" />
        <a-button @onclick="onApplyFilter">应用过滤器</a-button>
    </a-space>
</template>
  
<script setup>
import { ref } from "vue"
const bpf_filter = ref("")
const onApplyFilter = () => { }
</script>
  