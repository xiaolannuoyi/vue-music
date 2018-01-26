<template>
  <scroll  class="listview" :data="data" ref="listview" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
     <ul>
       <li v-for="group in data" :key="group.id" class="list-group" ref="listGroup">
         <h2 class="list-group-title">{{group.title}}</h2>
         <ul >
           <li v-for="item in group.items" :key="item.id" class="list-group-item">
             <img class="avatar" v-lazy="item.avatar" alt="">
             <span class="name">{{item.name}}</span>
           </li>
         </ul>
       </li>
     </ul>
     <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
       <ul>
         <li v-for="(item,index) in shortcutList" :class="{'current' : currentIndex===index}" :data-index="index" :key="item.id" class="item">{{item}}</li>
       </ul>
     </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll"
import {getData} from "common/js/dom"

const ANCHOR_HEIGHT=18//侧边一个元素的高度
export default {
  data(){
    return {
      scrollY:-1,
      currentIndex:0,
    }
  },
  created(){
    this.touch={}//定义这个数据,是为了两个方法传值(方便onShortcutTouchStart和onShortcutTouchMove来传递值).data和props的数据都会有get和set方法,会被监听,我们不需要监听,只是为了传值
    this.listenScroll  =true;
    this.listHeight = [];
    this.probeType =3
  },
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  computed:{
    shortcutList(){
      return this.data.map((group)=>{
        return group.title.substr(0,1)
      })
    }
  },
  methods:{
    onShortcutTouchStart(e){
      let firstTouch = e.touches[0];
      this.touch.y1=firstTouch.pageY;
      let authorIndex = getData(e.target, 'index');//获取到data-index的值
      this.touch.authorIndex = authorIndex;//开始位置的索引值
      //console.log(typeof authorIndex)//string
      this._scrollTo(authorIndex)
    },
    onShortcutTouchMove(e){
      let firstTouch = e.touches[0];
      this.touch.y2=firstTouch.pageY;
      let detla = (this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT | 0;//移动数量//number | 0可以向下取整
      let authorIndex =parseInt(this.touch.authorIndex) + detla;//结束位置的索引
      this._scrollTo(authorIndex)
    },
    _scrollTo(index){
      if(!index && index !== 0){
        return
      }
      if(index<0){
        index = 0
      }
      if(index>this.listHeight.length){
        index = this.listHeight - 2
      }
      this.scrollY = -this.listHeight[index]//滚动到哪个位置,就定位到什么位置
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)//滚动到那个元素位置,动画时间为0
    },
    scroll(pos){
      this.scrollY = pos.y;
    },
    _calculateHeight(){//计算高度
      this.listHeight = [];//把每个块的高度放在数组里
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height)
      for(let i=0;i<list.length;i++){
        let item = list[i];
        height +=item.clientHeight;
        this.listHeight.push(height)
      }
      //console.log(this.listHeight)
    }

  },
  watch :{
    data(){
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY(newY){
      console.log("newY",newY)//newY是鼠标向上滑动的值,所以他本身是负值,所以-newY是正值
      const listHeight = this.listHeight;
      //当滚动到顶部,newY>0
      if(newY>0){
        this.currentIndex = 0
        return
      }
      //当滚动到中间部分
      for (let i = 0;i< listHeight.length - 1;i++){
        let height1 = listHeight[i];
        let height2 = listHeight[i+1]; //获取两个相邻块之间的距离
        console.log("height1",height1,"------height2",height2,"+++++++++++-newY",-newY)
        if(-newY >= height1 && -newY < height2){ //上线要有等于
          this.currentIndex= i;
          return 
        }
      }
      //当滚动到底部
      this.currentIndex = listHeight.length-2
      
        

    }
  },
  components:{
    Scroll
  }

}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
