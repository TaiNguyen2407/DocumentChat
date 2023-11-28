import Lottie from "lottie-react";
import logo from "../resources/images/logo.png";
import hello from "../resources/lottie/hello.json";
import { useState } from "react";
import { UserDetails } from "../api/models";
import { postMessageToLoginApi } from "../api/api";
import {
  saveToBrowserMemory,
} from "../utils/browserMemory";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDetails: UserDetails = {
      username: username,
      password: password,
    };

    try {
      const response = await postMessageToLoginApi(userDetails);
      if (response.user) {
        saveToBrowserMemory("user", JSON.stringify(response));
        window.location.reload();
      } else {
        setError(response.message);
      }
    } catch (e) {
      console.warn("Login failed");
    }
  };
  

  return (
    <div className="w-full h-full grid place-items-center bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="grid grid-cols-2 max-w-4xl mx-8 border rounded-lg shadow-lg bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="border-r">
          <Lottie animationData={hello} className="w-4/5 h-4/5" />
        </div>
        <div className="">
          <div className="max-w-md relative flex flex-col p-4 text-black">
            <div className="text-2xl font-bold text-[#1e0e4b] text-center">
              <div className="grid place-items-center grid-flow-col">
                <img src={logo} alt="logo" />
              </div>
              Welcome
            </div>
            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
              Log in with your metropolia account
            </div>
            <form
              className="flex flex-col gap-3 justify--center"
              onSubmit={onSubmit}
            >
              <div className="block relative">
                <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="block relative">
                <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid place-items-center text-red-500 capitalize">
                {error}
              </div>
              <div className="w-full grid place-items-center">
                <button className=" justify-center items-center my-8 gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-gray-700 via-gray-900 to-black hover:shadow-xl hover:shadow-gray-500 hover:scale-105 duration-300 hover:from-gray-600 hover:to-gray-900">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
