<template>
  <v-app>
    <v-app-bar app color="teal" flat>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item class="teal lighten-4">
            <v-list-item-icon>
              <v-icon>mdi-table-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="goPage()">
              <template v-if="isEditMode">Save Page Layout</template>
              <template v-else>Edit Page Layout</template>
            </v-list-item-title>
          </v-list-item>
          <v-divider dark></v-divider>
          <v-list-item class="teal lighten-4">
            <v-list-item-icon>
              <v-icon>mdi-checkerboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="setEditMode">
              Edit Page Theme
            </v-list-item-title>
          </v-list-item>
          <v-divider dark></v-divider>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    setEditMode() {
      this.$store.commit("changeState");
      this.drawer = !this.drawer;
    },
    goPage() {
      this.setEditMode();
      this.$router.push({name: 'LayoutEditor', params: {pId: this.$store.state.currentPageId}});
    }
  },
  computed: {
    isEditMode() {
      return this.$store.state.isEditMode;
    },
  },
});
</script>
