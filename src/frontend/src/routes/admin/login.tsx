import { Button } from "@/components/ui/button";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsCallerAdmin } from "@/hooks/useQueries";
import { storeSessionParameter } from "@/utils/urlParams";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { actor } = useActor();

  const [setupCode, setSetupCode] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);

  const isLoggingIn = loginStatus === "logging-in";
  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: "/admin" as any });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSetupLogin = async () => {
    if (!setupCode.trim()) {
      setSetupError("Please enter a setup code.");
      return;
    }
    if (!isAuthenticated) {
      setSetupError("Please log in with Internet Identity first.");
      return;
    }
    if (!actor) {
      setSetupError("Actor not ready. Please wait a moment and try again.");
      return;
    }
    setSetupError("");
    setSetupLoading(true);
    try {
      storeSessionParameter("caffeineAdminToken", setupCode.trim());
      await actor._initializeAccessControlWithSecret(setupCode.trim());
      navigate({ to: "/admin" as any });
    } catch (_e: any) {
      setSetupError("Invalid setup code. Please check and try again.");
    } finally {
      setSetupLoading(false);
    }
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
            src="/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1--1.png"
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
            borderColor: "oklch(0.22 0 0)",
          }}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div
              className="w-14 h-14 flex items-center justify-center"
              style={{
                backgroundColor: "oklch(0.18 0 0)",
                border: "1px solid var(--gold)",
              }}
            >
              <Lock size={22} style={{ color: "var(--gold)" }} />
            </div>

            <div>
              <p
                className="font-serif text-lg"
                style={{ color: "var(--gold-light)", fontWeight: 400 }}
              >
                Secure Admin Access
              </p>
              <p className="text-xs text-foreground/50 mt-2 leading-relaxed">
                Sign in with Internet Identity to access the admin dashboard.
                Only authorised administrators can log in.
              </p>
            </div>

            {isAuthenticated && !isAdmin && !adminLoading && (
              <div
                data-ocid="admin_login.error_state"
                className="w-full p-4 text-sm text-center"
                style={{
                  backgroundColor: "oklch(0.18 0.05 29)",
                  borderLeft: "2px solid oklch(0.55 0.22 29)",
                  color: "oklch(0.75 0.1 29)",
                }}
              >
                Access denied. Your account does not have admin privileges.
              </div>
            )}

            <Button
              data-ocid="admin_login.primary_button"
              onClick={() => login()}
              disabled={isLoggingIn || (isAuthenticated && adminLoading)}
              className="w-full h-11 text-xs tracking-widest uppercase"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--obsidian)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                borderRadius: 0,
              }}
            >
              {isLoggingIn || (isAuthenticated && adminLoading) ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" />{" "}
                  Verifying...
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>
          </div>
        </div>

        {/* Admin Setup Code Section */}
        <div className="mt-4">
          <button
            type="button"
            data-ocid="admin_login.toggle"
            onClick={() => setShowSetup((v) => !v)}
            className="w-full flex items-center justify-center gap-2 text-xs py-2"
            style={{ color: "oklch(0.4 0 0)", letterSpacing: "0.08em" }}
          >
            <span>FIRST TIME SETUP</span>
            <ChevronDown
              size={12}
              style={{
                transform: showSetup ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {showSetup && (
            <div
              className="p-5 border mt-1"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderColor: "oklch(0.22 0 0)",
              }}
            >
              <p className="text-xs text-foreground/40 mb-3 leading-relaxed">
                If you cannot access admin, open your app once from the Caffeine
                dashboard, copy the{" "}
                <code className="text-foreground/60">caffeineAdminToken</code>{" "}
                value from the URL, paste it below, then click Apply.
              </p>
              <input
                data-ocid="admin_login.input"
                type="text"
                value={setupCode}
                onChange={(e) => setSetupCode(e.target.value)}
                placeholder="Paste admin setup code here"
                className="w-full px-3 py-2 text-xs mb-3 outline-none"
                style={{
                  backgroundColor: "oklch(0.14 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  color: "oklch(0.75 0 0)",
                  borderRadius: 0,
                }}
              />
              {setupError && (
                <p
                  data-ocid="admin_login_setup.error_state"
                  className="text-xs mb-3"
                  style={{ color: "oklch(0.65 0.15 29)" }}
                >
                  {setupError}
                </p>
              )}
              <Button
                data-ocid="admin_login.submit_button"
                onClick={handleSetupLogin}
                disabled={setupLoading || !isAuthenticated}
                className="w-full h-9 text-xs tracking-widest uppercase"
                style={{
                  backgroundColor: "oklch(0.25 0 0)",
                  color: "var(--gold)",
                  border: "1px solid var(--gold)",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  borderRadius: 0,
                }}
              >
                {setupLoading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  "Apply Setup Code"
                )}
              </Button>
              {!isAuthenticated && (
                <p className="text-xs text-foreground/30 mt-2 text-center">
                  Log in with Internet Identity first, then apply the code.
                </p>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-foreground/30 mt-6">
          &copy; {new Date().getFullYear()} Gemora Global. Admin Portal.
        </p>
      </div>
    </div>
  );
}
