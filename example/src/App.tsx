import React, { useState } from 'react'
import {
  checkboxColumn,
  Column,
  DataSheetGrid,
  keyColumn,
  textColumn,
} from '../../src'
import '../../src/style.css'

type Row = {
  active: boolean
  firstName: string | null
  lastName: string | null
  test?: {
    data: string
  }
}

function App() {
  const [data, setData] = useState<Row[]>([
    ...Array.from({ length: 1000 }, (_, i) => ({
      active: i % 2 === 0,
      firstName: `First ${i}`,
      lastName: `Last ${i}`,
      test: { data: `test ${i}` },
    })),
  ]);

  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row>('active', checkboxColumn),
      title: 'Active',
      grow: 0.5,
      validators: [
        (rowData) =>
          !rowData.active ? 'active is required' : undefined,
        (rowData) =>
          !rowData.active ? 'testtttttttttt test!' : undefined,
      ]
    },
    {
      ...keyColumn<Row>('firstName', textColumn),
      title: 'First name',
      validators: [
        (rowData) =>
          !rowData.firstName ? 'First name is required' : undefined,
        (rowData) =>
          !rowData.firstName ? 'testtttttttttt test!' : undefined,
      ]
    },
    {
      ...keyColumn<Row>('lastName', textColumn),
      title: 'Last name',
      grow: 2,
    },
    {
      ...keyColumn<Row>('test.data', textColumn),
      title: 'Test',
      grow: 2,
    },
  ]

  return (
    <div
      style={{
        margin: '50px',
        padding: '50px',
        maxWidth: '900px',
        background: '#f3f3f3',
      }}
    >
      <DataSheetGrid value={data} onChange={setData} columns={columns} />
    </div>
  )
}

export default App
