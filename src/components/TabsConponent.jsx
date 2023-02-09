import React from "react";
import { useState } from "react";

function TabsConponent({ selectedFile }) {
  return (
    <div className="wrapper-tabs">
      <p>{selectedFile.name}</p>
    </div>
  );
}

export default TabsConponent;
