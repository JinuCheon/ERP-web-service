import React, { useState, useCallback } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeNewCustomerModal, createNewCustomerAction } from "../reducers/customer";
import useInput from "../hooks/useInput";

const NewCustomerModal = () => {
  const dispatch = useDispatch();
  const { createNewCustomerLoading } = useSelector((state) => state.customer);
  const [customerCode, onChangeCustomerCode] = useInput();
  const [customerName, onChangeCustomerName] = useInput();
  const [transactionType, setTransactionType] = useState("구매");
  
  const onClickNewCustomerClose = useCallback(() => {
    dispatch(closeNewCustomerModal());
  })
  const onClickCreateNewCustomer = useCallback(() => {
    dispatch(createNewCustomerAction({
      id: customerCode,
      companyName: customerName,
      type: transactionType,
      tradingVolume: '0',
    }));
  })
  const onChangeTransactionType = useCallback(() => {
    setTransactionType(transactionType === '구매' ? '판매':'구매')
  })

  return (
    <Modal show={true} onHide={onClickNewCustomerClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>거래처 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-3">거래처코드 (체크시 자동생성)</Form.Label>
          <InputGroup>
            <InputGroup.Checkbox/>
            <Form.Control type="text" onChange={onChangeCustomerCode} />
          </InputGroup>
          <Form.Label className="mt-3">회사명</Form.Label>
          <Form.Control type="text" onChange={onChangeCustomerName} />
          <Form.Label className="mt-3">거래형태</Form.Label>
          <Form.Check
            type="radio"
            name="transactionType"
            label="구매"
            checked={transactionType === '구매'}
            onChange={onChangeTransactionType}
          />
          <Form.Check
            type="radio"
            name="transactionType"
            label="판매"
            checked={transactionType === '판매'}
            onChange={onChangeTransactionType}
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
