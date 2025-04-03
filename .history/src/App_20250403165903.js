import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as htmlToImage from 'html-to-image';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [filter, setFilter] = useState('none');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [gridLayout, setGridLayout] = useState('normal');
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Filter options
  const filterOptions = [
    { value: 'none', label: 'Normal' },
    { value: 'grayscale(100%)', label: 'Grayscale' },
    { value: 'sepia(100%)', label: 'Sepia' },
    { value: 'invert(100%)', label: 'Invert' },
    { value: 'hue-rotate(90deg)', label: 'Hue Rotate' }
  ];

  // Grid layout options
  const gridOptions = [
    { value: 'normal', label: 'Normal' },
    { value: '2', label: '2 Grid' },
    { value: '3', label: '3 Grid' },
    { value: '4', label: '4 Grid' },
    { value: '6', label: '6 Grid' }
  ];

  // Timer options
  const timerOptions = [
    { value: 0, label: 'No Timer' },
    { value: 3, label: '3 Seconds' },
    { value: 5, label: '5 Seconds' },
    { value: 10, label: '10 Seconds' }
  ];

  const capture = React.useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const startCountdown = () => {
    if (countdown > 0) {
      setIsCountingDown(true);
      let remaining = countdown;
      
      const countdownInterval = setInterval(() => {
        remaining -= 1;
        setTimer(remaining);
        
        if (remaining <= 0) {
          clearInterval(countdownInterval);
          capture();
          setIsCountingDown(false);
          setTimer(null);
        }
      }, 1000);
    } else {
      capture();
    }
  };

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

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="App">
      <header>
        <h1>React Photo Booth</h1>
        <p>Capture your moments with style</p>
      </header>
      
      <div className="control-panel">
        <div className="control-group">
          <button 
            onClick={toggleCamera}
            className={`power-btn ${isCameraOn ? 'on' : 'off'}`}
          >
            {isCameraOn ? '🟢 Camera On' : '🔴 Camera Off'}
          </button>
        </div>
        
        {isCameraOn && (
          <>
            <div className="control-group">
              <label>Filter Style:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="styled-select"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <label>Grid Layout:</label>
              <select 
                value={gridLayout} 
                onChange={(e) => setGridLayout(e.target.value)}
                className="styled-select"
              >
                {gridOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <label>Countdown Timer:</label>
              <select 
                value={countdown} 
                onChange={(e) => setCountdown(parseInt(e.target.value))}
                className="styled-select"
              >
                {timerOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <button 
                onClick={startCountdown} 
                disabled={!isCameraOn || isCountingDown}
                className="capture-btn"
              >
                {isCountingDown ? `Capturing in ${timer}s...` : '📸 Capture Photo'}
              </button>
            </div>
          </>
        )}
        
        {imgSrc && (
          <div className="control-group">
            <button onClick={printPhoto} className="print-btn">
              🖨️ Save/Print Photo
            </button>
          </div>
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
          <div className={`photo-result grid-${gridLayout}`}>
            <h2>Your Photo:</h2>
            {Array.from({ length: gridLayout === 'normal' ? 1 : parseInt(gridLayout) }).map((_, i) => (
              <div key={i} className="photo-item">
                <img 
                  src={imgSrc} 
                  alt="Captured" 
                  style={{ filter: filter }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;