import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShippingCalculator from "./ShippingCalculator";
import "./Shipping.css";

const GuestShipping = () => {
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculator states 
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [isJewelry, setIsJewelry] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

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
  }, []);

  // Handlers (these are passed down *as is* to ShippingCalculator)
  const handleCountrySelect = (e) => {
    setSelectedCountry(e.target.value);
    setMessage("");
    setValidationError("");
    setWeight("");
    setIsJewelry(false);
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

    if (!selectedCountry) {
      setValidationError("Please select a country.");
      return;
    }

    const weightNum = parseFloat(weight);

    if (selectedCountry !== "India" && (isNaN(weightNum) || weightNum <= 0)) {
      setValidationError("Please enter a valid weight in kilograms.");
      return;
    }

    if (weightNum > 10) {
      setMessage(
        "Orders over 10 kgs require custom quotes — please contact us directly."
      );
      return;
    }

    const rate = shippingRates.find(
      (rate) => rate.country.toLowerCase() === selectedCountry.toLowerCase()
    );

    if (!rate) {
      setValidationError("Shipping rate for the selected country not found.");
      return;
    }

    const roundedWeight = Math.ceil(weightNum);
    let totalCost = roundedWeight * rate.costPerKg;

    if (isJewelry) {
      totalCost += rate.jewelrySurcharge || 0;
    }

    setMessage(
      `Estimated shipping cost: ₹${totalCost} for ${roundedWeight} kg${
        isJewelry ? ` (including ₹${rate.jewelrySurcharge} surcharge for jewelry)` : ""
      }.`
    );
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
