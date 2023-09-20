import React, {useContext, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../functions/AuthContext";

function CreateElement(){
    let navigate = useNavigate()
    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        info: "",
        shop: ""
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, []);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł elementu wymagany!"),
        info: Yup.string().max(45, "Za dużo informacji!"),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/elements", data,
            {headers: {accessToken: localStorage.getItem("accessToken")},
            })
            .then((response) => {
            navigate(`/`);
        });
    };

    return (
    <div className="createElement">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="form">
                <label>Tytuł:</label>
                <ErrorMessage name="title" component="span"/>
                <Field
                id="inputCreateElement"
                name="title"
                placeholder="Przykładowy tytuł"
                />
                <label>Informacje:</label>
                <ErrorMessage name="info" component="span"/>
                <Field
                    className="inputInfo"
                    id="inputCreateElement"
                    name="info"
                    placeholder="Dodatkowe informacje"
                />
                <label>Sklep:</label>
                <Field as="select"
                    id="inputCreateElement"
                    name="shop">
                    <option value="market">Market</option>
                    <option value="odziezowy">Sklep odzieżowy</option>
                    <option value="apteka">Apteka</option>
                    <option value="warzywniak">Warzywniak</option>
                    <option value="drogeria">Drogeria</option>
                </Field>
                <button type="submit">Dodaj element do listy</button>
            </Form>
        </Formik>
    </div>
    );
}

export default CreateElement;