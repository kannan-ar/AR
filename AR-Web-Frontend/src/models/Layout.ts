import { Component } from 'vue';

interface IndexedCollection {
  Id: number;
}
interface Cell extends IndexedCollection  {
  Component: Component;
  HasValue: boolean;
}

interface Column extends IndexedCollection {
  Cells: Cell[];
}

interface Row extends IndexedCollection {
  Columns: Column[];
}

interface Layout {
  Rows: Row[];
}
export { IndexedCollection, Layout, Row, Column, Cell }