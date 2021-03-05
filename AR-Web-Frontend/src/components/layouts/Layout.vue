<template>
  <v-container
    :fluid="!isEditMode"
    :class="{ 'container-in-edit': isEditMode, 'rounded-lg': isEditMode }"
  >
    <v-row v-for="(row, i) in layout.Rows" :key="i">
      <v-col cols="12" v-if="isEditMode">
        <v-card flat>
          <v-system-bar lights-out>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue-grey lighten-3"
                  flat
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small>mdi-table-edit</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="addColumn(row.Columns)">
                  <v-list-item-title>Add Column</v-list-item-title>
                </v-list-item>
                <v-list-item @click="remove(layout.Rows, row.Id)">
                  <v-list-item-title>Delete Row</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-system-bar>
        </v-card>
      </v-col>
      <v-col v-for="(column, i) in row.Columns" :key="i">
        <div
          class="d-flex flex-column"
          v-if="isEditMode"
          :class="{ 'column-in-edit': isEditMode }"
        >
          <v-card flat>
            <v-system-bar color="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" right>
                    <v-icon small>mdi-table-large</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="addCell(column.Cells)">
                    <v-list-item-title>Add Cell</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="remove(row.Columns, column.Id)">
                    <v-list-item-title>Delete Column</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-system-bar>
          </v-card>
        </div>
        <div
          class="d-flex flex-column"
          v-for="(cell, i) in column.Cells"
          :key="i"
          :class="{ 'cell-in-edit': isEditMode }"
        >
          <div :class="{ 'component-in-edit': isEditMode }">
            <v-card
              flat
              v-if="isEditMode"
              :class="{ 'component-header-in-edit': isEditMode }"
            >
              <v-system-bar>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon small>mdi-apps</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="remove(column.Cells, cell.Id)">
                      <v-list-item-title>Delete Cell</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-system-bar>
            </v-card>
            <cell-container
            :cell="cell"
            :rowId="row.Id"
            :columnId="column.Id"
            :cellId="cell.Id"
            @onComponentSelect="onComponentSelect"
            :class="{'component-body-in-edit': isEditMode}"
          />
          </div>
        </div>
      </v-col>
      <v-col cols="12" v-if="isEditMode">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="isEditMode">
      <v-col>
        <v-card flat>
          <v-toolbar flat>
            <v-btn
              color="blue"
              fab
              dark
              small
              absolute
              bottom
              left
              @click="addRow(layout.Rows)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { IndexedCollection, Column, Row, Cell } from "../../models/Layout";
import CellContainer from "./CellContainer.vue";
import AddMinus from "./AddMinus.vue";

import {
  getInitalLayout,
  addLayoutRow,
  addLayoutColumn,
  addLayoutCell,
  removeLayout,
  updateComponent,
} from "../../services/Layout";

export default Vue.extend({
  components: {
    CellContainer,
  },

  data() {
    return {
      layout: getInitalLayout(),
    };
  },
  methods: {
    onComponentSelect(
      componentId: number,
      rowId: number,
      columnId: number,
      cellId: number
    ) {
      const cells = updateComponent(
        componentId,
        rowId,
        columnId,
        cellId,
        this.layout.Rows
      );

      if (cells !== null) {
        this.$set(this.layout.Rows[rowId].Columns[columnId], "Cells", cells);
        console.log(this.layout.Rows[rowId].Columns[columnId].Cells);
      }
    },

    addRow(rows: Row[]): void {
      addLayoutRow(rows);
    },

    addColumn(columns: Column[]) {
      addLayoutColumn(columns);
    },

    addCell(cells: Cell[]) {
      addLayoutCell(cells);
    },

    remove<T>(arr: IndexedCollection[], id: number): void {
      removeLayout(arr, id);
    },
  },

  computed: {
    isEditMode() {
      return this.$store.state.isEditMode;
    },
  },
});
</script>

<style scoped>
.container-in-edit {
  border: 1px solid rgb(204, 204, 204);
  margin-top: 10px;
}

.column-in-edit {
  border: 1px solid rgb(204, 204, 204);
}

.cell-in-edit {
  margin-top: 10px;
}

.component-in-edit {
  border: 1px solid rgb(204, 204, 204);
}

.component-header-in-edit {
  margin-bottom: 10px;
}

.component-body-in-edit {
  margin: 10px;
}
</style>