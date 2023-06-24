import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Input, Button, Modal, Form, InputNumber, Select, DatePicker, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined,SaveOutlined,MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { confirm } = Modal;
const { Option } = Select;

function Purchase() {
    const [data, setData] = useState([]);
    const [companyList, setCompanyList] = useState([]); 
    const [productList, setProductList] = useState([]);  
    const [purchase, setpurchase] = useState({});
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
   
    const fetchData =  () => {

        let page = pagination.current-1; 
        let limit = pagination.pageSize; 
        let payload = {sort,filter}; 

        axios.post(`http://localhost:8080/api/purchase/${page}/${limit}`,payload).then((response) => {
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

    const fetchProducts =  () => {

        axios.get('http://localhost:8080/api/product').then((response) => {
            const data = response.data;
            
            data.forEach(element => {
                element.key = element.id;
            });

            setProductList(data); 
        }
        ).catch((error) => {
            console.log(error);
        }
        );
       
    }

    useEffect(() => {
        fetchData();
        fetchCompanies(); 
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchData();
       
    }, [sort,filter,tablechanged]); 

   const handleSubmit = (values) => {
        console.log(values);
        
        if(purchase._id){
            axios.put('http://localhost:8080/api/purchase/'+purchase._id, values).then((response) => {
                const data = response.data;
                console.log(data);
                fetchData();
                setpurchase({});
                setModalVisible(false);
                form.resetFields();
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
            form.resetFields();
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
    }


    function handleEdit(record){
        console.log(record); 

        setpurchase(record);
        setModalVisible(true);
        form.setFieldsValue({            
            ...record,
            company: record.company?._id,
            deliveryDate: dayjs(record.deliveryDate),
            products: record.products.map((product) => {
                return {
                    ...product,
                    product: product.product?._id
                }
            })

        });


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


    const columns = [
        {
            title: 'Company Name',
            render : (record) => {
                return record.company?.name;
            },
            key: 'company',
            filterDropdown: () => ( 
                <Select   onChange={(value)=>setFilter({...filter,company:value})}>
                    {companyList.map((company) => {
                        return <Option value={company._id}>{company.name}</Option>
                    })}

                </Select>
                ),   
            
            
          },
          {
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            key: 'supplierName',   
            sorter: true,
            filterDropdown: () => (
              <Input placeholder="Search supplier" 
              onChange={(e)=> setFilter({...filter,supplierName: e.target.value})}
              style={{witdh: "200px"}}
              />
              ),     
         
          },
    
            {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate', 
            key: 'deliveryDate',
            sorter: true,
            filterDropdown: () => ( 
                <DatePicker onChange={(date,dateString)=>setFilter({...filter,deliveryDate:dateString})} />
               ),   
            },
            {
                title: 'Product',
                dataIndex: 'products',
                key:'products',
                render: (products) => {
                            return (
                                <ul>
                                     {products.map((product) => {
                                   return <li>
                                         <strong>Product</strong> : {product.product.name} <br/>
                                         <strong>Quantity</strong> : {product.quantity} <br/>
                                        <strong>Price</strong> : {product.unitPrice} <br/>
                                        </li> 
                                    })}
                                </ul>
                            )}
                        
                       
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

       <Table style={{marginTop:'5px'}} columns={columns} dataSource={data} 
        pagination={pagination}     
        onChange={handleTableChange} 
       />
        <Modal title="Record" open={modalVisible} onCancel={()=>{setModalVisible(false)}} >  
            <Form form={form} layout="vertical" onFinish={handleSubmit} > 
               
                <Form.Item label="Company" name="company" rules={[{required : true , message: "Please select company"}]} >
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
                <Form.List name="products">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'product']}
                rules={[{ required: true, message: 'Select product' }]}
              >
               <Select placeholder="Product" >
                        {productList.map((product)=>(
                            <Option value={product._id}>{product.name}</Option>
                        ))}
                </Select>

              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'quantity']}
                rules={[{ required: true, message: 'Please enter the quantity' }]}
              >
                <InputNumber placeholder='Quantity' ></InputNumber>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'unitPrice']}
                rules={[{ required: true, message: 'Please enter the unit price' }]}
              >
                <InputNumber placeholder="UnitPrice" /> 
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>

                
                <Form.Item>
                    <Button type="dashed" icon={<SaveOutlined />}  htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>        
    </div>;
}

export default Purchase; 