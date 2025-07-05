"use client";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import Select from "react-select";
import "rc-slider/assets/index.css";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  types: string[];
}

export default function Filters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  types,
}: FiltersProps) {
  const minAvailablePrice = 0;
  const maxAvailablePrice = 500;

  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
    }
  };

  const typeOptions = [
    { value: "", label: "Todos los tipos" },
    ...types.map((t) => ({
      value: t,
      label: t.charAt(0).toUpperCase() + t.slice(1),
    })),
  ];

  const sortOptions = [
    { value: "", label: "Ordenar por" },
    { value: "name", label: "Nombre" },
    { value: "price", label: "Precio" },
    { value: "type", label: "Tipo" },
  ];

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "9999px",
      borderColor: "#075985",
      borderWidth: 2,
      backgroundColor: isDark ? "#000000" : "#ffffff",
      color: isDark ? "white" : "black",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      paddingLeft: "0.5rem",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? "#000000" : "#ffffff",
      borderRadius: "12px",
      zIndex: 20,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? "#1e293b"
          : "#e0f2fe"
        : "transparent",
      color: isDark ? "white" : "black",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? "white" : "black",
    }),
  };

  return (
    <div className="bg-sky-50 shadow-lg rounded-lg sm:bg-white sm:shadow-none dark:bg-black p-4">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 px-4 border-2 border-dotted border-sky-800 text-black dark:text-white rounded-xl"
        >
          {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      <div
        className={`flex flex-col gap-6 gap-y-3 md:gap-x-6 md:gap-y-0 md:flex-row md:flex-wrap items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="relative w-full md:w-60">
          <input
            type="text"
            placeholder="Buscar Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-12 rounded-full border-2 hover:border-gray-400 border-sky-800 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-black dark:border-sky-400 dark:text-white"
          />
          <button
            className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-sky-800 hover:bg-sky-600 transition flex items-center justify-center"
            onClick={() => {}}
            aria-label="Buscar"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>
        </div>

        <div className="w-full md:w-60">
          <Select
            instanceId="type-select"
            options={typeOptions}
            value={typeOptions.find((o) => o.value === selectedType)}
            onChange={(option) => setSelectedType(option?.value || "")}
            styles={customSelectStyles}
            placeholder="Todos los tipos"
            menuPlacement="auto"
          />
        </div>

        <div className="w-full px-4 md:w-56">
          <label className="text-sm mb-1 block dark:text-white">
            Rangos de precio
          </label>
          <Slider
            range
            min={minAvailablePrice}
            max={maxAvailablePrice}
            value={[minPrice, maxPrice]}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: "#0284c7" }]}
            handleStyle={[
              { borderColor: "#0284c7", backgroundColor: "#0284c7" },
              { borderColor: "#0284c7", backgroundColor: "#0284c7" },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb" }}
          />
          <div className="text-center mt-2 text-sm dark:text-white">
            ${minPrice.toFixed(2)} — ${maxPrice.toFixed(2)}
          </div>
        </div>

        <div className="w-full md:w-60">
          <Select
            instanceId="sort-select"
            options={sortOptions}
            value={sortOptions.find((o) => o.value === sortBy)}
            onChange={(option) => setSortBy(option?.value || "")}
            styles={customSelectStyles}
            placeholder="Ordenar por"
            menuPlacement="auto"
          />
        </div>
      </div>
    </div>
  );
}
