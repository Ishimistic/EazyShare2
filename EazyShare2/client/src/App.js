import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");


  // const url =
  //   "https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg";

  const getImage = async () => {
    if (file) {
      // console.log("File: ", file);
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      // console.log("Data: ", data);
      console.log(process.env.REACT_APP_API_URI);

      const response = await uploadFile(data);
    //   console.log("Response: ", response);
      setResult(response || "Path not found in response");
    }
  };

  return (
    <div className="container">
      <div className="navbar">EazyShare</div>
      {/* <img src={url} className="img" alt="" /> */}
      <div className="wrapper">
        <h1>Create a link for easy share of your file</h1>
        <p>Upload any file and Get the link.</p>

        <input
          type="file"
          className="fileInput"
          onChange={(e)=>setFile(e.target.files[0])}
        />
        {file && <button onClick={() => getImage()}>Upload</button>}
        {result !== "" ? (
          <a
            href={result}
            target="_blank"
            rel="noopener noreferrer"
            download={{ file }}
          >
            Download   : - {result}
          </a>
        ) : (
          ""
        )}

        {/* <a href={result} download={file} target="_blank" rel="noopener noreferrer">
          Download {file}
        </a> */}
      </div>
    </div>
  );
}

export default App;
