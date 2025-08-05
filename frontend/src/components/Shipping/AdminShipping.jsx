import React, { useEffect, useState } from "react";
import "./Shipping.css";
import Button from "../Button/Button.jsx";

const AdminShipping = () => {
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for adding/editing
  const [isAdding, setIsAdding] = useState(false);
  const [newCountry, setNewCountry] = useState({ country: "", costPerKg: "", jewelrySurcharge: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ country: "", costPerKg: "", jewelrySurcharge: "" });
  const [formError, setFormError] = useState("");

  // Fetch shipping rates from backend
  useEffect(() => {
    fetchRates();
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

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    fetch(`http://localhost:8080/shipping/rates/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        fetchRates();
      })
      .catch((err) => setError(err.message));
  };

  // Handle edit
  const startEdit = (rate) => {
    setEditId(rate.id);
    setEditData({
      country: rate.country,
      costPerKg: rate.costPerKg,
      jewelrySurcharge: rate.jewelrySurcharge || "",
    });
    setFormError("");
  };

  // Handle cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setFormError("");
  };

  // Handle Save edited data 
  const saveEdit = () => {
    // Basic validation
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

  // Add new country
  const addNewCountry = () => {
    // Basic validation
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
  