import React, { useState } from "react";

function FileComponent({ files, setSelectedFile, setFiles }) {
  const [value, setValue] = useState("");

  const addFile = () => {
    const newFile = {
      id: Math.random(),
      name: value,
      content: "",
    };
    setFiles([...files, newFile]);

    fetch("http://localhost:4444/add-files", {
      method: "POST",
      body: JSON.stringify(newFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const onDeleteFile = (id) => {
    setFiles(
      files.filter((file) => {
        return file.id !== id;
      })
    );
    fetch(`http://localhost:4444/delete/file/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="wrapper-file">
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <button onClick={addFile}>Add File</button>
      {files &&
        files.map((file) => {
          return (
            <div
              className="file-name"
              key={file.id}
              onClick={() => setSelectedFile(file)}
            >
              <span>{file.name}</span>
              <button onClick={() => onDeleteFile(file.id)}>delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default FileComponent;
