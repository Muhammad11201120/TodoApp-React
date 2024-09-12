import "./App.css";
import TodoList from "./TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { TodosContext } from "./Contexts/TodosContext";
import { v4 as uuid4 } from "uuid";
import { useState } from "react";
const theme = createTheme({
    typography: {
        fontFamily: ["Rubik"],
    },
    palette: {
        primary: {
            main: "#db3e00",
        },
        secondary: {
            main: green[500],
        },
    },
});
let initialTodos = [
    {
        id: uuid4(),
        title: "المهمة الأولى",
        body: "هنا تفاصيل المهمة الأولى نتمنى تكون مفيدة",
        isCompleted: false,
    },
    {
        id: uuid4(),
        title: "المهمة الثانية",
        body: "هنا تفاصيل المهمة الأولى نتمنى تكون مفيدة",
        isCompleted: false,
    },
    {
        id: uuid4(),
        title: "المهمة الثالثة",
        body: "هنا تفاصيل المهمة الأولى نتمنى تكون مفيدة",
        isCompleted: false,
    },
];
function App() {
    const [todos, setTodos] = useState(initialTodos);
    return (
        <ThemeProvider theme={theme}>
            <div
                className="App"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <TodosContext.Provider value={{ todos, setTodos }}>
                    <TodoList />
                </TodosContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
