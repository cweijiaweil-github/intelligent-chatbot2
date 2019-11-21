<template>
  <div id="app">
    <div class="loading-layer" v-if="isLoading">
      <img class="loading" src='./assets/loading.gif' />
    </div>
    <section id="nav-section" class="hero is-primary">
      <div class="hero-head">
        <nav>
          <span class="fa fa-comments fa-3x app-fa-comments"></span>
          <span class="app-title">Xiao Mei AI Chatbot</span>
        </nav>
      </div>
    </section>
    <section class="page">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoading () {
      return this.$store.getters.getIsLoading
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav-section {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 998;
  }

  section.page{
    position: absolute;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    margin: 0;
  }

  .loading-layer {
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    /*filter: alpha(opacity=10);*/
    /*opacity: 0.1;*/
    overflow: hidden;
    z-index: 999;
    position: absolute;
  }

  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .app-fa-comments {
    margin: 8px 20px 0;
  }

  .app-title {
    font-size: 36px;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: #00d1b2;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #00d1b2;
    z-index: 1;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
  }

  .tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }

  @media (max-width: 768px) {
    .app-fa-comments {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 2em;
    }

    .app-title {
      font-size: 24px;
    }

    section.page{
      top: 44px;
    }
  }
</style>
