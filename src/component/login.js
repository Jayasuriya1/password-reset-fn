import { TextField, Button } from "@mui/material";
import React from "react";
import BaseApp from "../baselogin";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {toast} from 'react-toastify'

const userSchema = yup.object({
  email: yup.string().email().required("Email Required"),
  password: yup
    .string()
    .required("Password Required")
    .min(7, "Minmum 7 Character Required"),
});

export default function Login() {
 
  const navigate = useNavigate()

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: async(newData) => {

        try{
          const response = await fetch("https://password-reset-4rci.onrender.com/user/login",
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json"
          }
         })
         const result = await response.json();
         if(result.message == "User Login Successfully"){
          toast.success(result.message)
          navigate("/dashboard")
         }else if(result.message == "Invaild Password"){
          toast.error("Invalid Password")
         }else{
          toast.error("user does't exist please check the email.")
         }
         
        } catch(err){
            console.log(err)
        }
      },
    });



  return (
    <BaseApp>
    <h5>Log In</h5>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          id="margin-dense 1"
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
          id="margin-dense 2"
          margin="dense"
        />

        {touched.password && errors.password ? (
          <p style={{ color: "crimson" }}>{errors.password}</p>
        ) : (
          ""
        )}

        <div className="forget-passwod-container">
          <span>
            <Link to="/forgetpassword">Forget Password?</Link>
          </span>
        </div>

        <Button type="submit" className="submit-btn" variant="contained">
          Sign In
        </Button>
      </form>
    </BaseApp>
  );
}
