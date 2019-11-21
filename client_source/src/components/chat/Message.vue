<template>
  <div class="is-vertical message-root" v-scroll-bottom="messages">
    <ul v-if="messages">
      <li v-for="(message, index) in messages" :key="index">
        <p class="time">
          <span>{{ message.date | time }}</span>
        </p>
        <div class="main" :class="{ self: message.self }">
          <img class="avatar" width="30" height="30" :src="message.avatar"/>
          <div class="text" v-html="message.text"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'message',
  methods: {
    jumpToHistory: function () {
      this.$router.push('/history')
    }
  },
  computed: {
    messages () {
      return this.$store.getters.getMessages
    }
  },
  filters: {
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
  },
  directives: {
    'scroll-bottom': {
      update: function (el) {
        Vue.nextTick(() => {
          el.scrollTop = el.scrollHeight - el.clientHeight
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .message-root {
    height: calc(100% - 46px);
    padding: 12px;
    background: #fafafa;
    overflow-y: auto;

    li {
      margin-bottom: 15px;
    }
    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~'calc(100% - 40px)';
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #f0f0f0;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #f0f0f0;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .message-root {
      height: calc(100% - 110px);
    }
  }
</style>
