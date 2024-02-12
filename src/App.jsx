import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <main className="container">
      {isOpen && <Modal />}

      <Journal />
      <Navbar />
    </main>
  );
}

export default App;
