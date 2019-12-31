<template>
  <div class="join">
    <modalBox :title="title" :boole="hint"></modalBox>
      <div>
        <span><i class="el-icon-user"></i><br>客服</span>
      </div>
      <div>
        <router-link to="/">
          <span><i class="el-icon-house"></i><br>首页</span>
        </router-link>
      </div>
      <div class="vehicle">
        <router-link to="/shoppingTrolley" href="#">
          <i class="el-icon-shopping-cart-2"></i><span>{{$store.state.goods.length}}</span>
        </router-link>
      </div>
      <div class="btn"><button @click="join">加入购物车</button></div>
  </div>
</template>

<script>
  import modalBox from "../subassembly/modalBox";
    export default {
        name: "join", //信息添加栏
        props:['data','num'],
        data(){
          return{
            hint:false,
            title:"成功添加商品"
          }
        },
        methods:{
          join(){
            let data  = this.$store.state.goods;
            this.data.salesVolume = this.num;
            if(data.indexOf(this.data)==-1){
              this.$store.state.goods.push(this.data);
            }
            this.hint = true;
          }
        },
        updated() {
          if(this.hint==true){
            this.auto = setTimeout(()=>{
              this.hint = false
            },1000)
          }
        },
        beforeDestroy() {
          clearTimeout(this.auto);
        },
        components:{
          modalBox
        }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .join{
    width: 100%;
    height: 49rem/@size;
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    border-top: 1px solid #ddd;
    display: flex;
    z-index: 5;
  }
  .join>div{
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12rem/@size;
  }
  .join div i{
    font-size: 20rem/@size;
    margin-bottom: 2rem/@size;
  }
  .join a{
    display: inline-block;
    width: auto;
    height: auto;
  }
  .vehicle{
    width: 21% !important;
    margin-left: 8rem/@size;
  }
  .vehicle a{
    width: 100%;
    height: 39rem/@size;
    border: 1px solid #009d42;
    border-radius: 5rem/@size;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 13%;
    position: relative;
  }
  .vehicle a i{
    font-size: 23.5rem/@size;
    color: #009d42;
  }
  .vehicle a span{
    display: inline-block;
    width: 20rem/@size;
    height: 20rem/@size;
    line-height: 20rem/@size;
    background: #f60;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: 50%;
    right: 15%;
    transform: translateY(-50%);
  }
  .join button{
    width: 168.5rem/@size;
    height: 82%;
    border: none;
    background: #009d42;
    color: white;
    font-size: 16rem/@size;
    border-radius: 5rem/@size;
    cursor: pointer;
  }
  .btn{
    width: 53% !important;
  }
</style>
