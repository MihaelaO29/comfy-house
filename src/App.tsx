import React, { useEffect } from 'react';
import { useState } from 'react';
import logo from './img/logo.svg';
import menu from './img/menu.png';
import cart from './img/cart.png';
import background from './img/background.jpeg';
import './App.css';
import Product from './product/product';
import renderProduct from './product/product';

interface IFurniture {
  id: number;
  image: string;
  title: string;
  price: number;
}

const list: IFurniture[] = [
  {
    id: 1,
    image: 'https://i.ibb.co/N141Nkh/product-1.jpg',
    title: 'Queen Panel Bed',
    price: 10.99
  },
  {
    id: 2,
    image: 'https://i.ibb.co/LhJwhB4/product-2.jpg',
    title: 'King Panel Bed',
    price: 12.99
  },
  {
    id: 3,
    image: 'https://i.ibb.co/C9Px1MK/product-3.jpg',
    title: 'Single Panel Bed',
    price: 12.99
  },
  {
    id: 4,
    image: 'https://i.ibb.co/wsCjr8f/product-4.jpg',
    title: 'Twin Panel Bed',
    price: 22.99
  },
  {
    id: 5,
    image: 'https://i.ibb.co/pddxNnJ/product-5.jpg',
    title: 'Fridge',
    price: 88.99
  },
  {
    id: 6,
    image: 'https://i.ibb.co/f1v6rY1/product-6.jpg',
    title: 'Dresser',
    price: 32.99
  },
  {
    id: 7,
    image: 'https://i.ibb.co/2S1S8PQ/product-7.jpg',
    title: 'Couch',
    price: 45.99
  },
  {
    id: 8,
    image: 'https://i.ibb.co/v4WBDz4/product-8.jpg',
    title: 'Table',
    price: 33.99
  }
]

function App() {
  const [products, setProducts] = useState(list);

  return (
    <div>
      <div className='navigation-bar'>
        <img src={menu} />
        <img src={logo} />
        <img src={cart} />
      </div>

      <div className='background-img'>
        <div className='title-box'>
          <p className='title'>FURNITURE COLLECTION</p>
          <button className='shop-btn'>SHOP NOW</button>
        </div>

      </div>
      <div className='description'>Our Products</div>
      <div className='products-list'>
        {products.map((productFromMap) => (
          <Product product={productFromMap} />
        ))}
      </div>

      <div className='cart'></div>
    </div>
  );
}

export default App;
