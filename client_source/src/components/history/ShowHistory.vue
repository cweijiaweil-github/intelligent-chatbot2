<template>
  <div class="show-history-root">
    <nav class="panel sh-panel">
      <div class="panel-heading" style="font-size: 24px">
        Chat History
        <div style="display: inline">
          <a href="#" class="button is-primary is-small is-size-6-mobile" style="float: right" v-on:click="backToChat">
            <span class="fas fa-comment"></span>
            <span class="sh-btn-function-text">Back to Chat</span>
          </a>
          <a href="#" class="button is-primary is-small is-size-6-mobile right-button" v-on:click="outputHistory">
            <span class="fas fa-file-alt"></span>
            <span class="sh-btn-function-text">Export to CSV</span>
          </a>
          <a href="#" class="button is-primary is-small is-size-6-mobile right-button" v-on:click="getHistory">
            <span class="fas fa-sync-alt"></span>
            <span class="sh-btn-function-text">Refresh</span>
          </a>
        </div>
      </div>
      <div class="panel-tabs sh-panel-content">
        <table class="table sh-table" v-if="history && history.length > 0">
          <tr>
            <th>device_id</th>
            <th>question</th>
            <th>answer</th>
            <th>source</th>
            <th>score</th>
            <th>create_time</th>
            <th>update_time</th>
          </tr>
          <tr v-for="item in history" :key="item.history._id">
            <td>{{item.history.device_id}}</td>
            <td>{{item.history.question}}</td>
            <td>{{item.history.answer}}</td>
            <td>{{item.history.source}}</td>
            <td>{{item.history.score}}</td>
            <td>{{item.history.create_time}}</td>
            <td>{{item.history.update_time}}</td>
          </tr>
        </table>
      </div>
    </nav>
    <card-modal :visible="isModalVisible" :title="'\u26A1Confirm'" :closable="true" @ok="ok" @cancel="cancel" @close="cancel" transition="zoom">
      <div class="content has-text-centered">
        <span class="fas fa-file-alt fa-5x is-inline-block"></span>
        <span class="is-inline-block">Do you confirm exporting to a CSV file?</span>
      </div>
    </card-modal>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {CardModal} from 'vue-bulma-modal'
import Constant from '../../common/constants.json'

export default {
  name: 'show-history',
  components: {
    CardModal
  },
  data () {
    return {
      history: [],
      isModalVisible: false
    }
  },
  methods: {
    ...mapMutations(['post', 'setIsLoading']),
    backToChat: function () {
      this.$router.push('/')
    },
    outputHistory: function () {
      this.isModalVisible = true
    },
    getHistory: function () {
      let _this = this
      _this.setIsLoading(true)
      _this.post({
        url: Constant.api.path.history,
        data: {},
        success: function (data) {
          _this.$set(_this, 'history', data)
          _this.setIsLoading(false)
        },
        error: function (error) {
          console.log(JSON.stringify(error))
        }
      })
    },
    ok: function () {
      this.isModalVisible = false
      window.open(Constant.api.path.outputHistory)
    },
    cancel: function () {
      this.isModalVisible = false
    }
  },
  created () {
    this.getHistory()
  }
}
</script>

<style>
  .show-history-root {
    padding: 30px;
    height: 100%;
    overflow: hidden;
  }

  .sh-panel {
    height: 100%;
    overflow: hidden;
  }

  .sh-panel-content {
    overflow: auto;
    display: block!important;
    height: calc(100% - 55px);
  }

  .sh-table {
    width: 100%;
    min-width: 900px;
  }

  .right-button {
    float: right;
    margin-right: 10px;
  }

  .sh-btn-function-text {
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    .show-history-root {
      padding: 0;
    }

    .sh-btn-function-text {
      display: none;
    }
  }
</style>
