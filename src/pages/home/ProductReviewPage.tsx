import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Loading from "../Loading";
import { useState } from "react";
import { Star, Loader } from "lucide-react"; // Import the Loader icon
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
    setSubmitting(true); // Set submitting to true
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
    } finally {
      setSubmitting(false); // Reset submitting state after try-catch
    }
  };

  if (submitted) return <ThankYouPage />;

  return (
    <main className="p-10">
      {/* Full-width card with background image */}
      <div
        className="relative w-full h-80 rounded-lg overflow-hidden mb-10" // Full width and fixed height
        style={{
          backgroundImage: `url(${product.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center p-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
            <p className="text-lg">{product.description}</p>
          </div>
        </div>
      </div>

      <section className="mt-10 p-6 border rounded-lg shadow-md border-cyan-800">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  rating >= star ? "text-yellow-400" : "text-gray-400"
                } hover:text-yellow-400 transition duration-200`}
                size={24}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {rating} Star{rating !== 1 ? "s" : ""}
            </span>
          </div>
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 w-full h-32 rounded-md border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
            disabled={submitting} // Disable button while submitting
          >
            {submitting ? (
              <div className="flex items-center">
                <Loader className="animate-spin mr-2" size={16} /> Submitting...
              </div>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
