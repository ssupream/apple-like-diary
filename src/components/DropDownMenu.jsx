import {
  deleteCard,
  closeDropDownMenu,
  markPage,
  editContent,
} from "../features/page/pageSlice";
import { openModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const DropDownMenu = ({ openMenu, id, marked }) => {
  const dispatch = useDispatch();

  const markedCard = {
    id: id,
    storageKey: "pages",
  };
  return (
    <div className={`${openMenu ? "drop-down-menu " : "drop-menu-hidden"}`}>
      <button
        onClick={() => {
          dispatch(closeDropDownMenu());
          dispatch(openModal());
          dispatch(editContent({ id }));
        }}
      >
        Edit
        <MdEdit />
      </button>

      <button
        onClick={() => {
          dispatch(markPage(markedCard));
          dispatch(closeDropDownMenu());
        }}
      >
        Bookmark
        {!marked ? <IoBookmarkOutline /> : <IoBookmark />}
      </button>

      <button
        onClick={() => {
          dispatch(deleteCard({ id }));
          dispatch(closeDropDownMenu());
        }}
      >
        Delete
        <IoTrashOutline />
      </button>
    </div>
  );
};
export default DropDownMenu;
