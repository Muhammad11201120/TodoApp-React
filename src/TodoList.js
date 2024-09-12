import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { v4 as uuid4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { TodosContext } from "./Contexts/TodosContext";

export default function TodoList() {
    const [todoTitle, setTodoTitle] = useState("");
    const [alignment, setAlignment] = useState("all");
    const { todos, setTodos } = useContext(TodosContext);

    //use effect hook//
    useEffect(() => {
        const storrageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storrageTodos);
    }, [setTodos]);

    let displayTodosList = [];
    /****FILTERS*****/
    const CompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted;
        });
    }, [todos]);
    const UnCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted;
        });
    }, [todos]);
    /*****End Filters*****/
    if (alignment === "done") {
        displayTodosList = CompletedTodos;
    } else if (alignment === "undone") {
        displayTodosList = UnCompletedTodos;
    } else {
        displayTodosList = todos;
    }
    let todoJsx = displayTodosList.map((t) => {
        return <Todo key={t.id} todo={t} />;
    });

    const handleChange = (event) => {
        setAlignment(event.target.value);
    };
    function handleDoneBtnClicked(e) {
        setAlignment(e.target.value);
    }
    function handleAllBtnClicked(e) {
        setAlignment(e.target.value);
    }
    function handleUnDoneeBtnClicked(e) {
        setAlignment(e.target.value);
    }
    return (
        <Container maxWidth="sm">
            <Card
                sx={{ minWidth: 275 }}
                style={{ maxHeight: "80vh", overflow: "scroll" }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        component="div"
                        style={{
                            fontFamily: "Rubik",
                            fontWeight: "900",
                            color: "#2a3eb1",
                        }}
                    >
                        قَائِـمة مَهَـامٌي
                        <hr></hr>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            style={{ direction: "ltr" }}
                        >
                            <ToggleButton
                                style={{ minWidth: "100px" }}
                                value="undone"
                                onClick={handleDoneBtnClicked}
                            >
                                غير المنجزة
                            </ToggleButton>
                            <ToggleButton
                                style={{ minWidth: "100px" }}
                                value="all"
                                onClick={handleAllBtnClicked}
                            >
                                الكل
                            </ToggleButton>
                            <ToggleButton
                                style={{ minWidth: "100px" }}
                                value="done"
                                onClick={handleUnDoneeBtnClicked}
                            >
                                المنجزة
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Typography>
                    {todoJsx}
                    <Grid2 container spacing={2} style={{ marginTop: "20px" }}>
                        <Grid2 item="true" xs={8}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label={"عنوان المهمٌة"}
                                style={{ width: "100%", direction: "rtl" }}
                                placeholder="عنوان المهمٌة"
                                value={todoTitle}
                                onChange={(e) => {
                                    setTodoTitle(e.target.value);
                                }}
                            />
                        </Grid2>
                        <Grid2 item="true" xs={4}>
                            <Button
                                variant="contained"
                                size="large"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgrounColor: "#3d5afe",
                                }}
                                disabled={todoTitle.length === 0 ? true : false}
                                onClick={handleAddBtnClicked}
                            >
                                إضـافة
                            </Button>
                        </Grid2>
                    </Grid2>
                </CardContent>
            </Card>
        </Container>
    );

    function handleAddBtnClicked() {
        let newTodo = {
            id: uuid4(),
            title: todoTitle,
            body: "",
            isCompleted: false,
        };
        const localStorageTodos = [...todos, newTodo];
        setTodos(localStorageTodos);
        localStorage.setItem("todos", JSON.stringify(localStorageTodos));
        setTodoTitle("");
    }
}
