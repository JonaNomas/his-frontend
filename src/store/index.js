import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    estaLoggeado: false,
    usuario: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      run: '',
      email: '',
      uid: '',
      permisos: []
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
    },
    setUsuario (state, usuario) {
      state.usuario.nombre = usuario.nombre
      state.usuario.apellidoPaterno = usuario.apellidoPaterno
      state.usuario.apellidoMaterno = usuario.apellidoMaterno
      state.usuario.run = usuario.run
      state.usuario.email = usuario.email
      state.usuario.uid = usuario.uid
      state.usuario.permisos = usuario.permisos
    },
    setEstaLoggeado (state, estaLoggeado) {
      state.estaLoggeado = estaLoggeado
    },
    cerrarSesion (state) {
      state.usuario.nombre = ''
      state.usuario.apellidoPaterno = ''
      state.usuario.apellidoMaterno = ''
      state.usuario.run = ''
      state.usuario.email = ''
      state.usuario.uid = ''
      state.usuario.permisos = []
      state.estaLoggeado = false

      router.push({ path: '/ingresar' })
      sessionStorage.removeItem('token')
    }
  },
  actions: {

  },
  modules: {
  }
})
