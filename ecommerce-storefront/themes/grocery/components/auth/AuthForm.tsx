// components/AuthForm.tsx
"use client";

import { useState, type FormEvent } from "react";

type Tab = "login" | "register";

const labelClass = "mb-2 block text-base font-medium text-gray-700";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5aa96a] focus:bg-white focus:ring-2 focus:ring-[#dcefdf]";

const btnClass =
  "mt-2 w-full rounded-full bg-[#1A9D5B] py-4 text-base font-semibold text-white shadow-lg shadow-[#257036]/20 transition hover:bg-[#1d592c] active:scale-[0.99]";

const tabClass = (active: boolean) =>
  `rounded-lg py-3.5 text-base font-semibold transition ${
    active ? "bg-white text-[#257036] shadow-sm" : "text-gray-500 hover:text-gray-700"
  }`;

export default function AuthForm() {
  const [tab, setTab] = useState<Tab>("login");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call your API here
  };

  return (
    <div className="mx-auto w-full lg:max-w-xl md:max-w-2xl max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60 sm:p-10 lg:p-12">
      {/* ---------- Tabs ---------- */}
      <div className="mb-8 grid grid-cols-2 gap-1.5 rounded-xl bg-gray-100 p-1.5 mt-10">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={tabClass(tab === "login")}
        >
          লগইন
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={tabClass(tab === "register")}
        >
          রেজিস্টার
        </button>
      </div>

      {/* ---------- Login ---------- */}
      <form onSubmit={handleSubmit} className={tab === "login" ? "block" : "hidden"}>
        <div className="mb-5 mt-12">
          <label className={labelClass}>ইমেইল / ফোন নম্বর</label>
          <input
            type="text"
            name="identifier"
            autoComplete="username"
            placeholder="আপনার ইমেইল বা ফোন নম্বর"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-3 mt-12">
          <label className={labelClass}>পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="পাসওয়ার্ড"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-7 text-right mt-12">
          <a href="#" className="text-sm font-medium text-[#257036] hover:underline">
            পাসওয়ার্ড ভুলে গেছেন?
          </a>
        </div>

        <button type="submit" className={btnClass}>
          লগইন করুন
        </button>

        <p className="mt-6 text-center text-base text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <button
            type="button"
            onClick={() => setTab("register")}
            className="font-semibold text-[#257036] hover:underline"
          >
            রেজিস্টার করুন
          </button>
        </p>
      </form>

      {/* ---------- Register ---------- */}
      <form onSubmit={handleSubmit} className={tab === "register" ? "block" : "hidden"}>
        <div className="mb-5 mt-12">
          <label className={labelClass}>পুরো নাম</label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="আপনার নাম"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-5 mt-12">
          <label className={labelClass}>ইমেইল / ফোন নম্বর</label>
          <input
            type="text"
            name="identifier"
            autoComplete="username"
            placeholder="আপনার ইমেইল বা ফোন নম্বর"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-7 mt-12">
          <label className={labelClass}>পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="পাসওয়ার্ড"
            required
            className={inputClass}
          />
        </div>

        <button type="submit" className={btnClass}>
          রেজিস্টার করুন
        </button>

        <p className="mt-6 text-center text-base text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <button
            type="button"
            onClick={() => setTab("login")}
            className="font-semibold text-[#257036] hover:underline"
          >
            লগইন করুন
          </button>
        </p>
      </form>
    </div>
  );
}