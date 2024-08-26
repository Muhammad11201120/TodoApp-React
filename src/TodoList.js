import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonGroups from "./ButtonGroups";
import Grid2 from "@mui/material/Unstable_Grid2";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import { v4 as uuid4 } from "uuid";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "./Contexts/TodosContext";

export default function TodoList() {
    const [todoTitle, setTodoTitle] = useState("");
    const { todos, setTodos } = useContext(TodosContext);

    let todoJsx = todos.map((t) => {
        return <Todo key={t.id} todo={t} />;
    });

    return (
        <Container maxWidth="md">
            <Card sx={{ minWidth: 275 }}>
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
                        <ButtonGroups />
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
                                onClick={handleAddBtnClicked}
                            >
                                إظافة
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
        setTodos([...todos, newTodo]);
        setTodoTitle("");
    }
}
