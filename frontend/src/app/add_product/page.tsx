"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api";
import styles from "./AddProduct.module.css";

export default function AddProduct() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(formData.id),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      }),
    });

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Add New Product</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            name="id"
            placeholder="Product ID"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}