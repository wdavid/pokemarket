"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsCart, BsMoon, BsSun } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const { cart } = useCart();
  const router = useRouter();

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // Tema
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      const isDark = storedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    // Usuario
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role || null);
        setUsername(parsedUser.username || null);
      } catch (err) {
        console.error("Error al parsear el usuario:", err);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie = "token=; path=/; max-age=0;";

    router.push("/auth/login");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-sky-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <h1 className="text-2xl font-bold">PokeMarket</h1>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {role === "admin" && (
            <Link
              href="/admin"
              className="px-3 py-2 rounded-md font-medium hover:opacity-80"
            >
              Admin
            </Link>
          )}
          <Link
            href="/"
            className="px-3 py-2 rounded-md font-medium hover:opacity-80"
          >
            Catálogo
          </Link>
          <Link
            href="/cart"
            className="flex items-center px-3 py-2 rounded-md font-medium hover:opacity-80 relative"
          >
            <BsCart className="mr-1" />
            Carrito
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-xs font-bold px-2 py-1 rounded-full text-sky-800">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md hover:opacity-80"
          >
            {isDarkMode ? <BsSun /> : <BsMoon />}
          </button>
          {username && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-md"
            >
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-sky-800">
          {role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:opacity-80"
            >
              Admin
            </Link>
          )}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:opacity-80"
          >
            Catálogo
          </Link>
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center py-2 hover:opacity-80"
          >
            <BsCart className="mr-1" />
            Carrito
            {cartCount > 0 && (
              <span className="ml-2 bg-white text-xs font-bold px-2 py-1 rounded-full text-sky-800">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 py-2 hover:opacity-80"
          >
            {isDarkMode ? <BsSun /> : <BsMoon />}
            {isDarkMode ? "Modo claro" : "Modo oscuro"}
          </button>
          {username && (
            <button
              onClick={handleLogout}
              className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
