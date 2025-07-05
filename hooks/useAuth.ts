import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error al parsear el usuario:", err);
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;
  const role = user?.role;

  return { user, isAuthenticated, role, loading };
}
