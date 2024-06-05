import React, { useEffect, useState } from 'react'
import "./Observation.css"
import { Link } from 'react-router-dom';
import { Table , Tag, Modal, Form, Button, Input, Layout} from 'antd'
import axios from 'axios';
import Navbar from '../Navebar/Navbar';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
const {Content, Header} = Layout;

const columns = [
  {
    title: 'Serial Number',
    dataIndex: 'Serial Number',
    key: 'Serial Number'
  },
  {
    title: 'Project Locatin',
    dataIndex: 'Project Locatin',
    key: 'Project Locatin',
  },
  
  {
    title: 'Problem Description',
    dataIndex: 'Problem Description',
    key: 'Problem Description',
  },
  {
    title: 'Target Date',
    dataIndex: 'Target Date',
    key: 'Target Date',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
  },
  {
    title: 'Assign Responsible persion',
    dataIndex: 'persion',
    key: 'persion',
  }, 
  {
    title: 'Correction',
    dataIndex: 'Correction',
    key: 'Correction',
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
  },
];



function Observation() { 
  const [modal, setModal] = useState(false)
  const [location, setLocation] = useState('');
  const [problem, setProblem] = useState('');
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState('');
  const [persion, setPersion] = useState('');
  const [corrction, setCorrection] = useState('');
  const [action, setaction] = useState('');
  const [formData, setFormData] = useState([]);
useEffect( async ()=>{
  const getres= await axios.get('https://be-cognisite.onrender.com/api/user/getobservation').then((e) => {      
  setFormData(e.data.result)  
})
}, [])

  // const handleEdit = (data) => {   
  //   setName(data.customername);   
  //   setMobileNo(data.mobile_number);
  //   setTotalPurchase(data.total_purchase) 
  //   setId(data._id);    
  // }
  // const handleDelete =async (data)=>{    
   
  //   const res3 = confirm(`Are you sure Do you want to delete ${data.customername}'s details`);
  //   if(res3){
  //     const res4 = await getService.deletecustomer(data._id);      
  //    setDeleteCustomer(res4.data.message);
  //    setRefresh(!refresh)
  //   }
  // }
  const onCancel = () => {
    
    setModal(false);
  };
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newData  = {
      location : location,
      problem : problem,
      target : target,
      status : status,
      persion : persion,
      corrction : corrction,
      action : action
    };
   
    const res= await axios.post('https://be-cognisite.onrender.com/api/user/observation', newData)    
    setFormData([...formData, newData])
    setModal(false);
    
  
  }
  return (
    <Layout>
      <Navbar/>
      <Layout>
        <Header>
        <Link to="mailto:arunsmart1020@gmail.com" target="_blank">
      <Button
        type="text"
        icon={<MailOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color: 'white',
        }}
      />
    </Link>
    <Link to={`tel:+917397658644`}>
      <Button
        type="text"
        icon={<PhoneOutlined />}
        style={{
          fontSize: '16px',
          borderRadius: '5px',
          width: '120px',
          color: "white"
        }}
      />
       
      
    </Link>
        </Header>
      <Content>
    <div>

     <div className='tittle'>
     <h3>Show Site Observation</h3>
     </div>

     <div className='add'>
      <button className='btn2' onClick={()=>setModal(!modal)}> + NEW SITE OBSERVATION</button>
     </div>     
     <Modal
        open={modal}
        title="Add New Site Observation"
        footer={[
          <Button key="cancel" onClick={onCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>Add</Button>
        ]}
        closable={false}
      >
        <Form >
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Project Location : </span>}>
            <Input
              type="text"
              name="location"              
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              placeholder="Enter project location"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Problem Description </span>}>
            <Input
              type="text"
              name="problem"
              autoComplete="problem"
              value={problem}
              onChange={(e)=>setProblem(e.target.value)}
              placeholder="Enter problem description"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Target Date </span>}>
            <Input
              type="text"
              name="target"
              value={target}
              onChange={(e)=>setTarget(e.target.value)}             
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Status </span>}>
            <Input
              type="text"
              name="status"
              autoComplete="status"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Item>
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Responsible persion </span>}>
            <Input
             type="text"
              name="persion"
              value={persion}
              autoComplete="persion"
              onChange={(e)=>setPersion(e.target.value)}
              placeholder="Enter Persion name"
              required
            />
          </Form.Item>
          
          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Correction </span>}>
            <Input
            type='text'
              name="corrction"
              value={corrction}
              onChange={(e)=>setCorrection(e.target.value)}
              placeholder="Enter correction"
              required
            />
          </Form.Item>

          <Form.Item label={<span><span style={{ color: 'red' }}>*</span>Action </span>}>
            <Input
            type='text'
              name="action"
              value={action}
              onChange={(e)=>setaction(e.target.value)}
              placeholder="action"
              required
            />
          </Form.Item>
          
        </Form>
      </Modal>

     <div style={{paddingTop:'10vh'}}>
     <div className='table-container'>            
        <table>
          <thead>
            <tr>
              <th>Seriel Number</th>
              <th>Project Locatin</th>
              <th>Problem Description</th>
              <th>Target Date</th>    
              <th>Status</th>
              <th>Assign Responsible persion</th>
              <th>Correction</th>   
              <th>Action</th>         
              
            </tr>
          </thead>
          <tbody>

            {formData.map((data, i) => {
              return <tr key={i}>

                <td>{i + 1}</td>
                <td>{data.location}</td>
                <td>{data.problem}</td>
                <td>{data.target}</td>      
                <td>{data.status}</td>
                <td>{data.persion}</td>
                <td>{data.corrction}</td>   
                <td>{data.action}</td>                       

              </tr>
            })}

          </tbody>
        </table>
      </div>
     {/* <Table columns={columns} 
     dataSource={formData}
      /> */}
     </div> 
     
   

    </div>
    </Content>
    </Layout>
    </Layout>
  )
}

export default Observation