<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block v-bind="attrs" v-on="on">Add Component</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2"> Components </v-card-title>
      <v-card-text>
        <template>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex v-for="(comp, i) in components" :key="i">
                <v-card>
                  <v-card-title>
                    {{comp.Name}}
                  </v-card-title>
                  <v-card-text>
                    {{comp.Description}}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="onSelect(comp.componentId)">Select</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </template>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Components from '../../services/Component';

export default Vue.extend({
  data: () => {
    const components = Components.map((v) => {
      return { componentId: v.Id, Name: v.Name, Description: v.Description };
    });

    return {components: components, dialog: false};
  },
  methods: {
    onSelect(componentId: number) {
      this.$emit("onComponentSelect", componentId);
      this.dialog = false;
    }
  }
});
</script>