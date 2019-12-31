<template>
    <div class="introduce">
      <headTitle>
        <img src="../assets/login.png" slot="left" @click="login"/>
        <span slot="title">了解LifeVC</span>
      </headTitle>
      <section v-for="(item,index) in str" class="main">
          <h2>{{item.title}}</h2>
          <h3>{{item.titleMain}}</h3>
          <p>{{item.content}}</p>
          <p v-if="item.content2">{{item.content2}}<img :src="item.src" v-if="item.src"/></p>
      </section>
      <footer class="footer">
        <p>感谢你今天光顾LifeVC。</p>
        <div><img src="http://i1.lifevccdn.com/Images/m/signature_trans@2x.png" alt=""></div>
        <p>LifeVC丽芙家居（中国）CEO：Rico.S</p>
      </footer>
    </div>
</template>

<script>
  import {api} from "../api";
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "introduce",
        data(){
          return{
            str:[]
          }
        },
        mounted(){
          api.read('get','../../static/data.json').then(res=>{
            switch (res.code) {
              case 200:
                this.str = res.introduce;
              break;
            }
          })
        },
        methods:{
          login(){
            this.$router.go(-1);
          }
        },
        components:{
          headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .introduce{
    background: white;
    height: 100%;
    width: 100%;
    text-align: left;
    position: fixed;
    left: 0;
    top: 0;
    overflow: auto;
  }
  .introduce section{
    margin-top: 48rem/@size;
  }
  .main{
    padding-top: 24rem/@size;
    margin: 0 15rem/@size;
    border-bottom: 1.1px solid #d9d9d9;
  }
  .main h2{
    font-size: 23rem/@size;
    color: #666666;
  }
  .main h3{
    font-size: 15rem/@size;
    font-weight: bold;
    color: #666666;
    line-height: 35rem/@size;
  }
  .introduce p{
    font-size: 10rem/@size;
    line-height: 28rem/@size;
    color: #666666;
    padding-bottom: 24rem/@size;
  }
  .main p img{
    width: 100%;
  }
  .footer{
    padding-left: 15rem/@size;
    padding-right: 25rem/@size;
  }
  .footer div,.footer p:last-child{
    display: flex;
    justify-content: flex-end;
    font-size: 16rem/@size;
  }
  .footer img{
    width: 133rem/@size;
    margin-bottom: 5rem/@size;
  }
</style>
