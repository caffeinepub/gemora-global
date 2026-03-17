import { Button } from "@/components/ui/button";
import { setAdminSession } from "@/utils/adminAuth";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Gemora@2024";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError("Incorrect username or password. Please try again.");
      return;
    }
    setLoading(true);
    setAdminSession();
    navigate({ to: "/admin/dashboard" as any });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      <div className="w-full max-w-sm mx-auto px-6">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <img
            src="/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1-1-1.png"
            alt="Gemora Global"
            className="h-20 mx-auto mb-6 object-contain"
          />
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Admin Portal
          </h1>
          <p
            className="text-xs tracking-widest uppercase mt-2"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Gemora Global
          </p>
        </div>

        <div
          className="p-8 border"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.22 0.06 240)",
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: "oklch(0.18 0.055 240)",
                  border: "1px solid var(--gold)",
                }}
              >
                <Lock size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p
                  className="font-serif text-lg"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  Admin Login
                </p>
                <p className="text-xs" style={{ color: "oklch(0.45 0 0)" }}>
                  Enter your credentials to continue
                </p>
              </div>
            </div>

            {/* Username */}
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "oklch(0.45 0 0)" }}
              />
              <input
                data-ocid="admin_login.input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full pl-9 pr-4 py-2.5 text-sm outline-none"
                style={{
                  backgroundColor: "oklch(0.14 0 0)",
                  border: "1px solid oklch(0.28 0.06 240)",
                  color: "oklch(0.85 0 0)",
                  borderRadius: 0,
                }}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "oklch(0.45 0 0)" }}
              />
              <input
                data-ocid="admin_password.input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full pl-9 pr-10 py-2.5 text-sm outline-none"
                style={{
                  backgroundColor: "oklch(0.14 0 0)",
                  border: "1px solid oklch(0.28 0.06 240)",
                  color: "oklch(0.85 0 0)",
                  borderRadius: 0,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {error && (
              <p
                data-ocid="admin_login.error_state"
                className="text-xs"
                style={{ color: "oklch(0.65 0.15 29)" }}
              >
                {error}
              </p>
            )}

            <Button
              data-ocid="admin_login.primary_button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-11 text-xs tracking-widest uppercase"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--obsidian)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                borderRadius: 0,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>

        {/* Credentials reminder */}
        <div
          className="mt-3 px-4 py-3 text-xs"
          style={{
            backgroundColor: "oklch(0.16 0.04 240)",
            border: "1px solid oklch(0.22 0.06 240)",
            color: "oklch(0.55 0 0)",
          }}
        >
          <p className="mb-1 font-medium" style={{ color: "oklch(0.65 0 0)" }}>
            Your Admin Credentials
          </p>
          <p>
            Username: <span style={{ color: "var(--gold-light)" }}>admin</span>
          </p>
          <p>
            Password:{" "}
            <span style={{ color: "var(--gold-light)" }}>Gemora@2024</span>
          </p>
        </div>

        <p className="text-center text-xs text-foreground/30 mt-6">
          &copy; {new Date().getFullYear()} Gemora Global. Admin Portal.
        </p>
      </div>
    </div>
  );
}
