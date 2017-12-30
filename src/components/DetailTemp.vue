<template>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-show="showOrHide">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">{{item.title+'&nbsp;'+item.original_title+'&nbsp;('+item.year+')'}}</h4>
        </div>
        <div class="modal-body">
            <div class="media">
              <div class="media-left">
                <a href="#"><img class="media-object" :src="item.images.medium" :alt="item.title"></a>
              </div>
              <div class="media-body">
                <p>主演：{{item.casts | filterName}}</p>
                <p>导演：{{item.directors | filterName}}</p>
                <p>类型：{{item.genres.join('、')}}</p>
                <p>制片国家/地区：{{item.countries.join('、')}}</p>
                <p>又名：{{item.aka.join('、')}}</p>
                <div class="rating-self clearfix">
                  <h1 class="pull-left">{{item.rating.average}}</h1>
                  <div class="rating-right pull-left">
                    <p class="average-start"
                      :style="{backgroundPosition:'0 '+(10-Math.round(item.rating.average))*-15+'px'}"></p>
                    <p class="collect-count">{{item.ratings_count}}人评价</p>
                  </div>
                </div>
                <a :href="item.alt" target="_blank">想查看更多详情</a>
              </div>
            </div>
            <div class="media-footer">
              <h5>{{item.title+'的剧情简介 · · · · · ·'}}</h5>
              <div>{{item.summary}}</div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
        </div>
      </div>
      <load-effect :loading-data="showOrHide"></load-effect>
    </div>
  </div>
</template>
<script>
  import Loading from './Loading.vue'
  const movieDetailUrl = 'https://api.douban.com/v2/movie/subject/'
  const item = {
    images: {},
    genres: [],
    countries: [],
    aka: [],
    rating: {}
  }
  export default {
    name: 'myModal',
    data () {
      return {
        item: item,
        showOrHide: false
      }
    },
    methods: {
      getDetailData (id) {
        this.$set(this.$data, 'item', item)
        this.showOrHide = false
        this.$http.jsonp(
          movieDetailUrl + id
        ).then(res => {
          let datas = res.data
          let datasType = datas.constructor === Object
          let dataRes = res.status === 200 && datasType
          if (!dataRes) return
          this.showOrHide = true
          this.$set(this.$data, 'item', datas)
        }, err => {
          if (err) throw err
        })
      }
    },
    props: ['movieId'],
    watch: {
      movieId () {
        this.getDetailData(this.movieId)
      }
    },
    components: {
      'load-effect': Loading
    }
  }
</script>
