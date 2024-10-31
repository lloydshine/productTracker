import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Loading from "../Loading";
import { useState } from "react";
import { Star } from "lucide-react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import ThankYouPage from "../ThankyouPage";
import { analyzeComment } from "../../utils/ai";

export default function ProductReviewPage() {
  const { id } = useParams();
  const { product, loading } = useProduct(id as string);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <Loading />;
  if (!product) return <>Not Found</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const analysis = await analyzeComment(comment);

      const productRef = doc(firestore, "products", id as string);
      const reviewsRef = collection(productRef, "reviews");
      await addDoc(reviewsRef, {
        rating,
        comment,
        analysis,
        createdAt: serverTimestamp(), // Use Firestore server timestamp
      });
      setSubmitted(true);
      console.log("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (submitted) return <ThankYouPage />;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <img src={product.imageUrl} alt={product.productName} className="my-4" />
      <p className="text-gray-200">{product.description}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                size={24}
              />
            ))}
            <span className="ml-2 text-gray-200">
              {rating} Star{rating !== 1 ? "s" : ""}
            </span>
          </div>
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 w-full h-32 rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-600 rounded-md"
            disabled={submitting}
          >
            Submit Review
          </button>
        </form>
      </section>
    </main>
  );
}
