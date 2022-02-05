import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from '../components/AppLayout';

export default function Home() {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  return (
    <AppLayout>here is main page.</AppLayout>
  )
}
