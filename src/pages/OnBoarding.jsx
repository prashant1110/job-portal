import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { Button } from "./../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const OnBoarding = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "candidate" ? "/jobs" : "/my-jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MoonLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "candidate" ? "/jobs" : "/post-job");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid sm:grid-cols-2 gap-4 w-full px-10 md:px-40">
        <Button
          variant="blue"
          className=" h-20 sm:h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-20 sm:h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
