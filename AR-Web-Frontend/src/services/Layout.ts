import { Layout, Row, Column, Cell } from "../models/Layout";
import { getComponent } from './ComponentHelper';
import { IndexedCollection } from '../models/Layout';

const getInitalLayout = () => {
  const layout: Layout = { Rows: [] as Row[] } as Layout

  /*const columns: Column[] = [] as Column[];
  const row: Row = { Id: 0, Component: Function, HasValue: false } as Row;
  const column: Column = { Id: 0, Rows: [] as Row[] } as Column;
  column.Rows.push(row);
  columns.push(column);*/
  return layout;
}

const addLayoutColumn = (columns: Column[]) => {
  columns.push({
    Id: columns.length,
    Cells: [] as Cell[],
  } as Column);
}

const addLayoutRow = (rows: Row[]) => {
  const row = {
    Id: rows.length,
    Columns: [] as Column[]
  };

  addLayoutColumn(row.Columns);
  rows.push(row);
}

const addLayoutCell = (cells: Cell[]) => {
  cells.push({
    Id: cells.length,
    Component: Function,
    HasValue: false
  } as Cell)
}

const removeLayout = <T>(arr: IndexedCollection[], id: number) => {
  const index = arr.findIndex(r => r.Id == id);
  arr.splice(index, 1);
}

const updateComponent = (componentId: number, rowId: number, columnId: number, cellId: number, rows: Row[]): Cell[] | null => {
  const component = getComponent(componentId);

  if (component != null) {
    const cells = rows[rowId].Columns[columnId].Cells.splice(0);
    cells[cellId].HasValue = true;
    cells[cellId].Component = component;
    return cells;
  }

  return null;
}

export { getInitalLayout, addLayoutRow, addLayoutColumn, addLayoutCell, removeLayout, updateComponent }