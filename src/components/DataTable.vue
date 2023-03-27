<template>
    <a-space style="margin: 10px 10px 0 10px;" direction="vertical">
        <a-table 
        :columns="columns" 
        :data="data" 
        :row-key="idx" 
        column-resizable 
        :bordered="{ cell: true }" 
        :stripe="true" 
        :scrollbar="true" 
        :virtual-list-props="{height:240}" 
        :pagination="false" 
        size="mini"
        >
        </a-table>
    </a-space>
</template>
  
<script setup>
import { reactive } from 'vue';
const columns = reactive([
    {
        title: '序号',
        dataIndex: 'idx',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '时间',
        dataIndex: 'time',
        width: 120,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '源地址',
        dataIndex: 'from',
        width: 140,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '宿地址',
        dataIndex: 'to',
        width: 140,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '协议',
        dataIndex: 'protocol',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '其他',
        dataIndex: 'details',
        // width:200,
        ellipsis: true,
        tooltip: true,
    },
]);

// 在这里使用后端API：update()
// 然后解析字符串
const data = reactive([
    {
        idx: 1,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 2,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 3,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 4,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 5,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 6,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 7,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 8,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 9,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 10,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
    {
        idx: 11,
        time: 0.00037,
        from: "192.168.85.122",
        to: "10.211.93.24",
        protocol: "TCP",
        details: "[SYN]"
    },
]);

</script>
  