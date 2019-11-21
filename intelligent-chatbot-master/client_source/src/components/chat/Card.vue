<template>
  <div class="card-root">
    <div class="columns is-marginless is-mobile is-multiline is-inline-tablet">
      <header class="column is-half-mobile is-full-tablet">
        <img class="avatar" width="40" height="40" alt="XiaoMei" src="../../assets/avatar_custom.jpg">
        <p class="name">XiaoMei</p>
        <a href="https://xiaomei4.mybluemix.net/" class="button">English</a>
        <a href="https://xiaomei2.mybluemix.net/" class="button">Japanese</a>
        <a href="https://xiaomei3.mybluemix.net/" class="button">Chinese</a>
      </header>
      <footer class="column is-half-mobile is-full-tablet has-text-right">
        <div class="columns is-marginless is-multiline is-inline-flex-mobile">
          <div class="column is-full-tablet card-btn-function-gapless">
            <a class="button is-primary is-small is-size-6-mobile card-btn-function card-btn-function-right" v-on:click="refresh">
              <span class="fas fa-sync-alt"></span>
              <span class="card-btn-function-text">Refresh</span>
            </a>
          </div>
          <!--<div class="column is-full-tablet card-btn-function-gapless">-->
            <!--<a class="button is-primary is-small is-size-6-mobile card-btn-function" v-on:click="jumpToHistory">-->
              <!--<span class="fas fa-history"></span>-->
              <!--<span class="card-btn-function-text">History</span>-->
            <!--</a>-->
          <!--</div>-->
        </div>
      </footer>
    </div>
    <card-modal :visible="isModalVisible" :title="'\u26A1Confirm'" :closable="true" @ok="ok" @cancel="cancel" @close="cancel" transition="zoom">
      <div class="content has-text-centered">
        <span class="fas fa-sync-alt fa-5x is-inline-block"></span>
        <span class="is-inline-block">Are you sure you want to refresh it?</span>
      </div>
    </card-modal>
  </div>
</template>

<script>
import {CardModal} from 'vue-bulma-modal'

export default {
  name: 'card',
  components: {
    CardModal
  },
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    refresh: function () {
      this.isModalVisible = true
    },
    jumpToHistory: function () {
      this.$router.push('/history')
    },
    ok: function () {
      this.isModalVisible = false
      this.$root.event.$emit('refresh-message')
    },
    cancel: function () {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
  .card-root {
    height: 100%;
    background: #80808026;
  }

  .avatar, .name {
    vertical-align: middle;
  }

  .avatar {
    border-radius: 2px;
  }

  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
  }

  .card-btn-function {
    width: 100%;
  }

  .card-btn-function-text {
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    .card-root {
      height: auto;
    }

    .card-btn-function {
      width: auto;
    }

    .card-btn-function-text {
      display: none;
    }

    .card-btn-function-gapless {
      padding: 0!important;
    }

    .card-btn-function-right {
      margin-right: 10px;
    }
  }
</style>
