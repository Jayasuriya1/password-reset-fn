import React, { useState } from "react";
import BaseApp from "../baselogin";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField,Button } from "@mui/material";
import {toast} from 'react-toastify'



const userSchema = yup.object({
  email: yup.string().email().required("Email Required")
});


export default function ForgetPassword() {
 
  const [isMailSend, setIsMailSend ]= useState(false) 


  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: ""
      },
      validationSchema: userSchema,
      onSubmit: async (newData) => {
  
        try{
          const response = await fetch("https://password-reset-4rci.onrender.com/user/forget-password",
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json"
          }
         })
         const result = await response.json();

  
         if( result.message =="Password Reset link sent to your mail"){
          setIsMailSend(true)
          toast.success(result.message)
        }
         else if(result.message == "User Does't Exist"){
          toast.error(result.message)
         }
         
        } catch(err){
            console.log(err)
        }
      },
    });

   

  return (
    <BaseApp>
      <h1>Forget Password</h1>
      <br></br>
      <h3>Enter Your Email Id:</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          id="margin-dense"
          margin="dense"
        />
        {touched.email && errors.email ? (
          <p style={{ color: "crimson" }}>{errors.email}</p>
        ) : (
          ""
        )}
        

<Button type="submit"  className="submit-btn" variant="contained">
          Submit
        </Button>
      </form>
      {isMailSend ? (
          <h4 style={{ color: "green" }}>Password Reset link sent to your mail. Link is only valid for 15 minetes.</h4>
        ) : (
          ""
        )}
    </BaseApp>
  );
}
