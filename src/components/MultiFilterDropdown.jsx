import React from "react";
import { Select } from "antd";

const { Option } = Select;

const MultiFilterDropdown = ({ onChange }) => {
  const options = ["Numbers", "Alphabets", "Highest Lowercase Alphabet"];

  const handleSelectChange = (selectedItems) => {
    onChange(selectedItems);
  };

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Select filters"
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default MultiFilterDropdown;
