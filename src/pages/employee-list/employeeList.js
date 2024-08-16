import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'

function EmployeeList() {
  const columnHelper = createColumnHelper()
  const [data, setData] = useState([
    {
      'First Name': 'John',
      'Last Name': 'Doe',
      'start Date': '2023-01-01',
      Department: 'HR',
      'Date of birth': '1990-01-01',
      Street: 'Main St',
      City: 'New York',
      State: 'NY',
      'zip code': '10001'
    },
    {
      'First Name': 'Jane',
      'Last Name': 'Smith',
      'start Date': '2023-02-01',
      Department: 'Finance',
      'Date of birth': '1985-02-02',
      Street: '2nd St',
      City: 'San Francisco',
      State: 'CA',
      'zip code': '94103'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [data, searchTerm])

  const columns = [
    columnHelper.accessor('First Name', {
      cell: (info) => info.getValue(),
      header: () => 'First Name',
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Last Name', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('start Date', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Department', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Date of birth', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Street', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('City', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('State', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('zip code', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    })
  ]
  const [sorting, setSorting] = useState([])
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' ▲',
                    desc: ' ▼'
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  )
}

export default EmployeeList
