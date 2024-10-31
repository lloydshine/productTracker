import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Product } from "../utils/globals"; // Import your Product interface
import { firestore } from "../utils/firebase";

export const useProducts = () => {
  const productsRef = collection(firestore, "products");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(productsRef);
      const productList: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const productRef = doc(firestore, "products", id);
      const snapshot = await getDoc(productRef);

      if (snapshot.exists()) {
        const fetchedProduct = {
          id: snapshot.id,
          ...snapshot.data(),
        } as Product;
        setProduct(fetchedProduct);
      } else {
        setError("Product not found.");
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError("Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error, fetchProduct };
};
