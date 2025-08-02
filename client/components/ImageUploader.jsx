"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/src/utils/uploadthing";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

const ImageUploader = ({ setValue, errors }) => {
  const [files, setFiles] = useState([]);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const urls = res.map((f) => f.ufsUrl);
      setValue("images", urls);
      alert("Upload completed");
    },
    onUploadError: (e) => {
      alert("Error: " + e.message);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
    multiple: true,
  });

  return (
    <div className="">
      <div
        {...getRootProps()}
        className="inset-shadow-sm inset-shadow-[#38664440] outline-0 bg-white rounded-[5px] p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-[#ccc]">
          Click or drag images here to upload
        </p>
        {files.length > 0 && (
          <button
            type="button"
            onClick={() => startUpload(files)}
            className="mt-2 bg-[#f97a00] text-white text-[12px] px-4 py-[5px] rounded  transition"
          >
            Upload {files.length} image{files.length > 1 ? "s" : ""}
          </button>
        )}
      </div>

      <p className="text-[red] text-[12px]">{errors.images?.message}</p>
    </div>
  );
};

export default ImageUploader;
