import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Card, Form, Input, Button, InputNumber, Table } from "antd"; // ✅ added Table
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons"; // fixed icon
const { Item } = Form;

const NewEmployee = () => {
  const columns = [
    { title: "Profile", key: "profile" },
    { title: "Fullname", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          <Button type="text" className="!bg-pink-100 !text-pink-500" icon={<EyeInvisibleOutlined />} />
          <Button type="text" className="!bg-green-100 !text-green-500" icon={<EditOutlined />} />
          <Button type="text" className="!bg-rose-100 !text-rose-500" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Add new employee">
          <Form layout="vertical">
            <Item label="Profile" name="xyz">
              <Input type="file" />
            </Item>

            <div className="grid md:grid-cols-2 gap-x-2">
              <Item name="fullname" label="Fullname" rules={[{ required: true }]}>
                <Input />
              </Item>

              <Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
              </Item>

              <Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Item>

              <Item name="password" label="Password" rules={[{ required: true }]}>
                <Input />
              </Item>
            </div>

            <Item label="Address" name="address">
              <Input.TextArea />
            </Item>

            <Item>
              <Button
                type="text"
                htmlType="submit"
                className="!bg-blue-500 !text-white !font-bold !w-full"
              >
                Submit
              </Button>
            </Item>
          </Form>
        </Card>

        <Card className="md:col-span-2" title="Employee List">
          <Table columns={columns} dataSource={[[]]} /> {/* ✅ fixed typo */}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NewEmployee;
