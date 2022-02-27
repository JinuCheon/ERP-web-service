import React, { useState, useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { newTranactionRequest } from '../reducers/transaction';


const shipping = () => {
  const [productInfo, setProductInfo] = useState();
  const [productCategory, setCategory] = useState();
  const [customerName, setCustomerName] = useState();
  const [ productStock, onChangeProductStock ] = useInput();
  const { products, category } = useSelector((state) => state.product);
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const onClickShipping = useCallback(() => {
    const productId = productInfo.id;
    dispatch(newTranactionRequest({ type: '출고', productId, productCategory, customerName, productStock }));
  })

  const makeProductList = useCallback(() =>
      products.map((v) => {
        return { id: v.code, label: `(${v.code}) ${v.name}` };
    }));

  const makeCustomerList = useCallback(() =>
    customer.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.companyName}` };
    }));

  return (
    <AppLayout>
      <Row>
        <Col>
          <p>제품명(코드)</p>
          <Typeahead
            id="name"
            onChange={(selected) => setProductInfo(...selected)}
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
            onChange={(selected) => setCustomerName(selected[0].label)}
            options={makeCustomerList()}
          />
        </Col>
        <Col>
          <p>수량</p>
          <Form.Control type="number" onChange={onChangeProductStock} />
        </Col>
      </Row>
      <Button onClick={onClickShipping} variant="primary" type="submit" className="mt-5">
        출고
      </Button>
    </AppLayout>
  )
}

export default shipping;
