import { useState } from "react";
import { Link } from "react-router-dom";
import shippingData from "../../mockData/shippingData";
import ShippingCalculator from "./ShippingCalculator";
import "../Shipping/Shipping.css";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState(""); // State to track selected country
  const [weight, setWeight] = useState(""); // State to track weight input
  const [isJewelry, setIsJewelry] = useState(false); // State to track if jewelry is included
  const [message, setMessage] = useState(""); // State to hold the shipping message
  const [validationError, setValidationError] = useState(""); // State to hold validation error messages

  const handleCountrySelect = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    setMessage("");
    setValidationError("");
    if (selected === "India") {
      setMessage(shippingData.India.message);
      setWeight("");
      setIsJewelry(false);
    }
  };

  const handleWeightCalculator = (e) => {
    setWeight(e.target.value);
    setMessage("");
    setValidationError("");
  };

  const isJewelryIncluded = (e) => {
    setIsJewelry(e.target.checked);
    setMessage("");
    setValidationError("");
  };

  const calculateShipping = () => {
    setMessage("");
    setValidationError("");

    // Since button disabled when no country or India, no need to validate country here

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setValidationError("Please enter a valid shipping weight in kilograms.");
      return;
    }

    const roundedWeight = Math.ceil(weightNum);

    if (roundedWeight > 10) {
      setMessage(
        "Orders over 10 kgs require custom quotes — please contact us directly for bulk pricing."
      );
      return;
    }

    let shippingCost = roundedWeight * shippingData.USA.cost;

    if (isJewelry) {
      shippingCost += shippingData.USA.jewelrySurcharges;
    }

    setMessage(
      `Estimated shipping cost: ₹${shippingCost} for ${roundedWeight} kg${
        isJewelry
          ? ` (including ₹${shippingData.USA.jewelrySurcharges} customs surcharge for jewelry)`
          : ""
      }.`
    );
  };

  return (
    <section>
    <div className="shipping-container">
        <h2>Shipping Information 🚚</h2>
        <ul>
          <li>🚚 <strong>Free shipping</strong> across India — no matter the quantity or weight!</li>
          <li>🌏 Use the calculator below for knowing your customized international shipping rates.</li>
          <li>⚠️ Orders over 10 kgs require <em>custom quotes</em> — 👉<Link to="/ContactUs">Contact Us</Link>👈.</li>
          <li>💎 Jewelry orders incur an additional customs surcharge.</li>
          <li>⚖️ Weight is rounded <strong>up</strong> to the nearest kg as per the standard carrier shipping policies</li>
          <li>🏙️ St. Louis customers: in-person pickups will get extra discounts on shipping rates</li>
          <li>🕒 Shipping due at dispatch (monthly or biweekly).</li>
          <li>📲 Questions? Reach us via WhatsApp or 👉<Link to="/ContactUs">Contact Us</Link>👈.</li>
        </ul>

         {/* Shipping Rates Table */}
        <table className="shipping-rates-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Cost per kg</th>
              <th>Jewelry Surcharge</th>
            </tr>
          </thead>
          <tbody>
          {/* Map through shippingData to create table rows */
            /* Assuming shippingData is an object with country names as keys */}
            {Object.entries(shippingData).map(([country, data]) => (
              <tr key={country}>
                <td>{country}</td>
                <td>{data.cost === 0 ? "Free" : `₹${data.cost}`}</td>
                <td>{data.jewelrySurcharges ? `₹${data.jewelrySurcharges}` : "N/A"}</td>
              </tr>
            ))}
          </tbody>

      </table>
      </div>
      {/* Shipping Calculator Child Component */}
      <ShippingCalculator
        selectedCountry={selectedCountry}
        weight={weight}
        isJewelry={isJewelry}
        message={message}
        validationError={validationError}
        handleCountrySelect={handleCountrySelect}
        handleWeightCalculator={handleWeightCalculator}
        isJewelryIncluded={isJewelryIncluded}
        calculateShipping={calculateShipping}
        jewelrySurcharges={shippingData.USA.jewelrySurcharges}
      />
      </section>
  );
};

export default Shipping;