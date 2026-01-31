import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signInWithGitHub, isAuthenticated, loading } = useAuth();

  // Redirect away from login only after auth state has loaded
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);
    const result = await signInWithGitHub();
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1828] flex items-center justify-center px-4">
      <div className="max-w-md w-full">

        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#bfa174] mb-2">
            Check In to the Clinic
          </h1>
          <p className="text-gray-400">
            Sign in to access your repository health records
          </p>
        </div>

        {/* Login Card */}

        <div className="bg-[#1a2d3d] rounded-lg shadow-lg p-8">

          {/* Error Message */}

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* GitHub OAuth Button */}

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292e] text-white font-semibold rounded-lg hover:bg-[#2f363d] transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {/* GitHub Icon */}

                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.068-1.088.068-1.088.12-.168.312-.472.465-.581.19-.139.398-.195.398-.195.21-.144.275-.514.094-.704-.23-.236-.473-.44-.473-.44-.211-.191-.523-.47-.523-.47"
                    clipRule="evenodd"
                  />
                </svg>

                Continue with GitHub
              </>
            )}
          </button>

          {/* Divider */}

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Continue without login */}

          <Link
            to="/"
            className="block w-full text-center px-4 py-3 border border-[#178582] text-[#178582] font-semibold rounded-lg
             hover:bg-[#178582] hover:text-white transition-colors"
          >
            Continue without signing in
          </Link>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Walk-in patients welcome for public repo checkups{" "}
          </p>
        </div>

        {/* Footer */}

        <p className="mt-6 text-center text-gray-500 text-sm">
          By signing in, you agree to our Terms of Service{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
