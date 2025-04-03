import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";

const frames = [
  "border-8 border-gold p-2", // Bingkai emas
  "border-8 border-white p-2", // Bingkai putih
  "border-8 border-black p-2", // Bingkai hitam
];

const PhotoBooth = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [frame, setFrame] = useState(frames[0]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const printImage = () => {
    const printArea = document.getElementById("photo-result");
    html2canvas(printArea).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "photo-booth.png";
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">Luxury Photo Booth</h1>
      {!image ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/png" className="border-4 border-gray-500 rounded-lg shadow-lg" />
          <button className="mt-4 bg-gold text-black px-6 py-2 rounded shadow-md hover:bg-yellow-500" onClick={capture}>
            Ambil Foto
          </button>
        </>
      ) : (
        <div id="photo-result" className="flex flex-col items-center">
          <div className={`rounded-lg ${frame}`}>
            <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex space-x-4 my-4">
            {frames.map((f, index) => (
              <button key={index} className={`p-2 rounded ${f}`} onClick={() => setFrame(f)}>
                Frame {index + 1}
              </button>
            ))}
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-700" onClick={printImage}>
            Cetak Foto
          </button>
          <button className="mt-2 bg-red-500 text-white px-6 py-2 rounded shadow-md hover:bg-red-700" onClick={() => setImage(null)}>
            Ambil Lagi
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoBooth;
