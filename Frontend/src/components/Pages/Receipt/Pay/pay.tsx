import { useState } from "react";

import { Link , useNavigate } from 'react-router-dom';

import { message , Card , Row , Col } from "antd";

import './pay.css';

const Pay:React.FC = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showQR, setShowQR ] = useState(false);

    const handleConfirmPayment = () => {
        setShowQR(false);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleQR = () => {
        setShowQR(!showQR);
    };


    const handleClick = () => {
        message.success("ชำระเงินสำเร็จ");
        navigate('/receipt');
        setShowPopup(false);
      };
    
    return (
        <>
        <Row>
            <Col>
                <Card style={{
                    width: '1000px',
                    margin: '30px auto',
                    padding: '25px',
                    borderRadius: '30px',
                }}>
                    
                    {/* ปุ่มกลับ */}
                    <div style={{ marginBottom: '20px',marginTop:'-20px' }}>
                        <Link to="/receipt">
                            <button className="button">
                                กลับ
                            </button>
                        </Link>
                    </div>

                    {/* ส่วนหลักของข้อมูล */}
                    <Card style={{
                        borderRadius: '10px',
                        padding: '15px',
                    }}>
                        {/* แถวที่ 1 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={textBoxContainerStyle}>Table ID</div>
                            <div style={textBoxContainerStyle}>Order ID</div>
                            <div style={textBoxContainerStyle}>Package</div>
                        </div>

                        {/* แถวที่ 2 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={textBoxContainerStyle}>Member/Guest</div>
                            <div style={textBoxContainerStyle}>Rank</div>
                            <div style={textBoxContainerStyle}>จำนวนลูกค้า</div>
                        </div>

                        {/* แถวที่ 3 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={textBoxContainerStyle}>Soup1</div>
                            <div style={textBoxContainerStyle}>Soup2</div>
                            <div style={textBoxContainerStyle}>Soup3</div>
                            <div style={textBoxContainerStyle}>Soup4</div>
                        </div>

                        {/* แถวที่ 4 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' , textAlign: 'center',fontSize:'18px'}}>
                            <div style={{ flex: 1 }}>Coupon</div>
                            <div style={{ flex: 1 }}>ส่วนลด Coupon</div>
                            <div style={{ flex: 1 }}>ส่วนลด บัตรสมาชิก</div>
                        </div>

                        {/* แถวที่ 5 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <input type="text" placeholder="กรอก coupon" style={textBoxContainerStyle} />
                            <div style={textBoxContainerStyle}>.... Baht</div>
                            <div style={textBoxContainerStyle}>.... Baht</div>
                        </div>

                        {/* แถวที่ 6-8 */}
                        {['รวมเป็นเงิน', 'ส่วนลด ทั้งหมด', 'ยอดสุทธิ'].map((label, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ flex: 1 ,fontSize:'18px'}}>{label}</div>
                                <div style={textBoxContainerStyle}>.... Baht</div>
                            </div>
                        ))}
                    </Card>

                    {/* ปุ่มแสดง QR และยืนยันการชำระเงิน */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            {/* <Link to="/receipt/pay/qr"> */}
                                <button className="qr-button" onClick={handleQR}>
                                    แสดง QR
                                </button>
                            {/* </Link> */}
                        <button className="payment-button" onClick={handleConfirmPayment}>
                            ยืนยัน (การชำระเงิน)
                        </button>
                    </div>

                    {/* Pop-up ยืนยันการชำระเงิน */}
                    {showPopup && (
                        <Card className="popup-overlay">
                            <div className="popup">
                                <h2>ยืนยันการชำระเงิน</h2>
                                <div className="popup-buttons">
                                    <button className="confirm-button" onClick={handleClick} >ยืนยัน</button>
                                    <button className="cancel-button" onClick={handleClosePopup}>ยกเลิก</button>
                                </div>
                            </div>
                        </Card>
                    )}
                </Card>
            </Col>    
            <Col>
                {showQR && (
                    <Card style={{
                        padding: '25px',
                        margin: '40px auto',
                        borderRadius: '30px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}>
                        <h1 style={{marginTop:'-3px' , justifyContent:'center' , display:'flex' }}>QR สำหรับชำระเงิน </h1>
                        <Card>
                        <img src={"https://promptpay.io/0612169735/5"} style={{ width: '400px', height: '400px', borderRadius: '10px' }}/>
                        </Card>
                    </Card>
                )}
            </Col>
        </Row>
        </>
    );
}

const textBoxContainerStyle = {
    display: 'flex',
    alignItems: 'center', // Center text vertically
    justifyContent: 'center', // Center text horizontally
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    flex: 1,
    marginRight: '5px',
    backgroundColor: '#f9f9f9',
    color: '#000',
    height: '30px', // Adjust height as needed
};

export default Pay;