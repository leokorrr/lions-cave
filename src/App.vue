<template>
  <div id="app">
    <SidebarMobile />
    <Sidebar />
    <div class="content-box">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import SidebarMobile from './components/SidebarMobile.vue'

export default {
  name: 'app',
  components: {
    Sidebar,
    SidebarMobile
  }
}
</script>
