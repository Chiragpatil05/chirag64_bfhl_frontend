import React, { useState } from "react";
import InputForm from "./components/InputForm";
import MultiFilterDropdown from "./components/MultiFilterDropdown";
import { Typography, Spin, Alert, ConfigProvider, Layout, Row, Col } from "antd";

const { Title } = Typography;
const { Content, Footer } = Layout;

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
          borderRadius: 8,
          colorLink: "black",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Content style={{ padding: "40px" }}>
          <Row gutter={24}>
            {/* Left Column: Input Form */}
            <Col xs={24} md={12}>
              <div
                style={{
                  padding: "20px",
                  background: "#AB886D",  
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Title style={{ textAlign: "center", color: "black" }}>JSON Input and Filter</Title>
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
              </div>
            </Col>

            
            <Col xs={24} md={12}>
              <div
                style={{
                  padding: "20px",
                  background: "#AB886D",  
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Title level={4} style={{ color: "black" }}>Filtered Response:</Title>
                {apiResponse.numbers && !loading && !error ? (
                  <>
                    <MultiFilterDropdown onChange={handleFilterChange} />
                    <div style={{ marginTop: "20px" }}>
                      <pre
                        style={{
                          background: "#f6f8fa",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #d9d9d9",
                        }}
                      >
                        {JSON.stringify(filteredData, null, 2)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <p style={{ textAlign: "center", color: "black" }}>No response to display yet.</p>
                )}
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center", background: "rgb(171, 136, 109)", color: "black" }}>
          Made By ~ Chirag Patil (0827CS211064)
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
