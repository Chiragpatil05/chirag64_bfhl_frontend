import React, { useState } from "react";
import InputForm from "./components/InputForm";
import MultiFilterDropdown from "./components/MultiFilterDropdown";
import { Typography, Spin, Alert } from "antd";

const { Title } = Typography;

const App = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      console.log("Sending data to API:", data);
      const response = await fetch("https://chirag64-bfhl-backend.vercel.app/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const result = await response.json();
      setApiResponse(result);
      setFilteredData(result);
    } catch (error) {
      console.error("API call failed:", error);
      setError("Failed to fetch data from the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const handleFilterChange = (selectedFilters) => {
    const filtered = {};
    if (selectedFilters.includes("Numbers")) filtered.numbers = apiResponse.numbers || [];
    if (selectedFilters.includes("Alphabets")) filtered.alphabets = apiResponse.alphabets || [];
    if (selectedFilters.includes("Highest Lowercase Alphabet"))
      filtered.highestLowercase = apiResponse.highestLowercase || "";
    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title style={{ textAlign: "center" }}>JSON Input and Filter</Title>
      <InputForm onSubmit={handleSubmit} />
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px" }}>
          <Alert message="Error" description={error} type="error" showIcon />
        </div>
      )}
      {apiResponse.numbers && !loading && !error && (
        <div style={{ margin: "20px" }}>
          <MultiFilterDropdown onChange={handleFilterChange} />
          <div style={{ marginTop: "10px" }}>
            <Title level={4}>Filtered Response:</Title>
            <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
              {JSON.stringify(filteredData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
