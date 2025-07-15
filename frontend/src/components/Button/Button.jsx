// This Button component can be reused in various parts of the application

import "./Button.css";

const Button = ({ label, onClick, disabled = false, type = "button" }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
