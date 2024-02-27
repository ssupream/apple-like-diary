import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  const { theme } = useSelector((store) => store.theme);

  return (
    <main className={`container ${theme}`}>
      {isOpen && <Modal />}

      <Journal />
      <Navbar />
    </main>
  );
}

export default App;
