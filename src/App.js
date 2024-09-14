import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { SnackBarProvider } from "./Contexts/SnackBarContext";
import TodosProvider from "./Contexts/TodosContext";

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
function App() {
    return (
        <ThemeProvider theme={theme}>
            <TodosProvider>
                <SnackBarProvider>
                    <div
                        className="App"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                        }}
                    >
                        <TodoList />
                    </div>
                </SnackBarProvider>
            </TodosProvider>
        </ThemeProvider>
    );
}

export default App;
