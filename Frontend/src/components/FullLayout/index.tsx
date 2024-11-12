import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { Breadcrumb, Layout, Menu, theme, message } from "antd";
import Dashboard from "../Pages/dashboard";
import Member from "../Pages/member/member";
import MemberCreate from "../Pages/member/create";
import MemberEdit from "../Pages/member/edit";
import Employee from "../Pages/Employee/employee";
import EmployeeCreate from "../Pages/Employee/create";
import EmployeeEdit from "../Pages/Employee/edit";
import Sider from "../Sider/sider";
import Receipt from "../Pages/Receipt/receipt";
import Pay from "../Pages/Receipt/Pay/pay";

const {Content} = Layout;


const FullLayout: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <>
    {contextHolder}
    <Layout style={{ minHeight: "100vh", maxHeight:"100vh"}}>
      <Sider />

      <Layout style={{backgroundColor:"#FEFFD2", minHeight: "100vh", maxHeight:"100vh"}}> 
        <Content style={{ margin: "0 30px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "93%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/member" element={<Member />} />
              <Route path="/member/create" element={<MemberCreate />} />
              <Route path="/member/edit/:id" element={<MemberEdit />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/create" element={<EmployeeCreate />} />
              <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="/receipt" element={<Receipt />} />
//            <Route path="/receipt/pay" element={<Pay />} />
            </Routes>
          </div>
        </Content>
      </Layout>

    </Layout>
  </>
  );
};

export default FullLayout;