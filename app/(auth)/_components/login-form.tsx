"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleHelp, Home, LockKeyhole } from "lucide-react";
import { authStyles as styles } from "./auth-styles";

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

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
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=90"
            alt="StayNest bunk bed room"
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
              Find comfort, community, and a room that feels easy to come home
              to.
            </p>
          </div>
        </aside>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.heading}>
            <p style={styles.eyebrow}>Welcome back</p>
            <h1 style={styles.title}>Log in to StayNest</h1>
          </div>

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
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                style={styles.passwordInput}
              />
              <LockKeyhole size={20} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </label>

          <div style={styles.formMeta}>
            <label style={styles.remember}>
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                style={styles.checkbox}
              />
              <span>Remember me</span>
            </label>
            <a href="mailto:support@staynest.com" style={styles.link}>
              Forgot password?
            </a>
          </div>

          <button type="submit" style={styles.submitButton}>
            Log in
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <p style={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={styles.link}>
              Create one
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
