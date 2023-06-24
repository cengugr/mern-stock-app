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
    const [pagination, setPagination] = useState({
        
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        pageSizeOptions: [1, 10, 20, 50, 100],
        
        });

    const[sort, setSort] = useState(null);  
    const[filter, setFilter] = useState({});
    const[tablechanged, setTablechanged] = useState(false); 


   
   
    const fetchCompany =  () => {
        let page = pagination.current-1; 
        let limit = pagination.pageSize; 
        let payload = {sort,filter}; 

        axios.post(`http://localhost:8080/api/company/${page}/${limit}`,payload).then((response) => {
            const data = response.data.data;
            
            data.forEach(element => {
                element.key = element.id;
            });

            setData(data); 
            setPagination({...pagination,total: response.data.count, 
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${response.data.count} items`,});
        }
        ).catch((error) => {
            console.log(error);
        }
        );

       
    }

    useEffect(() => {
        fetchCompany();
    }, [tablechanged,filter]); 

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
                await axios.delete(`http://localhost:8080/api/company/${record._id}`);
                fetchCompany();
              } catch (error) {
                console.error(error);
              }
            },
          });
        
    }

   


    const columns = [
         {
            title: 'Company',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            filterDropdown: () => (
                <Input placeholder="Search Company" 
                onChange={(e)=> setFilter({...filter,name: e.target.value})}
                style={{witdh: "200px"}}
                />
                ),     

            
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'  ,
            sorter: true,
            filterDropdown: () => (
                <Input placeholder="Search Address" 
                onChange={(e)=> setFilter({...filter,address: e.target.value})}
                style={{witdh: "200px"}}
                />
                ),         
         
          },
    
          {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          sorter: true,
          filterDropdown: () => (
            <Input placeholder="Search City" 
            onChange={(e)=> setFilter({...filter,city: e.target.value})}
            style={{witdh: "200px"}}
            />
            ),         
          
          },

          {
              title: 'Sector',
              dataIndex: 'sector',
              key: 'sector',
              sorter: true,
              filterDropdown: () => (
                <Input placeholder="Search Sector" 
                onChange={(e)=> setFilter({...filter,sector: e.target.value})}
                style={{witdh: "200px"}}
                />
                ),    
          },

          {
              title: 'Size',
              dataIndex: 'size',
              key: 'size',
              sorter: true,
              filterDropdown: () => (
                <InputNumber placeholder="Search size" 
                onChange={(value)=> setFilter({...filter,size:value})} 
                style={{witdh: "200px"}}
                />
                ),   
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

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
        setPagination(pagination);
        setTablechanged(!tablechanged); 
        setSort({
            sortField: sorter.field,
            sortOrder: Boolean(sorter.order) ? (sorter.order === 'ascend' ?  1 : -1) : null 
        });
    }

     
    return <div>
       <Button  type="dashed"  icon={<PlusOutlined />} onClick={()=>{setModalVisible(true)}} >Add</Button>

       <Table style={{marginTop:'5px'}} columns={columns} dataSource={data}    
        pagination={pagination}     
        onChange={handleTableChange} />
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