import { version } from '../package.json'

const setting = {
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        meta: {
          title: '首页',
          requiresAuth: false
        }
      }
    ]
  },
  // 版本
  releases: {
    version: version,
    api: 'https://api.github.com/repos/dnyz520/careyshop/releases/latest'
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: '经典色',
        name: 'careyshop',
        preview: 'image/theme/careyshop/preview@2x.png'
      },
      {
        title: '简约线条',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      {
        title: '海岸',
        name: 'coastal',
        backgroundImage: 'image/theme/coastal/bg.jpg',
        preview: 'image/theme/coastal/preview@2x.png'
      },
      {
        title: '小镇',
        name: 'town',
        backgroundImage: 'image/theme/town/bg.jpg',
        preview: 'image/theme/town/preview@2x.png'
      },
      {
        title: '星空',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'Ghost',
      admin: {},
      token: {}
    }
  }
}

export default setting
