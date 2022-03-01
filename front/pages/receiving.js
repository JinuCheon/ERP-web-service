import React, { useState, useCallback, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { newTranactionRequest } from '../reducers/transaction';
import useInput from '../hooks/useInput';
import { LOAD_PRODUCT_REQUEST } from '../reducers/product';
import { LOAD_CUSTOMER_REQUEST } from '../reducers/customer';
import Datetime from 'react-datetime';


const receiving = () => {
  const [productInfo, setProductInfo] = useState();
  const [datetime, setDatetime] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState();
  const [ productStock, onChangeProductStock ] = useInput();
  const { products } = useSelector((state) => state.product);
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
    dispatch({
      type: LOAD_CUSTOMER_REQUEST,
    });
  }, []);

  const makeProductList = useCallback(() =>
    products.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.name}` };
    }));

  const makeCustomerList = useCallback(() =>
    customer.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.companyName}` };
    }));

  const onChangeDate = useCallback((e) => {
    setDatetime(e._d);
  });

  const onClickReceiving = useCallback(() => {
    dispatch(newTranactionRequest({
      type: '입고',
      productId: productInfo.id,
      customerId: customerInfo.id,
      transactionStock: productStock,
      transactionDate: datetime,
    }));
  });

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
          <p>입고일자</p>
          <Datetime onChange={onChangeDate} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>거래처(매입처)</p>
          <Typeahead
            id="customer"
            onChange={(selected) => setCustomerInfo(...selected)}
            options={makeCustomerList()}
          />
        </Col>
        <Col>
          <p>수량</p>
          <Form.Control type="number" onChange={onChangeProductStock} />
        </Col>
      </Row>
      <Button onClick={onClickReceiving} variant="primary" type="submit" className="mt-5">
        입고
      </Button>
    </AppLayout>
  )
}

export default receiving;
