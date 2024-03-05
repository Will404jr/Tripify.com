import React from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Upload,
} from "antd";
// const {} = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const Package = () => (
  <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="FullNames"
      name="FullNames"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="TellNumber"
      name="TellNumber"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <InputNumber
        style={{
          width: "100%",
        }}
      />
    </Form.Item>

    <Form.Item
      label="Receipient's Names"
      name="Receipient's Names"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="TellNumber"
      name="TellNumber"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <InputNumber
        style={{
          width: "100%",
        }}
      />
    </Form.Item>

    <Form.Item
      label="Upload Image"
      name="supportingDoc"
      // Adjust here for your specific upload requirements (e.g., accept, max size)
      rules={[
        {
          validator: async (_, value) => {
            if (!value || !value.fileList.length) {
              return Promise.reject("Please upload a document.");
            }
            // Add additional validation checks if needed (e.g., file type)
            return Promise.resolve();
          },
        },
      ]}
    >
      <Upload accept=".pdf,.docx,.jpg,.jpeg">
        <Button>Click to upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item
      label="Destination"
      name="Destination"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Select />
    </Form.Item>

    <Form.Item
      label="Choose a bus"
      name="Choose a bus"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Cascader />
    </Form.Item>

    <Form.Item
      label="Select shipping date"
      name="Select shipping date"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item
      label="Choose shipping time"
      name="Choose shipping time"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <TreeSelect />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Proceed to payment
      </Button>
    </Form.Item>
  </Form>
);
export default Package;
