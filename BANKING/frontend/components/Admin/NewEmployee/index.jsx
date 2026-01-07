import Adminlayout from "../../layout/AdminLayout";
import { trimData } from "../../../modules/modules";
import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react"; 
import { Card, Form, Input, Button, Table } from "antd";
import {
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL; 

const { Item } = Form;

const NewEmployee = () => {
  const [empForm] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const [dataSource, setDataSource] = useState([]); 

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setDataSource(data); // assuming backend returns array of employees
    } catch (err) {
      console.error(err);
      swal("Error", "Failed to fetch employees", "error");
    }
  };

  useEffect(() => {
    fetchEmployees(); 
  }, []);

  
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const finalObj = trimData(values);

      await axios.post("/api/users", finalObj); 

      swal("Success", "Employee Created", "success");
      empForm.resetFields();
      fetchEmployees(); // refresh table after adding
    } catch (err) {
      if (err?.response?.data?.error?.code === 11000) {
        empForm.setFields([
          {
            name: "email",
            errors: ["Email Already Exists!"], 
          },
        ]);
      } else {
        swal("Warning", "Try again later", "warning");
      }
    } finally {
      setLoading(false); 
    }
  };

  //  Table columns
  const columns = [
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
      render: (text, record) => ( 
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

  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">

        {/* Add Employee */}
        <Card title="Add New Employee">
          <Form form={empForm} layout="vertical" onFinish={onFinish}>
            <Item label="Profile">
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
                rules={[{ required: true, message: "Mobile is required" }]}
              >
                <Input />
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

            <Item name="address" label="Address">
              <Input.TextArea />
            </Item>

            <Button
              loading={loading}  
              type="primary"
              htmlType="submit"
              className="!w-full !font-bold"
            >
              Submit
            </Button>
          </Form>
        </Card>

        {/* Employee List */}
        <Card title="Employee List" className="md:col-span-2">
          <Table
            columns={columns}
            dataSource={dataSource} // ✅ now dynamic
            rowKey="email"
          />
        </Card>

      </div>
    </Adminlayout>
  );
};

export default NewEmployee;
