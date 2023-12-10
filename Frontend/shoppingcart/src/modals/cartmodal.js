import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/cartSlice';
import { createPortal } from 'react-dom';
import "../stylings/modal.css"

function QuantityModal({ productName, onClose }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleDone = () => {
    dispatch(updateQuantity({ name: productName, quantity }));
    onClose();
  };

  return createPortal(
    <div className="quantity-modal-overlay">
      <div className="quantity-modal">
        <h3>{productName}</h3>
        <div>
          <button onClick={handleDecrement} >-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={handleDone}>Done</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default QuantityModal;
