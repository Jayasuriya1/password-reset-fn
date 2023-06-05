import React from "react";
import BaseApp from "../baselogin";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField,Button } from "@mui/material";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import{useNavigate} from 'react-router-dom'

const userSchema = yup.object({
    password: yup.string().required("Password Required").min(7, "Minmum 7 Character Required")
  });

export default function ResetPassword(){
    const params = useParams()
    console.log("id:",params.id)
    console.log("token:",params.token)
    const Navigate = useNavigate()

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        password: ""
      },
      validationSchema: userSchema,
      onSubmit: async(newData) => {

        try{
          const response = await fetch(`https://password-reset-4rci.onrender.com/user/reset-password/${params.id}/${params.token}`,
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json"
          }
         })
         const result = await response.json();
         console.log(result.message)
         
         if(result.message == ('link experied' || 'Invaild link')){

          Navigate('/forgetPassword')
          toast.error(result.message)
         }else if(result.message =='User Password Changed Successfully'){
          Navigate('/login')
          toast.success(result.message)
         }
         
        } catch(err){
            console.log(err)
        }
      },
    });



    return(
        <BaseApp>
           <h5>Enter New Password</h5>
           <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="password"
          label="New Password"
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
          Submit
        </Button>

      </form>
        </BaseApp>

    )
}