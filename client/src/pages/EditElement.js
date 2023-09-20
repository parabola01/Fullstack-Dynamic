import React, {useContext, useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../functions/AuthContext";

function EditElement() {
    const [initialValues, setInitialValues] = useState({
        title: "",
        info: "",
        shop: ""
    });

    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);
    let {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/valid`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                navigate('/');
            } else {
                getElementData(response.data.username);
            }
        });
    }, [authState, navigate]);

    //pobieram informację o zadaniu
    const getElementData = (username) => {
        axios.get(`http://localhost:3001/elements/byId/${id}`).then((response) => {
            if (response.data) {
                if (username === response.data.username) {
                    setInitialValues({
                        title: response.data.title,
                        info: response.data.info,
                        shop: response.data.shop,
                    });
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        });
        };


    const onSubmit = (data) => {
        axios.patch(`http://localhost:3001/Elements/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")},
        }).then((response) => {
            navigate(`/element/${id}`);
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł elementu wymagany!"),
        info: Yup.string().max(45, "Za dużo informacji!"),
    })

    return (
        <div className="createElement">
            <Formik  enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="form">
                    <label>Tytuł:</label>
                    <ErrorMessage name="title" component="span"/>
                    <Field
                        id="inputCreateElement"
                        name="title"
                    />
                    <label>Informacje:</label>
                    <ErrorMessage name="info" component="span"/>
                    <Field
                        id="inputCreateElement"
                        name="info"
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
                    <button type="submit">Edytuj</button>
                </Form>
            </Formik>
        </div>
    );
}

export default EditElement;