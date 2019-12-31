<template>
    <div>
      <top></top>
      <headTitle>
        <img src="../assets/login.png" alt="" slot="left" @click="login"/>
        <span slot="title">{{title}}</span>
      </headTitle>
      <ul class="chang">
        <li><span>新品</span></li>
        <li><span>畅销</span></li>
        <li><span>价格</span></li>
      </ul>
      <ul>
        <li v-for="(item,index) in classify" class="classifyGoods">
            <router-link :to="'/goodsDate/'+item.goodsId">
              <img :src="item.src"/>
              <h2>{{item.strollName}}</h2>
              <div>
                <div><span>￥ {{item.price}}</span></div>
                <div>评论：{{item.comment.length}}</div>
              </div>
            </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import {api} from "../api";
  import top from '@/subassembly/top.vue'
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "classify",
        data(){
          return{
            classify:[],
            classify2:[],
            title:""
          }
        },
        methods:{
          login(){
            this.$router.go(-1);
          }
        },
        mounted() {
          let PathId = this.$route.params.goodsindex;
          let TitleId = this.$route.params.ID;
          api.read('get','../../static/data.json').then(res=>{
            switch (res.code) {
              case 200:
                res.subnav.filter((item2,index)=>{
                  if(item2.classifyId == TitleId){
                    this.title = item2.title;
                  }
                  if(index>0){
                    this.classify2.push(item2);
                  }
                });
                this.classify2.forEach(res=>{
                  res.category.forEach(depth=>{
                    if(depth.goodsId == PathId){
                      this.classify = depth.stroll;
                    }
                  })
                });
              break;
            }
          });
        },
        components:{
          headTitle,top
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .chang{
    width: 100%;
    display: flex;
    background: white;
  }
  .chang li{
    flex: 1;
    height: 46.5rem/@size;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chang li span{
    display: inline-block;
    width: 100%;
    line-height: 20rem/@size;
    font-size: 13rem/@size;
    color: #666;
  }
  .classifyGoods{
    margin: 24rem/@size 6.8rem/@size 0;
    border: 1px solid #ddd;
    background: white;
  }
  .chang li:nth-child(2) span{
    border-left: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
  }
  .classifyGoods img{
    width: 100%;
  }
  .classifyGoods h2{
    line-height: 16rem/@size;
    font-size: 13rem/@size;
    padding: 10.5rem/@size;
    text-align: left;
    color: #000;
  }
  .classifyGoods a>div{
    padding: 0 8rem/@size 10rem/@size;
    display: flex;
    justify-content: space-between;
    font-size: 14rem/@size;
    color: #666666;
  }
  .classifyGoods a> span{
    color: #000;
  }
</style>
