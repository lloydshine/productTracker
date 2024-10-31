import { useState } from "react";
import { Review } from "../utils/globals";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSentiment, setSelectedSentiment] = useState<
    "all" | "positive" | "negative"
  >("all");
  const reviewsPerPage = 3;

  // Filter reviews based on the selected sentiment
  const filteredReviews =
    selectedSentiment === "all"
      ? reviews
      : reviews.filter(
          (review) => review.analysis.sentiment === selectedSentiment
        );

  // Calculate total pages
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Get the reviews for the current page
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div>
      {/* Sentiment Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by sentiment:</label>
        <select
          className="text-black rounded-md"
          value={selectedSentiment}
          onChange={(e) =>
            setSelectedSentiment(
              e.target.value as "all" | "positive" | "negative"
            )
          }
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      {/* Reviews section */}
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[15rem]">
        {currentReviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
