import axios from 'axios';
import { useEffect, useState } from 'react';
import ListTable from './ListTable';

import './index.css';

function DeliverConfirmOrder() {
  const [listData, setListData] = useState([]);

  async function getList() {
    const response = await axios.get('http://localhost:3005/api');
    // localStorage.setItem(response.data.rows1.)
    // console.log(response.data.rows1.shop_sid);
    setListData(response.data.rows1);
  }
  useEffect(() => {
    getList();
  },[]);

  return (
    <>
      <div className="states">
        <p>使用狀態</p>
        <p>{localStorage.getItem('onlie_state') ? '在線中' : '隱藏'}</p>
      </div>
      <ul className="oldlist">
      {/* ---------------------接單列表------------------ */}
      {listData.map((value) => {
        const { sid } = value;
        return <ListTable key={sid} {...value} />;
      })}
      {/* ---------------------------------------------- */}
      </ul>
    </>
  );
}
export default DeliverConfirmOrder;
