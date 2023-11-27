import { ChangeEvent, useState } from "react";

interface UploadDocumentProps {
  uploadDocument: (file: File) => void
}

const UploadDocument = ({uploadDocument} : UploadDocumentProps ) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  return (
    <div className="w-full py-8 border-b shadow-lg pl-4">
      <h1 className="grid place-items-center pb-8 text-xl font-semibold">
        Please upload a document for document related questions
      </h1>
      <div className="grid grid-cols-8">
        <div className="grid col-span-5 w-full items-center gap-1.5">
          <input
            className="flex w-full h-10 rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium file:h-10 file:font-semibold"
            type="file"
            id="picture"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>
        <button
          className={`col-start-7 text-white font-semibold rounded-lg shadow-lg ${
            selectedFile != null
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
              : "bg-gray-500"
          }`}
          onClick={() => uploadDocument(selectedFile!)}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;
