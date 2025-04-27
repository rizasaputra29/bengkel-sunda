import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setShowPass(!showPass);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = "http://localhost:5002/api/auth";

      setError("Loading...");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (response.ok) {
        setError(res.message);
        localStorage.setItem("token", res.data);
        window.location = "/";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 animate-pulse" />
        
        <form 
          className="relative w-full backdrop-blur-sm bg-gray-800/90 p-8 rounded-lg shadow-2xl space-y-6 border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-cyan-500 p-1">
              {/* <img
                src="https://www.rapidbikeservice.com/extras/website/images/logo.png"
                alt="Logo"
                className="w-full h-full object-cover rounded-full"
              /> */}
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Login
            </h1>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                onChange={handleChange}
                value={data.email}
                required
                className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-center ${
              error === "Loading..." || error === "Logged in Successfully"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : "Login"}
          </Button>

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-400">Don't have an account?</p>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 hover:bg-gray-200/50 text-gray-800"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
