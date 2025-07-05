"use client";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
}

export default function Modal({ show, onClose, message, type = "success" }: ModalProps) {
  if (!show) return null;

  const icon =
    type === "success" ? (
      <AiOutlineCheckCircle className="text-green-500 text-5xl" />
    ) : (
      <AiOutlineCloseCircle className="text-red-500 text-5xl" />
    );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <div className="mb-4 flex justify-center">{icon}</div>
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          {type === "success" ? "¡Éxito!" : "Error"}
        </h2>
        <p className="mb-4 dark:text-gray-300">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-sky-700 text-white rounded-full hover:bg-sky-800 transition"
        >
          Cerrar
        </button>
      </motion.div>
    </div>
  );
}
