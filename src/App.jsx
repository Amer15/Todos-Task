import axios from "axios";
import { useEffect, useState } from "react";
import { TodoCard } from "./components/todo-card";
import { Input } from "./components/ui/input";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  //using debounce to optimize filtering on each keystore, it only runs when user stops typing here its 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery) {
        const filteredTodos = todos.filter((todo) =>
          todo.title.includes(searchQuery)
        );
        setFilteredTodos(filteredTodos);
      } else {
        setFilteredTodos([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, todos]);

  return (
    <section>
      <h3 className="text-purple-500 text-center font-semibold text-2xl">
        Todos
      </h3>

      <p className="text-center text-base">
        {filteredTodos.length > 0 ? filteredTodos.length : todos.length} todos
        found
      </p>

      <Input
        placeholder="enter title to search todos"
        className="mx-auto max-w-[70%] mt-2 mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredTodos.length > 0
        ? filteredTodos.map(({ id, title, userId, completed }) => (
            <TodoCard
              key={id}
              title={title}
              isCompleted={completed}
              userId={userId}
            />
          ))
        : todos.map(({ id, title, userId, completed }) => (
            <TodoCard
              key={id}
              title={title}
              isCompleted={completed}
              userId={userId}
            />
          ))}
    </section>
  );
};

export default App;
