<template>
    <el-container>
        <el-header style="align-items: center; height: 80px; display: flex">
            <img src="/fish.svg" alt="logo" style="height: 40px ">
        </el-header>

        <el-container>
            <el-aside width="240px">
                <el-scrollbar>
                    <el-menu>
                        <el-menu-item index="1">
                            Packets
                        </el-menu-item>
                        <el-menu-item index="2">
                            Sessions
                        </el-menu-item>
                        <el-menu-item index="3">
                            Settings
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-main>
                <el-scrollbar>
                    <el-table :data="tableData">
                        <el-table-column prop="date" label="Date" width="140"/>
                        <el-table-column prop="name" label="Name" width="120"/>
                        <el-table-column prop="address" label="Address"/>
                    </el-table>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">

import {ref} from 'vue'

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({length: 8}).fill(item))
</script>

<style scoped>

</style>