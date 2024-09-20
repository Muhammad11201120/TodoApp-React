import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
/** external libs */
import axios from "axios";
let cancelAxios = null;
export default function BasicCard() {
    const [dateAndTime, setDateAndTime] = React.useState("");
    const { t, i18n } = useTranslation();
    const [lan, setLan] = React.useState("en");
    const [local, setLocal] = React.useState("en");
    const [temp, setTemp] = React.useState({
        tempNumber: 0,
        description: "",
        min: 0,
        max: 0,
        icon: ``,
    });

    React.useEffect(() => {
        moment.locale(local);
        setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
        i18n.changeLanguage(local);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=8cff7c19b9951c037653d004b681aa2c&lang=${lan}`,
                {
                    cancelToken: new axios.CancelToken((c) => {
                        cancelAxios = c;
                    }),
                }
            )
            .then((response) => {
                const Ctemp = Math.round(response.data.main.temp - 272.15);
                const min = Math.round(response.data.main.temp_min - 272.15);
                const max = Math.round(response.data.main.temp_max - 272.15);
                const description = response.data.weather[0].description;
                const icon_title = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
                console.log(response.data);
                setTemp({
                    tempNumber: Ctemp,
                    min: min,
                    max: max,
                    description: description,
                    icon: icon_title,
                });
            })
            .catch((response) => {
                /* console.log(response); */
            });
        return () => {
            cancelAxios();
        };
    }, [i18n, lan, local]);

    function handleLangBtnClicked() {
        if (local === "en") {
            setLocal("ar");
            setLan("ar");
        } else {
            setLocal("en");
            setLan("en");
        }
    }
    return (
        <div style={{ direction: local === "ar" ? "rtl" : "ltr" }}>
            <Card
                sx={{
                    minWidth: 275,
                    width: "100%",
                    textAlign: "left",
                    border: "1px solid #372248",
                    borderRadius: "8px",
                    boxShadow: "0px 11px 11px  rgba(0,0,0,0.5)",
                    backgroundColor: "#372248",
                    color: "white",
                }}
            >
                <CardContent>
                    <div
                        style={{
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography gutterBottom style={{ fontSize: "45px" }}>
                            {t("AlRiyadh")}
                        </Typography>
                        <p style={{ margin: "0 20px", fontSize: "15px" }}>
                            {dateAndTime}
                        </p>
                    </div>
                    <hr />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "start",
                        }}
                    >
                        <div>
                            <Typography
                                style={{ fontSize: "45px" }}
                                component="div"
                            >
                                {temp.tempNumber + " °C"}
                            </Typography>
                            <Typography sx={{ mb: 15 }}>
                                {temp.description}
                            </Typography>
                        </div>
                        <div>{<img src={temp.icon} alt=""></img>}</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "50px",
                        }}
                    >
                        <Typography variant="body1">
                            {t("max")} : <span> {temp.max}</span>
                        </Typography>
                        |
                        <Typography variant="body1">
                            {t("min")} :<span> {temp.min}</span>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            <Button
                size="small"
                color="secondary"
                variant="outlined"
                style={{ marginTop: "25px" }}
                onClick={() => {
                    handleLangBtnClicked();
                }}
            >
                {local === "en" ? "ARABIC" : "إنجليزي"}
            </Button>
        </div>
    );
}
