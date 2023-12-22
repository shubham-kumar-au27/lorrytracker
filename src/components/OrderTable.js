// OrderTable.js
import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import CustomProgressBar from './ProgressBarComponent';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import { saveOrder } from '../utils/ordersSlice';
import EditOrderModal from './EditOrderModal';

const OrderTable = ({ orders }) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const handleClick = (order)=>{
    console.log('clicked')
    // console.log(order)
    dispatch(saveOrder({order:order}))
    console.log(   dispatch(saveOrder({order:order})), "get")
    
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Order Details',
        columns: [
          {
            Header: 'Booking Date',
            accessor: 'bookingDate',
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
          },
          {
            Header: 'Delivery Address',
            accessor: 'deliveryAddress',
          },
          {
            Header: 'Vehicle Number',
            accessor: 'vehicle_number',
          },
          {
            Header: 'EIDIT',
            Cell: ({ row }) => (
              <Link
              onClick={() => handleOpen(row.original)}
              className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            ),
          },
        ],
      },
      {
        Header: 'Progress',
        Cell: ({ row }) => (
          <CustomProgressBar
          deliveryStatus={row?.original?.delivery_status}
          isPaymentDone={row?.original?.isPaymentDone}
          weighBillReceived={row?.original?.weighBillReceived}
          billSubmission={row?.original?.billSubmission}
          paymentReceived={row?.original?.paymentReceived}
          />
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link
              to="/orderstatus"
              onClick={() => handleClick(row.original)}
              className="text-blue-500 hover:underline"
            >
              View
            </Link>
            <CSVLink data={[row.original]} filename={'order.csv'} className="text-green-500 hover:underline">
              Download
            </CSVLink>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: orders }, usePagination);

  return (
    <div className="container mx-auto my-8 overflow-x-auto">
      <table {...getTableProps()} className="w-full border-collapse border border-gray-300 rounded shadow bg-white">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                    {...column.getHeaderProps()}
                    className="py-3 px-4 border-b border-gray-300 font-medium text-gray-700 text-sm sm:text-base"
                    >
                    {column.render('Header')}
                    </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`transition-colors duration-300 ${
                  i % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-3 px-4 border-b border-gray-300 text-sm sm:text-base">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
        <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        />

        <EditOrderModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
};


// Constants
const PAGE_SIZES = [10, 20, 30, 40, 50];

// Pagination Component
const Pagination = ({ canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, pageIndex, pageOptions, pageSize, setPageSize }) => (
  <div className="mt-4 flex items-center justify-between">
    <div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-3 py-2 border border-gray-300 rounded cursor-pointer">
        {'<<'}
      </button>{' '}
      <button onClick={previousPage} disabled={!canPreviousPage} className="px-3 py-2 border border-gray-300 rounded cursor-pointer">
        {'<'}
      </button>{' '}
      <button onClick={nextPage} disabled={!canNextPage} className="px-3 py-2 border border-gray-300 rounded cursor-pointer">
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-3 py-2 border border-gray-300 rounded cursor-pointer">
        {'>>'}
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span className="text-gray-700">| Go to page:</span>
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        className="px-2 py-1 border border-gray-300 rounded"
        style={{ width: '60px' }}
      />
    </div>
    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
      className="px-2 py-1 border border-gray-300 rounded"
    >
      {PAGE_SIZES.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </div>
);




export default OrderTable;
