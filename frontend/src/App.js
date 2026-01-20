import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Please select a resume");

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMsg(data.analysis || JSON.stringify(data, null, 2));
    } catch (err) {
      setMsg("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
      <h1 style={styles.title}>AI Resume Analyzer v1</h1>

        <p style={styles.subtitle}>
          Upload your resume and get an ATS score with smart feedback.
        </p>

        <label style={styles.fileBox}>
          {file ? file.name : "Choose PDF Resume"}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>

        <button onClick={uploadFile} style={styles.button}>
          Analyze Resume
        </button>

        {loading && <p style={styles.loading}>Analyzing your resume...</p>}

        {msg && (
          <div style={styles.resultBox}>
            <pre style={styles.resultText}>{msg}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #000000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#e5e7eb",
    fontFamily: "Segoe UI, Arial",
  },
  card: {
    background: "#020617",
    padding: "40px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "720px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
    border: "1px solid #1f2933",
  },
  title: {
    margin: 0,
    fontSize: "34px",
    color: "#5eead4",
    textShadow: "0 0 12px rgba(94,234,212,0.3)",
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: "24px",
  },
  fileBox: {
    display: "block",
    padding: "14px",
    border: "2px dashed #2dd4bf",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    color: "#ccfbf1",
    marginBottom: "16px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#14b8a6",
    border: "none",
    borderRadius: "10px",
    color: "#042f2e",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  loading: {
    marginTop: "16px",
    color: "#fef08a",
  },
  resultBox: {
    marginTop: "26px",
    background: "#000000",
    padding: "20px",
    borderRadius: "12px",
    maxHeight: "420px",
    overflowY: "auto",
    border: "1px solid #134e4a",
  },
  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ecfeff",
  },
};

export default App;
// ui test change
// ui test change
// test change
