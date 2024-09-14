import { createContext, useReducer } from "react";
import todosReducesr from "../Reducers/todosReducer";

export let TodosContext = createContext([]);
const TodosProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todosReducesr, []);
    return (
        <TodosContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
};
export default TodosProvider;
