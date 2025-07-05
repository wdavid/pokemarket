"use client";
import { loginSimulado } from "@/services/authService";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import api from "@/utils/api";

interface LoginFormData {
  identifier: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginSimulado(
        formData.identifier,
        formData.password
      );

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));

        document.cookie = `token=${result.token}; path=/; max-age=86400;`;

        router.push("/");
      } else {
        setError(result.message ?? "Ocurrió un error.");
      }
    } catch (err) {
      setError("Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl text-black font-bold text-center mb-4">
          Iniciar Sesión
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="identifier"
          placeholder="Nombre de usuario o correo"
          value={formData.identifier}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 text-black border rounded-lg"
          required
        />

        <div className="relative mb-4">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin text-white w-5 h-5" />
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
      <div className="mt-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Ir a la página principal
        </Link>
      </div>
    </div>
  );
}
