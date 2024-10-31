import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { Review } from "../utils/globals"; // Import your Review type if applicable

export const useRating = (id: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ratingsRef = collection(firestore, `products/${id}/reviews`);

  // Function to fetch reviews for the product in real-time
  const fetchRatings = () => {
    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      ratingsRef,
      (snapshot) => {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID if needed
          ...doc.data(),
        })) as Review[];
        setReviews(fetchedReviews);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to fetch reviews.");
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = fetchRatings();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id]);

  return { reviews, loading, error };
};
