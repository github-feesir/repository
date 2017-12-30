  <!-- loading组件 -->
<template>
    <div class="loadEffect" v-show="!loadingData">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script>
  import '../assets/css/loading.css'
  export default {
    props: ['loadingData']
  }
</script>