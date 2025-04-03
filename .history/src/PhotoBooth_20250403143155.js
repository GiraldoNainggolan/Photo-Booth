import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PhotoBooth = () => {
  const [grid, setGrid] = useState(1); // Default 1x1
  const [takeCount, setTakeCount] = useState(1); // Default 1 take
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [takeOpen, setTakeOpen] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="p-6">
      {/* Dropdown Pilih Grid */}
      <div className="relative inline-block text-left mr-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Pilih Grid
        </button>
        <div className={`absolute mt-2 bg-white shadow-lg rounded w-32 ${dropdownOpen ? "block" : "hidden"}`}>
          {[1, 2, 3, 4].map((g) => (
            <button
              key={g}
              onClick={() => { setGrid(g); setDropdownOpen(false); }}
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
            >
              {g}x{g}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Pilih Take */}
      <div className="relative inline-block text-left">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setTakeOpen(!takeOpen)}
        >
          Pilih Take
        </button>
        <div className={`absolute mt-2 bg-white shadow-lg rounded w-32 ${takeOpen ? "block" : "hidden"}`}>
          {[1, 2, 3, 4, 5].map((t) => (
            <button
              key={t}
              onClick={() => { setTakeCount(t); setTakeOpen(false); }}
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
            >
              {t}x Take
            </button>
          ))}
        </div>
      </div>

      {/* Grid Foto */}
      <div ref={printRef} className={`grid grid-cols-${grid} gap-2 mt-6`}>
        {Array.from({ length: grid * grid }).map((_, i) => (
          <div key={i} className="w-24 h-24 bg-gray-300 border flex items-center justify-center">
            Foto {i + 1}
          </div>
        ))}
      </div>

      {/* Tombol Cetak */}
      <button onClick={handlePrint} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Cetak Foto
      </button>
    </div>
  );
};

export default PhotoBooth;
