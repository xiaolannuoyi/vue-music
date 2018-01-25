<template>
  <div>
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from 'api/config'
import {getSingerList} from 'api/singer'
import Singer from "common/js/singer"
import ListView from "base/listview/listview"
const HOT_NAME= '热门'
const HOT_SINGER_LEN=10

  export default {
    data(){
      return{
        singers:[]
      }
    },
    created(){
      this._getSingerList();
    },
    methods:{
      _getSingerList(){
        getSingerList().then((res)=>{
          if(res.code===ERR_OK){
            this.singers = this._normalizeSinger(res.data.list);
            //console.log(this.singers)
            console.log(this._normalizeSinger(res.data.list));
          }
        })
      },
      //将得到的数据,进行分类
       _normalizeSinger(list){
         let map={
           hot:{
             title:HOT_NAME,
             items:[],
           }
         }

         //对获取到的数据列表,进行分类,把前10个当作hot ,其他的字母一样的放到一个字母下.
         list.forEach((item,index) => {
           if(index < HOT_SINGER_LEN){
            //  map.hot.items.push({
            //    id : item.Fsinger_mid,
            //    name : item.Fsinger_name,
            //    avatar : 'https://y.gtimg.cn/music/photo_new/T001R300x300M000${{item.Fsinger_mid}}.jpg?max_age=2592000'
            //  })
            map.hot.items.push(new Singer({
              id : item.Fsinger_mid,  //图片链接里的一部分地址
              name : item.Fsinger_name //singer姓名
            }))
           }
           const key = item.Findex;
           if(!map[key]){
             map[key]={
               title : key,
               items : []
             }
           }
          //  map[key].push({
          //      id : item.Fsinger_mid,
          //      name : item.Fsinger_name,
          //      avatar : 'https://y.gtimg.cn/music/photo_new/T001R300x300M000${{item.Fsinger_mid}}.jpg?max_age=2592000'
          //    })
          map[key].items.push(new Singer({
              id : item.Fsinger_mid,
              name : item.Fsinger_name
          }))
         });
         console.log(map)
         
         //为了得到有序列表,我们需要排序map
        let hot = [];//热门数据
        let ret = [];//A-Z数据
        for(let key in map){
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title===HOT_NAME){
            hot.push(val);
          }
        }

        //对ret 里的数据进行排序
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0); 
        })
        return hot.concat(ret);

       }
    },
    components:{
      ListView
    }
    
   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 
</style>