import "./App.css";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import CustomModal from "./components/Modal";
import { useState, useEffect, useRef } from "react";

const isColorDark = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128;
};

function App() {
  useEffect(() => {
    generateNewColors();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLock, setIsLock] = useState([false, false, false, false, false]);
  const [colors, setColors] = useState(["", "", "", "", ""]);
  const textAreaRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderedColors = colors.map((element, index) => {
    const isDarkColor = isColorDark(element);

    return (
      <div
        style={{ backgroundColor: element, color: isDarkColor ? "white" : "black" }}
        className="cor"
        key={index}
      >
        <div className="flex justify-between mt-2">
          <div className={`ml-4 font-bold ${isDarkColor ? "text-white" : "text-black"}`}>{element}</div>
          <div className="flex gap-3">
            <button onClick={() => handleToggleLock(index)}>
              {isLock[index] ? <FaLock /> : <FaLockOpen />}
            </button>
            <button className="mr-4" onClick={() => handleCopy(element)}>
              <IoCopy />
            </button>
          </div>
        </div>
      </div>
    );
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateNewColors = () => {
    const newColors = colors.map((currentColor, index) => {
      if (isLock[index]) {
        return currentColor;
      } else {
        return getRandomColor();
      }
    });
    setColors(newColors);
  };

  const handleCopy = (text) => {
    if (textAreaRef.current) {
      textAreaRef.current.value = text;
      textAreaRef.current.select();
      setModalContent(`Copied: ${text}`);
      setModalIsOpen(true);
    }
  };

  const handleToggleLock = (index) => {
    const updatedIsLock = [...isLock];
    updatedIsLock[index] = !updatedIsLock[index];
    setIsLock(updatedIsLock);
  };

  return (
    <div className="App">
      <CustomModal isOpen={modalIsOpen} closeModal={closeModal} content={modalContent} />
      <div className="text-6xl font-extrabold mb-12 text-purple-700">
      Bytes4Coolors
      </div>
      <div className="flex gap-2">{renderedColors}</div>
      <textarea ref={textAreaRef} style={{ position: "absolute", top: "-9999px" }} />
      <button
        onClick={generateNewColors}
        className="mt-5 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full border border-blue-700"
      >
        Generate Colors
      </button>

      
    </div>
  );
}

export default App;
