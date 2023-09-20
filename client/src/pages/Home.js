import React, {useContext, useEffect, useState} from 'react'
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(){

    const[listOfElements, setListOfElements] = useState([]);
     let navigate = useNavigate()

    useEffect(()=>{
            axios.get("http://localhost:3001/elements", {
                headers: {accessToken: localStorage.getItem("accessToken")},
            }).then((response) => {
                setListOfElements(response.data);
        })
    }, []);


    return(
        <div>
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
    )
}

export default Home