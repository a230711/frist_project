const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require(__dirname + '/modules/db_connect2');
const multer =  require('multer');
const jwt = require('jsonwebtoken');

const app = express();




app.use(cors())
/* ----------在node中需透過multer才可以接到------------ */
app.use(express.json())
app.post(multer().none(),(req,res,next)=>{next()})
/* ------------------------------------------------- */

/* ----------外送員接單(API未完成)------------ */

async function getListData(req, res){
    // const sql1 = "SELECT shop_sid FROM shop_order WHERE deliver_take = 0" ;
    const sql1 = "SELECT shop.sid, shop.name, shop.address FROM shop RIGHT JOIN shop_order on shop.sid = shop_order.shop_sid ";
    [rows1] = await db.query(sql1);
    // const sql2 = `SELECT * FROM deliver LIMIT 7 `;
    // [rows2] = await db.query(sql2);

    return {rows1};
}

/* ----------------------------- */

/* ----------外送員登入------------ */
app.post('/deliverlogin', async(req, res)=>{
    const output = {
        success: false,
        error: '帳密錯誤',
        postData: req.body,  //除錯用
    }
    // console.log(req.body.email);   //透過multer解析出來
    const sql = `SELECT * FROM deliver WHERE email=?`;
    const [rows] = await db.query(sql, [req.body.email]);
    if(!rows.length){
        return res.json(output)  //只執行這一次不會返回重跑
    }
    const row = rows[0];
    // console.log(row);
    output.success = await bcrypt.compare(req.body.password, row['password']); 
    if(output.success){
        output.error = '';
        const {sid, name} = row;
        const online = output.success;
        // const token = jwt.sign({sid, name, email}, process.env.JWT_SECRET);     //還沒理解(有問題)
        // console.log(token);
        output.auth = {
            sid,
            name,
            online,
            // token,
        }

        res.json(output);
    }

    
})
/* ----------------------------- */

/* ----------外送員接單------------ */
app.get('/api', async (req, res)=>{
    res.json(await getListData(req, res));
});
/* ----------------------------- */

/* ----------接單後訂單預覽------------ */
app.post('/deliverorder', async(req, res)=>{
    const sql1 = "SELECT * FROM deliver_order WHERE stort_order_sid=?";
    const sql2 = "SELECT shop.sid, shop.name, shop.address, shop.phone FROM shop RIGHT JOIN deliver_order on shop.sid = deliver_order.shop_sid ";   //店家資訊
    const sql3 =  "SELECT member.sid, member.name FROM member RIGHT JOIN deliver_order on member.sid = deliver_order.shop_sid"  //會員資訊
    const sql4 = "SELECT shop.sid, shop.name, shop.address, shop.phone, member.sid, member.name FROM shop member RIGHT JOIN deliver_order on shop.sid = deliver_order.shop_sid AND member.sid = deliver_order.shop_sid ";   //店家資訊
    const [rows] = await db.query(sql1, [req.params.sid]);
    res.json(rows);
})
/* ---------------------------------- */

/* --------取得外送員sid--------- */
app.post('/deliver/:sid', async(req, res)=>{
    const sql = "SELECT * FROM deliver WHERE sid=?";
    const [rows] = await db.query(sql, [req.params.sid]);
    res.json(rows);
})

/* ----------------------------- */

app.use('/edit/:sid', async(req, res)=>{
    const sql = "SELECT * FROM shop_order WHERE sid=?";
    const [rows] = await db.query(sql, [req.params.sid]);
    res.json(rows);
})

app.use('/edit/:sid', async(req, res)=>{
    const sql = "SELECT * FROM shop_order WHERE sid=?";
    const [rows] = await db.query(sql, [req.params.sid]);
    res.json(rows);
})
app.put('/edit/:sid', async(req, res)=>{
    const output = {
        success: false,
        code: 0,
        error: {},
        postData: req.body, // 除錯用
    };

    const sql = "UPDATE `shop_order` SET `deliver_sid`=?,`deliver_order_sid`=? WHERE `sid`=?";
    const [result] = await db.query(sql, [
        req.body.deliver_sid,
        req.body.deliver_order_sid,
        req.params.sid
    ]);

    console.log(result);
})



// app.get('/try-db/:sid', async (req, res)=>{
//     //修改member_sid的數字去抓客戶的所有訂單
//     const sql = "SELECT * FROM orders WHERE `member_sid`=?";
//     const [rows] = await db.query(sql, [req.params.sid]);
//     res.json(rows);
// });

const port = 3005;
app.listen(port, ()=>{
    console.log(`server port ${port}`)
})