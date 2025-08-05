import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShippingCalculator from "./ShippingCalculator";
import "./Shipping.css";

const GuestShipping = () => {
  const [shippingRates, setShippingRates] = useState([]); // State to hold shipping rates fetched from backend
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors from backend

  // Shipping Calculator states 
  const [selectedCountry, setSelectedCountry] = useState(""); // State to hold the selected country for shipping
  const [weight, setWeight] = useState(""); // State to hold the weight input for shipping calculation
  const [isJewelry, setIsJewelry] = useState(false); // State to track if jewelry is included in the shipping
  const [message, setMessage] = useState(""); // State to hold the message for shipping calculation results
  const [validationError, setValidationError] = useState(""); // State to hold validation errors for the shipping calculator

  useEffect(() => {
    fetch("http://localhost:8080/shipping/rates")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch shipping rates");
        }
        return res.json();
      })
      .then((data) => {
        setShippingRates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Fetch shipping rates from backend on component mount

  // Handlers (these are passed down *as is* to ShippingCalculator)
  const handleCountrySelect = (e) => {
    setSelectedCountry(e.target.value);
    setMessage("");
    setValidationError("");
    setWeight("");
    setIsJewelry(false);
  };

  // Handlers for weight input and jewelry checkbox
  const handleWeightCalculator = (e) => {
    setWeight(e.target.value);
    setMessage("");
    setValidationError("");
  };

  // Handlers for jewelry checkbox
  const isJewelryIncluded = (e) => {
    setIsJewelry(e.target.checked);
    setMessage("");
    setValidationError("");
  };

  // Function to calculate shipping cost based on selected country, weight, and jewelry inclusion
  const calculateShipping = () => {
    setMessage("");
    setValidationError("");

    if (!selectedCountry) {
      setValidationError("Please select a country.");
      return;
    }

    const weightNum = parseFloat(weight); // Convert weight input to a number

    if (selectedCountry !== "India" && (isNaN(weightNum) || weightNum <= 0)) {
      setValidationError("Please enter a valid weight in kilograms.");
      return; // Validate weight input
    }

    if (weightNum > 10) {
      setMessage(
        "Orders over 10 kgs require custom quotes — please contact us directly."
      ); // Custom message for orders over 10 kgs
      return; 
    }

    const rate = shippingRates.find(
      (rate) => rate.country.toLowerCase() === selectedCountry.toLowerCase()
    );

    if (!rate) {
      setValidationError("Shipping rate for the selected country not found.");
      return;
    }

    const roundedWeight = Math.ceil(weightNum); // Round up weight to the nearest kg as per standard carrier policies
    let totalCost = roundedWeight * rate.costPerKg; // Calculate total cost based on weight and cost per kg

    if (isJewelry) {
      totalCost += rate.jewelrySurcharge || 0; // Add jewelry surcharge if applicable
    }

    setMessage(
      `Estimated shipping cost: ₹${totalCost} for ${roundedWeight} kg${
        isJewelry ? ` (including ₹${rate.jewelrySurcharge} surcharge for jewelry)` : ""
      }.`
    ); // Set message with calculated shipping cost
  };

  return (
    <section>
      <div className="shipping-container">
        <h2>Shipping Information</h2>
        <ul>
          <li>
            🚚 <strong>Free shipping</strong> across India — no matter the
            quantity or weight!
          </li>
          <li>
            🌏 Use the calculator below for knowing your customized
            international shipping rates.
          </li>
          <li>
            ⚠️ Orders over 10 kgs require <em>custom quotes</em> — 👉
            <Link to="/ContactUs">Contact Us</Link>👈.
          </li>
          <li>💎 Jewelry orders incur an additional customs surcharge.</li>
          <li>
            ⚖️ Weight is rounded up to the nearest kg as per
            the standard carrier shipping policies
          </li>
          <li>
            🏙️ St. Louis customers: in-person pickups will get extra discounts
            on shipping rates
          </li>
          <li>🕒 Shipping due at dispatch (monthly or biweekly).</li>
          <li>
            📲 Questions? Reach us via WhatsApp or 👉
            <Link to="/ContactUs">Contact Us</Link>👈.
          </li>
        </ul>

        <h3 className="sub-title">📋 Current Shipping Rates</h3>

        {loading && <p>Loading rates... ⏳</p>}
        {error && <p className="validation-error">Oops! {error}</p>}

        {!loading && !error && (
          <table className="shipping-rates-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Cost per kg</th>
                <th>Jewelry Surcharge</th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", color: "goldenrod" }}>
                    No shipping rates available.
                  </td>
                </tr>
              ) : (
                shippingRates.map((rate) => (
                  <tr key={rate.id}>
                    <td>{rate.country}</td>
                    <td>{rate.costPerKg === 0 ? "Free" : `₹${rate.costPerKg}`}</td>
                    <td>{rate.jewelrySurcharge ? `₹${rate.jewelrySurcharge}` : "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
         <ShippingCalculator
            availableCountries={shippingRates.map((rate) => rate.country)}
            selectedCountry={selectedCountry}
            weight={weight}
            isJewelry={isJewelry}
            message={message}
            validationError={validationError}
            handleCountrySelect={handleCountrySelect}
            handleWeightCalculator={handleWeightCalculator}
            isJewelryIncluded={isJewelryIncluded}
            calculateShipping={calculateShipping}
            jewelrySurcharges={
                shippingRates.find((rate) => rate.country === selectedCountry)?.jewelrySurcharge || 0
          }
        />
      </div>
    </section>
  );
};

export default GuestShipping;
