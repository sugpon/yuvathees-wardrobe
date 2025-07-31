import Button from "../Button/Button.jsx";

const ShippingCalculator = (props) => { // props to handle state and functions from parent component
  return (
    <div className="shipping-calculator">
      <h2>Shipping Calculator</h2>

      <label htmlFor="country">Select Country:</label>
      <select
        id="country"
        value={props.selectedCountry}
        onChange={props.handleCountrySelect}
      >
        <option value="" disabled>-- Select a country --</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>

      <label htmlFor="weight">Enter Weight (kg):</label>
      <input
        id="weight"
        type="number"
        placeholder="e.g. 2.5"
        value={props.weight}
        onChange={props.handleWeightCalculator}
        disabled={props.selectedCountry === "India" || !props.selectedCountry}
      />

      <label htmlFor="jewelry">
        <input
          id="jewelry"
          type="checkbox"
          checked={props.isJewelry}
          onChange={props.isJewelryIncluded}
          disabled={props.selectedCountry === "India" || !props.selectedCountry}
        />
        Includes Jewelry (₹{props.jewelrySurcharges} surcharge)
      </label>

      <Button
        label="Calculate"
        onClick={props.calculateShipping}
        disabled={props.selectedCountry === "India" || !props.selectedCountry}
      />

      {props.validationError && <p className="validation-error">{props.validationError}</p>}
      {props.message && <p>{props.message}</p>}
    </div>
  );
};

export default ShippingCalculator;