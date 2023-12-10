import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import QuantityModal from '../modals/cartmodal';
import '../stylings/cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formattedTotalPrice = calculateTotalPrice().toFixed(2);

  const handleRemove = (productName) => {
    dispatch(removeFromCart({ name: productName }));
  };

  const handleUpdateQuantity = (productName) => {
    setSelectedProduct(productName);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar showSearch={false}  />
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <strong>{item.name}</strong>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="update-button" onClick={() => handleUpdateQuantity(item.name)}>
                      Update Quantity
                    </button>
                    <button className="remove-button" onClick={() => handleRemove(item.name)}>
                      Remove Quantity
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-container">
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Total Price: ${formattedTotalPrice}</p>
            </div>
            {selectedProduct && (
              <QuantityModal productName={selectedProduct} onClose={handleCloseModal} />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
