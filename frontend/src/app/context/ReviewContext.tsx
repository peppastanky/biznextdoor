import { createContext, useContext, useState, ReactNode } from "react";

export interface Review {
  id: string;
  name: string;
  type: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  function addReview(review: Review) {
    setReviews(prev => [...prev, review]);
  }

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
}
