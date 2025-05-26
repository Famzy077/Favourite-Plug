"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../assets/bg.png";
import signUp1 from "../assets/signUp1.png";
import signUp2 from "../assets/signUp2.png";
import signUp3 from "../assets/signUp3.png";
import grundpaylogo from "../assets/grundpay-logo.png";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "../component/GoogleLoginButton";

const Login = ({ toggleForm, logoOnly }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const response = await axios.post(
  //       "https://grundpay-backend.onrender.com/api/v1/auth/login",
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       // Store token
  //       if (response.data.token) {
  //         localStorage.setItem("token", response.data.token);
  //       }
  //       // Navigate to home page
  //       navigate("/home");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     // Display specific error message if available
  //     if (
  //       err.response?.data?.messages &&
  //       err.response.data.messages.length > 0
  //     ) {
  //       setError(err.response.data.messages.join(", "));
  //     } else if (err.response?.data?.message) {
  //       setError(err.response.data.message);
  //     } else if (err.response?.data?.error) {
  //       setError(err.response.data.error);
  //     } else if (err.message.includes("Network Error")) {
  //       setError(
  //         "Network error. Please check your internet connection and try again."
  //       );
  //     } else {
  //       setError(
  //         "Failed to login. Please check your credentials and try again."
  //       );
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.grundpay.com/v1/auth/login",
        {
          email,
          password,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      const { token, user } = response.data;

      // Store token
      if (token) {
        localStorage.setItem("token", token);
      }

      // Navigate based on user role
      if (user?.role === "developer") {
        navigate("/developer");
      } else {
        navigate("/home");
      }
    }
  } catch (err) {
    console.error("Login error:", err);
    if (
      err.response?.data?.messages &&
      err.response.data.messages.length > 0
    ) {
      setError(err.response.data.messages.join(", "));
    } else if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else if (err.message.includes("Network Error")) {
      setError(
        "Network error. Please check your internet connection and try again."
      );
    } else {
      setError("Failed to login. Please check your credentials and try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  const [step, setStep] = useState(1); // 1 = Welcome, 2 = Password, 3 = BVN, 4 = Success

  const getBackgroundImage = () => {
    switch (step) {
      case 1:
        return signUp1;
      case 2:
        return signUp2;
      case 3:
        return signUp3;
      default:
        return signUp1;
    }
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between h-auto min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-md relative mb-6 mx-auto p-4 sm:p-8 sm:mt-12 mt-6">
        <img
          src={grundpaylogo || "/placeholder.svg"}
          className="w-44 hidden md:block lg:mt-24"
          alt="Grundpay logo"
        />

        {/* Error message if any */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006B1E]"></div>
          </div>
        )}

        {!logoOnly && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold font-clash mb-1 mt-14">
              Login
            </h1>
            <p className="mb-2 text-sm text-gray-500">
              Welcome back to Grundpay!
            </p>
          </>
        )}

        <form onSubmit={handleLogin}>
          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 pr-10 border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 border rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p
            className="inline text-[#006B1E] underline cursor-pointer mb-4 block"
            onClick={handleForgotPasswordClick}
          >
            I forgot my password
          </p>

          <button
            type="submit"
            className="w-full font-semibold py-2 px-4 rounded-md mt-4 text-white bg-[#006B1E]"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <GoogleLoginButton />

        <div className="text-center mb-24 mt-4">
          <p>
            Don't have an account?{" "}
            <span
              className="inline text-[#006B1E] cursor-pointer"
              onClick={handleSignUpClick}
            >
              SignUp
            </span>
          </p>
        </div>
      </div>

      {/* Right Side - Green Info Box */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 242, 187, 0.35), rgba(184, 242, 187, 0.35)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" bg-opacity-30 backdrop-blur-md p-8 rounded-lg max-w-sm text-center relative overflow-hidden">
          {/* Background Image */}
          <div
            className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg max-w-md text-center relative overflow-hidden min-h-[600px] min-w-auto flex flex-col"
            style={{
              backgroundImage: `url(${getBackgroundImage()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Text Content with increased width */}
            <div className="relative z-10 mt-auto bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg max-w-lg">
              <h2 className="text-xl font-semibold mb-2 text-green-800 font-archivo">
                Own Land, Pay at Your Pace
              </h2>
              <p className="text-sm text-gray-700 font-archivo">
                With flexible installment plans, you can secure your dream
                property without upfront full payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
