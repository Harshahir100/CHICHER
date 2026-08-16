import { useState } from "react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRoundPlus,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const emptyForm = { email: "", password: "" };

export default function AuthModal({ open, onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resendState, setResendState] = useState({
    sending: false,
    message: "",
  });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  if (!open) return null;

  const resetState = () => {
    setForm(emptyForm);
    setError("");
    setInfo("");
    setShowPassword(false);
    setSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError("");
    if (info) setInfo("");
    if (resendState.message) setResendState({ sending: false, message: "" });
  };

  const handleResendConfirmation = async () => {
    const email = form.email.trim().toLowerCase();

    if (!email) {
      setError(
        "Please enter your email address before requesting a confirmation email.",
      );
      return;
    }

    setResendState({ sending: true, message: "" });
    setError("");
    setInfo("");

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) throw resendError;

      setResendState({
        sending: false,
        message:
          "A new confirmation email has been sent. Check your inbox and then log in again.",
      });
    } catch (resendErr) {
      const resendMessage =
        resendErr?.message || "Could not send a confirmation email.";
      setError(resendMessage);
      setResendState({ sending: false, message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setSubmitting(true);
    setError("");
    setInfo("");

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Supabase Login Error:", error);
          throw error;
        }

        console.log("Login successful:", data);

        handleClose();
        onSuccess?.(data);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Supabase Signup Error:", error);
        throw error;
      }

      console.log("Signup successful:", data);

      if (!data.session) {
        setInfo(
          "Account created successfully. Please check your email and confirm your account before logging in.",
        );
        setMode("login");
        setForm(emptyForm);
        return;
      }

      handleClose();
      onSuccess?.(data);
    } catch (err) {
      console.error("Authentication Error:", err);

      const message =
        err?.message || "Authentication failed. Please try again.";

      if (/invalid login credentials/i.test(message)) {
        setError(
          "Invalid email or password. Please check your credentials or create a new account.",
        );
      } else if (/email not confirmed/i.test(message)) {
        setError("Please confirm your email address before logging in.");
        setResendState({ sending: false, message: "" });
      } else if (/signups? not allowed|signups? are disabled|email signups? are disabled/i.test(message)) {
        setError(
          "New user signups are disabled in this Supabase project. Enable Email signups in Supabase Dashboard > Authentication > Providers > Email, then try again.",
        );
      } else if (/user already registered/i.test(message)) {
        setError("This email is already registered. Please login instead.");
        setMode("login");
      } else {
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">
              Welcome
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink-900">
              {mode === "login" ? "Login" : "Create account"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close login popup"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100"
          >
            <X className="h-5 w-5 text-ink-700" />
          </button>
        </div>

        <div className="mt-4 flex rounded-full border border-ink-200 bg-ink-50 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
              setInfo("");
            }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "login"
                ? "bg-brand-600 text-white shadow-soft"
                : "text-ink-600"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
              setInfo("");
            }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "signup"
                ? "bg-brand-600 text-white shadow-soft"
                : "text-ink-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink-700">
              <Mail className="h-4 w-4 text-ink-500" /> Email address
            </span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className="input-field"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink-700">
              <Lock className="h-4 w-4 text-ink-500" /> Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Enter your password"
                className="input-field pr-11"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 grid place-items-center text-ink-500 hover:text-ink-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-error-500/10 px-3 py-2 text-sm text-error-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {info && (
            <div className="rounded-xl bg-success-500/10 px-3 py-2 text-sm text-success-700">
              {info}
            </div>
          )}

          {(/email not confirmed/i.test(error) ||
            /confirm your email/i.test(error)) && (
            <button
              type="button"
              onClick={handleResendConfirmation}
              disabled={resendState.sending}
              className="btn-ghost w-full text-sm"
            >
              {resendState.sending ? "Sending..." : "Resend confirmation email"}
            </button>
          )}

          {resendState.message && (
            <div className="rounded-xl bg-success-500/10 px-3 py-2 text-sm text-success-700">
              {resendState.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-ink-100 bg-ink-50 px-3 py-2 text-xs text-ink-600">
          <span className="flex items-center gap-2">
            <UserRoundPlus className="h-4 w-4 text-brand-600" />
            Secure account access
          </span>
          <span>Privacy protected</span>
        </div>
      </div>
    </div>
  );
}
