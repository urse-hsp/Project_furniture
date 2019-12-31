<template>
  <div>
      <top></top>
      <header class="header">
        <div></div><span class="search"><router-link to="/allProducts"></router-link></span>
      </header>
      <nav class="move">
        <swiper :options="swiperOption" class="select">
          <swiper-slide :class="{active:changNum==-1?true:false}"><span @click="chang2">首页</span></swiper-slide>
          <swiper-slide v-for="(item,index) in subnav2" :class="{active:changNum==index?true:false}">
            <span @click="chang(index)">{{item.title}}</span>
          </swiper-slide>
          <swiper-slide><router-link to="/introduce" @click="Introduce()" class="view">了解LifeV</router-link></swiper-slide>
        </swiper>
      </nav>

      <section v-if="boole" class="section">
        <slideshow :res="slideshow"></slideshow>
        <div class="WordsFigure"><img src="../assets/WordsFigure.jpg" alt=""></div>
        <div class="main">
          <div class="classify">
            <img src="../assets/classify.jpg"/>
            <ul>
              <li v-for="(item,index) in subnav2"><router-link :to="'/inner/'+item.classifyId"></router-link></li>
              <li><router-link to="/inner/12001"></router-link></li>
              <li><router-link to="/joinIn"></router-link></li>
            </ul>
          </div>
          <div class="gift"><img src="../assets/gift.jpg"/></div>
          <div v-for="item in homeImg" class="homeImg">
            <img :src="item.src"/>
            <div>
              <p><router-link to="/joinIn"></router-link></p>
              <ul>
                <li v-for="item2 in homeGoods"><router-link :to="'/goodsDate/'+item2.goodsId"></router-link></li>
              </ul>
            </div>
          </div>
          <div class="cut-off"><img src="../assets/cut-off.jpg"/></div>
          <div class="YesterdaySold"><img src="../assets/YesterdaySold.jpg"/></div>
          <footer class="footer">
            <p>~没有更多了~</p>
            <p>上海丽芙家居用品有限公司版权所有&nbsp;&nbsp;沪ICP备11014656号</p>
            <p><img src="../assets/badge.png"/>沪公网安备 &nbsp;31010402002103号</p>
          </footer>
        </div>
      </section>

      <div class="subnav" v-else>
          <h1 v-if="subnav.text">{{subnav.text}}</h1>
          <ul v-if="subnav.category">
            <li v-for="item in subnav.category">
              <router-link :to="'/classify/'+item.goodsId+'/'+subnav.classifyId">
                <img :src="item.src"/> <p>{{item.title}}</p>
              </router-link>
            </li>
          </ul>
          <div v-if="subnav.notice"><img :src="subnav.notice" /></div>
          <div class="subnavGoods">
            <h1>Rico.S的精心推荐：</h1>
            <div v-for="(item,index) in subnav.stroll" class="subnavDetails">
              <router-link :to="'/goodsDate/'+item.goodsId">
                <img :src="item.src"/>
                <h2>{{item.strollName}}</h2>
                <div>
                  <div><span>￥ {{item.price}}</span><em v-if="item.gift">{{item.gift}}</em></div>
                  <div>评论：{{item.comment.length}}</div>
                </div>
              </router-link>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import {api} from "../api";
  import top from '@/subassembly/top.vue'
  import slideshow from "../subassembly/slideshow"
  export default {
      name: 'home',
      data () {
        return {
          slideshow:[],
          subnav:[],
          subnav2:[],
          num:0,
          boole:true,
          homeGoods:[],
          homeImg:[],
          changNum:-1,
          swiperOption: {
            slidesPerView: 5,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          }
        }
      },
      mounted(){
        this.read();
      },
      methods:{
      chang(index){
        this.num = index;
        this.boole = false;
        this.read();
        this.changNum = index;
      },
      chang2(){
        this.boole = true;
        this.changNum = -1;
      },
      read(){
        api.read('get','../../static/data.json').then(res=>{
          switch (res.code) {
            case 200:
              this.slideshow = res.slideshow;
              this.subnav2 = res.subnav;
              this.subnav = res.subnav[this.num];
              this.homeImg = res.homeGoods;
              this.homeGoods = res.subnav[1].category[0].stroll;
              break;
          }
        });
      }
    },
    components:{
      top,slideshow
    }
}
</script>

<style scoped lang="less">
  @size:37.5;
  .header{
    width: 100%;
    height: 48rem/@size;
    background-color: #89be48;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }
  .header div{
    width: 50%;
    height: 50%;
    background: url("../assets/logo.png") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .search{
    float: right;
    display: inline-block;
    width: 12%;
    height: 102%;
    background: url("../assets/search.png")no-repeat center;
    background-size: 43.5% 41%;
    transform: translateY(-2.4rem/@size);
  }
  .select{
    height: 48rem/@size;
    line-height: 48rem/@size;
    text-align: center;
  }
  .select span{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .WordsFigure{
    margin: 10rem/@size 0;
  }
 .WordsFigure,.WordsFigure img,.main>div>img,.subnav img,.main{
    width: 100%;
  }
  .main>div{
    width: 100%;
    margin-bottom: 12rem/@size;
  }
  .select>div>div{
    border-bottom: 2rem/@size solid #ddd;
  }
  .move{
    width: 100%;
    overflow: hidden;
    background: white;
    z-index: 10000;
    position: fixed;
    left: 0;
    top: 48.1rem/@size;
  }
  .active{
    color:#80b532 !important;
    border-bottom: 2rem/@size solid #80b532 !important;
  }
  .swiper-wrapper>div{
    margin-right: 0rem/@size !important;
    width: 77.96rem/@size !important;
    border-bottom: 2px solid #ddd;
    font-size: 14.4rem/@size;
  }
  .subnav{
    margin-top: 45rem/@size;
  }
  .subnav ul{
    display: flex;
    flex-wrap: wrap;
    background: white;
    margin-bottom: 17rem/@size;
    padding: 11.7rem/@size 0;
  }
  .subnav ul li{
    width: 25%;
  }
  .subnav ul p{
    line-height: 22rem/@size;
    font-size: 13rem/@size;
  }
  .subnav ul li img{
    width: 80%;
  }
  .subnav h1{
    font-size: 19rem/@size;
    line-height: 47rem/@size;
    color: #000;
  }
  .subnavGoods>div{
    margin: 0 6.6rem/@size 24rem/@size;
    background: white;
    text-align: left;
    border: 1rem/@size solid #ddd;
  }
  .subnavGoods>div h2{
    line-height: 16rem/@size;
    font-size: 13rem/@size;
    padding: 10.5rem/@size;
  }
  .subnavDetails a>div{
    padding: 0 8rem/@size 10rem/@size;
    display: flex;
    justify-content: space-between;
    font-size: 14rem/@size;
    color: #000;
  }
  .subnavDetails div div:last-child{
    color: #666;
  }
  .subnavDetails a>div em{
    display: inline-block;
    background: #c00;
    color: white;
    padding: 2rem/@size 2.5rem/@size;
    line-height: 18rem/@size;
    margin-left: 5rem/@size;
  }
  .footer{
    font-size: 12rem/@size;
    color: rgb(153, 153, 153);
    margin-bottom: 8rem/@size;
  }
  .footer P:first-child{
    line-height: 45rem/@size;
  }
  .footer P{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem/@size;
  }
  .footer img{
    width: 16rem/@size;
    height: 14rem/@size;
    margin-right: 3rem/@size;
  }
  .section{
    margin-top: 48rem/@size;
  }
  .classify,.homeImg{
    position: relative;
  }
  .classify ul{
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }
  .classify li{
    display: inline-block;
    width: 20%;
    height: 50%;
    border: 1px solid white;
  }
  .homeImg div{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .homeImg p{
    width: 100%;
    height: 10%;
    margin-top: 87.5rem/@size;
  }
  .homeImg ul{
    width: 100%;
    height: 90%;
    margin-top: 10rem/@size;
    padding-left: 17rem/@size;
    padding-right: 10rem/@size;
    justify-content: center;
  }
  .homeImg ul li{
    width: 47%;
    height: 213rem/@size;
    margin: 0 4rem/@size 8rem/@size;
    float: left;
  }
</style>












      <!--<div class="newProduct"><img src="../assets/newProduct.jpg"/></div>
         <div class="hotSale"><img src="../assets/hotSale.jpg"/></div>
         <div class="list"><img src="../assets/list.jpg"/></div>
         <div class="clean"><img src="../assets/clean.jpg"/></div>-->
