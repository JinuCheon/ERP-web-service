import React from "react";
import { useSelector } from 'react-redux';

export default function Home() {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  return (
    <>
      <p>hello world</p>
    </>
  )
}
