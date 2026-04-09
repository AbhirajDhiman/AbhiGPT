import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/80 p-8 text-center shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-bold text-slate-900">Welcome{user?.username ? `, ${user.username}` : ""}</h1>
        <p className="mt-3 text-sm text-slate-600">
          You are signed in and can access the protected part of the app.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:from-cyan-500 hover:to-indigo-500"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Home;