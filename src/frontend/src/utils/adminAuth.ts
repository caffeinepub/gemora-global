const SESSION_KEY = "gemora_admin_session";

export function setAdminSession() {
  localStorage.setItem(SESSION_KEY, "true");
}

export function getAdminSession(): boolean {
  return localStorage.getItem(SESSION_KEY) === "true";
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY);
}
