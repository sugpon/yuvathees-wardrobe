import{ BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import AboutUs from './components/AboutUs/AboutUs'
import Services from './components/Services/Services'
import Shipping from './components/Shipping/Shipping'
import ContactUs from './components/ContactUs/ContactUs'
import Footer from './components/Footer/Footer'
import './App.css'
import './index.css'

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
