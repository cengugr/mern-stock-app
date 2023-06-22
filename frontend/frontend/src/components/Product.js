import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Input, Button, Modal, Form, InputNumber, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined,SaveOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;

function Product() {
    const [data, setData] = useState([]);
    const [product, setproduct] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
   
    const fetchData =  () => {

        axios.get('http://localhost:8080/api/product').then((response) => {
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
        fetchData();
    }, []);

   const handleSubmit = (values) => {
        console.log(values);
        
        if(product._id){
            axios.put('http://localhost:8080/api/product/'+product._id, values).then((response) => {
                const data = response.data;
                console.log(data);
                fetchData();
                setproduct({});
                setModalVisible(false);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
        }else{

        axios.post('http://localhost:8080/api/product', values).then((response) => {
            const data = response.data;
            console.log(data);
            fetchData();
            setproduct({});
            setModalVisible(false);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
    }


    function handleEdit(record){
        setproduct(record);
        setModalVisible(true);
        form.setFieldsValue(record);

    }

    const handleDelete = (record)=>{

        confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this product?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/product/${record._id}`); // Replace with your API endpoint
                fetchData();
              } catch (error) {
                console.error(error);
              }
            },
          });
        
    }

    const deleteproduct=()=>{
        console.log(product);
        axios.delete('http://localhost:8080/api/product/'+product._id).then((response) => {
            const data = response.data;
            console.log(data);
            fetchData();
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }

    const config = {
        title: 'Data will be deleted !',
        content: (
          <>
            <p> Do you want to delete this data ?</p>
          </>
        ),
        onOk: () => 
        {deleteproduct()} 
         ,
        onCancel: () => {
            console.log('Cancel');
            setproduct(null); 
        },

      };



    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            
            
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'      
         
          },
    
            {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit'
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

       <Table style={{marginTop:'5px'}} columns={columns} dataSource={data} />
        <Modal title="Record" open={modalVisible} onCancel={()=>{setModalVisible(false)}} >  
            <Form form={form} layout="vertical" onFinish={handleSubmit} > 
               
                <Form.Item label="Product Name" name="name" rules={[{required : true , message: "Please enter the product name"}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Category" name="category" >
                    <Input />
                </Form.Item>
               <Form.Item label="Unit" name="unit" >
                    <Select>
                        <Option value="kg">Kg</Option>
                        <Option value="pcs">Pieces</Option>
                        <Option value="box">Box</Option> 

                    </Select>
                </Form.Item>

                
                <Form.Item>
                    <Button type="dashed" icon={<SaveOutlined />}  htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>        
    </div>;
}

export default Product; 