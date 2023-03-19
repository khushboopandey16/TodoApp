import { useState } from "react";
import "./Todo.css";
const Todo = () => {
  const [inputItem, setInputItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editTodo, seteditTodo] = useState(null);
  const handleItem = () => {
    if (!inputItem) {
    } else if (inputItem && !toggleBtn) {
      setTodoItems(
        todoItems.map((element) => {
          if (element.id === editTodo) {
            return { ...element, name: inputItem };
          }
          return element;
        })
      );
      setToggleBtn(true);
      setInputItem("");
      seteditTodo(null);
    } else {
      const editData = { id: new Date().getTime().toString(), name: inputItem };
      setTodoItems([...todoItems, editData]);
      setInputItem("");
    }
  };
  //edit the todo
  const editTodoItem = (id) => {
    let newItem = todoItems.find((element) => {
      return element.id === id;
    });
    setToggleBtn(false);
    setInputItem(newItem.name);
    seteditTodo(id);
  };

  //deleting the items from the todo list
  const deleteTodo = (index) => {
    const remainingData = todoItems.filter((element) => {
      return index !== element.id;
    });
    setTodoItems(remainingData);
  };
  //delete All items from the todo list
  const removeAllData = () => {
    setTodoItems([]);
  };
  return (
    <>
      <div className="heading_todo"> Todo List</div>
      <div className="main_container">
        <div className="input_style">
          <input
            type="text"
            placeholder="Add Your Todo Here..."
            id=""
            value={inputItem}
            onChange={(event) => setInputItem(event.target.value)}
          />
          {toggleBtn ? (
            <button onClick={handleItem} className="adding">
              +
            </button>
          ) : (
            <button className="edit_todo" onClick={handleItem}>
              Edit
            </button>
          )}
        </div>
        <div className="show_todo">
          {todoItems.map((element) => {
            return (
              <div className="todo_item" key={element.id}>
                <h3 className="todo_box">{element.name}</h3>
                <button
                  className="edit_todo"
                  onClick={() => {
                    editTodoItem(element.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteTodo(element.id);
                  }}
                  className="delete_todo"
                >
                  -
                </button>
              </div>
            );
          })}
        </div>

        <button className="remove_data" onClick={removeAllData}>
          Delete All
        </button>
      </div>
    </>
  );
};
export default Todo;
