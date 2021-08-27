import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TemplateApp from "./TemplateApp";

ReactDOM.render(
  <TemplateApp manifestUrl="/image-template-manifest.json" />,
  document.getElementById("root")
);
