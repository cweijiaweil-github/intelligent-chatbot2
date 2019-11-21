<template>
  <div class="tile is-flex-mobile interactive-root">
    <input type="text" class="input is-primary interactive-text-box" v-model="draftText" @keypress="onKeyPress"
           v-tooltip="{
            content: 'Sending content cannot be empty!',
            show: isDraftEmpty,
            trigger: 'manual'
           }" placeholder="Please press Enter to send...">
    <a class="button is-primary interactive-btn-send" v-on:click="sendMessage">Send</a>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import Constant from '../../common/constants.json'

const avatarRobot = require('./../../assets/avatar_robot.jpg')
const avatarCustom = require('./../../assets/avatar_custom.jpg')

export default {
  name: 'interactive',
  data () {
    return {
      draftText: '',
      isDraftEmpty: false
    }
  },
  created () {
    this.initMessage()
    this.$root.event.$on('refresh-message', this.initMessage)
  },
  methods: {
    ...mapMutations(['post', 'setIsLoading', 'setContext', 'setSessionID']),
    onKeyPress: function (e) {
      if (e.keyCode === 13) {
        this.sendMessage()
        if (window.event) {
          e.returnValue = false
        } else {
          e.preventDefault()
        }
      }
    },
    sendMessage: function () {
      if (this.draftText) {
        const messages = this.$store.getters.getMessages
        messages.push({
          avatar: avatarCustom,
          text: this.draftText,
          date: new Date(),
          self: true
        })
        this.getAnswer(this.draftText)
        this.draftText = ''
      } else {
        this.isDraftEmpty = true
        Observable.timer(1500).subscribe(data => {
          this.isDraftEmpty = false
        })
      }
    },
    initMessage: function () {
      const messages = this.$store.getters.getMessages
      messages.splice(0, messages.length)
      this.setContext(null)
      this.getSessionID().then(data => {
        this.setSessionID(data.body.sessionID)
        this.getAnswer()
      })
    },
    getSessionID: function () {
      this.setIsLoading(true)
      return this.$http.post(Constant.api.path.sessionID)
    },
    getAnswer: function (question) {
      this.setIsLoading(true)
      this.$el.querySelector('input.interactive-text-box').blur()
      const params = {
        input: {
          token: Constant.api.token,
          device_id: this.$store.getters.getSessionID,
          question: question,
          context: this.$store.getters.getContext
        }
      }
      this.$http.post(Constant.api.path.chat, params).then(data => {
        this.setContext(data.body.context)
        this.$store.getters.getMessages.push({
          avatar: avatarRobot,
          text: data.body.answer,
          date: new Date()
        })
        this.setIsLoading(false)
        this.$el.querySelector('input.interactive-text-box').focus()
      })
    }
  }
}
</script>

<style>
  .interactive-root {
    background: white;
  }

  .interactive-btn-send {
    margin: 5px 5px 5px 0px;
  }

  .interactive-text-box {
    margin: 5px 5px 5px 5px;
  }
</style>
