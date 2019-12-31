<template>
  <div>
    <join :data="goods" :num="piece"></join>
    <top></top>
    <headTitle>
      <img src="../assets/login.png" alt="" slot="left" @click="login"/>
      <span slot="title">商品介绍</span>
      <span slot="right"><img src="../assets/share.png" /></span>
    </headTitle>
    <slideshow :res="goodsslideshow"></slideshow>
    <div class="back">
     <div class="goodsTitle">
       <h2>{{goods.strollName}}</h2>
       <p>{{goods.trait}}</p>
       <div>￥<em>{{goods.price}}</em></div>
     </div>
     <div class="discounts"><div><em>优惠</em><span>登录查看你的积分和优惠券</span></div></div>
     <ul class="style">
        <li>
          <p>款式：</p>
          <div class="design">
            <span v-for="(item,index) in goods.style" @click="chang(index)">
              {{item.title}}<i class="el-icon-check" v-show="changNum==index?true:false"></i>
            </span>
          </div>
        </li>
       <li>
         <p>尺寸：</p>
         <div class="measure">
           <span v-for="(item,index) in goods.size" @click="chang2(index)">
             {{item.title}}<i class="el-icon-check" v-show="changNum2==index?true:false"></i>
           </span>
         </div>
       </li>
       <li>
         <div class="quantity">数量：
           <div>
              <button @click="quantity(-1)"><i class="el-icon-minus"></i></button>
              <em>{{piece}}</em>
              <button @click="quantity(1)"><i class="el-icon-plus"></i></button>
           </div>
         </div>
         <div class="quantity2">送至：<p><b>北京(满￥99免运费)</b><br><i>新会员首单，满49元免运费</i></p></div>
       </li>
     </ul>
   </div>
    <div class="promise"><div><img src="../assets/commitment.jpg"/></div></div>
    <div :class="{Menus:true,fixation:MenusBoole}">
      <div>
        <span :class="{active:boole==1?true:false}" @click="menu(1)">商品介绍</span>
        <span :class="{active:boole==2?true:false}" @click="menu(2)">规格参数</span>
        <span :class="{active:boole==3?true:false}" @click="menu(3)">评论({{commentQuantity}})</span>
      </div>
    </div>
    <ul class="jies" v-if="boole==1?true:false">
      <li v-for="(item,index) in goods.introduce"><img :src="item.src"/></li>
      <div class="comment2">会员使用评论：({{commentQuantity}}条)<span></span></div>
    </ul>
    <ul class="parameter" v-if="boole==2?true:false">
      <li v-for="item in parameter">
        <div>品名：{{item.title}}</div>
        <div>材料：{{item.quality}}</div>
        <div>包装方式：{{item.pack}}</div>
        <div class="remind">客户经理提醒：<br>{{item.suggest}}</div>
      </li>
    </ul >
    <ul class="comment" v-if="boole==3?true:false">
      <li v-for="(item,index) in goods.comment">
        <p>{{item.site}} {{item.number}} <span>{{item.member}} 累计购物：{{item.purchaseQuantity}}</span></p>
        <div>{{item.comment}}</div>
        <div>{{item.date}} 款式：{{item.style}} 尺寸：{{item.size}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {api} from "../api";
  import top from '@/subassembly/top.vue'
  import headTitle from '@/subassembly/headerTitle.vue'
  import join from  '@/subassembly/join.vue'
  import slideshow from "../subassembly/slideshow";
    export default {
        name: "goodsDate",
        data(){
          return{
            boole:1,
            goods:[],
            goodsslideshow:[],
            num: 1,
            commentQuantity:0,
            parameter:{},
            classify2:[],
            piece:1,
            changNum:0,
            changNum2:0,
            MenusBoole:false
          }
        },
        methods:{
          quantity(data){
            this.piece += data;
            if(this.piece<1) this.piece = 1;
          },
          login(){
            this.$router.go(-1);
          },
          handleChange(value) {
            console.log(value);
          },
          menu(data){
            this.boole = data;
          },
          read(Item,data){
            let GodsId = this.$route.params.goodsId;
            if(Item.goodsId == GodsId){
              this.goods=data;
              this.goodsslideshow=data.slideshow;
              this.commentQuantity = data.comment.length;
              this.parameter = data.parameter;
            }else {
                return
            }
          },
          chang(index){
            this.changNum = index;
          },
          chang2(index){
            this.changNum2 = index;
          },
          handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= 880 ){
              this.MenusBoole = true;
            }else{
              this.MenusBoole = false;
            }
          },
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            switch (res.code) {
              case 200:
                res.stroll.forEach(item=>{
                  this.read(item,item)
                });

                res.subnav.forEach((item,index)=>{
                  if(index>0){
                    this.classify2.push(item);
                  }
                  item.stroll.forEach(depth=>{
                    this.read(depth,depth)
                  });
                });

                this.classify2.forEach(item=>{
                  item.category.forEach(res=>{
                    res.stroll.forEach(depth=>{
                      this.read(depth,depth);
                    })
                  })
                });

                res.recommend.forEach(item=>{
                  this.read(item,item)
                });
              break;
            }
          });
          window.addEventListener('scroll', this.handleScroll)
        },
        components:{
          headTitle,top,join,slideshow
        },
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .back{
    background: white;
    padding-left: 7rem/@size;
    font-size: 12.5rem/@size;
  }
  .goodsTitle{
    padding: 19rem/@size 0;
  }
  .goodsTitle h2{
    font-size: 19rem/@size;
    margin-bottom: 3rem/@size;
  }
  .goodsTitle p{
    font-size: 15rem/@size;
    color: #999;
    line-height: 27rem/@size;
  }
  .goodsTitle div{
    font-size: 19rem/@size;
  }
  .goodsTitle em{
    font-size: 24rem/@size;
  }
  .discounts{
    height: 42rem/@size;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .discounts div{
    width: 100%;
    text-align: left;
    color: #cd060f;
  }
  .discounts em{
    color: white;
    background: #cd060f;
    padding: .5px 2px;
    margin-right: 15rem/@size;
  }
  .style{
    text-align: left;
    padding-top: 3rem/@size;
    margin-bottom: 10rem/@size;
    font-size: 14rem/@size;
  }
  .style li>p{
    color: #666;
    font-size: 13rem/@size;
    line-height: 25rem/@size;
  }
  .style li div{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
  .style li>div>span{
    display: inline-block;
    padding: 0 10rem/@size;
    height: 38rem/@size;
    line-height:38rem/@size;
    border: 1px solid #ccc;
    margin-right: 7rem/@size;
    margin-bottom: 8rem/@size;
    position: relative;
    overflow: hidden;
  }
  .style span i{
    position: absolute;
    right: 0;
    bottom: 0;
    color: #83b842;
    font-size: 17rem/@size;
    width: 16rem/@size;
    height: 15rem/@size;
    /*display:none;*/
  }
  .spanActive{
    border-color: #83b842;
    color: #83b842;
  }
  .quantity{
    height: 28rem/@size;
    line-height: 28rem/@size;
    font-size: 13rem/@size;
    color: rgb(107, 107, 107);
    margin-top: 6.5rem/@size;
  }
  .quantity div em{
    display: inline-block;
    width: 36rem/@size;
    height: 26rem/@size;
    text-align: center;
    border: 1px solid #ccc;
    border-right-color: transparent;
    border-left-color: transparent;
  }
  .quantity button{
    width: 26rem/@size;
    height: 26rem/@size;
    font-size: 14rem/@size;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .quantity input{
    outline: none;
    border: none;
  }
  .quantity2{
    height: 40rem/@size;
    line-height: 20rem/@size;
    font-size: 13rem/@size;
    color: rgb(107, 107, 107);
    margin-top: 6.5rem/@size;
    text-align: left;
  }
  .quantity2 b{
    float: left;
  }
  .quantity2 i{
    color: rgb(204, 0, 0);
  }
  .promise img{
    width: 100%;
    height: 100%;
    border-top: 1px solid #ddd;
    vertical-align: bottom;
  }
  .promise{
    background: white;
    padding-top: 15rem/@size;
    margin-bottom: 10rem/@size;
  }
  .Menus div{
    line-height: 14rem/@size;
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 1.98% 5%;
    font-size: 13.8rem/@size;
    box-sizing: border-box;
  }
  .Menus div span{
    display: inline-block;
    width: 76rem/@size;
    height: 26rem/@size;
    line-height: 26rem/@size;
    border-radius: 15rem/@size;
  }
  .active{
    color: white;
    background: #89be48;
  }
  .jies{
    display: flex;
    flex-wrap: wrap;
  }
  .jies img{
    width: 100%;
    vertical-align: bottom;
  }
  .comment2{
    width: 100%;
    line-height: 30rem/@size;
    text-align: left;
    background: white;
    margin-top: 5rem/@size;
    font-size: 15rem/@size;
  }
  .comment2 span{
    display: inline-block;
    width: 5%;
    height: 30rem/@size;
    float: right;
    position: relative;
  }
  .comment2 span:after{
    content: "";
    width: 8px;
    height: 8px;
    display: block;
    border-style: solid;
    border-width: 2px 2px 0 0;
    border-color: #ccc;
    position: absolute;
    left: -4px;
    top: 50%;
    margin-top: -5px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
  .fixation{
    width: 100%;
    position: fixed;
    top: 48rem/@size;
    left: 0;
    z-index: 99;
  }
  .parameter{
    margin-top: 10rem/@size;
    text-align: left;
    margin-bottom: 500rem/@size;
  }
  .parameter li div{
    background: white;
    line-height: 35rem/@size;
    padding-left: 10rem/@size;
    color: #6b6b6b;
    border-top: 1px solid #ccc;
    font-size: 13.5rem/@size;
  }
  .remind{
    padding-top: 5rem/@size;
    line-height: 22rem/@size !important;
    margin-top: 10rem/@size;
    border: none !important;
  }
  .comment{
    text-align: left;
    background: white;
    font-size: 6.3rem/@size;
    margin-top: 6rem/@size;
    margin-bottom: 500rem/@size;
  }
  .comment li{
    border-bottom: 1px solid #ccc;
    padding: 10rem/@size 0 9rem/@size 5rem/@size;
  }
  .comment li>p{
    line-height: 22rem/@size;
  }
  .comment li>p span{
    color: silver;
  }
  .comment li>div{
    line-height: 18rem/@size;
  }
  .comment li>div:last-child{
    color: silver;
    margin-top: 1rem/@size;
  }
</style>
