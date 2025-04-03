:root {
  --primary-color: #4a6fa5;
  --secondary-color: #166088;
  --accent-color: #4fc3f7;
  --dark-color: #333;
  --light-color: #f8f9fa;
  --success-color: #28a745;
  --danger-color: #dc3545;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  color: var(--dark-color);
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
}

header p {
  font-size: 1.1rem;
  color: #666;
}

.control-panel {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.control-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--secondary-color);
}

.styled-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.styled-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(79, 195, 247, 0.3);
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.power-btn {
  background-color: var(--dark-color);
  color: white;
}

.power-btn.on {
  background-color: var(--success-color);
}

.power-btn.off {
  background-color: var(--danger-color);
}

.capture-btn {
  background-color: var(--primary-color);
  color: white;
}

.capture-btn:hover:not(:disabled) {
  background-color: var(--secondary-color);
}

.print-btn {
  background-color: var(--success-color);
  color: white;
}

.print-btn:hover {
  background-color: #218838;
}

.photo-booth {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.webcam-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px;
}

.webcam-container.flash {
  animation: flash 0.2s;
}

@keyframes flash {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.photo-result {
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.photo-result h2 {
  text-align: center;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.grid-normal {
  display: flex;
  justify-content: center;
}

.grid-normal .photo-item {
  width: 100%;
  max-width: 600px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
}

.grid-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}

.photo-item {
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.photo-item img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }
  
  .grid-3, .grid-6 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-2, .grid-3, .grid-4, .grid-6 {
    grid-template-columns: 1fr;
  }
}