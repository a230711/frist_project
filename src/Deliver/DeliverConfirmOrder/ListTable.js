import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListTable({ rows }) {
  const [btn, setBtn] = useState(false);
  const [toggle, setToggle] = useState(false);

  const navi = useNavigate();

  return (
    <>
      <ul className="oldlist">
        <li className="oldeitem">
          <div className="info">
            <i
              className="fa-solid fa-angle-down"
              onClick={() => {
                setBtn(!btn);
                // {btn ? 'active' : ''}    //之後加到oldeitem
              }}
            ></i>
            <p>製作時間{}</p>
            <p>距離{}</p>
            {/* ----------------------接單按鈕----------------------- */}
            <button
              className="btn"
              disabled={toggle}
              onClick={() => {
                if (localStorage.getItem('onlie_state')) {
                  //判斷是否登入(Context或是localStorage)
                  const argee = window.confirm('確定接單嗎？');
                  if (argee) {
                    setToggle(!toggle);
                    navi('/Deliver/DeliverOrder');
                  }
                } else {
                  alert('你尚未登入'); //導入到登入畫面
                  navi('/Deliver/DeliverLogin');
                }
              }}
            >
              {toggle ? '已接單' : '接單'}
            </button>
            {/* ----------------------------------------------------- */}
          </div>
          <div className={btn ? 'shop' : 'shop active'}>店家{}</div>
        </li>
        
      </ul>
    </>
  );
}

export default ListTable;
