<template>
    <div>
      <headTitle><span slot="title">闲逛</span></headTitle>
      <top></top>
      <ul class="goods">
        <li class="goodsContent" v-for="(item,index) in stroll">
          <router-link :to="'/goodsDate/'+item.goodsId">
            <img :src="item.src" alt="">
            <h3>{{item.strollName}}</h3>
            <div class="price"><span>￥{{item.salesVolume}}</span><em>月销 {{item.salesVolume}}</em></div>
          </router-link>
          <span class="new" v-if="item.new">NEW</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import {api} from "../api";
  import headTitle from '@/subassembly/headerTitle.vue'
  import top from '@/subassembly/top.vue'
    export default {
        name: "stroll",
        data(){
          return{
            stroll:[]
          }
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            switch (res.code) {
              case 200:
                  this.stroll=res.stroll;
              break;
            }
          })
        },
        components:{
            top,headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .new{
    display: inline-block;
    width: 45rem/@size;
    padding: 2rem/@size 5rem/@size;
    background-color: #79da87;
    position: absolute;
    left: 0;
    top: 10rem/@size;
    color: white;
  }
  .goods{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1.5px;
  }
  .goodsContent{
    width: 46.7%;
    margin: 5.8rem/@size;
    position: relative;
  }
  .goodsContent img{
    width: 100%;
    border-radius: 8rem/@size;
  }
  .goodsContent h3{
    font-size: 14rem/@size;
    color: #333;
    text-align: left;
    line-height: 23rem/@size;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .goodsContent div{
    display: flex;
    justify-content: space-between;
    margin-top: 2rem/@size;
  }
  .goodsContent div span{
    color: red;
    font-size: 18rem/@size;
  }
  .goodsContent div em{
    color: #999;
    font-size: 15rem/@size;
  }
</style>
