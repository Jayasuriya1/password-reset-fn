import { Button, TextField } from "@mui/material";
import React from "react";
import BaseApp from "../baselogin";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {toast} from 'react-toastify'


const userSchema = yup.object({
  name: yup.string().required("Name Required").min(3, "Minmum 3 Character Required"),
  email: yup.string().email().required("Email Required"),
  password: yup
    .string()
    .required("Password Required")
    .min(7, "Minmum 7 Character Required"),
});

export default function Register(){

  const navigate = useNavigate()

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name:"",
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: async(newData) => {
        console.log(newData)

        try{
          const response = await fetch("https://password-reset-4rci.onrender.com/user/signup",
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json"
          }
         })
         const result = await response.json();
         if(result.message == "User Signup Successfully"){
          toast.success(result.message)
          navigate("/login")
         }else if(result.message == "User Already Exists"){
          toast.error(result.message)
         }
         
        } catch(err){
            console.log(err)
        }
      },
    });


    return (
      <BaseApp>
      <h5>Register</h5>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nmae"
          name="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          id="margin-dense 1"
          margin="dense"
        />
        {touched.name && errors.name ? (
          <p style={{ color: "crimson" }}>{errors.name}</p>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          id="margin-dense 2"
          margin="dense"
        />
        {touched.email && errors.email ? (
          <p style={{ color: "crimson" }}>{errors.email}</p>
        ) : (
          ""
        )}

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          id="margin-dense 3"
          margin="dense"
        />

        {touched.password && errors.password ? (
          <p style={{ color: "crimson" }}>{errors.password}</p>
        ) : (
          ""
        )}

        <Button type="submit" className="submit-btn" variant="contained">
          Sign Up
        </Button>
        </form>
      </BaseApp>
    );
}