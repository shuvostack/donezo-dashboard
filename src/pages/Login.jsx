import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router"; 
import axios from "axios";
import Logo from "../components/Logo";
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  // alert for unauthorized access
  useEffect(() => {
    if (location.state?.showLoginAlert) {
      Swal.fire({
        title: "Access Denied!",
        text: "Please login first to access the dashboard.",
        icon: "warning",
        confirmButtonColor: "#045544",
      });
      
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("https://task-api-eight-flax.vercel.app/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        // SweetAlert success 
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome to Donezo Dashboard",
          icon: "success",
          confirmButtonColor: "#045544", 
          timer: 2000, 
        }).then(() => {
            navigate("/dashboard");
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Invalid email or password. Please try again.");
      
      // SweetAlert Error
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid email or password. Please check and try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6] px-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo></Logo>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Plan, prioritize, and accomplish your tasks.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 px-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#045544]/20 focus:border-[#045544] transition-all text-gray-800"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 px-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#045544]/20 focus:border-[#045544] transition-all text-gray-800"
              placeholder="Enter your password"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-full text-white font-medium text-base transition-all duration-300 ${
                isLoading 
                  ? "bg-[#045544]/70 cursor-not-allowed" 
                  : "bg-[#045544] hover:bg-[#034033] shadow-md hover:shadow-lg"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </div>
        </form>

        {/* Credentials */}
        <div className="mt-4 p-2 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Demo Credentials</p>
          <div className="flex flex-col gap-1 text-sm text-gray-700 font-mono">
            <p><span className="font-medium text-gray-500">Email:</span> user1@example.com</p>
            <p><span className="font-medium text-gray-500">Pass:</span> password123</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;