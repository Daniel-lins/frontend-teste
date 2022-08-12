import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import CardItem from "./components/cardItem";

function App() {
  const [itemText, setItemText] = useState("");
  const [description, setDescription] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  const [search, setSearch] = useState("");

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
        description: description,
      });
      setListItems((prev) => [...prev, res.data]);
      setDescription("");
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="Novo titulo"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />

      {/* <input
        className="update-new-input"
        type="text"
        placeholder="Novo titulo"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      /> */}
      <button className="update-new-btn" type="submit">
        Atualizar
      </button>
    </form>
  );

  const searchTodo = listItems.filter((item) =>
    item.item.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(searchTodo);
  return (
    <div className="App">
      <div className="Container-search">
        <input
          type="text"
          value={search}
          placeholder="Pesquisar item"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Titulo"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <input
          type="text"
          placeholder="Descrição"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />

        {itemText.length > 1 ? (
          <button type="submit">adicionar</button>
        ) : (
          <div class="buton-Fake">adicionar</div>
        )}
      </form>
      <div className="todo-listItems">
        {searchTodo.map((item) => (
          <CardItem
            item={item}
            isUpdating={isUpdating}
            renderUpdateForm={renderUpdateForm}
            setIsUpdating={setIsUpdating}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
