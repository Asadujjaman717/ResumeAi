

//-------------------------------------------------------------

// App.jsx
import { useState } from "react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumeDocument";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://localhost:44357/api/resume/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const aiContent = res.data.choices[0].message.content;
      setResult(aiContent);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 800, // max width of the card
          backgroundColor: "#fff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ color: "#4b0082" }}>AI Resume Enhancer</h1>
          <p style={{ fontSize: 18, color: "#555" }}>
            Upload your resume and get a professionally enhanced version with AI suggestions!
          </p>
        </div>

        {/* Upload & Analyze */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />
          <button
            onClick={handleUpload}
            style={{
              padding: "10px 25px",
              backgroundColor: "#4b0082",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              position: "relative",
            }}
            disabled={loading}
          >
            {loading ? (
              <div
                style={{
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid #fff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  animation: "spin 1s linear infinite",
                  display: "inline-block",
                }}
              ></div>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {/* Resume Preview & Download */}
        {result && (
          <div style={{ width: "100%", marginTop: 20 }}>
            <h3 style={{ color: "#4b0082", textAlign: "center" }}>Preview:</h3>
            <div
              style={{
                border: "1px solid #ccc",
                padding: 20,
                borderRadius: 8,
                background: "#f9f9ff",
                lineHeight: 1.5,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                maxHeight: "400px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              {result}
            </div>

            <PDFDownloadLink
              document={<ResumeDocument content={result} />}
              fileName="AI_Enhanced_Resume.pdf"
              style={{
                marginTop: 15,
                padding: "10px 25px",
                background: "#4b0082",
                color: "#fff",
                borderRadius: 5,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
            </PDFDownloadLink>
          </div>
        )}

        {/* Spinner CSS */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default App;
