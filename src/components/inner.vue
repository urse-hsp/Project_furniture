<template>
    <div class="wrap">
      <headerTitle>
        <img src="../assets/login.png" slot="left" @click="goBack"/>
        <span slot="title">LifeVC丽芙家居 </span>
      </headerTitle>
      <div class="goods">
        <div v-if="inener.category" class="flex">
          <swiper :options="swiperOption" class="select">   <!--changNum-->
            <swiper-slide><span @click="chang" :class="{active:changNum==-1?true:false}">全部</span></swiper-slide>
            <swiper-slide v-for="(item,index) in inener.category" :class="{active:changNum==index?true:false}">
              <span @click="chang2(index)">{{item.title}}</span>
            </swiper-slide>
          </swiper>
        </div>
        <div class="height" v-if="!inener.back2"></div>
        <div class="commodity" v-show="commodity">
          <div><img :src="inener.back"/></div>
          <div v-if="inener.back2"><img :src="inener.back2"/></div>
          <ul>
            <li v-for="item in inener.stroll" class="goodsList">
              <router-link :to="'/goodsDate/'+item.goodsId">
                <img :src="item.src"/>
                <h2>{{item.strollName}}</h2>
                <h3>{{item.trait}}</h3>
                <p><span>￥{{item.price}}</span></p>
                <div><span>{{item.gift}}</span><em>{{item.new==true?'新':""}}</em></div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-show="!commodity">
          <ul class="child">
            <li v-for="item in child.stroll" class="goodsList">
              <router-link :to="'/goodsDate/'+item.goodsId">
                <img :src="item.src"/>
                <h2>{{item.strollName}}</h2>
                <h3>{{item.trait}}</h3>
                <p><span>￥{{item.price}}</span></p>
                <div><span>{{item.gift}}</span><em>{{item.new==true?'新':""}}</em></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {api} from "../api";
  import headerTitle from "../subassembly/headerTitle";
    export default {
        name: "inner",
        data(){
          return{
            inener:{},
            child:{},
            commodity:true,
            num:0,
            changNum:-1,
            swiperOption: {
              slidesPerView: 4.6,
              spaceBetween: 30,
              freeMode: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              }
            }
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);
          },
          chang(){
            this.changNum = -1;
            this.commodity = true;
          },
          chang2(index){
            this.commodity = false;
            this.num = index;
            this.read();
            this.changNum = index;
          },
          read(){
            let pathId =this.$route.params.id;
            api.read('get','../../static/data.json').then(res=>{
              res.subnav.forEach(item=>{
                if(item.classifyId == pathId){
                  this.inener = item;
                  this.child = res.subnav[this.num];
                }
              })
            })
          }
        },
        mounted() {
          this.read();
        },
        components:{
          headerTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .wrap{
    padding-bottom: 48rem/@size;
  }
  .goods .commodity>div>img{
    vertical-align: top;
    width: 100%;
  }
  .goods .commodity>ul,.child{
    padding-left: 10rem/@size;
    display: flex;
    flex-wrap: wrap;
    background: white;
  }
  .goodsList{
    width: 48%;
    margin-right: 2%;
    margin-top: 15rem/@size;
    margin-bottom: 8rem/@size;
    text-align: left;
    padding-top: 5rem/@size;
  }
  .goodsList img{
    width: 98%;
    height: 174rem/@size;
    border-radius: 5rem/@size;
  }
  .goodsList h2{
    font-size: 15.5rem/@size;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10rem/@size;
  }
  .goodsList h3{
    font-size: 12rem/@size;
    margin-top: 8rem/@size;
    color: #999;
  }
  .goodsList p{
    margin-top: 10rem/@size;
    font-size: 16rem/@size;
    font-weight: 500;
    color: #ab2b2c;
    line-height: 25rem/@size;
  }
  .goodsList div{
    font-size: 12rem/@size;
    margin-top: 10rem/@size;
    margin-bottom: 10rem/@size;
  }
  .goodsList div>span,em{
    background-color: rgb(171, 43, 44);
    color: rgb(255, 255, 255);
    padding: 1.5rem/@size 3.5rem/@size;
    margin-right: 5rem/@size;
  }
  .select{
    height: 40rem/@size;
    line-height: 40rem/@size;
    font-size: 14rem/@size;
  }
  .select div{
    width: auto!important;
    margin: 0 15rem/@size !important;
  }
  .select div span{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .flex{
    position: fixed;
    background: white;
    width: 100%;
  }
  .height{
    height: 40rem/@size;
  }
  .active{
    border-bottom: 2.5rem/@size solid #76bc21;
    font-weight: bold;
  }
</style>
