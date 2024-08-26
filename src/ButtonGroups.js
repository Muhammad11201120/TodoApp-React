import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ButtonGroups() {
    const [alignment, setAlignment] = React.useState("web");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={{ direction: "ltr" }}
        >
            <ToggleButton style={{ minWidth: "100px" }} value="done">
                غير المنجزة
            </ToggleButton>
            <ToggleButton style={{ minWidth: "100px" }} value="all" selected>
                الكل
            </ToggleButton>
            <ToggleButton style={{ minWidth: "100px" }} value="undone">
                المنجزة
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
