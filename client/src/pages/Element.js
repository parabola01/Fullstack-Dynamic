import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {AuthContext} from "../functions/AuthContext";
import { useNavigate } from "react-router-dom";


function Element(){
    let {id} = useParams();
    let navigate = useNavigate()
    const [elementObject, setElementObject] = useState({});
    const { authState } = useContext(AuthContext);

    useEffect(() =>{
        axios.get(`http://localhost:3001/elements/byId/${id}`).then((response)=>{
            setElementObject(response.data);
        });
    },[]);

    const deleteElement = (id) => {
        axios
            .delete(`http://localhost:3001/elements/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                alert("Element usunięty")
                navigate("/");
            });
    };

    const editElement = () => {
        navigate(`/edit/${id}`);
    }

    return(
        <div>
        <div className = "element" >
            <div className='title'> {elementObject.title}</div>
            <div className='info'> {elementObject.info}</div>
            <div className='shop'> {elementObject.shop}</div>
            <div className='date'> {dayjs(elementObject.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
        </div>
        <div id="edit">
            {authState.username === elementObject.username &&(
                <button onClick={() => {deleteElement(elementObject.id)}}>Usuń</button>)}
            {authState.username === elementObject.username &&(
                <button onClick={() => {editElement(elementObject.id)}}>Edytuj</button>)}

        </div>
        </div>

    )
}

export default Element