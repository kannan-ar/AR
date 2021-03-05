<template>
    <v-card flat>
        <v-btn class="btn" small bottom left dark @click="add">
          <v-icon>mdi-plus</v-icon> </v-btn>&nbsp;
        <v-btn
          class="btn"
          small
          bottom
          left
          dark
          @click="remove"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        add(): void {
            this.$emit("onAdd");
        },
        remove(): void {
            this.$emit("onRemove");
        }
    }
})
</script>

<style scoped>
.btn {
  height: 20px !important;
  min-width: 25px !important;
  padding: 0 1px !important;
}
</style>