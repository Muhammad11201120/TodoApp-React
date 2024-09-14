import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ open, message }) {
    return (
        <div>
            <Snackbar open={open}>
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{
                        width: "100%",
                        padding: " 0 40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        direction: "ltr",
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
