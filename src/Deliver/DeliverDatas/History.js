import { useState } from 'react';
import axios from 'axios';

function History({
  order_sid,
  deliver_order_sid,
  deliver_fee,
  name,
  deliver_check_time,
  shopname,
  address,
  deliver_take_time,
  complete_time,
}) {
  const [btn, setBtn] = useState(false);
  const [food, setFood] = useState([]);

  async function foodmeun() {
    const repon = await axios.get(`http://localhost:3005/foodmeun/${order_sid}`);
    setFood(repon.data);
  }

  return (
    <li className="historylist">
      <div className="historyitem">
        <div className="fristcontext">
          <i
            className={
              btn ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
            }
            onClick={() => {
              setBtn(!btn);
              foodmeun();
            }}
          ></i>
          <p>{deliver_order_sid}</p>
        </div>
        <div className="secondtext">
          <p>外送費</p>
          <p>{deliver_fee}</p>
        </div>
        <div className="secondtext">
          <p>客戶</p>
          <p>{name}</p>
        </div>
        <p>{deliver_check_time}</p>
      </div>
      <div>
        {btn && (
          <div className="historydetail">
            <div className="detaillist">
              <div className="detailcontext">
                <div>
                  <i className="fa-solid fa-store icon"></i>
                </div>
                <div>
                  <p>{shopname}</p>
                  <p>{address}</p>
                </div>
              </div>
              <div>
                <p>接單時間&nbsp;&nbsp;&nbsp;{deliver_take_time}</p>
                <p>取餐時間&nbsp;&nbsp;&nbsp;{complete_time}</p>
              </div>
            </div>
            <div className="foodmeun">
              <p className="foodtop">餐點內容</p>
              <ul>
                {food.map((val)=>{
                    return(
                        <li className="foodcontext">
                            <p>{val.amount}X {val.name}</p>
                            <p>{val.price}</p>
                        </li>
                    )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default History;
