import { Button } from "@mui/base";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function DashBoard(){
    const navigate = useNavigate()
    return(
        <div className="dashboard">
            <h1>Login Successfully</h1>
            <Button className="submit-btn" onClick={()=>navigate("/login")}>Home</Button>
        </div>
    )
}