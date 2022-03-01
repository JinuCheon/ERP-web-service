import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { deleteProductRequest, LOAD_PRODUCT_REQUEST, showNewProductModal } from '../reducers/product';
import NewProductModal from '../components/NewProductModal';

const inventoryManage = () => {
  const { productColumns, products, category, displayNewProductModal, createNewProductLoading, deleteProductLoading } = useSelector((state) => state.product);
  const [productName, setProductName] = useState();
  const [productCategory, setCategory] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, [createNewProductLoading, deleteProductLoading]);

  const tableSelectChange = useCallback((data) => {
    setSelectedRows(data.selectedRows.map((v) => v.id));
  })

  const makeProductList = useCallback(() => 
    products.map((v) => {
    return { id: v.code, label: `(${v.code}) ${v.name}` };
  }));

  const onClickFiltering = useCallback(() => {
    //
  })

  const onClickNewProduct = useCallback(() => {
    dispatch(showNewProductModal());
  })
  
  const onClickDeleteProduct = useCallback(() => {
    dispatch(deleteProductRequest(selectedRows));
  })
  
  return(
    <AppLayout>
      <Row className="mt-5">
        <Col>
          <p>제품명(코드)</p>
          <Typeahead
            id="name"
            onChange={(selected) => setProductName(...selected)}
            options={makeProductList()}
            flip={true}
          />
        </Col>
        <Col>
        <p>카테고리</p>
          <Typeahead
            id="category"
            onChange={(selected) => setCategory(...selected)}
            options={category}
          />
        </Col>
      </Row>
      <Button className="mt-2 mb-5" onClick={onClickFiltering}>필터링</Button>
      <DataTable columns={productColumns} data={products} selectableRows pagination onSelectedRowsChange={tableSelectChange} />
      <Button className="m-2" onClick={onClickDeleteProduct} disabled={deleteProductLoading}>
        {deleteProductLoading ? '삭제중' : '제품 삭제'}
      </Button>
      <Button onClick={onClickNewProduct}>제품 추가</Button>
      {displayNewProductModal && <NewProductModal />}
    </AppLayout>
  )
}

export default inventoryManage;
