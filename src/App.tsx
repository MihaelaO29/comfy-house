import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import logo from './img/logo.svg';
import menu from './img/menu.png';
import cart from './img/cart.png';
import up from './img/up.png';
import down from './img/down.png';
import bin from './img/bin.png';
import './App.css';
import Product from './product/product';
import _ from 'lodash';

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
  const [products] = useState(list);
  const [seeCart, setSeeCart] = useState(false)
  const [cartList, setCartList] = useState<IFurniture[]>([]);
  const shopNowRef: any = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const cartListFromStorage: IFurniture[] = JSON.parse(localStorage.getItem('cart'));
    if (!_.isEmpty(cartListFromStorage) && _.isArray(cartListFromStorage)) {
      setCartList(cartListFromStorage);
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (!_.isEmpty(cartList)) {
      localStorage.setItem('cart', JSON.stringify(cartList))
    }
  }, [cartList])

  const showCart = () => {
    setSeeCart(true);
    document!.getElementById('html')!.style!.overflow = 'hidden';
  }

  const closeCart = () => {
    setSeeCart(false);
    document!.getElementById('html')!.style!.overflow = 'scroll';
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
    localStorage.setItem('cart', JSON.stringify([]))
    setSeeCart(false)
    document!.getElementById('html')!.style!.overflow = 'scroll';
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

    if (newCartList[indexOfProduct].quantity === 0) {
      handleRemoveItemFromCart(id);
    }
  }

  const handleRemoveItemFromCart = (id: number) => {
    const filtredList = cartList.filter(item => item.id !== id)
    setCartList(filtredList)
    if (_.isEmpty(filtredList)) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  const handleShopNowClick = () => {
    // @ts-ignore
    const { current } = shopNowRef;
    if (current != null) {
      current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const calucalteCartTotal = () => {
    const totalCalc = cartList.map((item) => item.price * item.quantity);
    const total = totalCalc.reduce((prev, current) => prev + current, 0)
    return total.toFixed(2)
  }

  return (
    <div>
      {seeCart ? (
        <div className='cart-box'>
          <div className='cart'>
            <button onClick={closeCart} className='close-btn'> x </button>
            <div className='cart-title'><h2>Your Cart</h2></div>
            <div className='cart-list'>
              {cartList.map((cartItem) => (
                <div key={`cart-item-${cartItem.id}`} className='items-selected'>
                  <div className='cart-img' style={{ backgroundImage: `url(${cartItem.image})` }} />
                  <div className='cart-items-added'>
                    <p className='cart-title'>{cartItem.title}</p>
                    <p className='cart-price'>{cartItem.price}</p>
                    <img alt='Remove' className='bin-btn' onClick={() => handleRemoveItemFromCart(cartItem.id)} src={bin} />
                  </div>
                  <div className='change-quantity'>
                    <img className='change-quantitiy-arrow' alt='Increase' onClick={() => handleIncreaseQuantity(cartItem.id)} src={up} />
                    <p style={{ margin: '4px 0' }}>{cartItem.quantity}</p>
                    <img className='change-quantitiy-arrow' alt='Decrease' onClick={() => handleDeacreseQuantity(cartItem.id)} src={down} />
                  </div>
                </div>
              ))}
            </div>
            <div className='total-price'>Your Total: {calucalteCartTotal()}</div>
            <div className='clear-cart'>
              <button onClick={clearCart} className='clear-cart-btn'>CLEAR CART</button>
            </div>
          </div>
        </div>
      ) : ''}
      <div className='navigation-bar'>
        <img alt='Menu' style={{ cursor: 'pointer' }} src={menu} />
        <img alt='Logo' className='logo' style={{ cursor: 'pointer' }} src={logo} />
        <div onClick={showCart} className='menu-cart'>
          <img alt='Cart' src={cart} />
          <div className='items-number-cart'>
            <div> {cartList.map((cartItem) => cartItem.quantity).reduce((prev, current) => prev + current, 0)} </div>
          </div>
        </div>
      </div>

      <div className='background-img'>
        <div className='title-box'>
          <div className='title'>FURNITURE COLLECTION</div>
          <button onClick={handleShopNowClick} className='shop-btn'>SHOP NOW</button>
        </div>

      </div>
      <div key='description' ref={shopNowRef} className='description'>Our Products</div>
      <div key='products-list' className='products-list'>
        {products.map((productFromMap) => (
          <Product key={`product-item-${productFromMap.id}`} product={productFromMap} addProduct={addProductToCartList} />
        ))}
      </div>
    </div>
  );
}

export default App;
