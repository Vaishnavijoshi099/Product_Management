"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
import { Product } from "@/types/product";
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch products from backend
  const fetchProducts = async (query = "") => {
    try {
      const res = await fetch(`${BASE_URL}/products?search=${query}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id: number) => {
    await fetch(`${BASE_URL}/product/${id}`, { method: "DELETE" });
    fetchProducts(search); // refresh with current search
  };

  // Debounce: fetch products only after user stops typing for 500ms
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 500); // 500ms delay

    setDebounceTimer(timer);

    return () => clearTimeout(timer); // cleanup on unmount / new effect
  }, [search]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Product Management System</h1>

        <Link href="/add_product" className={styles.addButton}>
          + Add Product
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td className={styles.actions}>
                  <Link href={`/edit_product/${product.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && <div className={styles.emptyState}>No products available.</div>}
      </div>
    </div>
  );
}