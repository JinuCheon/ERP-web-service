import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';

const transactionRecord = () => {
  const { transactionData, transactionColumns } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const tableSelectChange = useCallback((data) => {
    setSelectedRows(data.selectedRows.map((v) => v.code));
  })

  return(
    <AppLayout>
      <DataTable columns={transactionColumns} data={transactionData} selectableRows pagination onSelectedRowsChange={tableSelectChange} />
    </AppLayout>
  )
}

export default transactionRecord;
