import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Input, Button, Modal, Form, InputNumber } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined,SaveOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function Company() {
    const [data, setData] = useState([]);
    const [company, setCompany] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
   
   
    const fetchCompany =  () => {

        axios.get('http://localhost:8080/api/company').then((response) => {
            const data = response.data;
            
            data.forEach(element => {
                element.key = element.id;
            });

            setData(data); 
        }
        ).catch((error) => {
            console.log(error);
        }
        );

       
    }

    useEffect(() => {
        fetchCompany();
    }, []);

   const handleSubmit = (values) => {
        console.log(values);
        
        if(company._id){
            axios.put('http://localhost:8080/api/company/'+company._id, values).then((response) => {
                const data = response.data;
                console.log(data);
                fetchCompany();
                setCompany({});
                setModalVisible(false);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
        }else{

        axios.post('http://localhost:8080/api/company', values).then((response) => {
            const data = response.data;
            console.log(data);
            fetchCompany();
            setCompany({});
            setModalVisible(false);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
    }


    function handleEdit(record){
        setCompany(record);
        setModalVisible(true);
        form.setFieldsValue(record);

    }

    const handleDelete = (record)=>{

        confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this company?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/company/${record._id}`); // Replace with your API endpoint
                fetchCompany();
              } catch (error) {
                console.error(error);
              }
            },
          });
        
    }

    const deleteCompany=()=>{
        console.log(company);
        axios.delete('http://localhost:8080/api/company/'+company._id).then((response) => {
            const data = response.data;
            console.log(data);
            fetchCompany();
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }


    const columns = [
        {
            title: 'Company',
            dataIndex: 'name',
            key: 'name',
            
            
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'      
         
          },
    
            {
            title: 'City',
            dataIndex: 'city',
            key: 'city'
            },
            {
                title: 'Sector',
                dataIndex: 'sector',
                key: 'sector'
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size'
            },
            {
                title: 'Edit',
                render: (record) => (
                    <Button type="default" icon={<EditOutlined />} onClick={()=>handleEdit(record)} >Edit</Button>
                )
    
            },
            {
                title: 'Delete',
                render: (record) => (
                    <Button type="danger" icon={<DeleteOutlined />}  onClick={()=>handleDelete(record)} >Delete</Button>  
                )
    
            }
    ];
     
    return <div>
       <Button  type="dashed"  icon={<PlusOutlined />} onClick={()=>{setModalVisible(true)}} >Add</Button>

       <Table style={{marginTop:'5px'}} columns={columns} dataSource={data}  />
        <Modal title="Record" open={modalVisible} onCancel={()=>{setModalVisible(false)}} >  
            <Form form={form} layout="vertical" onFinish={handleSubmit} > 
               
                <Form.Item label="Company" name="name" rules={[{required : true , message: "Please enter the company name"}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Address" name="address" >
                    <Input />
                </Form.Item>
                <Form.Item label="City" name="city" >
                    <Input />
                </Form.Item>
                <Form.Item label="Sector" name="sector" >
                    <Input />
                </Form.Item>
                <Form.Item label="Size" name="size" >
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="dashed" icon={<SaveOutlined />}  htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>        
    </div>;
}

export default Company;