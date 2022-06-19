import React from "react";
import "react-quill/dist/quill.snow.css";

export const DescriptionEditor = (props: { setDescription }) => {
  const { setDescription } = props;

  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
      ]}
      onChange={(text) => setDescription(text)}
      className="h-80 mb-20"
    />
  );
};
