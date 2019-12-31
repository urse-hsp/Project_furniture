<template>
    <div class="modal" v-show="boole">
      {{title}}
    </div>
</template>

<script>
    export default {
        name: "modalBox", //模态框
        props:['title','boole'],
        data(){
          return{}
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .modal{
    width: auto!important;
    display: inline-block;
    padding: 14rem/@size 10rem/@size;
    background: rgba(0,0,0,.7);
    color: white;
    font-size: 13rem/@size;
    border-radius: 6rem/@size;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
