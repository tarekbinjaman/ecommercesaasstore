// themes/clothing/pages/AuthForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaTshirt } from "react-icons/fa";

type Tab = "login" | "register";

const labelClass = "mb-2 block text-sm font-semibold text-stone-700";

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-5 py-4 text-base text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100";

const btnClass =
  "mt-2 w-full rounded-full bg-rose-600 py-4 text-base font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.99]";

const tabClass = (active: boolean) =>
  `rounded-lg py-3.5 text-base font-semibold transition ${
    active ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
  }`;

export default function AuthForm() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);

  /* ---------------- Login submit ---------------- */
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const identifier = String(formData.get("identifier") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const payload = {
      type: "login" as const,
      identifier,
      password,
    };

    console.log("🔐 LOGIN PAYLOAD:", payload);
    console.table(payload);

    // TODO: call your API here
    // await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) })
  };

  /* ---------------- Register submit ---------------- */
  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const identifier = String(formData.get("identifier") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const payload = {
      type: "register" as const,
      name,
      identifier,
      password,
    };

    console.log("📝 REGISTER PAYLOAD:", payload);
    console.table(payload);

    // TODO: call your API here
    // await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) })
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-stone-100 bg-white p-8 shadow-xl shadow-stone-200/60 sm:p-10 md:max-w-md lg:max-w-lg lg:p-12">
      {/* ---------- Brand header ---------- */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600">
          <FaTshirt className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-stone-900">
          {tab === "login" ? "STYLEHUB-এ স্বাগতম" : "STYLEHUB-এ যোগ দিন"}
        </h1>
        <p className="text-center text-sm text-stone-500">
          {tab === "login"
            ? "লগইন করে আপনার অর্ডার ও উইশলিস্ট দেখুন"
            : "নতুন অ্যাকাউন্ট খুলুন এবং প্রথম অর্ডারে ছাড় পান"}
        </p>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="mb-8 grid grid-cols-2 gap-1.5 rounded-xl bg-stone-100 p-1.5">
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
      <form
        onSubmit={handleLoginSubmit}
        className={tab === "login" ? "block" : "hidden"}
      >
        <div className="mb-5">
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

        <div className="mb-3">
          <label className={labelClass}>পাসওয়ার্ড</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="পাসওয়ার্ড"
              required
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-rose-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-7 text-right">
          <a href="#" className="text-sm font-medium text-rose-600 hover:underline">
            পাসওয়ার্ড ভুলে গেছেন?
          </a>
        </div>

        <button type="submit" className={btnClass}>
          লগইন করুন
        </button>

        <p className="mt-6 text-center text-sm text-stone-500">
          অ্যাকাউন্ট নেই?{" "}
          <button
            type="button"
            onClick={() => setTab("register")}
            className="font-semibold text-rose-600 hover:underline"
          >
            রেজিস্টার করুন
          </button>
        </p>
      </form>

      {/* ---------- Register ---------- */}
      <form
        onSubmit={handleRegisterSubmit}
        className={tab === "register" ? "block" : "hidden"}
      >
        <div className="mb-5">
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

        <div className="mb-5">
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

        <div className="mb-7">
          <label className={labelClass}>পাসওয়ার্ড</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="পাসওয়ার্ড"
              required
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-rose-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className={btnClass}>
          রেজিস্টার করুন
        </button>

        <p className="mt-6 text-center text-sm text-stone-500">
          অ্যাকাউন্ট আছে?{" "}
          <button
            type="button"
            onClick={() => setTab("login")}
            className="font-semibold text-rose-600 hover:underline"
          >
            লগইন করুন
          </button>
        </p>
      </form>

      {/* ---------- Footer note ---------- */}
      <p className="mt-8 text-center text-xs text-stone-400">
        লগইন বা রেজিস্টার করার মাধ্যমে আপনি আমাদের{" "}
        <a href="#" className="font-medium text-rose-600 hover:underline">
          শর্তাবলী
        </a>{" "}
        ও{" "}
        <a href="#" className="font-medium text-rose-600 hover:underline">
          প্রাইভেসি পলিসি
        </a>{" "}
        মেনে নিচ্ছেন।
      </p>
    </div>
  );
}