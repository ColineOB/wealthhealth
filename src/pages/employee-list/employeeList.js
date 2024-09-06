import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import React, { useContext } from 'react'
import './employeeList.css'
import { TableContext } from '../../Context/tableProvider'

function EmployeeList() {
  const columnHelper = createColumnHelper()
  const {
    filteredData,
    searchTerm,
    setSearchTerm,
    pageSize,
    setPageSize,
    sorting,
    setSorting
  } = useContext(TableContext)

  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

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
    columnHelper.accessor('Start Date', {
      cell: (info) => info.getValue(),
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = parseDateString(rowA.getValue(columnId))
        const dateB = parseDateString(rowB.getValue(columnId))
        return dateA - dateB
      }
    }),
    columnHelper.accessor('Department', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Date of Birth', {
      cell: (info) => info.getValue(),
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = parseDateString(rowA.getValue(columnId))
        const dateB = parseDateString(rowB.getValue(columnId))
        return dateA - dateB
      }
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
    columnHelper.accessor('Zip Code', {
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric'
    })
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'defaultColumnId', desc: false }],
      pagination: {
        pageSize: pageSize
      }
    }
  })

  return (
    <div className='listEmployee'>
      <h1>Current Employees</h1>
      <div className='listEmployee-option'>
        <div>
          Show
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              table.setPageSize(Number(e.target.value))
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </div>
        <div>
          Search:
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className='sort-wrapper'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div className='sort-icons'>
                      <span
                        className={`sort-icon ${header.column.getIsSorted() === 'asc' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          header.column.toggleSorting(false)
                        }}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-icon ${header.column.getIsSorted() === 'desc' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          header.column.toggleSorting(true)
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
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
      <div className='listEmployee-pagination'>
        <div>
          Showing {table.getPageCount()} to {table.getRowModel().rows.length} of{' '}
          {filteredData.length} entries
        </div>
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span>
            <strong>{table.getState().pagination.pageIndex + 1}</strong>{' '}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
