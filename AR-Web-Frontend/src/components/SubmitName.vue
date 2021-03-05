<template>
  <div>
    <input v-model="message" placeholder="Enter your name" style="border:1px solid #ccc" />
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data: () => {
        return {
            message: ''
        }
    }
});
</script>