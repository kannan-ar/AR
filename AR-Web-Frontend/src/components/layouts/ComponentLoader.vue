<template>
  <component v-bind:is="component"></component>
</template>

<script lang="ts">
import Vue, { Component } from "vue";
import { getComponents } from "../../services/ComponentHelper";

export default Vue.extend({
  components: getComponents(),
  props: {
    component: {
      type: Function as () => Component,
    },
  },

  computed: {
    isEditMode() {
      return this.$store.state.isEditMode;
    },
  },
});
</script>