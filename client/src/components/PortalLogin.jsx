"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginOwner } from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { loginSuccess } from "@/redux/slices/authSlice";

export default function PortalLogin({ slug }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await loginOwner(form);
      dispatch(loginSuccess(session));
      router.push(`/portal/${slug}/dashboard`);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-xl glass-card px-8 py-12 lg:px-12">
        <p className="section-kicker">Owner portal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Secure dashboard login</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          This private route lets the owner update the classes page, the about section, and homepage carousel image URLs.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="owner@nouribymorgan.com"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button className="btn btn-warning rounded-full px-6 text-base text-amber-950" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login to dashboard"}
          </button>
        </form>
        <Link href="/" className="mt-6 inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-950">
          Back to the main site
        </Link>
      </div>
    </section>
  );
}
