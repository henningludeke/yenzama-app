import { useState, useEffect } from 'react';
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Review, User } from '../types';

export const useTradespersonReviews = (tradespersonId: string | undefined) => {
  const [reviews, setReviews] = useState<(Review & { reviewerName: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tradespersonId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'reviews'),
          where('tradespersonId', '==', tradespersonId),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => doc.data() as Review);

        const enrichedReviews = await Promise.all(
          fetchedReviews.map(async (review) => {
            const userDoc = await getDoc(doc(db, 'users', review.homeownerId));
            const userData = userDoc.data() as User;
            return {
              ...review,
              reviewerName: userData?.displayName || 'Unknown',
            };
          })
        );

        setReviews(enrichedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tradespersonId]);

  return { reviews, loading, error };
};
