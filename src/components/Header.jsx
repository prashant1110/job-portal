import React, { use, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./../components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (searchParams.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [searchParams]);

  const handleOverlayClick = (e) => {
    if (e.target == e.currentTarget) {
      setShowSignIn(false);
      setSearchParams({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center px-2">
        <Link>
          {" "}
          <Link to="/">
            <img src="/updated-logo.png" className="h-20" alt="Hirrd Logo" />
          </Link>
        </Link>
        <SignedOut>
          <Button variant="outline" onClick={() => setShowSignIn(true)}>
            Login
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a job
                </Button>
              </Link>
            )}

            <UserButton appearance={{ elements: { avatarBox: "w-10 h-110" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                {user && user?.unsafeMetadata?.role === "candidate" && (
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-job"
                  />
                )}
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </SignedIn>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center z-100"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
