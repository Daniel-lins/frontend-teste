import "./styles.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

function CardItem({
  item,
  isUpdating,
  renderUpdateForm,
  setIsUpdating,
  deleteItem,
}) {
  return (
    <div>
      <div className="todo-item">
        {isUpdating === item._id ? (
          renderUpdateForm()
        ) : (
          <>
            <p className="item-content">{item.item}</p>
            <p className="description-content">{item.description}</p>

            <div className="container-buttons">
              <button
                className="update-item"
                onClick={() => {
                  setIsUpdating(item._id);
                }}
              >
                <AiFillEdit />
              </button>
              <button
                className="delete-item"
                onClick={() => {
                  deleteItem(item._id);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardItem;
