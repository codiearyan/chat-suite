"use client";

import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import AuthForm from "@/components/auth/AuthForm";
import MessageDisplay from "@/components/auth/MessageDisplay";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import { tosUrl, privacyPolicyUrl } from "@/config";
import { useToast } from "@/components/ui/use-toast";

export default function AuthComponent() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleLogin = (email: string) => {
    if (!isTermsAccepted) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setMessageType(data.status === "Success" ? "success" : "error");
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage("An error occurred.");
        setMessageType("error");
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 m-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" />
      <div className="flex flex-col md:flex-row w-[450px] md:w-[800px] md:h-[540px] bg-neutral-800 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-large z-50 overflow-hidden relative">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 h-full bg-black/20 relative overflow-hidden">
          <img
            src="/auth/image-1.jpg"
            alt="Auth Image"
            className="w-full h-full object-cover absolute"
          />
          <h1 className="text-2xl font-bold font-inter-medium xs:text-3xl">
            CHATSUITE
          </h1>
        </div>

        {/* Auth Section */}
        <div className="md:w-1/2 p-6 sm:p-8 w-full h-full flex flex-col justify-center max-w-[320px] mx-auto">
          <Logo className={"w-24 h-24 mx-auto"} />

          {message && (
            <MessageDisplay message={message} messageType={messageType} />
          )}
          <h1 className="text-2xl text-white text-center font-bold font-inter-medium xs:text-3xl">
            CHATSUITE
          </h1>

          <h2 className="font-medium mb-2 text-neutral-300 text-center">
            All in One AI Workspace
          </h2>
          <hr className="border-0 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-2" />

          <GoogleSignInButton isTermsAccepted={isTermsAccepted} />

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
             <span className="px-4 text-sm text-white/50">OR</span>
             <div className="flex-grow h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
          </div>

           <AuthForm
            onEmailSubmit={handleLogin}
             isLoading={isLoading}
             isTermsAccepted={isTermsAccepted}
          />

          <div className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-xs text-white/50">
              When creating a new account, you agree to the
              <a href={tosUrl} className="underline">
                {" "}
                terms & conditions
              </a>{" "}
              and
              <a href={privacyPolicyUrl} className="underline">
                {" "}
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
