<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
import {addClass} from "common/js/dom"
export default{
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted(){
        setTimeout(()=>{
            this._SetSliderWidth();
            this._initSlider();
        },20)
    },
    methods:{
        //设置宽度,定义
        _SetSliderWidth(){
            this.children = this.$refs.sliderGroup.children;

            let width=0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                addClass(child,"slider-item");//给每个元素添加样式
                child.style.width = sliderWidth + "px";
                width += sliderWidth;//总宽度
            }
            if(this.loop){//如果循环轮播
                width += 2*sliderWidth;//在总宽度的基础上再加2个屏幕宽度
            }
            this.$refs.sliderGroup.style.width = width + "px";
        },
        //初始化 轮播图滚动
        _initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,//横向滚动
                scrollY: false,
                momentum: false,//当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画
                snap: true,//false 该属性是给 slider 组件使用的，普通的列表滚动不需要配置
                snapLoop: this.loop,//是否可以无缝循环轮播
                snapThreshold: 0.3,//用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
                snapSpeed: 400//轮播图切换的动画时间
            })
        },
    },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>