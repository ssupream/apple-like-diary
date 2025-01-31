import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import "../src/App.css";
import { useDispatch, useSelector } from "react-redux";
import { closeDropDownMenu } from "./features/page/pageSlice";

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  const { theme } = useSelector((store) => store.theme);

  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;
  const dispatch = useDispatch();

  return (
    <main
      className={`background relative flex h-screen w-screen flex-row-reverse overflow-scroll ${theme} ${hasPages ? "no-pages" : ""}`}
      onClick={() => dispatch(closeDropDownMenu())}
    >
      <div className="noise fixed left-0 top-0 h-screen w-screen bg-[url('public/noise.webp')] bg-repeat"></div>
      {isOpen && <Modal />}

      <Journal />
      <Navbar />
    </main>
  );
}

export default App;
