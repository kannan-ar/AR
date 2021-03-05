<template>
  <v-card v-if="cell.HasValue" flat>
    <component-loader :component="cell.Component" />
  </v-card>
  <v-card v-else-if="!cell.HasValue && isEditMode" outlined raised align-center>
    <component-selector @onComponentSelect="onComponentSelect" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { Cell } from "../../models/Layout";
import ComponentLoader from "./ComponentLoader.vue";
import ComponentSelector from "./ComponentSelector.vue";

export default Vue.extend({
  components: {
    ComponentLoader,
    ComponentSelector,
  },
  props: {
    rowId: Number,
    columnId: Number,
    cellId: Number,
    cell: {
      type: Object as () => Cell,
    },
  },
  methods: {
    onComponentSelect(componentId: number) {
      this.$emit(
        "onComponentSelect",
        componentId,
        this.rowId,
        this.columnId,
        this.cellId
      );
    },
  },

  computed: {
    isEditMode() {
      return this.$store.state.isEditMode;
    },
  },
});
</script>