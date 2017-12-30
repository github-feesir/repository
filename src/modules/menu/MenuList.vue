<template>
  <!-- 电影菜单 -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <li v-for="(item,index) in pathInfo" :key="index">
            <router-link :to="item.url">{{item.content}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 电影展示区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pathInfo: {
      type: Array,
      default: () => [
        {
          url: '/movie/in_theaters',
          content: '正在热映'
        },
        {
          url: '/movie/coming_soon',
          content: '即将上映'
        },
        {
          url: '/movie/top250',
          content: 'top250'
        }
      ]
    }
  }
}
</script>