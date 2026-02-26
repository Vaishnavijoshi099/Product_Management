"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BASE_URL } from "@/lib/api";
import styles from "./EditProduct.module.css";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const fetchProduct = async () => {
    const res = await fetch(`${BASE_URL}/product/${id}`);
    const data = await res.json();

    setFormData({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    });
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

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

    await fetch(`${BASE_URL}/product/${id}`, {
      method: "PUT",
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
        <h2 className={styles.title}>Edit Product</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            name="id"
            value={formData.id}
            disabled
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
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}