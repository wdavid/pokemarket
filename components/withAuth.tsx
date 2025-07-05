"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: string[] = []
) {
  return function ProtectedComponent(props: T) {
    const { user, isAuthenticated, role, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (loading) return;

      if (!isAuthenticated) {
        router.replace("/auth/login");
      } else if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role || "")
      ) {
        router.replace("/403");
      } else {
        setAuthorized(true);
      }
    }, [isAuthenticated, role, loading]);

    if (loading || !authorized) return null;

    return <WrappedComponent {...(props as T)} />;
  };
}
