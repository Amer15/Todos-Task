import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

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
        console.log("executed...");
        console.log(filteredTodos);
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
        {searchQuery ? filteredTodos.length : todos.length} todos found
      </p>

      <Input
        placeholder="enter title to search todos"
        className="mx-auto max-w-[70%] mt-2 mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table className="mx-auto max-w-[70%] table-fixed">
        <TableCaption>A list of todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">User Id</TableHead>
            <TableHead className="w-[70%] min-w-[200px]">Title</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchQuery &&
            filteredTodos.length > 0 &&
            filteredTodos.map(({ id, userId, title, completed }) => (
              <TableRow key={id}>
                <TableCell>{userId}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell
                  className={`${
                    completed ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {completed ? "completed" : "pending"}
                </TableCell>
              </TableRow>
            ))}
          {searchQuery && filteredTodos.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                no results found
              </TableCell>
            </TableRow>
          )}
          {searchQuery == "" &&
            todos.map(({ id, userId, title, completed }) => (
              <TableRow key={id}>
                <TableCell>{userId}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell
                  className={`${
                    completed ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {completed ? "completed" : "pending"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default App;
