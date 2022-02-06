import React, { useState, useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';


const shipping = () => {
  const [productName, setProductName] = useState();
  const [productCategory, setCategory] = useState();
  const [customerName, setCustomerName] = useState();
  const { products, category, customer } = useSelector((state) => state.product);

  const makeProductList = useCallback(() =>
    products.map((v) => {
      return { id: v.code, label: `(${v.code}) ${v.name}` };
    }));

  return (
    <AppLayout>
      <Row>
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
      <Row>
        <Col>
          <p>거래처(매출처)</p>
          <Typeahead
            id="vender"
            onChange={(selected) => setCustomerName(...selected)}
            options={customer}
          />
        </Col>
        <Col>
          <p>수량</p>
          <Form.Control type="number" />
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-5">
        Submit
      </Button>
    </AppLayout>
  )
}

export default shipping;
