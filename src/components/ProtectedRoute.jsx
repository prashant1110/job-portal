import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const location = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={`/?sign-in=true&redirect=${location.pathname}`} replace />;
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    location.pathname !== "/onboarding"
  ) {
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect") || location.pathname;
    return <Navigate to={`/onboarding?redirect=${redirect}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
