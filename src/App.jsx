import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import "../src/App.css";
import { useDispatch, useSelector } from "react-redux";
import { closeDropDownMenu } from "./features/page/pageSlice";
import TopBar from "./components/TopBar";

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  const { theme } = useSelector((store) => store.theme);

  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;
  const dispatch = useDispatch();

  return (
    <main
      className={`background ${theme} w-screen h-screen flex flex-col relative`} // Added flex-col
      onClick={() => dispatch(closeDropDownMenu())}
    >
      <div className="noise fixed left-0 top-0 h-screen w-screen bg-[url('public/noise.webp')] bg-repeat z-[-1]"></div>
      <TopBar />
      <div
        className={`relative flex flex-row-reverse flex-1`} // Added flex-1
        onClick={() => dispatch(closeDropDownMenu())}
      >
        {isOpen && <Modal />}
        <Journal />
        <Navbar />
      </div>
    </main>
  );
}

export default App;
