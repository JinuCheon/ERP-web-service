import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteCustomerAction, LOAD_CUSTOMER_REQUEST, showNewCustomerModal } from '../reducers/customer';
import NewCustomerModal from '../components/NewCustomerModal';

const customer = () => {
  const { customer, deleteCustomerLoading, displayNewCustomerModal, createNewCustomerDone, deleteCustomerDone } = useSelector((state) => state.customer);
  const [selectedRows, setSelectedRows] = useState();
  const [sellerCheckboxChecked, setSellerCheckboxChecked] = useState(true);
  const [buyerCheckboxChecked, setBuyerCheckboxChecked] = useState(true);
  const dispatch = useDispatch();

  const onChangeSellerCheckbox = useCallback(() => {
    setSellerCheckboxChecked(!sellerCheckboxChecked);
  });
  const onChangeBuyerCheckbox = useCallback(() => {
    setBuyerCheckboxChecked(!buyerCheckboxChecked);
  });

  useEffect(() => {
    dispatch({
      type: LOAD_CUSTOMER_REQUEST,
    });
  }, [createNewCustomerDone, deleteCustomerDone]);

  const columns = [{
      name: '거래처코드',
      selector: row => row.id,
      sortable: true,
    }, {
      name: '회사명',
      selector: row => row.companyName,
      sortable: true,
    }, {
      name: '거래형태',
      selector: row => row.customerType,
      sortable: true,
    }, {
      name: '최근 거래량',
      selector: row => row.tradingVolume,
      sortable: true,
    }];

  const tableSelectChange = useCallback((data) => {
    console.log(data);
    setSelectedRows(data.selectedRows.map((v) => v.id));
  })

  const makeCustomerList = useCallback(() => 
    customer.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.companyName}` };
  }));

  const onClickFiltering = useCallback(() => {
    //
  })

  const onClickNewCustomer = useCallback(() => {
    dispatch(showNewCustomerModal());
  })
  
  const onClickDeleteCustomer = useCallback(() => {
    dispatch(deleteCustomerAction(selectedRows));
  })
  
  return(
    <AppLayout>
      <Row className="mt-5">
        <Col>
          <p>회사명 검색</p>
          <Typeahead
            id="name"
            onChange={(selected) => setCustomerName(...selected)}
            options={makeCustomerList()}
            flip={true}
          />
        </Col>
        <Col>
          <p>거래 타입 선택</p>
          <Form>
            <Form.Check
              label={"판매처"}
              onChange={onChangeSellerCheckbox}
              checked={sellerCheckboxChecked}
              />
            <Form.Check
              label={"구매처"}
              onChange={onChangeBuyerCheckbox}
              checked={buyerCheckboxChecked}
            />
          </Form>
        </Col>
      </Row>
      <Button className="mt-2 mb-5" onClick={onClickFiltering}>필터링</Button>
      <DataTable columns={columns} data={customer} selectableRows pagination onSelectedRowsChange={tableSelectChange} />
      <Button className="m-2" onClick={onClickDeleteCustomer} disabled={deleteCustomerLoading}>
        {deleteCustomerLoading ? '삭제중' : '거래처 삭제'}
      </Button>
      <Button onClick={onClickNewCustomer}>거래처 추가</Button>
      {displayNewCustomerModal && <NewCustomerModal />}
    </AppLayout>
  )
}

export default customer;
