import React, { useState, useCallback } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeNewProductModal, createNewProductRequest } from "../reducers/product";
import { Typeahead } from 'react-bootstrap-typeahead';
import useInput from "../hooks/useInput";

const NewProductModal = () => {
  const dispatch = useDispatch();
  const { category, createNewProductLoading } = useSelector((state) => state.product);
  const [productCode, onChangeProductCode, setProductCode] = useInput();
  const [productName, onChangeProductName] = useInput();
  const [productCategory, setProductCategory] = useState();
  const [productPrice, onChangeProductPrice] = useInput();
  const [autoCode, setAutoCode] = useState(false);
  
  const onClickNewProductClose = useCallback(() => {
    dispatch(closeNewProductModal());
  })
  const onClickCreateNewProduct = useCallback(() => {
    if (productCode === null){
      dispatch(createNewProductRequest({
        name: productName,
        categoryId: parseInt(productCategory.id),
        price: productPrice,
        stock: 0,
      }));
    } else {
      dispatch(createNewProductRequest({
        id: parseInt(productCode),
        name: productName,
        categoryId: parseInt(productCategory.id),
        price: productPrice,
        stock: 0,
      }));
    }
  })

  const makeCategoryList = useCallback(() => category.map((v) => {
      return { id: v.id, label: `(${v.id}) ${v.name}`}
  }));

  const onChangeAutoCodeCheck = useCallback(() => {
    setAutoCode(!autoCode);
    setProductCode(null);
  })

  return (
    <Modal show={true} onHide={onClickNewProductClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>신규 제품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label className="mt-3">제품코드 (체크시 자동생성)</Form.Label>
        <InputGroup>
          <InputGroup.Checkbox checked={autoCode} onChange={onChangeAutoCodeCheck}/>
          <Form.Control type="text" onChange={onChangeProductCode} disabled={autoCode} />
        </InputGroup>
        <Form.Label className="mt-3">제품명</Form.Label>
        <Form.Control type="text" onChange={onChangeProductName} />
        <Form.Label className="mt-3">카테고리</Form.Label>
        <Typeahead
            id="category"
            onChange={(selected) =>setProductCategory(...selected)}
            options={makeCategoryList()}
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
