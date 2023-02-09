import "./App.css";
import { useEffect, useState } from "react";
import FileComponent from "./components/FileComponent";
import TabsConponent from "./components/TabsConponent";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  const onEditingContent = () => {
    fetch(`http://localhost:4444/editing/content/${selectedFile.id}`, {
      method: "PUT",
      body: JSON.stringify(selectedFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const onChangeContent = (value) => {
    setFiles(
      files.map((file) => {
        if (file.id === selectedFile.id) {
          return { ...file, content: value };
        }
        return file;
      })
    );
    setSelectedFile({ ...selectedFile, content: value });
  };

  useEffect(() => {
    fetch("http://localhost:4444/files")
      .then((response) => response.json())
      .then((json) => setFiles(json));
  }, []);

  return (
    <div className="App">
      <FileComponent
        files={files}
        setSelectedFile={setSelectedFile}
        setFiles={setFiles}
      />

      <div className="text-wrap">
        <TabsConponent
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        <textarea
          onChange={(e) => onChangeContent(e.target.value)}
          value={selectedFile.content}
          className="text"
          onKeyUp={onEditingContent}
        />
      </div>
    </div>
  );
}

export default App;
