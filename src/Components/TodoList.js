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
import { useState, useEffect, useMemo, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useSnackBar } from "../Contexts/SnackBarContext";
import { TodosContext } from "../Contexts/TodosContext";

export default function TodoList() {
    const { showHideSnckBar } = useSnackBar();
    const [dialogTodo, setDialogTodo] = useState(null);
    const [openUpdateDialog, setUpdateOpenDialog] = useState(false);
    const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
    const { todos, dispatch } = useContext(TodosContext);
    const [todoTitle, setTodoTitle] = useState("");
    const [alignment, setAlignment] = useState("all");

    //use effect hook//
    useEffect(() => {
        dispatch({ type: "Get" });
    }, [dispatch]);

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
    /************** Delete ************* */
    function setDeleteDialogClicked(todo) {
        setDialogTodo(todo);
        setDeleteOpenDialog(true);
    }
    function handleConfirmDeletBtnClicked() {
        dispatch({ type: "Delete", payload: dialogTodo });
        handleDeleteClose();
        showHideSnckBar(" تم الحذف بنجاح ");
    }
    const handleDeleteClose = () => {
        setDeleteOpenDialog(false);
    };
    /************* EDIT ***********/
    function handleUpdateClose() {
        setUpdateOpenDialog(false);
    }
    function handleUpdateDialogClicked(todo) {
        setDialogTodo(todo);
        setUpdateOpenDialog(true);
    }
    function handleConfirmEdidtBtnClicked() {
        dispatch({ type: "Edit", payload: dialogTodo });
        handleUpdateClose();
        showHideSnckBar(" تم التعديل بنجاح ");
    }

    let todoJsx = displayTodosList.map((t) => {
        return (
            <Todo
                key={t.id}
                todo={t}
                showDelete={setDeleteDialogClicked}
                showUpdate={handleUpdateDialogClicked}
            />
        );
    });
    function handleAddBtnClicked() {
        dispatch({
            type: "add",
            payload: { title: todoTitle },
        });
        setTodoTitle("");
        showHideSnckBar(" تم الإضافة بنجاح ");
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
                        color="success"
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
                        تأكـيد
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
                {" "}
                <DialogTitle>تعديل المهمٌة</DialogTitle>
                <DialogContent>
                    <TextField
                        value={dialogTodo?.title}
                        autoFocus
                        required
                        id="name"
                        name="email"
                        label="عنوان المهمٌة"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: "50px" }}
                        onChange={(e) => {
                            setDialogTodo({
                                ...dialogTodo,
                                title: e.target.value,
                            });
                        }}
                    />
                    <TextField
                        value={dialogTodo?.body}
                        required
                        id="name"
                        name="email"
                        label="تفاصيل المهمٌة"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setDialogTodo({
                                ...dialogTodo,
                                body: e.target.value,
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleUpdateClose}
                        variant="outlined"
                        style={{ marginLeft: "10px" }}
                    >
                        تراجع
                    </Button>
                    <Button
                        color="success"
                        type="submit"
                        onClick={handleConfirmEdidtBtnClicked}
                        variant="outlined"
                    >
                        تأكـيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ==End Edit Dialog== */}
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
                        <Grid2
                            container
                            spacing={2}
                            style={{ marginTop: "20px" }}
                        >
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
                                    disabled={
                                        todoTitle.length === 0 ? true : false
                                    }
                                    onClick={handleAddBtnClicked}
                                >
                                    إضـافة
                                </Button>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
