import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useReactToPrint } from "react-to-print";

const PhotoBoothApp = () => {
  const [grid, setGrid] = useState(1);
  const [takeCount, setTakeCount] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [takeOpen, setTakeOpen] = useState(false);
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const capture = () => {
    if (webcamRef.current) {
      const newImages = [];
      for (let i = 0; i < takeCount; i++) {
        const imageSrc = webcamRef.current.getScreenshot();
        newImages.push(imageSrc);
      }
      setImages(newImages);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Photo Booth</h1>
      
      <div className="flex space-x-4 mb-4">
        <div className="relative inline-block text-left">
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
      </div>

      {!images.length ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/png" className="border-4 border-gray-500 rounded-lg shadow-lg" />
          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded shadow-md hover:bg-yellow-600" onClick={capture}>
            Ambil Foto
          </button>
        </>
      ) : (
        <div ref={printRef} className={`grid grid-cols-${grid} gap-2 mt-6`}>
          {images.map((img, index) => (
            <div key={index} className="w-24 h-24 border flex items-center justify-center">
              <img src={img} alt={`Captured ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 flex space-x-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded shadow-md hover:bg-red-700" onClick={handlePrint}>
            Cetak Foto
          </button>
          <button className="bg-gray-500 text-white px-6 py-2 rounded shadow-md hover:bg-gray-700" onClick={() => setImages([])}>
            Ambil Lagi
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoBoothApp;
