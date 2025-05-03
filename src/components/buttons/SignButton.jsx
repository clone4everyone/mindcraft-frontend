import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
const SignButton = () => {
    const {isSignedIn, isLoaded} = useUser();
    if(!isLoaded) return "....Loading";
    
  return (
    <div>
  <SignedOut >
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default SignButton;
