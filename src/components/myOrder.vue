<template>
    <div>
      <headTitle>
        <span slot="title">我的订单</span>
        <img src="../assets/login.png" alt="" slot="left" @click="login"/>
      </headTitle>
      <ul class="choice">
        <li><a :class="{active:num==1?true:false}" @click="active(1)">进行中</a></li>
        <li><a :class="{active:num==2?true:false}" @click="active(2)">已取消</a></li>
        <li><a :class="{active:num==3?true:false}" @click="active(3)">已收货</a></li>
      </ul>
      <div class="back">
        <img src="http://i1.lifevccdn.com/images/h5/i_list_empty@3x.png"/> <p>您还没有相关订单</p>
      </div>
    </div>
</template>

<script>
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "myOrder",
        data(){
          return{
            num:1
          }
        },
        methods:{
          login(){
            this.$router.go(-1);
          },
          active(data){
            this.num = data;
          }
        },
        components:{
          headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .choice{
    display: flex;
    height: 56.5rem/@size;
    align-items: center;
    border-bottom: 1px solid #ddd;
    background: white;
  }
  .choice li{
    flex: 1;
  }
  .choice li a{
    width: 63%;
    height: 28rem/@size;
    line-height: 28rem/@size;
    color: #000;
    border-radius: 15rem/@size;
    font-size: 14rem/@size;
  }
  .active{
    background: #88c13e;
    color: #fff!important;
  }
  .back img{
    width: 112rem/@size;
    height: 121rem/@size;
    margin-top: 125rem/@size;
  }
  .back p{
    font-weight: bold;
    font-size: 15rem/@size;
  }
</style>
