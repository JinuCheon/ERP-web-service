import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import DataTable from 'react-data-table-component';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Row } from 'react-bootstrap';

const inventoryManage = () => {
  const { productColumns, products, category } = useSelector((state) => state.product);
  const [productName, setProductName] = useState();
  const [productCategory, setCategory] = useState();
  
  const makeProductList = useCallback(() => 
    products.map((v) => {
    return {id: v.code, label: `(${v.code}) ${v.name}`};
  }));

  const onClickFiltering = useCallback(() => {
    console.log(productName.id, productCategory);
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
      <DataTable columns={productColumns} data={products} selectableRows pagination />
    </AppLayout>
  )
}

export default inventoryManage;
