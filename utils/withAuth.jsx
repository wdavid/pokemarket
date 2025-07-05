"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAdminAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          title: "Acceso denegado",
          text: "Esta sección es solo para administradores.",
          icon: "warning",
          confirmButtonText: "Ir al login",
        }).then(() => {
          router.push("/auth/login");
        });
      }
    }, [router]);

    return <Component {...props} />;
  };
}
