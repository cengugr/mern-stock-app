import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Input, Button, Modal, Form, InputNumber, Select, DatePicker } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined,SaveOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;

function Purchase() {
    const [data, setData] = useState([]);
    const [companyList, setCompanyList] = useState([]); 
    const [purchase, setpurchase] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
   
    const fetchData =  () => {

        axios.get('http://localhost:8080/api/purchase').then((response) => {
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

    const fetchCompanies =  () => {

        axios.get('http://localhost:8080/api/company').then((response) => {
            const data = response.data;
            
            data.forEach(element => {
                element.key = element.id;
            });

            setCompanyList(data); 
        }
        ).catch((error) => {
            console.log(error);
        }
        );

       
    }

    useEffect(() => {
        fetchData();
        fetchCompanies(); 
    }, []);

   const handleSubmit = (values) => {
        console.log(values);
        
        if(purchase._id){
            axios.put('http://localhost:8080/api/purchase/'+purchase._id, values).then((response) => {
                const data = response.data;
                console.log(data);
                fetchData();
                setpurchase({});
                setModalVisible(false);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
        }else{

        axios.post('http://localhost:8080/api/purchase', values).then((response) => {
            const data = response.data;
            console.log(data);
            fetchData();
            setpurchase({});
            setModalVisible(false);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
    }


    function handleEdit(record){
        setpurchase(record);
        setModalVisible(true);
        form.setFieldsValue(record);

    }

    const handleDelete = (record)=>{

        confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this purchase?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/purchase/${record._id}`); // Replace with your API endpoint
                fetchData();
              } catch (error) {
                console.error(error);
              }
            },
          });
        
    }

    const deletepurchase=()=>{
        console.log(purchase);
        axios.delete('http://localhost:8080/api/purchase/'+purchase._id).then((response) => {
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
        {deletepurchase()} 
         ,
        onCancel: () => {
            console.log('Cancel');
            setpurchase(null); 
        },

      };



    const columns = [
        {
            title: 'Company Name',
            render : (record) => {
                return record.company?.name;
            },
            key: 'company',
            
            
          },
          {
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            key: 'supplierName',    
         
          },
    
            {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate', 
            key: 'deliveryDate'
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
               
                <Form.Item label="purchase Name" name="name" rules={[{required : true , message: "Please enter the purchase name"}]} >
                    <Select>
                        {companyList.map((company)=>(
                            <Option value={company._id}>{company.name}</Option>
                        ))}

                    </Select>
                </Form.Item>
                <Form.Item label="Supplier Name" name="supplierName" >
                    <Input />
                </Form.Item>
               <Form.Item label="Delivery Date" name="deliveryDate" >
                  <DatePicker />
                </Form.Item>

                
                <Form.Item>
                    <Button type="dashed" icon={<SaveOutlined />}  htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>        
    </div>;
}

export default Purchase; 