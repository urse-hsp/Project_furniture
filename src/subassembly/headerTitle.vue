<template>
  <div class="fixed">
    <header class="header">
      <div class="left"><slot name="left" class="left"></slot></div>
      <p class="header-title"><slot name="title"></slot></p>
      <div class="titleRight"><slot name="right"></slot></div>
    </header>
  </div>
</template>

<script>
    export default {
        name: "headerTitle"  //头部
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .header{
    width: 100%;
    height: 48rem/@size;
    line-height:48rem/@size;
    background: #89be48;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .header-title {
    margin: 0 auto;
    font-size: 20rem/@size;
    text-align: center;
    color: #fff;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .left{
    width: 10%;
    height: 100%;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left img{
    width: 13.5rem/@size;
  }
  .titleRight img{
    width: 21rem/@size;
    position: absolute;
    right: 5%;
    top: 24%;
  }
  .titleRight{
    width: 14%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18rem/@size;
    margin-right: 6rem/@size;
    color: white;
  }
  .titleRight a{
    color: white;
  }
</style>
