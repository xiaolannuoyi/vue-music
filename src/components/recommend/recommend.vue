<template>
  <div class="recommend">
      <scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
          <div v-if="this.recommends.length" class="slider-wrapper">
            <slider>
                <div v-for="items in recommends" :key="items.id">
                   <a :href="items.linkUrl">
                      <img @load="loadImage" :src="items.picUrl" alt="">
                   </a>
                </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in discList" class="item" :key="item.id">
                <div class="icon">
                  <img height="60" width="60" v-lazy="item.imgurl" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import loading from "base/loading/loading"
import Scroll from "base/scroll/scroll"
import Slider from "base/slider/slider"
import {ERR_OK} from 'api/config'
import {getRecommend,getDiscList} from 'api/recommend'

  export default {
    data(){
      return{
        recommends:[],
        discList:[]
      }
    },
    components:{
      Slider,Scroll,loading
    },
    created(){
      // setTimeout(()=>{
      //   this._getRecommend();
      // },2000)
      this._getRecommend();
      this._getDiscList();
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res)=>{
          if(res.code===ERR_OK){
            //console.log(res.data.slider);//返回接口数据
            this.recommends = res.data.slider;
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list);//返回接口数据
            this.discList=res.data.list
          }
        })
      },
      loadImage(){
        if(!this.checkloaded){
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      }
    },
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>