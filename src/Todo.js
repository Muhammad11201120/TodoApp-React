import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { TodosContext } from "./Contexts/TodosContext";

export default function Todo({ todo }) {
    const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
    const [openUpdateDialog, setUpdateOpenDialog] = useState(false);
    const { todos, setTodos } = useContext(TodosContext);
    function handleCheckedClicked() {
        let newTodos = todos.map((t) => {
            if (t.id === todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(newTodos);
    }
    function handleConfirmDeletBtnClicked() {
        let newTodos = todos.filter((t) => {
            return t.id !== todo.id;
        });
        setTodos(newTodos);
    }
    function handleDeleteClicked() {
        setDeleteOpenDialog(true);
    }

    const handleDeleteClose = () => {
        setDeleteOpenDialog(false);
    };
    function handleUpdateClose() {
        setUpdateOpenDialog(false);
    }
    function handleUpdateClicked() {
        setUpdateOpenDialog(true);
    }
    return (
        <>
            {/* ==Delete Dialog== */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"هل أنت متأكد من عملية الحذف؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        في حالة التأكيد فأنت تقوم بحذف هذه المهمة نهائيا ولا
                        يمكن التراجع بعد ذلك
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        style={{
                            marginLeft: "10px",
                        }}
                        onClick={handleDeleteClose}
                    >
                        تراجع
                    </Button>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleConfirmDeletBtnClicked}
                        autoFocus
                    >
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ==End Delete Dialog== */}
            {/* == Edit Dialog== */}
            <Dialog
                open={openUpdateDialog}
                onClose={handleUpdateClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleUpdateClose();
                    },
                }}
            >
                <DialogTitle>تعديل المهمٌة</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="email"
                        label="عنوان المهمٌة"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: "50px" }}
                    />
                    <TextField
                        required
                        id="name"
                        name="email"
                        label="تفاصيل المهمٌة"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>تراجع</Button>
                    <Button color="secondary" type="submit">
                        التأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ==End Edit Dialog== */}
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
                                    }}
                                >
                                    {todo.title}
                                </Typography>
                                <Typography variant="h7" component="div">
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
