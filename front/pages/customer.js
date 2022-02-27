import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteProductRequest } from '../reducers/product';
import NewProductModal from '../components/NewProductModal';
import { showNewCustomerModal } from '../reducers/customer';

const customer = () => {
  const { customer, deleteCustomerLoading, displayNewCustomerModal } = useSelector((state) => state.customer);
  const [productName, setProductName] = useState();
  const [productCategory, setCategory] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const [sellerCheckboxChecked, setSellerCheckboxChecked] = useState(true);
  const [buyerCheckboxChecked, setBuyerCheckboxChecked] = useState(true);
  const dispatch = useDispatch();

  const onChangeSellerCheckbox = useCallback(() => {
    setSellerCheckboxChecked(!sellerCheckboxChecked);
  })
  const onChangeBuyerCheckbox = useCallback(() => {
    setBuyerCheckboxChecked(!buyerCheckboxChecked);
  })
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
      selector: row => row.type,
      sortable: true,
    }, {
      name: '최근 거래량',
      selector: row => row.tradingVolume,
      sortable: true,
    }];

  const tableSelectChange = useCallback((data) => {
    setSelectedRows(data.selectedRows.map((v) => v.code));
  })

  const makeProductList = useCallback(() => 
    customer.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.companyName}` };
  }));

  const onClickFiltering = useCallback(() => {
    console.log(productName.id, productCategory);
  })

  const onClickNewCustomer = useCallback(() => {
    dispatch(showNewCustomerModal());
  })
  
  const onClickDeleteProduct = useCallback(() => {
    dispatch(deleteProductRequest(selectedRows));
  })
  
  return(
    <AppLayout>
      <Row className="mt-5">
        <Col>
          <p>회사명 검색</p>
          <Typeahead
            id="name"
            onChange={(selected) => setProductName(...selected)}
            options={makeProductList()}
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
      <Button className="m-2" onClick={onClickDeleteProduct} disabled={deleteCustomerLoading}>
        {deleteCustomerLoading ? '삭제중' : '제품 삭제'}
      </Button>
      <Button onClick={onClickNewCustomer}>거래처 추가</Button>
      {displayNewCustomerModal && <NewProductModal />}
    </AppLayout>
  )
}

export default customer;
