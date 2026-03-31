import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInMock: (phone: string, otp: string) => Promise<boolean>;
  setRole: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      } else {
        // If authenticated but no doc, check mock session
        const mockAuth = localStorage.getItem('yenzama_mock_auth');
        if (mockAuth) {
          const { phone } = JSON.parse(mockAuth);
          setUser({ uid, phone } as User);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        await fetchUserData(fbUser.uid);
      } else {
        // Check mock session
        const mockAuth = localStorage.getItem('yenzama_mock_auth');
        if (mockAuth) {
          const { uid } = JSON.parse(mockAuth);
          await fetchUserData(uid);
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInMock = async (phone: string, otp: string): Promise<boolean> => {
    if (phone === '+27800000001' && otp !== '123456') {
      return false;
    }

    if (phone !== '+27800000001' && (otp.length < 4 || otp.length > 6)) {
      return false;
    }

    const uid = 'mock-uid-' + phone.replace(/[^0-9]/g, '');
    localStorage.setItem('yenzama_mock_auth', JSON.stringify({ phone, uid }));

    // Update state directly instead of reload
    await fetchUserData(uid);
    return true;
  };

  const setRole = async (role: UserRole) => {
    const mockAuth = localStorage.getItem('yenzama_mock_auth');
    const uid = firebaseUser?.uid || (mockAuth ? JSON.parse(mockAuth).uid : null);
    const phone = firebaseUser?.phoneNumber || (mockAuth ? JSON.parse(mockAuth).phone : null);

    if (!uid) return;

    const userData: Partial<User> = {
      uid,
      role,
      phone,
      displayName: phone,
      createdAt: new Date() as any,
    };

    await setDoc(doc(db, 'users', uid), userData, { merge: true });
    setUser(prev => prev ? { ...prev, role } : userData as User);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem('yenzama_mock_auth');
    setFirebaseUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, signInMock, setRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
