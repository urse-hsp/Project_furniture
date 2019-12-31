<template>
  <div>
    <div>
      <headerTitle>
        <img src="../assets/login.png" alt="" slot="left" @click="login"/>
        <span slot="title">会员等级</span>
      </headerTitle>
      <div class="member">
        <p>当前等级：<span>新新会员</span></p>
        <p>你所在的省你现在排第1名。</p>
        <p>你所在的省你现在排第1名。</p>
      </div>
      <ul class="grade">
        <div>会员等级划分：按照累积产品结算金额进行计算，系统确认签收第2天，会自动判断你的等级。</div>
        <li v-for="item in member">
          <img :src="item.src"/>
          <div><span>{{item.title}}</span><span>{{item.demand}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {api} from "../api";
    import headerTitle from "../subassembly/headerTitle";
    export default {
        name: "member",
        data(){
          return{
            member:[]
          }
        },
        methods:{
          login(){
            this.$router.go(-1);
          }
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            this.member = res.member;
          })
        },
        components:{
          headerTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .member{
    margin-top: 35rem/@size;
    background: white;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 11.2rem/@size 18.5rem/@size;
    text-align: left;
  }
  .member p{
    line-height: 24rem/@size;
    font-size: 13.5rem/@size;
    color: #666;
  }
  .member span{
    font-weight: bold;
    font-size: 15.5rem/@size;
    color: #000;
  }
  .grade{
    border-top: 1px solid #e3e3e3;
    margin-top: 17rem/@size;
    background: white;
    width: 100%;
    text-align: left;
    padding-left: 18.75rem/@size;
  }
  .grade>div{
    line-height: 25rem/@size;
    font-size: 14rem/@size;
    color: #666;
    border-bottom: 1px solid #e3e3e3;
    padding: 10rem/@size 0;
    margin-bottom: 10rem/@size;
  }
  .grade li{
    border-left: 5rem/@size solid #B3B3B3;
    margin-left: 21rem/@size;
    position: relative;
    height: 70rem/@size;
    display: flex;
    align-items: center;
  }
  .grade li img {
    width: 51rem/@size;
    height: 51rem/@size;
    border-radius: 50%;
    border: 5rem/@size solid #B3B3B3;
    position: absolute;
    left: -27rem/@size;
  }
  .grade li div{
    width: 100%;
    height: 100%;
    margin-left: 32rem/@size;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 18rem/@size;
  }
  .grade li div>span:nth-child(1){
    font-size: 15.5rem/@size;
    color: #000;
  }
  .grade li div>span:nth-child(2){
    font-size: 13.9rem/@size;
    color: #666;
  }
</style>
