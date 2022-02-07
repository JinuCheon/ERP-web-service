import React, { useState, useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { newTranactionRequest } from '../reducers/transaction';
import useInput from '../hooks/useInput';


const receiving = () => {
  const [productInfo, setProductInfo] = useState();
  const [productCategory, setCategory] = useState();
  const [venderName, setVenderName] = useState();
  const [ productStock, onChangeProductStock ] = useInput();
  const { products, category, vender } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const makeProductList = useCallback(() =>
    products.map((v) => {
      return { id: v.code, label: `(${v.code}) ${v.name}` };
    }));

  const onClickReceiving = useCallback(() => {
    const productId = productInfo.id;
    dispatch(newTranactionRequest({ productId, productCategory, venderName, productStock }));
  })

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
          <p>거래처(매입처)</p>
          <Typeahead
            id="vender"
            onChange={(selected) => setVenderName(...selected)}
            options={vender}
          />
        </Col>
        <Col>
          <p>수량</p>
          <Form.Control type="number" onChange={onChangeProductStock} />
        </Col>
      </Row>
      <Button onClick={onClickReceiving} variant="primary" type="submit" className="mt-5">
        Submit
      </Button>
    </AppLayout>
  )
}

export default receiving;
