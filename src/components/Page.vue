<template>
    <div class="page" v-show="show">
        <div class="pagelist">
            <span class="jump-page" :class="{disabled:pstart}" @click="current_page--">上一页</span>
            <span class="jump" v-show="current_page>5" @click="jumpPage(1)">1</span>
            <span class="ellipsis" v-show="efont">...</span>
            <span class="jump" v-for="(num,index) in indexs" :key="index" :class="{bgprimary:current_page===num}" @click="jumpPage(num)">{{num}}</span>
            <span class="ellipsis" v-show="ebehind">...</span>
            <span class="jump-page" :class="{disabled:pend}" @click="current_page++">下一页</span>
            <span class="jump" v-show="current_page<pages-4" @click="jumpPage(pages)">{{pages}}</span>
            <span class="text-success">总共有{{totalNumber}}条相关信息</span>
        </div>
    </div>
</template>
<script>
import '../assets/css/page.css'
const pageComponent = {
  data () {
    return {
      current_page: 1
    }
  },
  computed: {
    show () {
      return this.pages && this.pages !== 1
    },
    pstart () {
      return this.current_page === 1
    },
    pend () {
      return this.current_page === this.pages
    },
    efont () {
      if (this.pages <= 7) return false
      return this.current_page > 5
    },
    ebehind () {
      if (this.pages <= 7) return false
      var nowAy = this.indexs
      return nowAy[nowAy.length - 1] !== this.pages
    },
    indexs () {
      var left = 1
      var right = this.pages
      var ar = []
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3
          right = Number(this.current_page) + 3
        } else {
          if (this.current_page <= 5) {
            left = 1
            right = 7
          } else {
            right = this.pages
            left = this.pages - 6
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    jumpPage (id) {
      this.current_page = id
    },
    sendCurrentPage () {
      this.$emit('current-page', this.current_page)
    }
  },
  created () {
    this.sendCurrentPage()
  },
  watch: {
    current_page: 'sendCurrentPage',
    $route () {
      this.current_page = 1
    }
  },
  props: ['totalNumber', 'pages']
}
export default pageComponent
</script>