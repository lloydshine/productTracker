import { Review } from "../utils/globals";
import { formatCreatedAt } from "../utils/utils";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <h3 className="text-lg font-semibold">Review</h3>
      <div className="flex items-center">
        <span className="text-yellow-500">
          {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
        </span>
        <span className="text-gray-500 ml-2">
          {formatCreatedAt(review.createdAt)}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{review.comment}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Analysis</h4>
        <p className="text-gray-600">Sentiment: {review.analysis.sentiment}</p>
      </div>
    </div>
  );
}
