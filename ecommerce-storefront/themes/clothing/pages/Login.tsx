// themes/clothing/pages/Login.tsx
import React from "react";
import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="relative mb-20 mt-40 overflow-hidden md:mt-40 lg:my-40 2xl:mt-36">
      {/* subtle rose gradient backdrop */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10  bg-gradient-to-b from-rose-50 via-white to-white"
      /> */}

      <div className="px-4 lg:mt-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;