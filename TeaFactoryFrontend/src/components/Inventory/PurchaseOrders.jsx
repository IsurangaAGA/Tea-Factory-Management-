import React, { useState, useEffect } from "react";

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]); // ItemMaster list

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const API_PO = "http://localhost:8080/api/purchase-orders/";
  const API_SUPPLIERS = "http://localhost:8080/api/suppliers/";
  const API_ITEM_MASTER = "http://localhost:8080/api/item-master/"; // FIXED: with trailing slash

  const [formData, setFormData] = useState({
    supplierId: "",
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    items: [{ itemId: "", quantity: 1 }],
  });

  // Load initial data
  useEffect(() => {
    loadPOs();
    loadSuppliers();
    loadItemMaster();
  }, []);

  // ---------------- LOAD DATA ---------------- //

  const loadPOs = async () => {
    try {
      const res = await fetch(API_PO);
      const data = await res.json();

      const cleaned = data.map((po) => ({
        ...po,
        items:
          Array.isArray(po.items) &&
          po.items.map((i) => ({
            id: i.id,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
            item: i.item,
          })),
      }));

      setPurchaseOrders(cleaned);
    } catch (err) {
      console.error(err);
      setError("Failed to load purchase orders");
    } finally {
      setLoading(false);
    }
  };

  const loadSuppliers = async () => {
    try {
      const res = await fetch(API_SUPPLIERS);
      setSuppliers(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadItemMaster = async () => {
    try {
      const res = await fetch(API_ITEM_MASTER);
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("ItemMaster API returned non-array:", data);
        setItems([]);
      } else {
        setItems(data);
      }
    } catch (e) {
      console.error("Error loading item master:", e);
    }
  };

  // ---------------- FORM ITEM CHANGES ---------------- //

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;
    setFormData({ ...formData, items: updated });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: "", quantity: 1 }],
    });
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // ---------------- CREATE PO ---------------- //

  const createPO = async (e) => {
    e.preventDefault();

    try {
      const itemsBody = formData.items.map((i) => ({
        quantity: Number(i.quantity),
        unitPrice: 0,
        item: { id: Number(i.itemId) },
      }));

      const body = {
        orderDate: formData.orderDate,
        status: formData.status,
        totalAmount: 0,
        supplier: { id: Number(formData.supplierId) },
        items: itemsBody,
      };

      const res = await fetch(API_PO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorTxt = await res.text();
        alert("Failed to create purchase order:\n\n" + errorTxt);
        return;
      }

      const created = await res.json();
      setPurchaseOrders([...purchaseOrders, created]);
      setShowForm(false);

      alert("Purchase Order Created Successfully!");
    } catch (err) {
      console.error(err);
      alert("Frontend error: Check console.");
    }
  };

  // ---------------- DELETE PO ---------------- //

  const deletePO = async (id) => {
    if (!window.confirm("Delete this PO?")) return;

    await fetch(API_PO + id, { method: "DELETE" });

    setPurchaseOrders(purchaseOrders.filter((p) => p.id !== id));
  };

  // ---------------- UI ---------------- //

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Purchase Orders</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => setShowForm(true)} style={{ marginBottom: 15 }}>
        ➕ Create Purchase Order
      </button>

      {/* TABLE */}
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po.id}>
              <td>PO-{po.id}</td>
              <td>{po.supplier?.name}</td>
              <td>{po.orderDate}</td>
              <td>{po.status}</td>
              <td>{po.items?.length || 0}</td>
              <td>
                <button onClick={() => deletePO(po.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- CREATE PO FORM --- */}
      {showForm && (
        <div style={{ marginTop: 25 }}>
          <h2>Create Purchase Order</h2>

          <form onSubmit={createPO}>
            <label>Supplier:</label>
            <select
              value={formData.supplierId}
              onChange={(e) =>
                setFormData({ ...formData, supplierId: e.target.value })
              }
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <h3>Items</h3>

            {formData.items.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: 10, marginBottom: 10 }}
              >
                <select
                  value={item.itemId}
                  onChange={(e) =>
                    handleItemChange(index, "itemId", e.target.value)
                  }
                  required
                >
                  <option value="">Select Item</option>
                  {items.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.type})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />

                {formData.items.length > 1 && (
                  <button type="button" onClick={() => removeItem(index)}>
                    ❌
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addItem}>
              ➕ Add Item
            </button>

            <br />
            <br />

            <button type="submit">Create</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
