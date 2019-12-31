<template>
    <div>
      <headTitle>
        <img src="../assets/login.png" alt="" slot="left" @click="login"/>
        <span slot="title">设置</span>
      </headTitle>
      <ul class="option">
        <li>清理缓存<i class="el-icon-arrow-right"></i></li>
        <li>关于LifeVC<i class="el-icon-arrow-right"></i><span>平台: browser 版本：5.1.2 - 261</span></li>
        <button class="btn" @click="expurgate">退出当前账号</button>
      </ul>
    </div>
</template>

<script>
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "deploy",
        methods:{
          login(){
            this.$router.go(-1);
          },
          expurgate(){
            localStorage.removeItem('furniture');
            this.$router.push({path:'/my'});
          }
        },
        components:{
          headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .option li{
    display: inline-block;
    width: 100%;
    height: 62rem/@size;
    line-height: 62rem/@size;
    background: white;
    margin-bottom: 12rem/@size;
    text-align: left;
    padding-left: 20rem/@size;
    font-size: 14rem/@size;
    position: relative;
  }
  .option li i{
    float: right;
    position: absolute;
    top: 50%;
    right: 2rem/@size;
    transform: translateY(-50%);
    font-size: 25rem/@size;
  }
  .option span{
    float: right;
    margin-right: 30rem/@size;
    color: #ccc;
    font-size: 12.5rem/@size;
  }
  .btn{
    width: 323rem/@size;
    height: 48rem/@size;
    outline: none;
    background-color: #ee7621;
    border: none;
    border-radius: 6rem/@size;
    margin-top: 20rem/@size;
    color: white;
    font-size: 19rem/@size;
  }
</style>
