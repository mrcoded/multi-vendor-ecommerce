"use client";

import React, { SetStateAction } from "react";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  label: string;
  className?: string;
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function QuillEditor({
  label,
  className = "sm:col-span-2 [&>.ql-container]:min-h-[200px]",
  value,
  onChange,
}: QuillEditorProps) {
  //Quill Editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  return (
    <div className={className}>
      <label
        htmlFor="content"
        className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
      >
        {label}
      </label>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default QuillEditor;
