import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-5">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-8">
        Your submission has been received. We appreciate your response!
      </p>
      <Link
        to="/"
        className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
