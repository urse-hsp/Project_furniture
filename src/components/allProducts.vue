<template>
  <div>
    <headTitle>
      <span slot="title">全部产品</span>
    </headTitle>
    <div class="seek">
      <form>
        <input type="text" placeholder="搜索商品" :class="{seekGoods:boole}" @click="seek"/>
        <button class="btn" v-if="boole" @click="seek2">取消</button>
      </form>
    </div>
    <ul>
      <li v-for="item in str" class="classify">
          <h1>{{item.title}}</h1>
          <ul>
            <li v-for="item2 in item.category">
              <router-link :to="'/classify/'+item2.goodsId+'/'+item.classifyId">
                <img :src="item2.src"/>
                <p>{{item2.title}}</p>
              </router-link>
            </li>
          </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import {api} from "../api";
  import headTitle from '@/subassembly/headerTitle.vue'
  export default {
        name: "allProducts",
        data(){
          return{
            boole:false,
            str:[]
          }
        },
        methods:{
          seek(){
            this.boole = true;
          },
          seek2(){
            this.boole = false;
          }
        },
        mounted() {
          api.read('get','../../static/data.json').then(res=>{
            switch (res.code) {
                case 200:
                  res.subnav.filter((item,index)=>{
                    if(index>0){
                      this.str.push(item);
                    }
                  });
                break;
            }
          })
        },
        components:{
          headTitle
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .header{
    width: 100%;
    height: 48rem/@size;
    line-height:48rem/@size;
    background: #89be48;
  }
  .header-title {
    margin: 0 auto;
    font-size: 20rem/@size;
    text-align: center;
    color: #fff;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .seek{
    margin: 6rem/@size 0;
    display: flex;
    padding: 0 11rem/@size;
  }
  .seek form{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .seek input:first-child{
    width: 100%;
    height: 34rem/@size;
    text-align: center;
    background: white url("../assets/seek.png")no-repeat center;
    background-position-X: 36% ;
    background-size: 25rem/@size;
    border: none;
    border-radius: 5rem/@size;
    outline: none;
    font-size: 16rem/@size;
  }
  .btn{
    width: 15%;
    outline: none;
    border: none;
    background: transparent;
    color: #83b842;
    font-size: 15rem/@size;
    text-align: right;
  }
  .seekGoods {
    text-align: left !important;
    text-indent: .9rem;
    background-position-X: 1% !important;
  }
  .classify h1{
    font-size: 19rem/@size;
    line-height: 40rem/@size;
    margin-top: 21rem/@size;
    margin-bottom: 6rem/@size;
  }
  .classify ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: white;
  }
  .classify ul img{
    width: 61%;
    margin-top: 4.5rem/@size;
  }
  .classify ul li p{
    line-height: 25rem/@size;
    margin-top: 2rem/@size;
    font-size: 13rem/@size;
    color: #000;
  }
  .classify ul li{
    width: 33.3333%;
    border-right: 1rem/@size solid #f1f1f1;
    border-bottom: 1rem/@size  solid #f1f1f1;
    padding: 10rem/@size 0 20rem/@size;
  }
</style>
