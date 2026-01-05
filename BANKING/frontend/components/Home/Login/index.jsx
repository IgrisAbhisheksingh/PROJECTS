import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen">
      
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img
          src="/projecttt.jpg"
          alt="Bank"
          className="w-4/5 object-contain"
        />
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <Card className="w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Bank Login
          </h2>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
