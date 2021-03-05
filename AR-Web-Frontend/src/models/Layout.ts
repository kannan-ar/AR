import { Component } from 'vue';

interface IndexedCollection {
  Id: Number
}
interface Cell extends IndexedCollection  {
  Component: Component;
  HasValue: Boolean;
}

interface Column extends IndexedCollection {
  Cells: Cell[];
}

interface Row extends IndexedCollection {
  Columns: Column[]
}

interface Layout {
  Rows: Row[]
}
export { IndexedCollection, Layout, Row, Column, Cell }