import axios from 'axios';
import { useEffect, useState } from 'react';
import ListTable from './ListTable';
// import { useNavigate } from 'react-router-dom';

import './index.css';


function DeliverConfirmOrder() {
  const [listData, setListData] = useState({});

  async function getList(){
    const response = await axios.get('http://localhost:3005/api');
    console.log(response);
    setListData(response.data);
  }
  useEffect(()=>{
    getList()
  },[]);

  return(
    <>
      <div className="states">
        <p>使用狀態</p>
        <p>{localStorage.getItem('onlie_state')?'在線中':'隱藏'}</p>                  
      </div>
      <ListTable rows={listData.row1}></ListTable>
    </>
  )
}
export default DeliverConfirmOrder;
