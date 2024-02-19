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
}

function App() {
  const [data, setData] = useState<Row[]>([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
    { active: true, firstName: 'Bill', lastName: 'Gates' },
    { active: false, firstName: 'Mark', lastName: 'Zuckerberg' },
    { active: true, firstName: 'Larry', lastName: 'Page' },
    { active: false, firstName: 'Sergey', lastName: 'Brin' },

  ]);

  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row, 'active'>('active', checkboxColumn),
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
      ...keyColumn<Row, 'firstName'>('firstName', textColumn),
      title: 'First name',
      validators: [
        (rowData) =>
          !rowData.firstName ? 'First name is required' : undefined,
        (rowData) =>
          !rowData.firstName ? 'testtttttttttt test!' : undefined,
      ]
    },
    {
      ...keyColumn<Row, 'lastName'>('lastName', textColumn),
      title: 'Last name',
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
