<template>
  {{ooo}}
    <a-button @click="aaa">QwQ</a-button>
</template>
  
<script setup>
import {ref} from "vue";
import axiosRequest from "../plugins/axiosInstance"
let ooo = ref("")
const aaa = () => {
  axiosRequest({
    url: "/mock/set_filter",
    method: "get"
  }).then((res) => {
    alert("@v@")
    ooo.value = res.data
  })
}

</script>
  