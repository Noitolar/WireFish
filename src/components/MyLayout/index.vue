<template>
    <div class="my-layout">
        <MyMenu></MyMenu>
        <div class="my-layout-right">
            <MyHeader></MyHeader>
            <MyContent></MyContent>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyMenu from "./MyMenu/index.vue"
import MyHeader from "./MyHeader/index.vue"
import MyContent from "./MyContent/index.vue"
</script>

<style lang="less" scoped>
.my-layout{
    display: flex;
    height: 100%;
    overflow: hidden;
    &-right{
        flex: auto;
        display: flex;
        flex-direction: column;
    }
}
</style>