import React, { useState } from 'react';
import './Signin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import introimg from "../../assets/landingpage.png";
import logo from "../../assets/logo1.png";

const Signin = () => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigninLoading, setIsSigninLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = () => {
    setIsModal(!isModal);
    
  };

  const [formData, setFormData] = useState({
    organisation_name : '',
    name: '',
    email: '',
    password: '',
    mobile_number: '',
    address: ''    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);   

    if (formData.organisation_name && formData.name && formData.email && formData.password && formData.mobile_number && formData.address) {   
      const res = await axios.post('https://be-cognisite.onrender.com/api/user/signup', formData);
      // const res = await axios.post('http://localhost:3000/api/user/signup', formData);   
      
      if (res.status === 500) {
        setIsLoading(false);
        alert("Error While Signup. Please Try Again");
      } else {
        handleSignup();
        setFormData({
          organization_name : '',
          name: '',
          email: '',
          password: '',
          mobilenumber: '',
          address: ''         
        });
        setIsLoading(false);
        alert('Signup Compleated Successfully');
      }
    } else {
      setIsLoading(false);
      alert("Kindly Enter All Mandatory Fields");
    }
  };

  const onCancel = () => {
    setFormData({
      organization_name : '',
      name: '',
      email: '',
      password: '',
      mobilenumber: '',
      address: ''         
    });
    setIsModal(false);
    setIsLoading(false);
  };

  const onFinish = async (e) => {
   e.preventDefault();      
     setIsSigninLoading(true)
    if(email && password){
      const user = {
        email: email,
        password: password,
      };
      const res = await axios.post("https://be-cognisite.onrender.com/api/user/signin", user);
      //const res = await axios.post("http://localhost:3000/api/user/signin", user);
      console.log(res)
      if (res.data.message =='user signed in') {    
        setIsSigninLoading(false)
          navigate('/observation');      
        } else{
          setIsSigninLoading(false)
          alert("Invalid Email or Password")
        }      
    }else{
      setIsSigninLoading(false)
      alert("Kindly Fill All Mandatory Fields")
    }
  };

  return (
    <div className="signin-container">
      <div className="image-container">
        <img src={introimg} alt="Intro Image" className='intro-img' />
      </div>
      <div className='credentials'>
        <div className='logo'>
          <img src={logo} alt="logo" />
        </div>

        <div className='input'>
          <div className='input-data'>
            <h2 style={{ fontFamily: "sans-serif", margin: 0 }}>Sign in to account</h2>
            <p style={{ marginTop: "10px" }}>Enter your email & password to login</p>

            <form onSubmit={onFinish}>
{/* 
              <Form.Item name="email" label="Email address" rules={[{ required: true, message: 'Please enter your email!' }]}>
                <Input placeholder="Enter Your Email" style={{ marginTop: '10px' }} />
              </Form.Item> */}
               <label htmlFor="email" ><span style={{fontWeight:"bold"}}>Email address</span></label> 
            <Input placeholder="Enter Your Email" type='email' name="email" value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{marginTop:'10px'}}/> <br /> <br />
              
              {/* <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                <Input.Password placeholder="Enter Your Password" />
              </Form.Item>

              <a href="" className='forgotpassword'>Forgot Password?</a><br /><br />
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>SIGN IN</Button><br /><br /> */}

            <label htmlFor="email"><span style={{fontWeight:"bold"}}>Password</span> <Link to="/password-reset" className='forgotpassword'>Forgot Password?</Link></label>            

           <Input.Password placeholder="Enter Your Password" value={password}
           onChange={(e)=>setPassword(e.target.value)}
           style={{marginTop:'10px'}}/> <br /><br /><br />

       {isSigninLoading ? (<Spin key="loading" />) : (<button type="submit" style={{width:'100%', backgroundColor:'blue', border:'none', color:'white', height:'5vh', borderRadius:'10px'}}>SIGN IN </button>)} <br /> <br />
            </form>

            <div style={{ textAlign: "center" }}>
              <p>Don't have account? <button onClick={handleSignup} style={{ backgroundColor: 'white', border: "none", color: 'blue', fontWeight: 'bold' }}>Create Account</button></p>
            </div>

          </div>
        </div>
      </div>
      <Modal
        open={isModal}
        title="Sign Up Form"
        footer={[
          <Button key="cancel" onClick={onCancel}>Cancel</Button>,
          isLoading ? <Spin key="loading" /> : <Button key="submit" type="primary" onClick={handleSubmit}>Sign Up</Button>
        ]}
        closable={false}
      >
        <Form>
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Organization Name </span>}>
            <Input
              type="text"
              name="organisation_name"              
              value={formData.organisation_name}
              onChange={handleChange}
              placeholder="Enter Organization Name"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Name </span>}>
            <Input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Mobile Number </span>}>
            <Input
              type="number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Email </span>}>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Item>
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Password </span>}>
            <Input.Password
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Form.Item>
          
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Address </span>}>
            <Input.TextArea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  );
};

export default Signin;
