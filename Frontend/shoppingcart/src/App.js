import './App.css';
import Products from './screens/Products';
import Home from './screens/Home';
import Cart from './screens/Cart';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
           <Route exact path="/" element={<Home />} />
           <Route exact path="/products" element={<Products />} />
           <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </div>
     </Router>
  );
}

export default App;
