"use client";

import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-gray-800">
        {product.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {product.description}
      </p>

      <div className="mt-4 space-y-1">
        <p className="text-green-600 font-semibold">
          ₹ {product.price}
        </p>
        <p className="text-blue-600">
          Stock: {product.quantity}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <Link
          href={`/edit-product/${product.id}`}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}