import { useState, useEffect } from 'react';
import {
  collection,
  query,
  getDocs,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Job } from '../types';

export const useHomeownerJobs = (homeownerId: string | undefined) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!homeownerId) return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'jobs'),
          where('homeownerId', '==', homeownerId),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const fetchedJobs = querySnapshot.docs.map(doc => doc.data() as Job);
        setJobs(fetchedJobs);
      } catch (err) {
        console.error('Error fetching homeowner jobs:', err);
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [homeownerId]);

  return { jobs, loading, error };
};
