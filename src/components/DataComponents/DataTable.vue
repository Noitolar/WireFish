<template>
    <a-space style="margin: 10px 10px 0 10px;" direction="vertical">
        <a-table :columns="myDataTableColumns" :data="myDataTableData" :bordered="{ cell: true }" :scrollbar="true"
                 :virtual-list-props="{ height: 240 }" :pagination="false" size="mini" :row-selection="{type: 'radio'}">
        </a-table>
    </a-space>
</template>
  
<script setup>
import { reactive } from 'vue';

const myDataTableColumns = reactive([
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
        width: 200,
        ellipsis: true,
        tooltip: true,
    },
]);

// 在这里使用后端API：update()
// 然后解析字符串
const myDataTableData = reactive([]);

</script>
  