import React, { useState } from "react";
import image from "../assets/vector.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DesignerType() {
  const [checkBoxes, setCheckBoxes] = useState({
    share: false,
    hire: false,
    inspire: false,
  });
  const navigate = useNavigate();
  const handleCheckboxChange = (checkboxName) => {
    const updatedCheckBoxes = Object.keys(checkBoxes).reduce((acc, key) => {
      acc[key] = key === checkboxName;
      return acc;
    }, {});
    setCheckBoxes(updatedCheckBoxes);
  };

  const handleSubmit = () => {
    if (checkBoxes.hire || checkBoxes.inspire || checkBoxes.share) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (checkBoxes.hire) {
        userDetails.preference = "Hire";
      } else if (checkBoxes.inspire) {
        userDetails.preference = "Inspire";
      } else {
        userDetails.preference = "Share";
      }
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      // console.log(userDetails);
      axios
        .post("https://dribble-api.onrender.com/create-account", userDetails)
        .then((response) => {
          console.log(response);
          alert(`Account created successfully!`);
          navigate("/email-verification");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            return alert("Already account exist for this email");
          }
          console.log(error);
        });
      setCheckBoxes({
        share: false,
        hire: false,
        inspire: false,
      });
    } else {
      alert("Please select a user type");
    }
  };

  return (
    <div className=" h-screen w-screen">
      <div>
        <h1 className=" text-4xl font-bold text-center mt-12">
          What brings you to Dribble?{" "}
        </h1>
        <p className=" mt-6 text-slate-600 text-center">
          Select the option that best describes you. Don't worry, you can
          explore other option later.
        </p>
        <div className="flex justify-center mt-16 md:gap-8 gap-2 p-3">
          <OptionCard
            image={image}
            title="I'm a Designer looking to share my work"
            checked={checkBoxes.share}
            onChange={() => handleCheckboxChange("share")}
            id="share"
            text={
              checkBoxes.share &&
              `With Over 7 million shots from a vast community of designer,
            Dribble is leading source for design inpiration`
            }
          />
          <OptionCard
            image={image}
            title="I'm Looking to hire a designer"
            checked={checkBoxes.hire}
            onChange={() => handleCheckboxChange("hire")}
            id="hire"
            text={
              checkBoxes.hire &&
              `With Over 7 million shots from a vast community of designer,
            Dribble is leading source for design inpiration`
            }
          />
          <OptionCard
            image={image}
            title="I'm Looking for design Inspiration"
            checked={checkBoxes.inspire}
            onChange={() => handleCheckboxChange("inspire")}
            id="inspire"
            text={
              checkBoxes.inspire && (
                <>
                  With Over 7 million shots from a vast community of designer,
                  Dribble is leading source for design <br /> inpiration
                </>
              )
            }
          />
        </div>
        <div className=" text-center font-bold mt-10">
          Anything else? You can select multiple
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-[#ea4b8b] px-16 rounded-lg py-2 mt-8 text-white font-bold mx-auto block"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesignerType;

function OptionCard({ image, title, checked, onChange, id, text }) {
  return (
    <div
      className={`lg:w-96 lg:h-80 w-1/3 p-2 border rounded-xl ${
        checked ? "border border-4 border-[#ea4b8b]" : ""
      }`}
    >
      <img
        src={image}
        alt="img"
        className={` ${text ? "md:-mt-20 -mt-10" : ""} w-4/5 mx-auto`}
      />
      <h1 className="md:font-extrabold font-bold text-center w-4/5 mx-auto mt-3 text-xs md:h-14">
        {title}
      </h1>
      {text && (
        <p className=" text-center mx-auto text-xs md:text-base text-slate-400">
          {text}
        </p>
      )}
      <div className="text-center mt-3">
        <div className="inline-block">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="hidden"
          />
          <label
            htmlFor={id}
            className={`inline-block w-6 h-6 rounded-full border border-gray-400 cursor-pointer ${
              checked ? "bg-[#ea4b8b]" : ""
            }`}
          ></label>
        </div>
      </div>
    </div>
  );
}
