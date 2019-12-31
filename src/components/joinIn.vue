<template>
  <div>
    <headTitle>
      <img src="../assets/login.png" slot="left" @click="login"/>
      <span slot="title">LifeVC丽芙家居</span>
    </headTitle>
    <top></top>
    <ul>
      <li v-for="item in joininData"><img :src="item.src"/></li>
    </ul>
    <footer class="footer">
      <span>~已经到底了~</span>
    </footer>
  </div>
</template>

<script>
  import {api} from "../api";
  import top from '@/subassembly/top.vue';
  import headTitle from '@/subassembly/headerTitle.vue';
    export default {
        name: "joinIn",
        data(){
          return{
            joininData:[]
          }
        },
        methods:{
          login(){
            this.$router.go(-1);
          }
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            this.joininData = res.JoinIn;
          })
        },
        components:{
          headTitle,top
       }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .footer{
    width: 100%;
    height: 54rem/@size;
    line-height: 54rem/@size;
    color: #999;
    font-size: 13rem/@size;
    position: absolute;
    left: 0;
    bottom: -3897.1rem/@size;
    background: white;
  }
  img{
    width: 100%;
  }
</style>
