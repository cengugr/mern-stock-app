import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Button,  } from 'antd'
import { ReloadOutlined } from '@ant-design/icons';



function Sale() {
    const [data, setData] = useState([]);
    const [refresh, setrefresh] = useState(false);
   
   
    const fetchStock =  () => {

        axios.get('http://localhost:8080/api/stock').then((response) => {
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
        fetchStock();
    }, [refresh]);

   


    const columns = [
         {
            title: 'Company',          
            key: 'company',
            render : (record) => {
                return record.company?.name;
            },
            
            
          },
          {
            title: 'Product',           
            key: 'product',
            render : (record) => {
                return record.product?.name;
            },      
         
          },             

          {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity' 
          }
         
    ];
     
    return <div>
       <Button  type="dashed"  icon={<ReloadOutlined />} onClick={()=>{setrefresh(!refresh)}} > Refresh </Button>

       <Table style={{marginTop:'5px'}} columns={columns} dataSource={data}  />
            
    </div>;
}

export default Sale;