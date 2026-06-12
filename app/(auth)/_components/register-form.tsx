"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleHelp, Home, LockKeyhole } from "lucide-react";
import { authStyles as styles } from "./auth-styles";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    window.localStorage.setItem(
      "staynest-profile",
      JSON.stringify({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
      }),
    );
    router.push("/dashboard");
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>
          <Home size={34} strokeWidth={2.4} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <a href="mailto:support@staynest.com" style={styles.helpLink}>
          <CircleHelp size={17} strokeWidth={2.4} aria-hidden="true" />
          <span>Need help?</span>
        </a>
      </header>

      <section style={styles.shell}>
        <aside style={styles.photoPanel}>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
            alt="Modern StayNest residence"
            style={styles.photo}
          />
          <div style={styles.photoShade} />

          <div style={styles.photoText}>
            <h1 style={styles.photoTitle}>
              Elevate your
              <br />
              living
              <br />
              experience
            </h1>
            <p style={styles.photoCopy}>
              Join a trusted residence network built around comfort, clarity,
              and better stays.
            </p>
          </div>
        </aside>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.heading}>
            <p style={styles.eyebrow}>Start your stay</p>
            <h1 style={styles.title}>Create an account</h1>
          </div>

          <label style={styles.field}>
            <span>Full name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.field}>
            <span>Contact number</span>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your contact number"
              autoComplete="tel"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.field}>
            <span>Password</span>
            <span style={styles.passwordField}>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                style={styles.passwordInput}
              />
              <LockKeyhole size={20} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </label>

          <label style={styles.terms}>
            <input type="checkbox" name="terms" required style={styles.checkbox} />
            <span>I agree to the terms and conditions.</span>
          </label>

          <button type="submit" style={styles.submitButton}>
            Create account
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link href="/login" style={styles.link}>
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
