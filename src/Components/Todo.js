import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { TodosContext } from "../Contexts/TodosContext";
import { useSnackBar } from "../Contexts/SnackBarContext";
export default function Todo({ todo, showDelete, showUpdate }) {
    const { todos, dispatch } = useContext(TodosContext);
    const { showHideSnckBar } = useSnackBar();

    function handleCheckedClicked() {
        dispatch({ type: "Completed", payload: todo });
        showHideSnckBar("تم تعديل حالة المهمة بنجاح");
    }

    function handleDeleteClicked() {
        showDelete(todo);
    }

    function handleUpdateClicked() {
        showUpdate(todo);
    }

    return (
        <>
            <div>
                <Card
                    sx={{
                        minWidth: 275,
                        textAlign: "right",
                        backgroundColor: "#3d5afe",
                        color: "white",
                        marginTop: "20px",
                    }}
                >
                    <CardContent className="todoCard">
                        <Grid2 container spacing={2}>
                            <Grid2 item="true" xs={7}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    style={{
                                        fontFamily: "Rubik",
                                        fontWeight: "500",
                                        textDecoration: todo.isCompleted
                                            ? "line-through"
                                            : "none",
                                    }}
                                    color={
                                        todo.isCompleted ? "#db3e00" : "white"
                                    }
                                >
                                    {todo.title}
                                </Typography>
                                <Typography
                                    variant="h7"
                                    component="div"
                                    style={{
                                        textDecoration: todo.isCompleted
                                            ? "line-through"
                                            : "none",
                                    }}
                                    color={
                                        todo.isCompleted ? "#db3e00" : "white"
                                    }
                                >
                                    {todo.body}
                                </Typography>
                            </Grid2>
                            <Grid2
                                item="true"
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-evenly"}
                                alignItems={"center"}
                            >
                                <IconButton
                                    className="iconButton"
                                    style={{
                                        color: todo.isCompleted
                                            ? "white"
                                            : "green",
                                        backgroundColor: todo.isCompleted
                                            ? "green"
                                            : "white",
                                        border: todo.isCompleted
                                            ? "2px solid white"
                                            : "2px solid green",
                                    }}
                                    onClick={() => {
                                        handleCheckedClicked();
                                    }}
                                >
                                    <CheckIcon />
                                </IconButton>
                                <IconButton
                                    className="iconButton"
                                    style={{
                                        color: "#1769aa",
                                        backgroundColor: "white",
                                        border: "2px solid #1769aa",
                                    }}
                                    onClick={handleUpdateClicked}
                                >
                                    <EditIcon />
                                </IconButton>

                                <IconButton
                                    className="iconButton"
                                    style={{
                                        color: "#b23c17",
                                        backgroundColor: "white",
                                        border: "2px solid #b23c17",
                                    }}
                                    onClick={(e) => {
                                        handleDeleteClicked();
                                    }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
