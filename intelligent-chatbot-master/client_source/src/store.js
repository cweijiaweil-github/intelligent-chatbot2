import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    isLoading: false,
    messages: [],
    sessionID: null,
    context: null
  },
  getters: {
    getIsLoading: state => {
      return state.isLoading
    },
    getMessages: state => {
      return state.messages
    },
    getContext: state => {
      return state.context
    },
    getSessionID: state => {
      return state.sessionID
    }
  },
  mutations: {
    setIsLoading (state, value) {
      state.isLoading = value
    },
    setSessionID (state, id) {
      state.sessionID = id
    },
    setContext (state, context) {
      state.context = context
    },
    post (state, data) {
      Vue.http({
        method: 'POST',
        url: data.url,
        params: data.data,
        emulateJSON: true
      }).then(function (success) {
        data.success(success.body)
      }, function (error) {
        data.error(error.body)
      })
    }
  }
})
