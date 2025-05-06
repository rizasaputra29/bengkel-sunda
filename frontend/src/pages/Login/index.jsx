import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEyeSlash,
  FaEye,
  FaGoogle,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Logo from "@/assets/Logo.png";
import Ilustration from "@/assets/Illustration.png";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = "http://localhost:5002/api/auth";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (response.ok) {
        setError("Login Successful!");
        localStorage.setItem("token", res.data);
        if (rememberMe) localStorage.setItem("email", data.email);
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen #efede3 flex font-poppins">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-40 ml-24" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-2">
              Login Bengkel
            </h1>
            <p className="text-black">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-red-900 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                required
                className="bg-white border border-gray-200 rounded-xl p-6 w-full text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                required
                className="bg-white border border-gray-200 rounded-xl p-6 w-full text-gray-800 placeholder:text-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-700"
              >
                {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                />
                <Label htmlFor="remember" className="ml-2 text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link to="/signup" className="text-red-600 hover:text-red-900">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  error === "Login Successful!"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white font-medium p-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden md:block w-1/2 bg-red-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={Ilustration} />
          <div className="relative w-full h-full">
            <div className="absolute w-96 h-96 rounded-full bg-red-300 -right-20 -top-24 opacity-50 animate-pulse"></div>
            <div className="absolute w-32 h-32 rounded-full bg-red-700 right-30 bottom-15 opacity-70"></div>
            <div className="absolute w-48 h-48 rounded-full bg-red-400 right-130 -bottom-10 opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
