export interface Product {
  id: string;
  productName: string;
  description: string;
  imageUrl: string;
}

export interface Review {
  id: string; // Unique identifier for the review (Firestore document ID)
  rating: number; // Rating given by the user (1-10 stars)
  comment: string; // Review text provided by the user
  createdAt: Date; // Timestamp of when the review was created
  analysis: Analysis; // Analysis object containing sentiment and feedback
}

// Analysis interface to encapsulate the sentiment analysis structure
export interface Analysis {
  sentiment: "positive" | "neutral" | "negative"; // Sentiment classification
  rating: number; // Sentiment rating (1-10)
  feedback: {
    positive: string[]; // Array of positive feedback comments
    negative: string[]; // Array of negative feedback comments
  };
}
