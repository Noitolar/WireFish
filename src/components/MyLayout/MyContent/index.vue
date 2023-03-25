<template>
    <div class="my-content">
        <div class="my-content-items" v-for="(item, index) in 100" :key="index">
            {{item}}
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.my-content{
    display: flex;
    flex-direction: column;
    flex: auto;
    margin: 20px;
    border: 2px solid #c47f00;
    overflow: auto;
    &-items{
        padding: 20px;
        border: 1px solid #0a8560;
    }
}
</style>