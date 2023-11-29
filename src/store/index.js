import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    estaLoggeado: true,
    usuario: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      run: '',
      email: '',
      foto: '',
      uid: ''
    },
    layout: {
      drawer: {
        visible: true,
        mini: false
      }
    }
  },
  getters: {
  },
  mutations: {
    invertirLayoutDrawerMini (state) {
      state.layout.drawer.mini = !state.layout.drawer.mini
    }
  },
  actions: {

  },
  modules: {
  }
})
