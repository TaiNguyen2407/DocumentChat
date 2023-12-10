
/*This object contains props for fileDetail component */
interface FileDetailProps {
  file: File;
}

/*This component is created for displaying the detail of the uploaded file. */
const FileDetail = ({ file }: FileDetailProps) => {

  /*Method for fetching the file type from file details. */
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
