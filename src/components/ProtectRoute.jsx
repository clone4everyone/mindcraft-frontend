import { useUser, useClerk } from '@clerk/clerk-react';

const ProtectRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const { redirectToSignIn } = useClerk();

  // Wait for Clerk to load
  if (!isLoaded) return null;

  // If not signed in, redirect
  if (!isSignedIn) {
    redirectToSignIn();
    return null;
  }

  return children;
};

export default ProtectRoute;
