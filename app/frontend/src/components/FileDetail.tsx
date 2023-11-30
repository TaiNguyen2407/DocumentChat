
interface FileDetailProps {
  file: File;
}

const FileDetail = ({ file }: FileDetailProps) => {

  const fileType = (): string => {
    const stringSplit = file.type.split("/");
    return stringSplit[1].toLocaleUpperCase();
  };

  return (
    <div className="grid w-full py-4 border-b shadow-lg pl-4 place-items-center">
      <h1 className="text-2xl font-semibold italic">File Details</h1>
      <h4 className="text-xl">File name: {file.name}</h4>
      <h4 className="text-xl">File Type: {fileType()}</h4>
    </div>
  );
};

export default FileDetail;
