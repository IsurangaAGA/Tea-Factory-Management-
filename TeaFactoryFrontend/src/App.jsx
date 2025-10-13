import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import OrderManagement from './pages/OrderManagement';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
