import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../stylings/products.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      let response = await axios.get('https://fakestoreapi.com/products?limit=12#');
      const responseData = response.data;

      let responseImg = await axios.post('http://localhost:5000/api/fetchData');
      const responseImgData = responseImg.data;

      const updatedLocalData = responseData.map(remoteProduct => {
        const matchingImgData = responseImgData.find(imgProduct => imgProduct.id === remoteProduct.id);
        return {
          ...remoteProduct,
          image: matchingImgData ? matchingImgData.image : null,
          showFullDescription: false,
        };
      });

      setProducts(updatedLocalData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const handleAddToCart = (product) => {
    const quantityInput = document.querySelector(`#quantity-${product.id}`);
    const quantity = parseInt(quantityInput.value, 10) || 1;

    dispatch(addToCart({ name: product.title, price: product.price,image:product.image, quantity }));

    setSelectedProduct(product);

    setTimeout(() => {
      setSelectedProduct(null);
    }, 3000);
  };

  const toggleDescription = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].showFullDescription = !updatedProducts[index].showFullDescription;
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (productId, value) => {
    const quantityInput = document.querySelector(`#quantity-${productId}`);
    const newValue = parseInt(quantityInput.value, 10) + value;
    quantityInput.value = Math.max(newValue, 1); 
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={handleSearch}/>
      <div className="container mt-4 product-container">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="row">
            {filteredProducts.length === 0 ? (
              <div className="text-center">
                <p style={{ color: 'red' }}>No items found!</p>
              </div>
            ) : (
              <div className="row">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <div className="card custom-card">
                      <img src={product.image} className="card-img-top" alt={product.title} />
                      <div className="card-body custom-card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">
                          {product.showFullDescription ? product.description : `${product.description.slice(0, 120)}...`}
                        </p>
                        <button className="btn btn-link" style={{ paddingLeft: 0 }} onClick={() => toggleDescription(index)}>
                          {product.showFullDescription ? 'Read Less' : 'Read More'}
                        </button>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <p className="card-text">${product.price}</p>
                          <div className="d-flex align-items-center">
                            <label className="me-2">Quantity:</label>
                            <div className="quantity-controls">
                              <button className="btn btn-quantity" onClick={() => handleQuantityChange(product.id, -1)}>
                                <i className="fa fa-minus"></i>
                              </button>
                              <input id={`quantity-${product.id}`} type="text" readOnly defaultValue="1" className="quantity-input" />
                              <button className="btn btn-quantity" onClick={() => handleQuantityChange(product.id, 1)}>
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-primary cartbtn" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </button>
                          {selectedProduct === product && (
                            <div className="cart-message">
                              Product added to cart!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );  
}

export default Products;
