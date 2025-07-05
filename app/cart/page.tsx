"use client";
import { useCart } from "@/context/CartContext";
import { updatePokemonStock } from "@/services/jsonServerService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const handleCheckout = async () => {
    try {
      for (const item of cart.items) {
        const newStock = item.pokemon.stock - item.quantity;
        await updatePokemonStock(item.pokemon.id, Math.max(newStock, 0));
      }

      clearCart();
      setModalType("success");
      setModalMessage("¡Compra realizada con éxito!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      setModalType("error");
      setModalMessage("Hubo un error al procesar tu compra.");
      setShowModal(true);
    }
  };

  return (
    <div className="p-6 mt-24 max-w-5xl mx-auto">
      <h1 className="text-3xl text-black dark:text-white font-bold mb-6 text-center">
        Carrito de compras
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center text-lg">
          <p className="mb-2 text-black dark:text-white">Tu carrito está vacío.</p>
          <Link href="/" className="text-sky-700 dark:text-sky-400 underline hover:text-sky-900">
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <CartItem
              key={item.pokemon.id}
              pokemon={item.pokemon}
              quantity={item.quantity}
            />
          ))}

          <div className="text-right mt-6">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              Total: ${total}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-3 rounded-full bg-sky-700 text-white font-bold hover:bg-sky-800 transition"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          message={modalMessage}
          type={modalType}
        />
      )}
    </div>
  );
}
