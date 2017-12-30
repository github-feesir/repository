  <!-- 音乐展示 -->
<template id="music">
  <div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" v-show="showOrHide">
      <div class="table-responsive">
        <ul class="media-list">
          <li class="media" v-for="(item,index) in currentdata" :key="index">
            <div class="media-left">
              <a href="#/"><img class="media-object" :src="item.image" :alt="item.image"></a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">{{item.title}}</h4>
              <p>作者：{{item.author | filterName}}&nbsp;&nbsp;&nbsp;&nbsp;演唱者：{{singerData(item.attrs.singer)}}</p>
              <p>豆瓣音乐标签：{{item.tags | filterName}}</p>
              <p>
                <span class="start" :style="{backgroundPosition:'0 '+(10-Math.round(item.rating.average))*-11+'px'}"></span>
                <span class="badge average-start">{{item.rating.average}}</span>
                <span>({{item.rating.numRaters}}人评价)</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <page-list
       :total-number="musicTotal"
       :pages="musicTotalPage" 
       @current-page="getCurrentPage"></page-list>
    </div>
    <load-effect :loading-data="showOrHide"></load-effect>
  </div>
</template>
<script>
import Loading from '../../components/Loading'
import Page from '../../components/Page.vue'
const count = 10
const dataUrl = 'https://api.douban.com/v2'
const music = {
  data () {
    return {
      currentdata: [],
      showOrHide: false,
      musicTotal: 0,
      currentPageIndex: 1
    }
  },
  computed: {
    musicTotalPage () {
      return this.musicTotal % count === 0
        ? this.musicTotal / count
        : Math.ceil(this.musicTotal / count)
    },
    startNum () {
      return (this.currentPageIndex - 1) * 10
    }
  },
  methods: {
    getMusicData () {
      this.showOrHide = false
      this.$http({
        url: dataUrl + this.$route.name,
        method: 'jsonp',
        jsonp: 'callback',
        params: {
          start: this.startNum,
          count: count
        }
      }).then(function (res) {
        if (res.status === 200) {
          this.currentdata = res.data.musics
          this.showOrHide = true
          this.musicTotal = res.data.total
        }
      })
    },
    getCurrentPage (pageIndex) {
      this.currentPageIndex = pageIndex
    },
    singerData (item) {
      return item instanceof Array ? item.join('/') : '未知'
    }
  },
  created () {
    this.getMusicData()
  },
  watch: {
    $route: 'getMusicData',
    currentPageIndex: 'getMusicData'
  },
  components: {
    'load-effect': Loading,
    'page-list': Page
  }
}
export default music
</script>