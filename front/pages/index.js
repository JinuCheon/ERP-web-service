import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import AppLayout from '../components/AppLayout';

const Home = () => {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  return (
    <AppLayout>here is main page.</AppLayout>
  )
}

export default Home;
