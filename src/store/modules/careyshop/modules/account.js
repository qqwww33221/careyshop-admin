import util from '@/utils/util'
import request from '@/utils/request'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登陆
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     */
    login({ commit }, { vm, username, password }) {
      request({
        method: 'post',
        url: '/v1/admin/',
        params: {
          method: 'login.admin.user',
          platform: 'admin'
        },
        data: {
          username,
          password
        }
      })
        .then(res => {
          // 设置cookie
          util.cookies.set('uuid', res.data.admin.admin_id)
          util.cookies.set('token', res.data.token.token)
          // 设置info
          commit('careyshop/user/set', {
            name: res.data.admin.nickname,
            admin: res.data.admin,
            token: res.data.token
          }, { root: true })
          // 用户登陆后从持久化数据加载一系列的设置
          commit('load')
          // 跳转路由
          vm.$router.push({ name: 'index' })
        })
        .catch(err => {
          console.group('登陆结果')
          console.log('err: ', err)
          console.groupEnd()
          vm.$message.error('用户名或密码错误')
        })
    },
    /**
     * @description 注销用户并返回登陆页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ commit }, { vm, confirm = false }) {
      /**
       * @description 注销
       */
      function logout() {
        // 删除info
        commit('careyshop/user/set', {
          name: '',
          admin: {},
          token: {}
        }, { root: true })
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 跳转路由
        vm.$router.push({ name: 'login' })
      }
      // 判断是否需要确认
      if (confirm) {
        vm.$confirm('注销当前账户吗? ', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            logout()
          })
          .catch(() => {
          })
      } else {
        logout()
      }
    }
  },
  mutations: {
    /**
     * @description 用户登陆后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load(state) {
      // DB -> store 加载用户名
      this.commit('careyshop/user/load')
      // DB -> store 加载主题
      this.commit('careyshop/theme/load')
      // DB -> store 加载页面过渡效果设置
      this.commit('careyshop/transition/load')
      // DB -> store 持久化数据加载上次退出时的多页列表
      this.commit('careyshop/page/openedLoad')
      // DB -> store 持久化数据加载这个用户之前设置的侧边栏折叠状态
      this.commit('careyshop/menu/asideCollapseLoad')
    }
  }
}
