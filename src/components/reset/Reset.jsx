import React, { useState } from 'react'
import { Input, Button } from 'antd';
import {MailOutlined} from "@ant-design/icons"
import password from '../../assets/password.jpg'
import logo from "../../assets/logo1.png";
import "./Reset.css"
import axios from 'axios';


function Reset() {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const res = await axios.post('https://be-cognisite.onrender.com/api/password/create-link', {email})
        console.log(res)
        if(res.status !== 200){
            alert("Email Not Found")
        }else{
            alert("Password reset link sent successfully")
            setEmail("")
        }
    }

  return (
    <div className='container'>

        <img src={password} alt="Password Reset" />

        <div className='reset-logo'>
            <img src={logo} alt="" />
        </div>

        <div className='form'>
            <form action="" onSubmit={handleSubmit}>
                 <label htmlFor="email">Enter Registered Email</label> 
                 <Input placeholder="Eg: ram@abc.com" style={{marginTop:'1vw'}}prefix={<MailOutlined />} 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />

                 <button type="submit" style={{width:'100%', marginTop:'1.5vw', backgroundColor:'blue', color:'white', height:'35px', fontWeight:"bold",
                    fontSize:"1.1vw", border:"none", borderRadius:'10px'
                 }}>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Reset