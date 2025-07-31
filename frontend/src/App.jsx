import{ BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
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
  //State to track admin login status
 const[isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home isLoggedin= {isLoggedIn} setIsLoggedIn= {setIsLoggedIn} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shipping" element={<Shipping />} />
           <Route path="/contactus" element={<ContactUs isLoggedIn={isLoggedIn} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
