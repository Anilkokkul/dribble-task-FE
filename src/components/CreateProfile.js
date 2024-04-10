import React, { useRef, useState } from "react";
import logo from "../assets/addImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProfile() {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const updateFileName = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const input = fileInputRef.current;
    const selectedFile = input.files[0];
    if (selectedFile) {
      const label = input.nextElementSibling;
      const fileName = input.files[0].name;
      label.classList.add("selected");
      label.setAttribute("data-selected", fileName);
    }
  };

  const handleClick = () => {
    try {
      const file = fileInputRef.current.files[0];
      if (!file || !location) {
        alert("Please fill out all fields.");
        throw new Error("Please select a file.");
      }

      const formData = new FormData();
      formData.append("image", file);
      axios
        .post("https://dribble-api.onrender.com/upload", formData)
        .then((response) => {
          // console.log(response);
          const url = response.data.imageUrl;
          const userDetails = JSON.parse(localStorage.getItem("userDetails"));
          userDetails.imageURL = url;
          userDetails.location = location;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          navigate("/preference");
        })
        .catch((error) => {
          console.log("Error Message", error);
        });
    } catch (error) {
      console.log("Erroror", error);
    }
  };

  return (
    <div>
      <div className=" px-12 md:px-0 md:w-2/3 lg:1/2 lg:w-[40%] mx-auto mt-20">
        <h1 className=" text-4xl font-bold">
          Welcome! Let's create your profile
        </h1>
        <p className=" text-md text-slate-600">
          Let others get you know better! You can do the later
        </p>
        <div>
          <h1>Add an avatar</h1>
          <div className=" flex justify-start gap-8 mt-5">
            <div
              className={`w-24 h-24 md:w-40 md:h-40 rounded-full ${
                imageSrc ? "border" : "border-4 border-dashed"
              } flex items-center justify-center`}
            >
              <img
                src={imageSrc ? imageSrc : logo}
                alt="add-image"
                className={`${
                  imageSrc ? "w-full h-full rounded-full object-cover" : "w-6"
                }`}
              />
            </div>
            <div>
              <input
                type="file"
                id="fileInput"
                className="custom-file-input hidden"
                onChange={(e) => updateFileName(e)}
                ref={fileInputRef}
                accept="image/*"
                required
              />
              <label htmlFor="fileInput" className="custom-file-label"></label>
              <p className=" text-slate-500 cursor-pointer my-5">
                {" "}
                &#62; Or choose one of our defaults
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className=" text-xl font-bold my-4 ">Add your location</h1>
          <input
            type="text"
            placeholder="Enter your location"
            className=" border-0 border-b w-full h-12"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          className="bg-[#ea4b8b] px-16 rounded-lg py-2 mt-8 text-white font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateProfile;
