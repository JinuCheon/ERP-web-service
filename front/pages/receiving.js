import React, { useState, useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';


const receiving = () => {
  const [productName, setProductName] = useState();
  const [productCategory, setCategory] = useState();
  const [venderName, setVenderName] = useState();
  const { products, category, vender } = useSelector((state) => state.product);

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
          <p>거래처(매입처)</p>
          <Typeahead
            id="vender"
            onChange={(selected) => setVenderName(...selected)}
            options={vender}
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

export default receiving;
