<template>
    <div>
      <headTitle>
        <span slot="title">账户中心</span>
        <span slot="right"><router-link to="/deploy">设置</router-link></span>
      </headTitle>
      <div class="login">
        <div v-if="boole">
          <p>您还未登录</p>
          <div class="btn">
            <router-link to="/login">登录</router-link><span></span><router-link to="/register">注册</router-link>
          </div>
        </div>
        <div v-else class="account">
          <img src="../assets/user.jpg" />
          <div>
            <div>在行走</div>
            <router-link to="/member">
              <span>新新会员</span><img src="../assets/xing.png"/><i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
        </div>

      </div>
      <div v-for="item in information" class="wrap">
        <ul class="flow">
          <li v-for="flow in item.flow">
            <router-link :to="boole==true?'/login':flow.path">
              <img :src="flow.src"/> <span>{{flow.title}}</span>
            </router-link>
          </li>
        </ul>
        <div>
          <ul class="my">
            <li v-for="flow in item.my">
              <router-link :to="boole==true?'/login':flow.path">
                <img :src="flow.src"/> <span>{{flow.title}}</span> <i class="el-icon-arrow-right"></i>
              </router-link>
            </li>
          </ul>
          <ul class="property">
            <li v-for="property in item.property">
              <router-link :to="boole==true?'/login':property.path">
                <img :src="property.src"/> <span>{{property.title}}</span> <i class="el-icon-arrow-right"></i>
              </router-link>
            </li>
          </ul>
          <ul class="set">
            <li v-for="set in item.set">
              <router-link :to="boole==true?'/login':set.path">
                <img :src="set.src"/> <span>{{set.title}}</span> <i class="el-icon-arrow-right"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {api} from "../api";
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "my",
        data(){
          return{
            information:[],
            boole:true
          }
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            this.information = res.account;
          });
          let user = localStorage.getItem('furniture');
             !user?this.boole = true:this.boole = false;
        },
        components:{
          headTitle
        },
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .login{
    width: 100%;
    height: 108rem/@size;
    background: url("../assets/background.png")no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
  }
  .login div p{
    font-size: 16rem/@size;
    margin-top: 18rem/@size;
  }
  .login>div>.btn{
    margin-top: 14.5rem/@size;
    border: 1rem/@size solid #009c42;
    display: flex;
    width: 137rem/@size;
    height: 38rem/@size;
    line-height: 38rem/@size;
    border-radius: 25rem/@size;
    position: relative;
  }
  .login>div>.btn a{
    color: #009c42;
    font-size: 15.5rem/@size;
  }
  .login>div>.btn span{
    display: inline-block;
    width: 1rem/@size;
    height: 16rem/@size;
    background:#009c42;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%,50%);
  }
  .account{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .account>img{
    width: 55.2rem/@size;
    height: 55.2rem/@size;
    border-radius: 50%;
    border: 2rem/@size solid white;
    box-sizing: initial;
    margin-right: 25rem/@size;
  }
  .account>div img{
    width: 22.2rem/@size;
    height: 22.2rem/@size;
    margin: 0 5rem/@size;
  }
  .account a{
    width: auto;
    height: auto;
  }
  .account>div{
    text-align: left;
  }
  .account>div div{
    font-size: 15rem/@size;
  }
  .account>div a{
    display: flex;
    align-items: center;
    margin-top: 8rem/@size;
  }
  .account>div span{
    font-size: 16rem/@size;
    font-weight: bold;
    color: #000;
  }
  .account>div i{
    font-size: 20rem/@size;
    color: #999;
  }
  .flow{
    display: flex;
    flex-wrap: wrap;
    background: white;
  }
  .flow li{
    box-sizing: initial;
    width: 33.3333%;
    margin-top: 15rem/@size;
    border-bottom: 1px solid #eee;
    padding-bottom: 11rem/@size;
    position: relative;
    height: 35rem/@size;
  }
  .flow li:nth-child(2) a,.flow li:nth-child(5) a{
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
  }
  .flow li a{
    display: flex;
    align-items: center;
  }
  .flow li img{
    width: 42rem/@size;
    height: 42rem/@size;
    margin-left: 15%;
  }
  .flow li span{
    display: inline-block;
    width: 37%;
  }
  .wrap i{
    position: absolute;
    right: 2rem/@size;
    font-size: 22rem/@size;
    color: #bbb;
  }
  .wrap div li a{
    display: flex;
    align-items: center;
    line-height: 60rem/@size;
    position: relative;
    border-bottom: 1px solid #eee;
    font-size: 14rem/@size;
  }
  .wrap>div ul{
    background: white;
    margin-bottom: 12rem/@size;
  }
  .wrap>div  li a img{
    width: 30rem/@size;
    height: 30rem/@size;
    margin: 0 13.2rem/@size;
  }
</style>
