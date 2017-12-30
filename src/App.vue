<template>
  <div id="app" v-cloak>
    <!-- 顶部通栏 -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><img src="/static/images/logo_db.png" alt=""></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/movie">豆瓣电影</router-link>
            </li>
            <li>
              <router-link to="/music">豆瓣音乐</router-link>
            </li>
            <li>
              <a href="https://developers.douban.com/wiki/?title=api_v2" target="_blank">Welcome</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 电影、音乐展示区域 -->
    <router-view></router-view>
  </div>
</template>

