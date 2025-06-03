import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';

export default function Index() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'checking') return;
console.log("status:" +status)
    if (status === 'authenticated') {
      router.replace('/(tabs)');
    } else {
      router.replace('/login');
    }
  }, [status]);

  return null; 
}