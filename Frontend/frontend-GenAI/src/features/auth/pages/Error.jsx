import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/80 p-8 text-center shadow-2xl backdrop-blur">
        <div className="mx-auto mb-6 h-56 w-56">
          <DotLottieReact
            src="https://lottie.host/4f4dd970-8e68-4efb-b4bd-614443dbcf73/qyFg8sB5uU.lottie"
            loop
            autoplay
          />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">404 - Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:from-cyan-500 hover:to-indigo-500"
        >
          Go To Login
        </Link>
      </div>
    </main>
  );
};

export default Error;
