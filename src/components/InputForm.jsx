import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";


const InputForm = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      setError("");
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON structure: 'data' must be an array.");
      }
      onSubmit(parsedInput);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="API Input">
          <Input.TextArea
            rows={4}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON, e.g., {"data":["A","B","C"]}'
          />
        </Form.Item>
        <Button  type="primary" htmlType="submit" block >
          Submit
        </Button>
      </Form>
      {error && (
        <div style={{ marginTop: "10px" }}>
          <Alert
            message="Invalid JSON"
            description={error}
            type="error"
            showIcon
          />
        </div>
      )}
    </div>
  );
};

export default InputForm;
