import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';

function DeliverOrder() {
  const navi = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const ordersid = localStorage.getItem('order_sid');

  async function getOrder() {
    const response = await axios.get(
      `http://localhost:3005/deliverorder/${ordersid}`
    );
    setOrderData(response.data.rows);
    setFoodData(response.data.food);
  }
  async function foodget() {
    const respon = await axios.put(
      `http://localhost:3005/deliverorder11/${ordersid}`
    );
  }

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className='ttcontext'>
        <div className="topcontext">
          <p>取餐資訊</p>
          <p>{}</p>
        </div>
        {orderData.map((ddate, i) => {
          return (
            <div className="info1" key={i}>
              <div className="infodata">
                <div className="infotext">
                  <div className="icon">
                    <i className="imgicon fa-regular fa-user"></i>
                  </div>
                  <div>
                    <p>{ddate.name}</p>
                    <p className="context">客戶地址</p>
                  </div>
                </div>
              </div>
              <div className="infodata">
                <div className="infotext">
                  <div className="icon">
                    <i className="imgicon fa-solid fa-store"></i>
                  </div>
                  <div>
                    <p>{ddate.shopname}</p>
                    <p className="context">{ddate.address}</p>
                  </div>
                </div>
                <i className="simgicon fa-solid fa-phone-flip"></i>
              </div>

              <div className="infodata">
                <div className="infotext">
                  <div className="icon">
                    <i className="imgicon fa-solid fa-utensils"></i>
                  </div>
                    <div>
                    {foodData.map((v, i) => {
                      return (
                          <p key={i}>{v.amount}X {v.name}</p>
                      )
                    })}
                  </div>
                </div>
                <div>
                  {foodData.map((v, i) => {
                    return (
                        <p key={i}>{v.price}</p>
                    )
                  })}
                </div>
              </div>

              <div className="infodata">
                <div className="infotext">
                  <div className="icon">
                    <i className="imgicon fa-solid fa-box-archive"></i>
                  </div>
                  <div>
                    <p>備註</p>
                    <p>{ddate.deliver_memo}</p>
                  </div>
                </div>
              </div>
              <div className="infodata">
                <button className='bbtn'
                  onClick={()=>{
                    foodget();
                    // navi('/Deliver/DeliverMessager');
                  }}
                >
                已取餐
                </button>
              </div>
              <div className='footer'>
                <p>總計金額：{}</p>
                <p>外送費用：{ddate.deliver_fee}</p>
              </div>
            </div>
            
          );
        })}
      </div>
    </>
  );
}
export default DeliverOrder;
