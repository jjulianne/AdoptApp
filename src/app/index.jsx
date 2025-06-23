import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';

export default function Index() {
  const { status, user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (status === 'checking') return;

    if (status === 'authenticated')
       { if (user?.isAdmin) {
        router.replace('/(adminTabs)');
      }else{
      router.replace('/(tabs)');}
    } else {
      router.replace('/login');
    }
  }, [status]);

  return null; 
}