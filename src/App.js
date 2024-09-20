import "./App.css";
//Material Ui Componenets
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import BasicCard from "./Componenets/BasicCard";

const theme = createTheme({
    typography: {
        fontFamily: ["IBM"],
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop: "20vh",
                }}
            >
                <BasicCard />
            </Container>
        </ThemeProvider>
    );
}

export default App;
