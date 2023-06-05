import React from "react";
import {Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function BaseApp({children}){

  const navigate = useNavigate()

 
 
    return(
        <div className="baseApp-container container-fluid">
            <div className=" row justify-content-center">
                <div className="col-md-12 col-lg-4 baseApp">
                    <div className="base-btn ">
                        <Button  onClick={()=>navigate("/login")} variant="contained" >Login</Button>
                        <Button onClick={()=>navigate("/register")} variant="contained">SignUp</Button>
                    </div>
                    <hr style={{color:"white"}}></hr>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}