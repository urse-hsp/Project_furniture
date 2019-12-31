<template>
  <div id="app">
    <router-view/>
    <navbar></navbar>
  </div>
</template>

<script>
  import navbar from '@/subassembly/Navbar.vue'
export default {
  name: 'App',
  components:{
    navbar
  }
}
</script>

<style lang="less">
  @size:37.5;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 53rem/@size;
    padding-top: 48rem/@size;
    width: 375rem/@size;
    margin: auto;
  }
  .swiper-pagination span {
    background: #fff!important;
    width: 8rem/@size;
    height: 8rem/@size;
    margin: 8rem/@size 5rem/@size !important;
  }
</style>
