import { useState, useEffect } from "react";
import Adminlayout from "../../layout/AdminLayout";
import { trimData, http } from "../../../modules/modules";
import swal from "sweetalert";

import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Upload,
} from "antd";

import {
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Item } = Form;

const NewEmployee = () => {
  const [empForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  /* ================= FETCH EMPLOYEES ================= */
  /* ================= FETCH EMPLOYEES ================= */
/* ================= FETCH EMPLOYEES ================= */
/* ================= FETCH EMPLOYEES ================= */
const fetchEmployees = async () => {
  try {
    setLoading(true);
    const httpReq = http();

    // ✅ FIXED: Remove extra /api
    const res = await httpReq.get("/users"); 

    setDataSource(res.data.data || []);
  } catch (err) {
    console.error("Fetch Error:", err);
    swal("Error", "Failed to fetch employees", "error");
  } finally {
    setLoading(false);
  }
};

/* ================= SUBMIT FORM ================= */
const onFinish = async (values) => {
  try {
    setLoading(true);
    const finalObj = trimData(values);
    const httpReq = http();

    // ✅ FIXED: Remove extra /api
    await httpReq.post("/users", finalObj);

    swal("Success", "Employee Created", "success");
    empForm.resetFields();
    fetchEmployees();
  } catch (err) {
    if (err?.response?.data?.message === "Already exists !") {
      empForm.setFields([
        {
          name: "email",
          errors: ["Email already exists"],
        },
      ]);
    } else {
      swal("Warning", "Server connection issue", "warning");
    }
  } finally {
    setLoading(false);
  }
};

/* ================= DELETE EMPLOYEE ================= */
const onDelete = async (id) => {
  try {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      setLoading(true);

      // ✅ FIXED: Remove extra /api
      await http().delete(`/users/${id}`);
      swal("Poof! Employee deleted!", { icon: "success" });
      fetchEmployees();
    }
  } catch (err) {
    swal("Error", "Could not delete employee", "error");
  } finally {
    setLoading(false);
  }
};


  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { title: "Full Name", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
            onClick={() => onDelete(record._id)} // Uses MongoDB _id for deletion
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
        <Card title="Add New Employee">
          <Form form={empForm} layout="vertical" onFinish={onFinish}>
            <Item label="Profile">
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Profile</Button>
              </Upload>
            </Item>
            <div className="grid md:grid-cols-2 gap-x-2">
              <Item name="fullname" label="Full Name" rules={[{ required: true }]}>
                <Input />
              </Item>
              <Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                <Input />
              </Item>
              <Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
              </Item>
              <Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Item>
            </div>
            <Item name="address" label="Address">
              <Input.TextArea rows={3} />
            </Item>
            <Button loading={loading} type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </Card>

        <Card title="Employee List" className="md:col-span-2">
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey="_id" // Correctly matches MongoDB unique ID
          />
        </Card>
      </div>
    </Adminlayout>
  );
};

export default NewEmployee;