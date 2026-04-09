import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");


    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="h-52 w-52">
          <DotLottieReact
            src="https://lottie.host/6fb2a534-1374-40e7-9ffa-be643b514a45/5AGA3RKCyZ.lottie"
            loop
            autoplay
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-200/80 blur-2xl" />
      <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-indigo-200/70 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to continue to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5"> 
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <button type="button" className="text-xs font-semibold text-cyan-700 hover:text-cyan-800">
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              // { Performing the 2 way binding for email and password }
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:from-cyan-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-cyan-200"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-cyan-700 transition hover:text-cyan-800">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
