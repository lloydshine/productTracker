import { useRating } from "../hooks/useRating";
import Reviews from "./Reviews";

export default function Ratings({ productId }: { productId: string }) {
  const { reviews } = useRating(productId);

  // Calculate total reviews and overall rating
  const totalReviews = reviews.length;
  const overallRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  // Calculate positive and negative reviews
  const positiveReviewsCount = reviews.filter(
    (review) => review.analysis.sentiment === "positive"
  ).length;

  const negativeReviewsCount = reviews.filter(
    (review) => review.analysis.sentiment === "negative"
  ).length;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Product</h1>

      {/* Dashboard cards */}
      <section className="grid gap-4 mb-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-green-600 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Total Reviews</h2>
          <p className="text-2xl">{totalReviews}</p>
        </div>
        <div className="bg-cyan-600 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Overall Rating</h2>
          <p className="text-2xl">{overallRating} / 10</p>
        </div>
        <div className="bg-fuchsia-600 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Positive Reviews</h2>
          <p className="text-2xl">{positiveReviewsCount}</p>
        </div>
        <div className="bg-orange-600 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Negative Reviews</h2>
          <p className="text-2xl">{negativeReviewsCount}</p>
        </div>
      </section>
      {/* Reviews section */}
      <Reviews reviews={reviews} />
    </main>
  );
}
