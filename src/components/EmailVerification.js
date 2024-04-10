import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div>
      <div className=" text-5xl py-5 border-b flex justify-between">
        <h1 className=" ml-5">Dibble</h1>
        <div className=" mr-6 flex gap-3 items-center">
          <img
            src={userDetails.imageURL}
            alt="image"
            className=" w-10 h-10 rounded-full"
          />
          <button className=" bg-pink-400 text-white font-bold text-sm p-2 rounded-lg">
            Upload
          </button>
          <button
            className=" bg-cyan-400 text-white font-bold text-sm p-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
      <div className=" text-center mt-6">
        <h1 className=" font-bold text-3xl">Please verify your email...</h1>
        <FontAwesomeIcon
          icon={faEnvelopeCircleCheck}
          className=" text-slate-400 text-8xl mt-6"
        />
        <p className=" text-slate-600 mt-6">
          Please verify your email address. We've sent confirmation email to:
        </p>
        <h1 className=" font-bold mt-6 text-lg">{userDetails.email}</h1>
        <p className=" text-slate-600 mt-6">
          Click on the confirmation link in that email to begin using Dribble.
        </p>
        <p className=" text-slate-600 mt-6">
          Didn't receive email ? Check your spam folder,It may have been caught
          by filter. If you still don't see it.{" "}
          <span className=" text-pink-500">
            You can resend the confirmation email
          </span>
        </p>
        <div className=" text-slate-600 mt-6">
          Wrong email address ?{" "}
          <span className=" text-pink-500">change it.</span>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
