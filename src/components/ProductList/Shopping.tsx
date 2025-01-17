import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import styles from "./Shopping.module.css";

interface Product {
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  currency: string;
  category: string;
  sizes: string[];
  image: string;
  description: string[];
  url: string;
}

const Shopping: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL("http://localhost:8000/products");

    if (categoryFilter && categoryFilter !== "all") {
      url.searchParams.append("category", categoryFilter);
    }

    if (priceFilter && priceFilter !== "all") {
      const [minPrice, maxPrice] = priceFilter.split("-");
      if (minPrice) {
        url.searchParams.append("minPrice", minPrice);
      }
      if (maxPrice) {
        url.searchParams.append("maxPrice", maxPrice);
      }
    }
    fetch(url.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products || data);
      })
      .catch((error) => {
        setError("Error fetching products");
      });
  }, [categoryFilter, priceFilter]);

  return (
    <div>
      <Filters
        onCategoryChange={setCategoryFilter}
        onPriceChange={setPriceFilter}
      />
      {error && <div className="error">{error}</div>}
      <div className={styles.container}>
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shopping;
