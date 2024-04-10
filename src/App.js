import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    // console.log(userDetails);
    setUserDetails({
      name: "",
      userName: "",
      email: "",
      password: "",
    });
    setChecked(false);
    navigate("/create-account");
  };

  return (
    <div className="App h-screen md:flex ">
      <div className="bg-[#f2d184] hidden md:block w-1/3 md:h-screen"></div>
      <div className=" w-full">
        <p className=" my-8 text-right mr-5">Already a Member ? Sign in</p>
        <div className=" w-4/5 lg:w-[40%] mx-auto">
          <h1 className=" text-3xl font-[900]">Sign Up to Dribble</h1>
          <form className=" mt-8" onSubmit={handleSubmit}>
            <div className=" flex gap-5">
              <div className=" w-1/2">
                <label htmlFor="name" className=" font-bold ml-1">
                  Name :
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className=" bg-[#f3f3f3] border-0 block rounded-md h-10 w-full mt-2 px-3"
                  placeholder="enter your name"
                  value={userDetails.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="userName" className=" font-bold ml-1">
                  Username :
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className=" bg-[#f3f3f3] border-0 block rounded-md h-10 w-full mt-2 px-3"
                  placeholder="enter your username"
                  value={userDetails.userName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className=" mt-8">
              <label htmlFor="email" className=" font-bold ml-1">
                Email :{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 block rounded-md h-10 w-full bg-[#f3f3f3] px-3"
                placeholder="enter your email"
                value={userDetails.email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="password" className=" font-bold ml-1">
                Pssword{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 block rounded-md h-10 w-full bg-[#f3f3f3] px-3"
                placeholder="6+ characters"
                value={userDetails.password}
                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
                title="At least 6 characters and at least 1 letter and 1 capital letter required"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex items-start mt-6">
              <input
                type="checkbox"
                required
                className=" mt-2 mx-1"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <p>
                Creating an account means you're okay with our{" "}
                <a href="#" className=" text-[#5c4db2]">
                  Term of Service, Privacy Policy,
                </a>{" "}
                and our default{" "}
                <a href="#" className=" text-[#5c4db2]">
                  Notification Settings.
                </a>{" "}
              </p>
            </div>
            <button
              type="submit"
              className=" bg-[#ea4b8b] px-10 rounded-lg py-2 mt-8 text-white font-bold"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
