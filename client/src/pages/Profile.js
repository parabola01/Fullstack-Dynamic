import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

function Profile(){

    let navigate = useNavigate();
    let {id} = useParams();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [listOfElements, setListOfElements] = useState([]);


    useEffect(() =>{
        axios.get(`http://localhost:3001/auth/info/${id}`).then((response) =>{
            setUsername(response.data.username);
            setEmail(response.data.email);
        });

        axios.get(`http://localhost:3001/elements/byuserId/${id}`).then((response) =>{
            setListOfElements(response.data);
        })
    }, []);

    return(
        <div className="profilePage">
            <div className="infos">
                <div>Username: {username}</div>
                <div>Email: {email}</div>
            </div>
            <div className="allElements">
                {listOfElements.map((value, key) => {
                    return (<div className = "element" onClick={() => {navigate(`/element/${value.id}`)}}>
                            <div className='title'> {value.title}</div>
                            <div className='info'> {value.info}</div>
                            <div className='shop'> {value.shop}</div>
                            <div className='date'> {dayjs(value.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;