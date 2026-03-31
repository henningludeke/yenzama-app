import { useState, useEffect } from 'react';
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { TradespersonProfile, User, TradeCategory } from '../types';

export const useTradespeople = (filters?: { trade?: TradeCategory }) => {
  const [tradespeople, setTradespeople] = useState<(TradespersonProfile & { name: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradespeople = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, 'tradespersonProfiles'));

        if (filters?.trade) {
          q = query(q, where('trades', 'array-contains', filters.trade));
        }

        const querySnapshot = await getDocs(q);
        const tpProfiles = querySnapshot.docs.map(doc => doc.data() as TradespersonProfile);

        // Fetch corresponding user names
        const enrichedTPs = await Promise.all(
          tpProfiles.map(async (profile) => {
            const userDoc = await getDoc(doc(db, 'users', profile.uid));
            const userData = userDoc.data() as User;
            return {
              ...profile,
              name: userData?.displayName || 'Unknown',
            };
          })
        );

        setTradespeople(enrichedTPs);
      } catch (err) {
        console.error('Error fetching tradespeople:', err);
        setError('Failed to fetch tradespeople');
      } finally {
        setLoading(false);
      }
    };

    fetchTradespeople();
  }, [filters?.trade]);

  return { tradespeople, loading, error };
};

export const useTradesperson = (id: string | undefined) => {
  const [tradesperson, setTradesperson] = useState<(TradespersonProfile & { name: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTradesperson = async () => {
      setLoading(true);
      try {
        const profileDoc = await getDoc(doc(db, 'tradespersonProfiles', id));
        if (profileDoc.exists()) {
          const profileData = profileDoc.data() as TradespersonProfile;
          const userDoc = await getDoc(doc(db, 'users', id));
          const userData = userDoc.data() as User;

          setTradesperson({
            ...profileData,
            name: userData?.displayName || 'Unknown',
          });
        } else {
          setError('Tradesperson not found');
        }
      } catch (err) {
        console.error('Error fetching tradesperson:', err);
        setError('Failed to fetch tradesperson');
      } finally {
        setLoading(false);
      }
    };

    fetchTradesperson();
  }, [id]);

  return { tradesperson, loading, error };
};
