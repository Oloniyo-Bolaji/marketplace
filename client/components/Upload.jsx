import { genUploader } from "uploadthing/client";
import { useState } from "react";
import Loading from "./Loading";
import "./styles.css";

const ImageUploader = ({ onSuccess }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const { uploadFiles } = genUploader();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setUploaded(false);
    setPreviewUrl(URL.createObjectURL(file));

    setLoading(true);

    try {
      const res = await uploadFiles("imageUploader", [file]); // ✅ wrap in array
      console.log(res);

      if (res.length) {
        const urls = res.map((file) => file.ufsUrl); // optional: get just the URLs
        onSuccess(urls); // or pass full res if you prefer
        setUploaded(true);
      } else {
        alert("Upload failed: No URLs returned.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + (err?.message || "Unknown error."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload flex flex-col gap-[10px] m-auto">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2 text-[15px] border border-black"
      />

      {previewUrl && (
        <div className="flex gap-2 flex-wrap">
          <img
            src={previewUrl}
            alt={previewUrl}
            className="w-[80px] h-[80px] object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
