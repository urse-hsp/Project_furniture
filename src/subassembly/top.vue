<template>
    <div class="top" @click="top" v-show="topBoole">

    </div>
</template>

<script>
    export default {
        name: "top",  //返回顶部
        data(){
          return{
            topBoole:false
          }
        },
        methods:{
          top(){
            this.auto = setInterval(function () {
              let top = document.body.scrollTop || document.documentElement.scrollTop;
              let speed = top / 4;
              if (document.body.scrollTop!=0) {
                document.body.scrollTop -= speed;
              }else {
                document.documentElement.scrollTop -= speed;
              }
            }, 10);
          },
          handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 1200){
              this.topBoole = true;
            }else{
              this.topBoole = false;
            }
            if (scrollTop <= 0) {clearInterval(this.auto);}
          }
        },
        mounted() {
          window.addEventListener('scroll', this.handleScroll);
      }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .top{
    width: 36rem/@size;
    height: 36rem/@size;
    background: url("../assets/top.png")no-repeat rgba(0,0,0,.8) center;
    background-size: 60%;
    position: fixed;
    right: 7rem/@size;
    bottom: 79rem/@size;
    border-radius: 50%;
    z-index: 500;
  }
</style>
