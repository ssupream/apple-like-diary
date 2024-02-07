import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <main className="container">
      {isOpen && <Modal />}
      <Navbar />
      <Journal />
    </main>
  );
}

export default App;
