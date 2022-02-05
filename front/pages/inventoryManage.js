import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Row } from 'react-bootstrap';

const inventoryManage = () => {
  const { productColumns, products, category } = useSelector((state) => state.product);
  
  const makeProductList = useCallback(() => 
    products.map((v) => {
    return {id: v.code, label: `(${v.code}) ${v.name}`};
  }));

  return(
    <AppLayout>
      <Row className="mt-5">
        <Col>
          <p>제품명(코드)</p>
          <Typeahead
            id="name"
            onChange={(selected) => {
            }}
            options={makeProductList()}
          />
        </Col>
        <Col>
        <p>카테고리</p>
          <Typeahead
            id="category"
            onChange={(selected) => {
            }}
            options={category}
          />
        </Col>
      </Row>
      <Button className="mt-2 mb-5">검색하기</Button>
      <DataTable columns={productColumns} data={products} selectableRows pagination />
    </AppLayout>
  )
}

export default inventoryManage;
