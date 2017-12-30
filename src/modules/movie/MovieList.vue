  <!-- 电影展示 -->
<template>
  <div id="movie">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" v-show="showOrHide">
      <h2 class="sub-header">{{movieTitle}}</h2>
      <div class="table-responsive">
        <ul class="media-list">
          <li class="media" v-for="(item,index) of currentdata" :key="index">
            <div class="media-left movie-media">
              <a href="#"><img class="media-object" :src="item.images.small" :alt="item.images.small"></a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">{{movieIndex(index)+'.'+item.title}}</h4>
              <p>原名：{{item.original_title}}</p>
              <p>主演：{{item.casts|filterName}}</p>
              <p>导演：{{item.directors|filterName}}</p>
              <p>
                <span>{{item.year}}</span>
                <span>{{item.genres.join('、')}}</span>
                <span class="start average-start" :style="{backgroundPosition:'0 '+(10-Math.round(item.rating.average))*-11+'px'}"></span>
                <span class="badge">{{item.rating.average}}</span>
                <span>&nbsp;({{item.collect_count}}人收藏)</span>
              </p>
              <a href="#" data-toggle="modal" data-target="#myModal" @click.prevent="sendId(item.id)">查看详情</a>
            </div>
          </li>
        </ul>
      </div>
      <page-list
       :total-number="movieTotal"
       :pages="movieTotalPage" 
       @current-page="getCurrentPage"></page-list>
    </div>
    <load-effect :loading-data="showOrHide"></load-effect>
    <movie-detail :movie-id="itemId"></movie-detail>
  </div>
</template>
<script>
import Loading from '../../components/Loading'
import Page from '../../components/Page.vue'
import DetailTemp from '../../components/DetailTemp.vue'
const count = 10
const dataUrl = 'https://api.douban.com/v2'
export default {
  name: 'movie',
  data () {
    return {
      currentdata: [],
      movieTitle: '',
      showOrHide: false,
      movieTotal: 0,
      currentPageIndex: 1,
      itemId: 0
    }
  },
  computed: {
    movieTotalPage () {
      return this.movieTotal % count === 0
        ? this.movieTotal / count
        : Math.ceil(this.movieTotal / count)
    },
    startNum () {
      return (this.currentPageIndex - 1) * count
    }
  },
  methods: {
    getMovieData () {
      this.showOrHide = false
      this.$http({
        url: dataUrl + this.$route.path,
        method: 'jsonp',
        jsonp: 'callback',
        params: {
          start: this.startNum,
          count: count
        }
      }).then(function (res) {
        let datas = res.data
        let datasType = datas.subjects instanceof Array
        let dataRes = res.status === 200 && datasType
        if (!dataRes) return
        this.currentdata = datas.subjects
        this.movieTitle = datas.title
        this.movieTotal = datas.total
        this.showOrHide = true
      }, (err) => {
        if (err) throw err
      })
    },
    getCurrentPage (pageIndex) {
      this.currentPageIndex = pageIndex
    },
    movieIndex (index) {
      return index < 9 ? '0' + (this.startNum + index + 1) : (this.startNum + index + 1)
    },
    sendId (id) {
      this.itemId = id
    }
  },
  created () {
    this.getMovieData()
  },
  watch: {
    $route: 'getMovieData',
    currentPageIndex: 'getMovieData'
  },
  components: {
    'load-effect': Loading,
    'page-list': Page,
    'movie-detail': DetailTemp
  }
}
</script>