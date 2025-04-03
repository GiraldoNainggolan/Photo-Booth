import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as htmlToImage from 'html-to-image';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [filter, setFilter] = useState('none');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [flash, setFlash] = useState(false);

  const capture = React.useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (!isCameraOn) {
      setImgSrc(null);
    }
  };

  const printPhoto = () => {
    if (imgSrc) {
      const link = document.createElement('a');
      link.href = imgSrc;
      link.download = 'photo-booth-' + new Date().getTime() + '.jpg';
      link.click();
    }
  };

  const applyFilter = (filterType) => {
    setFilter(filterType);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="App">
      <h1>React Photo Booth</h1>
      
      <div className="controls">
        <button onClick={toggleCamera}>
          {isCameraOn ? 'Matikan Kamera' : 'Nyalakan Kamera'}
        </button>
        
        {isCameraOn && (
          <>
            <button onClick={capture} disabled={!isCameraOn}>
              Ambil Foto
            </button>
            
            <div className="filter-buttons">
              <button onClick={() => applyFilter('none')}>Normal</button>
              <button onClick={() => applyFilter('grayscale(100%)')}>Grayscale</button>
              <button onClick={() => applyFilter('sepia(100%)')}>Sepia</button>
              <button onClick={() => applyFilter('invert(100%)')}>Invert</button>
              <button onClick={() => applyFilter('hue-rotate(90deg)')}>Hue Rotate</button>
            </div>
          </>
        )}
        
        {imgSrc && (
          <button onClick={printPhoto}>
            Cetak/Simpan Foto
          </button>
        )}
      </div>
      
      <div className="photo-booth">
        {isCameraOn && (
          <div className={`webcam-container ${flash ? 'flash' : ''}`}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ filter: filter }}
            />
          </div>
        )}
        
        {imgSrc && (
          <div className="photo-result">
            <h2>Hasil Foto:</h2>
            <img 
              src={imgSrc} 
              alt="Captured" 
              style={{ filter: filter }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;