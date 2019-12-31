<template>
    <div :class="{wrap:true,wrapTop:!account}">
      <headTitle>
        <img src="../assets/login.png" alt="" slot="left" @click="login"/>
        <span slot="title">购物车</span>
        <span slot="right"><a @click="Delete"><img src="../assets/amend.png" class="amend"/>{{amendTitle}}</a></span>
      </headTitle>
        <div class="shortcut" v-show="account">
          <router-link to="/login">登录</router-link> <span>你可以在登录后同步电脑与手机购物车中的商品</span>
        </div>
        <div :class="{convert:true,convertTop:!account}">
          <div>
            <input type="text" placeholder="礼品兑换处，请输入兑换码"/> <button>兑换</button>
          </div>
        </div>
      <div class="goods" v-if="boole">
        <div><img src="../assets/vehicle.png"/></div> <p>您的购物车还是空荡荡的</p>
        <router-link to="/">赶紧去逛逛</router-link>
      </div>

      <section v-else>
        <div class="discount">
          <p><a href="#"><span>全场满折</span>3件9折，4件88折，5件85折<i class="el-icon-arrow-right"></i></a></p>
        </div>
        <ul class="materials">
          <li v-for="(item,index) in quantity" class="Goods">
            <div class="choose">
              <span @click="designate(index)" :class="{active:true,activeBack:item.new}">
                <i class="el-icon-check" v-show="item.new"></i>
              </span>
            </div>
            <router-link :to="'/goodsDate/'+item.goodsId"><img :src="item.src" /></router-link>
              <div class="details">
                <div class="delete" v-show="!amend" @click="expurgate(index)"><img src="../assets/delete.png"/></div>
                <h3>
                  <router-link :to="'/goodsDate/'+item.goodsId">{{item.strollName}}</router-link>
                  <em v-show="amend">￥{{item.price*item.salesVolume}}</em>
                </h3>
                <p><router-link :to="'/goodsDate/'+item.goodsId"><div v-show="amend">{{item.trait}}</div></router-link></p>
                <div><span><span v-if="item.gift">{{item.gift}}</span></span><em v-show="amend">x {{item.salesVolume}}</em></div>
                <div class="quantity" v-show="!amend">
                  <button @click="count(index,-1)"><i class="el-icon-minus"></i></button>
                  <em>{{item.salesVolume}}</em>
                  <button @click="count(index,1)"><i class="el-icon-plus"></i></button>
                </div>
              </div>
          </li>
        </ul>
        <div class="site">
          <em>送至：</em>
          <span>北京<i class="el-icon-arrow-down"></i></span>
          <div>
            <p>北京￥99包邮</p>
            <p>你还差<em>￥70</em>，即可享受<em>免运费</em></p>
          </div>
        </div>
      </section>

      <div class="recommend">
        <div class="title">Rico.S为你精心推荐</div>
        <div :class="{recommend:true,recommendMargin:!boole}">
          <swiper :options="swiperOption" class="slideshow">
            <swiper-slide v-for="(item,index) in recommend">
              <router-link :to="'/goodsDate/'+item.goodsId">
                <img :src="item.src"/><p>{{item.strollName}}</p><p>￥{{item.price}}</p>
              </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="compute" v-if="!boole">
          <div class="checkAll">
            <div><span :class="{active:checkAll}" @click="CheckAll"><i class="el-icon-check" v-show="checkAll"></i></span> 全选</div>
          </div>
          <div class="count">
            <p>合计：<em>￥{{totalPrice}}</em></p> <p>商品 ￥{{totalPrice}} - 优惠 ￥{{0}}</p>
          </div>
          <div :class="{closeAnAccount:true,account:closeAnAccount,account2:!amend}" @click="btn">
            {{close}} <span v-show="amend">({{changNum}})</span>
          </div>
      </div>
    </div>
</template>

<script>
  import {api} from "../api";
  import headTitle from '@/subassembly/headerTitle.vue'
    export default {
        name: "shoppingTrolley",
        data(){
          return{
            recommend:[],
            quantity:[],
            boole:true,
            checkAll:false,
            closeAnAccount:false,
            changNum:0,
            account:true,
            amend:true,
            amendTitle:"修改",
            close:"去结算",
            swiperOption: {
              slidesPerView: 3.5,
              spaceBetween: 30,
              freeMode: true,
              pagination: {
                el: '.swiper-scrollbar',
                clickable: true
              }
            }
          }
        },
        methods:{
          login(){
            this.$router.go(-1);
          },
          designate(index){
            this.quantity[index].new=!this.quantity[index].new;
            this.changBack();
            this.changnum();
            this.checkAll = this.quantity.every(item=>{
              return item.new==true
            });
          },
          CheckAll(){
              this.checkAll = !this.checkAll;
              this.quantity.forEach(item=>{
                this.checkAll==true?item.new = true:item.new = false;
              });
              this.changBack();
              this.changnum();
          },
          changBack(){
            this.closeAnAccount = this.quantity.some(item =>{
              return item.new == true
            })
          },
          changnum(){
            let num = 0;
              this.quantity.forEach(item=>{
                if (item.new == true){
                  num += 1
                }else if (num<0){
                   num = 0
                }
              });
              this.changNum = num;
          },
          Delete(){
            this.amend = !this.amend;
            if(this.amend==false){
              this.amendTitle = '完成';
              this.close = '删除';
            }else {
              this.amendTitle = '修改';
              this.close = '去结算';
            }
          },
          count(index,data){
            this.quantity[index].salesVolume += data;
            if(this.quantity[index].salesVolume <1) this.quantity[index].salesVolume = 1;
          },
          expurgate(index){
            this.$store.state.goods.splice(index,index+1);
            this.$store.state.goods.length<=0?this.boole = true:this.boole = false;
          },
          btn(){
            if(this.amend==false){
              this.quantity.forEach((item,index)=>{
                  if(this.checkAll==true){
                    this.$store.state.goods.splice(index,index+100);
                  }else if(item.new==true){
                    this.$store.state.goods.splice(index,index+1);
                  }
              })
            }else if(this.closeAnAccount==true){
              this.$router.push({path:'/win'}); //
            }
          }
        },
        mounted() {
          this.quantity = this.$store.state.goods;
          this.quantity.forEach(item=>{
            item.new = false;
          });
          if(this.$store.state.goods.length>0){
            this.boole = false
          }else {
            this.boole = true
          }

          api.read('get','../../static/data.json').then(res=>{
            this.recommend = res.recommend;
          });

          let user = localStorage.getItem('furniture');
          if(user){
            this.account = false
          }
        },
        computed:{
          totalPrice(){
            let  num = 0;
            this.quantity.forEach(item=>{
              if(item.new==true){
                num += parseInt(item.price * item.salesVolume);
              }
            });
            return num;
          }
        },
        components:{
          headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  input::-webkit-input-placeholder {
    color: rgba(192,192,192,.9);
  }
  .wrap{
    padding-top: 103rem/@size;
  }
  .wrapTop{
    padding-top: 51.5rem/@size;
  }
  .shortcut{
    width: 100%;
    height: 51.5rem/@size;
    background-color: #f0fae6;
    display: flex;
    align-items: center;
    padding: 0 10rem/@size;
    position: fixed;
    top: 48rem/@size;
    left: 0;
    z-index: 5;
  }
  .shortcut a{
    box-sizing: border-box;
    width: 70rem/@size;
    height: 33.2rem/@size;
    line-height: 33.2rem/@size;
    background-color: white;
    border: 1rem/@size solid #8bc146;
    font-size: 15rem/@size;
    color: #88c13e;
  }
  .shortcut span{
    margin-top: 2rem/@size;
    font-size: 13.8rem/@size;
    text-align: left;
    margin-left: 12rem/@size;
    padding-right: 5rem/@size;
    line-height: 18rem/@size;
  }
  .convert{
    width: 100%;
    height: 51.5rem/@size;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 99.5rem/@size;
    left: 0;
    z-index: 5;
    border-bottom: 1px solid rgba(192,192,192,.7);
  }
  .convertTop{
    top: 49.75rem/@size;
  }
  .convert div{
    width: 94%;
    height: 71%;
    display: flex;
  }
  .convert input{
    width: 80%;
    height: 36rem/@size;
    border: 1px solid rgba(192,192,192,.8);
    outline: none;
    border-right-color: transparent;
    box-sizing: border-box;
    text-align: center;
    font-size: 12rem/@size;
  }
  .convert button{
    outline: none;
    box-sizing: border-box;
    width: 20%;
    height: 36rem/@size;
    background: white;
    border: 1px solid #6fbd00;
    color: #6fbd00;
    font-size: 15rem/@size;
  }
  .goods{
    width: 100%;
    height: 239rem/@size;
  }
  .goods img{
    width: 160rem/@size;
    margin-left: 24rem/@size;
    margin-top: 11rem/@size;
  }
  .goods p{
    font-size: 18rem/@size;
    margin-top: 3rem/@size;
    margin-bottom: 10rem/@size;
  }
  .goods a{
    width: 118rem/@size;
    height: 34rem/@size;
    line-height: 34rem/@size;
    border: 1px solid rgb(137, 190, 72);
    border-radius: 6rem/@size;
    font-size: 16rem/@size;
    color: rgb(137, 190, 72);
  }
  .recommend{
    margin-top: 9rem/@size;
    background-color: white;
    padding:3rem/@size 0;
  }
  .recommendMargin{
    margin-bottom: 20rem/@size;
  }
  .recommend .title{
    font-size: 16rem/@size;
    text-align: left;
    padding: 9.6rem/@size 11.3rem/@size;
    line-height: 23rem/@size;
    border-bottom: 1px solid rgba(192,192,192,.8);
  }
  .slideshow div img {
    width: 100%;
  }
  .slideshow p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: left;
    color: #000;
    font-weight: 400;
    font-size: 12rem/@size;
    margin-top: 3rem/@size;
  }
  .slideshow p:last-child{
    line-height: 30rem/@size;
  }
  .swiper-wrapper>div{
    width: 98rem/@size!important;
    margin: 0 7rem/@size !important;
    font-size: 14.4rem/@size;
  }
  .materials li{
    width: 100%;
    padding-top: 5rem/@size;
    padding-bottom: 13rem/@size;
  }
  .materials a{
    width: auto;
    height: auto;
  }
  .Goods{
    display: flex;
  }
  .wrap section{
    background: white;
    padding-bottom: 12rem/@size;
  }
  .Goods .choose{
    width: 12.5%;
    position: relative;
  }
  .Goods .choose span{
    display: inline-block;
    width: 21rem/@size;
    height: 21rem/@size;
    border: 1px solid #666;
    border-radius: 50%;
    position: absolute;
    left: 48%;
    top: 50%;
    transform: translate(-50%,-20%);
  }
  .activeBack{
    border: 1px solid transparent !important;
  }
  .active i{
    display: inline-block;
    width: 21rem/@size;
    height: 21rem/@size;
    line-height: 19.5rem/@size;
    border-radius: 50%;
    color: white;
    background: #6fbd00;
    position: absolute;
    left: 50%;
    top: 51%;
    transform: translate(-50%,-50%);
    font-size: 17rem/@size;
  }
  .Goods a img{
    width: 75rem/@size;
    height: 75rem/@size;
    margin: 5rem/@size 15rem/@size 5rem/@size 0;
  }
  .details{
    width: 62%;
    text-align: left;
    padding: 7rem/@size 5rem/@size 7rem/@size 0;
    position: relative;
  }
  .details>h3{
    font-size: 14rem/@size;
    display: flex;
    justify-content: space-between;
  }
  .details>h3 a{
    color: #4a4a4a;
  }
  .details>P{
    margin-top: 12rem/@size;
    margin-bottom: 10rem/@size;
    font-size: 12.5rem/@size;
    color: #9b9b9b;
  }
  .details>div{
    display: flex;
    justify-content: space-between;
    font-size: 13rem/@size;
    text-align: left;
  }
  .details>div>span>span{
    color: #cb0101;
    border: 1px solid #ab2c2b;
    padding: 3rem/@size 3rem/@size;
  }
  .materials{
    border-bottom: 1px solid rgba(192,192,192,.3);
  }
  .discount{
    text-align: left;
    padding: 6rem/@size 11.5rem/@size;
    border-bottom: 1px solid rgba(192,192,192,.3);
  }
  .discount a{
    line-height: 36rem/@size;
    width: auto;
  }
  .discount span{
    background-color: #ab2c2b;
    color: white;
    padding: 4rem/@size 5rem/@size;
    margin-right: 10rem/@size;
  }
  .site{
    text-align: left;
    padding: 12rem/@size 11.2rem/@size 6rem/@size;
    border-bottom: 1px solid rgba(192,192,192,.3);
    display: flex;
    align-items: center;
  }
  .site>em{
    font-size: 14rem/@size;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .site span{
    width: 55rem/@size;
    height: 27rem/@size;
    line-height: 28rem/@size;
    border: 1px solid #cdcdcd;
    font-size: 13rem/@size;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem/@size;
  }
  .site span i{
    font-size: 16rem/@size;
  }
  .site>div{
    line-height: 17rem/@size;
    margin-left: 5rem/@size;
  }
  .site>div>p:last-child{
    color: #9b9b9b;
  }
  .site>div>p:last-child em{
    color: #cc0000;
  }
  .compute{
    display: flex;
    width: 100%;
    height: 50rem/@size;
    background: white;
    position: fixed;
    left: 0;
    bottom: 53.1rem/@size;
    border-top: 1px solid rgba(192,192,192,.3);
    z-index: 50;
  }
  .checkAll{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkAll>div{
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checkAll span{
    display: inline-block;
    width: 21rem/@size;
    height: 21rem/@size;
    border: 1px solid #666;
    border-radius: 50%;
    position: relative;
  }
  .count{
    width: 50%;
    text-align: right;
    padding-top: 5rem/@size;
    padding-right: 8rem/@size;
  }
  .count p{
    line-height: 20rem/@size;
  }
  .count p:first-child{
    font-size: 15rem/@size;
  }
  .count p:first-child em{
    color: #ab2c2b;
    margin-left: 5rem/@size;
  }
  .closeAnAccount{
    width: 30%;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17rem/@size;
    color: rgba(255,255,255,.6);
    letter-spacing: 2rem/@size;
  }
  .closeAnAccount span{
    font-size: 14rem/@size;
    margin-left: 5rem/@size;
  }
  .account{
    background-color: #8ec351;
    color: rgba(255,255,255,.9);
  }
  .account2{
    background-color: #ab2c2b;
    border-color: #ab2c2b;
  }
  .amend{
    width: 33rem/@size!important;
    height: 33rem/@size!important;
    position: absolute;
    left: -21rem/@size;
    top: 45% !important;
    transform: translateY(-50%);
  }
  .delete{
    position: absolute;
    right: 10rem/@size;
    top: 10rem/@size;
  }
  .delete img{
    width: 16rem/@size;
    height: 17rem/@size;
  }
  .quantity{
    width: 104rem/@size;
    height: 28rem/@size;
    line-height: 28rem/@size;
    border: 1px solid #6fbd00;
    color: #6fbd00;
    position: absolute;
    right: 3rem/@size;
    bottom: 5rem/@size;
    border-radius: 3rem/@size;
  }
  .quantity button{
    border: none;
    width: 35%;
    background: white;
    border-radius: 3rem/@size;
    outline: none;
  }
  .quantity button i{
    color: #6fbd00;
  }
  .quantity em{
    width: 40rem/@size;
    text-align: center;
    border-right: 1px solid #6fbd00;
    border-left: 1px solid #6fbd00;
  }
</style>
