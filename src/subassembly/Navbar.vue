<template>
    <ul class='footer' v-if="boole">
      <li v-for='item in Navbar'>
        <em v-if="item.path=='/shoppingTrolley'?true:false" v-show="$store.state.goods.length==0?false:true">
          <span>{{$store.state.goods.length}}</span>
        </em>
        <router-link :to="item.path" exact :class="{active:item.boole}">
          <img :src="item.boole==false?item.src:item.active"/>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
</template>

<script>
  import {api} from '../api'
  export default {
    name:"Navbar",  //底部导航
    data(){
      return{
        Navbar:[],
        boole:true,
      }
    },
    methods:{
      navhide(Path){
        Path=='/deploy'||Path.includes('/goodsDate/')|| Path=='/introduce'|| Path.includes('/classify/')
        || Path=='/login' ||Path=='/register'||Path=='/member'||Path.includes('/inner')||
        Path=='/joinIn'|| Path=='/myOrder'
          ? this.boole=false:this.boole=true;
      }
    },
    mounted(){
      this.quantity=this.$store.state.goods.length;
        api.read('get','../../static/Navbar.json').then(res=>{
          switch(res.code){
            case 200:
              this.Navbar = res.data;
            break;
          }
        })
    },
  created() {
      let path = this.$route.fullPath;
      this.navhide(path);
    },
    watch:{
        '$route':function (to,from) {
            let path = to.fullPath;
            this.Navbar.forEach(item=>{
                item.path == path?item.boole=true:item.boole=false;
            });
            this.navhide(path);
        }
    }
}
</script>

<style scoped lang="less">
  @size:37.5;
  .footer{
    width: 100%;
    height: 53.5rem/@size;
    border-top: 1px solid rgba(192,192,192,.5);
    display: flex;
    position: fixed;
    bottom: 0;
    background: white;
    left: 0;
    z-index: 55;
  }
  .footer li{
    position: relative;
    flex: 1;
  }
  .footer li em{
    position: absolute;
    right: 40%;
    top: 0;
    border: 1px solid #f59130;
    border-radius: 50%;
    transform: translateX(100%);
  }
  .footer li span{
    width: 17rem/@size;
    height: 17rem/@size;
    background: #f59130;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: 2px solid white;
    box-sizing: initial;
  }
  .footer li img{
    width: 21rem/@size;
    margin-bottom: 4rem/@size;
  }
  .footer li a{
      padding-top: 8rem/@size;
      color: #ababab;
  }
  .active{
    color: #009c42 !important;
  }
</style>
