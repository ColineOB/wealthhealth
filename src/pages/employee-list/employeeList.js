import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useState } from 'react'

function EmployeeList() {
  const columnHelper = createColumnHelper()
  const [data, _setData] = useState([])

  const columns = [
    columnHelper.accessor('First Name', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('Last Name', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('start Date', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('Department', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('Date of birth', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('Street', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('City', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('State', {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('zip code', {
      cell: (info) => info.getValue()
    })
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
