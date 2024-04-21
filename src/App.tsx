import React, { useEffect } from 'react';
import { useState } from 'react';
import logo from './img/logo.svg';
import menu from './img/menu.png';
import cart from './img/cart.png';
import up from './img/up.png';
import down from './img/down.png';
import './App.css';
import Product from './product/product';
import renderProduct from './product/product';

export interface IFurniture {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

const list: IFurniture[] = [
  {
    id: 1,
    image: 'https://i.ibb.co/N141Nkh/product-1.jpg',
    title: 'Queen Panel Bed',
    price: 10.99,
    quantity: 1
  },
  {
    id: 2,
    image: 'https://i.ibb.co/LhJwhB4/product-2.jpg',
    title: 'King Panel Bed',
    price: 12.99,
    quantity: 1
  },
  {
    id: 3,
    image: 'https://i.ibb.co/C9Px1MK/product-3.jpg',
    title: 'Single Panel Bed',
    price: 12.99,
    quantity: 1
  },
  {
    id: 4,
    image: 'https://i.ibb.co/wsCjr8f/product-4.jpg',
    title: 'Twin Panel Bed',
    price: 22.99,
    quantity: 1
  },
  {
    id: 5,
    image: 'https://i.ibb.co/pddxNnJ/product-5.jpg',
    title: 'Fridge',
    price: 88.99,
    quantity: 1
  },
  {
    id: 6,
    image: 'https://i.ibb.co/f1v6rY1/product-6.jpg',
    title: 'Dresser',
    price: 32.99,
    quantity: 1
  },
  {
    id: 7,
    image: 'https://i.ibb.co/2S1S8PQ/product-7.jpg',
    title: 'Couch',
    price: 45.99,
    quantity: 1
  },
  {
    id: 8,
    image: 'https://i.ibb.co/v4WBDz4/product-8.jpg',
    title: 'Table',
    price: 33.99,
    quantity: 1
  }
]


function App() {
  const [products, setProducts] = useState(list);
  const [seeCart, setSeeCart] = useState(false)
  const [cartList, setCartList] = useState<IFurniture[]>([]);

  const showCart = () => {
    setSeeCart(true)
  }

  const closeCart = () => {
    setSeeCart(false)
  }

  const addProductToCartList = (product: IFurniture) => {
    const indexOfProduct = cartList.findIndex((productFromCart) => productFromCart.id === product.id)
    if (indexOfProduct === -1) {
      setCartList([...cartList, product])
    } else if (indexOfProduct > -1) {
      const newCartList = [...cartList];
      newCartList[indexOfProduct].quantity = newCartList[indexOfProduct].quantity + 1;
      setCartList(newCartList);

    }
  }

  const clearCart = () => {
    setCartList([])
    setSeeCart(false)
  }


  const handleIncreaseQuantity = (id: number) => {
    const indexOfProduct = cartList.findIndex((productFromCart) => productFromCart.id === id)
    const newCartList = [...cartList]
    newCartList[indexOfProduct].quantity = newCartList[indexOfProduct].quantity + 1;
    setCartList(newCartList)
  }

  const handleDeacreseQuantity = (id: number) => {
    const indexOfProduct = cartList.findIndex((productFromCart) => productFromCart.id === id)
    const newCartList = [...cartList]
    newCartList[indexOfProduct].quantity = newCartList[indexOfProduct].quantity - 1;
    setCartList(newCartList)
  }

  const handleDecreasingQuantiry = () => {

  }

  return (
    <div>
      {seeCart ? (
        <div className='cart-box'>
          <div className='cart'>
            <button onClick={closeCart} className='close-btn'> x </button>
            <div className='cart-title'><h2>Your Cart</h2></div>
            {cartList.map((cartItem) => (
              <div className='items-selected'>
                <img className='cart-img' src={cartItem.image} />
                <div className='cart-items-added'>
                  <p>{cartItem.title}</p>
                  <p>{cartItem.price}</p>
                  <button className='remove-btn'>remove</button>
                </div>
                <div className='change-quantity'>
                  <img onClick={() => handleIncreaseQuantity(cartItem.id)} src={up} />
                  <p>{cartItem.quantity}</p>
                  <img onClick={() => handleDeacreseQuantity(cartItem.id)} src={down} />
                </div>
              </div>
            ))}
            <div className='clear-cart'>
              <button onClick={clearCart} className='clear-cart-btn'>CLEAR CART</button>
            </div>
          </div>
        </div>
      ) : ''}
      <div className='navigation-bar'>
        <img src={menu} />
        <img src={logo} />
        <div onClick={showCart} className='menu-cart'>
          <img src={cart} />
          <div className='items-number-cart'>
            <div> {cartList.map((cartItem) => cartItem.quantity).reduce((prev, current) => prev + current, 0)} </div>
          </div>
        </div>
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
          <Product product={productFromMap} addProduct={addProductToCartList} />
        ))}
      </div>


    </div>
  );
}

export default App;
