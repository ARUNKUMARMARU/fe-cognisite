import React, { useState } from 'react';
import './Create.css';
import axios from 'axios';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import logo from "../../assets/logo1.png"

function NewPassword() {
    const navigate = useNavigate()
    const {token} = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value);
    const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        if (password !== confirmPasswordValue || confirmPasswordValue.length > password.length) {
            setMessage("Password Mismatch")
    }else{
        setMessage("")
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
   if(message == ''){
     const res = await axios.post(`https://be-cognisite.onrender.com/api/password/reset-password/${token}`,{password}); 
    // const res = await axios.post(`http://localhost:3000/api/password/reset-password/${token}`, {password});
   
   if(res.status == 200){
    alert("Your Password has been Changed Successfully")
    navigate("/")
   }

    setPassword("");
    setConfirmPassword("")
   }else{
    setMessage("Password Mismatch")
   }
  }
  return (
    
   <div>

<div className='reset-logo'>
            <img src={logo} alt="" />
        </div>
     <div className="container">        

      <form className="password-form"
      onSubmit={handleSubmit}      >

        <h2>New Password</h2>

        <div className="form-group">
            
          <label htmlFor="password">Password:</label>

          <input type="password"  name="password" autoComplete='email'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>

        </div>

        <div className="form-group">

          <label htmlFor="confirmPassword">Confirm Password:</label>

          <input type="password"  name="confirmPassword" value={confirmPassword} autoComplete='confirmpassword'
          onChange={handleConfirmPassword}/>
          <p style={{color:'red'}}>{message}</p>
        </div>

        <button type="submit" className="btn">Set New Password</button>

      </form>
    </div>
   </div>
  );
}

export default NewPassword;
