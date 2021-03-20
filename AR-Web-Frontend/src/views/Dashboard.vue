<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import {SystemPages} from '@/services/Pages'

export default {
  name: 'Dashboard',
  created: function() {
    this.$store.commit("setCurrentPageId", {currentPageId: SystemPages.Dashboard});
  }
}
</script>
