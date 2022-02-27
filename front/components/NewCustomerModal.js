import React, { useState, useCallback } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeNewCustomerModal, createNewCustomerAction } from "../reducers/customer";
import useInput from "../hooks/useInput";

const NewCustomerModal = () => {
  const dispatch = useDispatch();
  const { createNewCustomerLoading } = useSelector((state) => state.customer);
  const [customerCode, onChangeCustomerCode, setCustomerCode] = useInput();
  const [customerName, onChangeCustomerName] = useInput();
  const [customerType, setCustomerType] = useState("구매");
  const [autoCode, setAutoCode] = useState(false);
  
  const onClickNewCustomerClose = useCallback(() => {
    dispatch(closeNewCustomerModal());
  })
  const onClickCreateNewCustomer = useCallback(() => {
    dispatch(createNewCustomerAction({
      id: customerCode,
      companyName: customerName,
      customerType: customerType,
      tradingVolume: '0',
    }));
  })
  const onChangeCustomerType = useCallback(() => {
    setCustomerType(customerType === '구매' ? '판매':'구매')
  })
  const onChangeAutoCodeCheck = useCallback(() => {
    setAutoCode(!autoCode);
    setCustomerCode(null);
  })

  return (
    <Modal show={true} onHide={onClickNewCustomerClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>거래처 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-3">거래처코드 (체크시 자동생성)</Form.Label>
          <InputGroup>
            <InputGroup.Checkbox checked={autoCode} onChange={onChangeAutoCodeCheck}/>
            <Form.Control type="text" value={customerCode} onChange={onChangeCustomerCode} disabled={autoCode} />
          </InputGroup>
          <Form.Label className="mt-3">회사명</Form.Label>
          <Form.Control type="text" value={customerName} onChange={onChangeCustomerName} />
          <Form.Label className="mt-3">거래형태</Form.Label>
          <Form.Check
            type="radio"
            name="transactionType"
            label="구매"
            checked={customerType === '구매'}
            onChange={onChangeCustomerType}
          />
          <Form.Check
            type="radio"
            name="transactionType"
            label="판매"
            checked={customerType === '판매'}
            onChange={onChangeCustomerType}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickNewCustomerClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onClickCreateNewCustomer} disabled={createNewCustomerLoading}>
            {createNewCustomerLoading ? '처리중' : '생성'}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default NewCustomerModal;
