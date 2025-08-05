import React, { useEffect, useState } from "react";
import "./Shipping.css";
import Button from "../Button/Button.jsx";

const AdminShipping = () => {
  const [shippingRates, setShippingRates] = useState([]); // State to hold existing shipping rates
  const [loading, setLoading] = useState(true); // State to track loading status from backend
  const [error, setError] = useState(null); // State to track errors 
  const [isAdding, setIsAdding] = useState(false); // State to track if adding a new country shipping data
  const [newCountry, setNewCountry] = useState({ country: "", costPerKg: "", jewelrySurcharge: "" }); // State for adding new country shipping data
  const [editId, setEditId] = useState(null); // State to track which entry is being edited in the table
  const [editData, setEditData] = useState({ country: "", costPerKg: "", jewelrySurcharge: "" }); // State for editing existing country shipping data
  const [formError, setFormError] = useState(""); // State for form validation errors

  // Fetch shipping rates from backend
  useEffect(() => {
    fetchRates(); //GET request to fetch shipping rates
  }, []);

  const fetchRates = () => {
    setLoading(true);
    fetch("http://localhost:8080/shipping/rates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch shipping rates");
        return res.json();
      })
      .then((data) => {
        setShippingRates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Handle deleting a shipping rate from the backend
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    fetch(`http://localhost:8080/shipping/rates/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        fetchRates();
      })
      .catch((err) => setError(err.message));
  };

  // Handle editing an existing shipping rate
  const startEdit = (rate) => {
    setEditId(rate.id);
    setEditData({
      country: rate.country,
      costPerKg: rate.costPerKg,
      jewelrySurcharge: rate.jewelrySurcharge || "",
    });
    setFormError("");
  };

  // Handle cancel editing an existing shipping rate
  const cancelEdit = () => {
    setEditId(null);
    setFormError("");
  };

  // Handle saving edited shipping rate in to the backend 
  const saveEdit = () => {
    if (!editData.country.trim()) {
      setFormError("Country name is required");
      return;
    }
    if (isNaN(editData.costPerKg) || editData.costPerKg === "") {
      setFormError("Valid cost per kg is required");
      return;
    }
    if (editData.jewelrySurcharge !== "" && isNaN(editData.jewelrySurcharge)) {
      setFormError("Jewelry surcharge must be a number or empty");
      return;
    }

    // PUT request to UPDATE the shipping rates in the backend
    fetch(`http://localhost:8080/shipping/rates/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: editData.country.trim(),
        costPerKg: parseFloat(editData.costPerKg),
        jewelrySurcharge: editData.jewelrySurcharge === "" ? null : parseFloat(editData.jewelrySurcharge),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update shipping rate");
        setEditId(null);
        fetchRates();
      })
      .catch((err) => setFormError(err.message));
  };

  // Handle new country input change
  const handleNewCountryChange = (e) => {
    const { name, value } = e.target;
    setNewCountry((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new country addition in to the backend
  const addNewCountry = () => {
    if (!newCountry.country.trim()) {
      setFormError("Country name is required");
      return;
    }
    if (isNaN(newCountry.costPerKg) || newCountry.costPerKg === "") {
      setFormError("Valid cost per kg is required");
      return;
    }
    if (newCountry.jewelrySurcharge !== "" && isNaN(newCountry.jewelrySurcharge)) {
      setFormError("Jewelry surcharge must be a number or empty");
      return;
    }

    // POST request to add new country shipping rates
    fetch("http://localhost:8080/shipping/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: newCountry.country.trim(),
        costPerKg: parseFloat(newCountry.costPerKg),
        jewelrySurcharge: newCountry.jewelrySurcharge === "" ? null : parseFloat(newCountry.jewelrySurcharge),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add new country");
        setNewCountry({ country: "", costPerKg: "", jewelrySurcharge: "" });
        setIsAdding(false);
        fetchRates();
      })
      .catch((err) => setFormError(err.message));
  };

  return (
    <section className="shipping-container">
      <h2>Shipping Services (Admin)</h2>

      {loading && <p>Loading shipping rates... ⏳</p>}
      {error && <p className="validation-error">{error}</p>}
      {formError && <p className="validation-error">{formError}</p>}

      {!loading && !error && (
        <>
          <table className="shipping-rates-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Cost per kg (₹)</th>
                <th>Jewelry Surcharge (₹)</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "goldenrod" }}>
                    No shipping rates available.
                  </td>
                </tr>
              )}

              {shippingRates.map((rate) => (
                <tr key={rate.id}>
                  {editId === rate.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editData.country}
                          onChange={(e) => setEditData({ ...editData, country: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.costPerKg}
                          onChange={(e) => setEditData({ ...editData, costPerKg: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.jewelrySurcharge}
                          onChange={(e) => setEditData({ ...editData, jewelrySurcharge: e.target.value })}
                        />
                      </td>
                      <td>
                        <Button label="Save" onClick={saveEdit} />
                      </td>
                      <td>
                        <Button label="Cancel" onClick={cancelEdit} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{rate.country}</td>
                      <td>{rate.costPerKg === 0 ? "Free" : `₹${rate.costPerKg}`}</td>
                      <td>{rate.jewelrySurcharge !== null ? `₹${rate.jewelrySurcharge}` : "N/A"}</td>
                      <td>
                        <Button label="Edit" onClick={() => startEdit(rate)} />
                      </td>
                      <td>
                        <Button label="Delete" onClick={() => handleDelete(rate.id)} />
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {/* Add new country row inline if isAdding */}
              {isAdding && (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country name"
                      value={newCountry.country}
                      onChange={handleNewCountryChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="costPerKg"
                      placeholder="Cost per kg"
                      value={newCountry.costPerKg}
                      onChange={handleNewCountryChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="jewelrySurcharge"
                      placeholder="Jewelry surcharge"
                      value={newCountry.jewelrySurcharge}
                      onChange={handleNewCountryChange}
                    />
                  </td>
                  <td>
                    <Button label="Add" onClick={addNewCountry} />
                  </td>
                  <td>
                    <Button label="Cancel" onClick={() => setIsAdding(false)} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Add new country button */}
          {!isAdding && (
            <Button label="Add New Country" onClick={() => setIsAdding(true)} />
          )}
        </>
      )}
    </section>
  );
};

export default AdminShipping;
  