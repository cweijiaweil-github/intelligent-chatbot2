<template>
  <div class="chat-root">
    <div class="columns is-gapless chat-box">
      <card class="column is-one-quarter"></card>
      <div class="column is-vertical chat-frame-right">
        <message></message>
        <interactive></interactive>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import Message from './Message.vue'
import Interactive from './Interactive.vue'

export default {
  name: 'chat',
  components: {
    Interactive,
    Message,
    Card
  },
  methods: {
    jumpToHistory: function () {
      this.$router.push('/history')
    }
  }
}
</script>

<style>
  .chat-root {
    padding: 30px;
    height: 100%;
    overflow: hidden;
  }

  .chat-box {
    max-width: 800px;
    margin: 0 auto!important;
    height:100%;
    border: 1px #8080804d solid;
    border-radius: 3px;
  }

  .chat-frame-right {
    width: 100%;
    height: 100%
  }

  @media (max-width: 768px) {
    .chat-root {
      padding: 0;
    }
  }
</style>
