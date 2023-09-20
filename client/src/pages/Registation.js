import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


function Registration(){

    let navigate = useNavigate();

    const initialValues = {
        username: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Nazwa elementu wymagana!"),
        email: Yup.string().required("Email jest wymagany").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Zła struktura emaila"),
        password: Yup.string().min(5, "Wpisz dłuższe hasło!").max(25,"Za długie hasło!").required("Hasło jest wymagane!")
    })
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            navigate("/login");
        })

    };
    return (<div className="createElement">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="form">
                <label>Username:</label>
                <ErrorMessage name="username" component="span"/>
                <Field
                    id="inputCreateElement"
                    name="username"
                    placeholder="Przykładowy username"
                />
                <label>Email:</label>
                <ErrorMessage name="email" component="span"/>
                <Field
                    id="inputCreateElement"
                    name="email"
                    placeholder="jan.kowalski@wp.pl"
                />
                <label>Hasło:</label>
                <ErrorMessage name="password" component="span"/>
                <Field
                    id="inputCreateElement"
                    name="password"
                    placeholder="Podaj hasło"
                    type="password"
                />
                <button type="submit">Zarejestuj się</button>
            </Form>
        </Formik>
    </div>);
}

export default Registration;