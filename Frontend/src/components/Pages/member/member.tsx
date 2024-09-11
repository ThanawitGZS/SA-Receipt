import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message, Dropdown, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, DashOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMembers, DeleteMemberByID } from "../../../services/https/index";
import { MemberInterface } from "../../../interfaces/Member";
import { Link, useNavigate } from "react-router-dom";

function Member() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const columns: ColumnsType<MemberInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "FirstName",
      key: "first_name",
    },
    {
      title: "นามสกุล",
      dataIndex: "LastName",
      key: "last_name",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "PhoneNumber",
      key: "phone_number",
    },
    {
      title: "ระดับสมาชิก",
      key: "Rank",
      render: (record) => <>{record.Rank?.Name || "N/A"}</>,
    },
    {
      title: "สมัครโดย",
      key: "Employee",
      render: (record) => <>{record.Employee?.FirstName || "N/A"}</>,
    },
    {
      title: "",
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: "แก้ไขข้อมูล",
                key: "1",
                icon: <EditOutlined />,
                onClick: () => navigate(`/member/edit/${record.ID}`),
              },
              {
                label: "ลบข้อมูล",
                key: "2",
                icon: <DeleteOutlined />,
                onClick: () => showDeleteConfirmModal(record.ID),
                danger: true,
              },
            ],
          }}
        >
          <Button type="primary" icon={<DashOutlined />} size={"small"} className="btn" />
        </Dropdown>
      ),
    },
  ];

  const showDeleteConfirmModal = (id: string) => {
    setSelectedMemberId(id);
    setIsModalVisible(true);
  };

  const handleDeleteMember = async () => {
    if (selectedMemberId) {
      try {
        const res = await DeleteMemberByID(selectedMemberId);

        if (res.status === 200) {
          messageApi.success("ลบข้อมูลสำเร็จ");
          await getMembers(); // Refresh the list after deleting a member
        } else {
          messageApi.error(res.data.error || "ไม่สามารถลบข้อมูลได้");
        }
      } catch (error) {
        messageApi.error("เกิดข้อผิดพลาดในการลบข้อมูล");
      } finally {
        setIsModalVisible(false);
        setSelectedMemberId(null);
      }
    }
  };

  const getMembers = async () => {
    try {
      const res = await GetMembers(); // Fetch data from the API

      if (res.status === 200) {
        setMembers(res.data); // Set the data from the API response
      } else {
        setMembers([]);
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setMembers([]);
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    getMembers(); // Fetch members when the component mounts
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ข้อมูลสมาชิก</h2>
        </Col>

        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/member/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#FF7D29" }}>
                สมัครสมาชิก
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={members} // Data from the API
          pagination={{ pageSize: 10 }}
          style={{ width: "100%", overflowX: "auto" }}
        />
      </div>

      <Modal
        title="ยืนยันการลบ"
        visible={isModalVisible}
        onOk={handleDeleteMember}
        onCancel={() => setIsModalVisible(false)}
        okText="ลบ"
        cancelText="ยกเลิก"
      >
        <p>คุณแน่ใจหรือว่าต้องการลบข้อมูลนี้?</p>
      </Modal>
    </>
  );
}

export default Member;