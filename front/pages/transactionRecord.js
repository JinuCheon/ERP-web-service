import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { LOAD_TRANSACTION_RECORD_REQUEST } from '../reducers/transaction';

const transactionRecord = () => {
  const { transactionRecord, transactionColumns } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const tableSelectChange = useCallback((data) => {
    setSelectedRows(data.selectedRows.map((v) => v.code));
  })

  useEffect(() => {
    dispatch({
      type: LOAD_TRANSACTION_RECORD_REQUEST,
    })
  }, []);

  return(
    <AppLayout>
      <DataTable columns={transactionColumns} data={transactionRecord} selectableRows pagination onSelectedRowsChange={tableSelectChange} />
    </AppLayout>
  )
}

export default transactionRecord;
