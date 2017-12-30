import MenuTemp from '../modules/menu/MenuList.vue'
import MovieList from '../modules/movie/MovieList.vue'
import ShowMusic from '../modules/music/ShowMusic.vue'
export default {
  mode: 'history',
  routes: [{
    path: '/movie',
    component: MenuTemp,
    props: {
      pathInfo: [
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
    },
    children: [
      {
        path: 'in_theaters',
        component: MovieList
      },
      {
        path: 'coming_soon',
        component: MovieList
      },
      {
        path: 'top250',
        component: MovieList
      },
      {
        path: '/',
        redirect: 'in_theaters'
      }
    ]
  }, {
    path: '/music',
    component: MenuTemp,
    props: {
      pathInfo: [
        {
          url: '/music/classic',
          content: '经典歌曲'
        },
        {
          url: '/music/rock',
          content: '中国摇滚'
        },
        {
          url: '/music/movie',
          content: '电影原声'
        }
      ]
    },
    children: [{
      path: 'rock',
      name: '/music/search?tag=中国摇滚',
      component: ShowMusic
    }, {
      path: 'classic',
      name: '/music/search?tag=经典',
      component: ShowMusic
    }, {
      path: 'movie',
      name: '/music/search?tag=电影原声',
      component: ShowMusic
    }, {
      path: '/',
      redirect: 'classic'
    }]
  }, {
    path: '*',
    redirect: '/movie'
  }]
}
