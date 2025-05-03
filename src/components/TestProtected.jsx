import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestProtected = ({ children }) => {
  const { userId, testId } = useParams();
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && (!isSignedIn || userId !== user?.id || !testId)) {
      toast.error('🚫 You are not Allowed!');
      navigate('/'); // or navigate(-1) to go back
    }
  }, [isLoaded, isSignedIn, userId, user, testId, navigate]);

  if (!isLoaded) return null;

  if (!isSignedIn || userId !== user?.id || !testId) {
    return null; // Already redirected or blocked
  }

  return children;
};

export default TestProtected;
