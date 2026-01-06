import Adminlayout from "../../layout/AdminLayout";
import { Card, Form, Input, Button, Table } from "antd";
import {
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Item } = Form;

const NewEmployee = () => {

  const columns = [
    {
      title: "Profile",
      key: "profile",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          <Button
            type="text"
            className="!bg-pink-100 !text-pink-500"
            icon={<EyeInvisibleOutlined />}
          />
          <Button
            type="text"
            className="!bg-green-100 !text-green-500"
            icon={<EditOutlined />}
          />
          <Button
            type="text"
            className="!bg-rose-100 !text-rose-500"
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  // Example onFinish handler
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">

        {/* Add New Employee */}
        <Card title="Add new employee">
          <Form layout="vertical" onFinish={onFinish}>

            <Item label="Profile" name="profile">
              <Input type="file" />
            </Item>

            <div className="grid md:grid-cols-2 gap-x-2">
              <Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true, message: "Full name is required" }]}
              >
                <Input />
              </Item>

              <Item
                name="mobile"
                label="Mobile"
                rules={[{ required: true, message: "Mobile number is required" }]}
              >
                <Input type="number" />
              </Item>

              <Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input />
              </Item>

              <Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password />
              </Item>
            </div>

            <Item label="Address" name="address">
              <Input.TextArea />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="!w-full !font-bold"
              >
                Submit
              </Button>
            </Item>

          </Form>
        </Card>

        {/* Employee List */}
        <Card
          className="md:col-span-2"
          title="Employee List"
        >
          <Table
            columns={columns}
            dataSource={[{},{}]}
            rowKey="email" // or id if you have unique id
          />
        </Card>

      </div>
    </Adminlayout>
  );
};

export default NewEmployee;
