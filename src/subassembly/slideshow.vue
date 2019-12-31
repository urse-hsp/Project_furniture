<template>
    <div>
      <swiper :options="swiperOption" v-if="res.length>1">
        <swiper-slide v-for="(item,index) in res">
          <a href="#"><img :src="item.src"/></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
    export default {
      name: "slideshow",//轮播图
      props:['res'],
      data(){
        return{
          slideshow:[],
          swiperOption: {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable :true,
            },
            autoplay: {
              delay: 1500,
              stopOnLastSlide: false,
              disableOnInteraction: false
            }
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .slideshow{
    width: 100%;
    height: 250rem/@size;
    margin-bottom: 12rem/@size;
  }
  img{ width: 100%; }
</style>
