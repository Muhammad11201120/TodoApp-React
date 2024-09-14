import { v4 as uuid4 } from "uuid";

export default function todosReducer(currentTodos, action) {
    switch (action.type) {
        case "add": {
            let newTodo = {
                id: uuid4(),
                title: action.payload.title,
                body: "",
                isCompleted: false,
            };
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "Edit": {
            let updatedList = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        title: action.payload.title,
                        body: action.payload.body,
                    };
                } else return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedList));
            return updatedList;
        }

        case "Delete": {
            const updatedTodos = currentTodos.filter((t) => {
                return t.id !== action.payload.id;
            });

            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        case "Get": {
            const storrageTodos =
                JSON.parse(localStorage.getItem("todos")) ?? [];
            return storrageTodos;
        }

        case "Completed": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    const updatedTodo = {
                        ...t,
                        isCompleted: !t.isCompleted,
                    };
                    return updatedTodo;
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        default: {
            throw Error(`Unknown Action ${action.type}`);
        }
    }
}
