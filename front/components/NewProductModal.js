import React, { useState, useCallback } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeNewProductModal, createNewProductRequest } from "../reducers/product";
import { Typeahead } from 'react-bootstrap-typeahead';
import useInput from "../hooks/useInput";

const NewProductModal = () => {
  const dispatch = useDispatch();
  const { category, createNewProductLoading } = useSelector((state) => state.product);
  const [productCode, onChangeProductCode] = useInput();
  const [productName, onChangeProductName] = useInput();
  const [productCategory, setCategory] = useState();
  const [productPrice, onChangeProductPrice] = useInput();
  
  const onClickNewProductClose = useCallback(() => {
    dispatch(closeNewProductModal());
  })
  const onClickCreateNewProduct = useCallback(() => {
    dispatch(createNewProductRequest({
      code: productCode,
      name: productName,
      category: productCategory,
      price: productPrice,
      stock: 0,
    }));
  })

  return (
    <Modal show={true} onHide={onClickNewProductClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>신규 제품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label className="mt-3">제품코드 (체크시 자동생성)</Form.Label>
        <InputGroup>
          <InputGroup.Checkbox/>
          <Form.Control type="text" onChange={onChangeProductCode} />
        </InputGroup>
        <Form.Label className="mt-3">제품명</Form.Label>
        <Form.Control type="text" onChange={onChangeProductName} />
        <Form.Label className="mt-3">카테고리</Form.Label>
        <Typeahead
            id="category"
            onChange={(selected) => setCategory(...selected)}
            options={category}
          />
        <Form.Label className="mt-3">가격</Form.Label>
        <Form.Control onChange={onChangeProductPrice} type="number" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClickNewProductClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onClickCreateNewProduct} disabled={createNewProductLoading}>
            {createNewProductLoading ? '처리중' : '생성'}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default NewProductModal;
