import Lottie from "lottie-react";
import document from "../resources/lottie/document.json";
import pdf from "../resources/lottie/pdf.json";
const Info = () => {
  return (
    <div className="bg-white my-10 mx-10">
      <div className="container mx-auto py-8">
        <div className="bg-blue-50 text-black text-center py-4 rounded-lg">
          <strong>
            <h1 className="text-3xl lg:text-4xl mt-10">Document Chat</h1>
          </strong>
          <div className="grid grid-cols-3 ml-4 mt-4">
              <div className="col-start-1 col-span-2 pt-8 2xl:pt-20">
                <strong className="inline text-2xl">
                  <h2 className="text-left mx-20 ">What is Document Chat Application?</h2>
                </strong>
                <p className="text-lg text-left mx-20 pb-4">
                  Document Chat is an application where you
                  could interact (e.g Q&A) with your own data. It's a project developed under Metropolia University
                  of Applied Sciences's scope.
                </p>
                <div className="flex justify-start">
                  <a href="https://youtu.be/qK2dtLfH8MM" className="text-left text-white mx-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" target="__blank">Watch video</a>
                </div>
              </div>
              <Lottie animationData={document} className="w-4/5 h-4/5" />
            </div>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-sky-300 px-4 py-4 rounded-lg">
            <strong className="inline text-xl">
              <h2 className="pt-4 pb-2 text-center">How to use the chat?</h2>
            </strong>
              <ol className="text-lg pb-4">
                <li>1. Start a new chat.</li>
                <li>2. Send a message asking basic question and the bot will provide an asnwer.</li>
                <li>
                  <strong>The conversation is stored as chat history.</strong>
                </li>
                <li>
                  3. Upload a document by clicking the "Upload document" button. Wait until upload is done and write your question related to the document.
                </li>
              </ol>
          </div>
          <div className="bg-sky-200 px-4 py-4 rounded-lg">
            <strong className="inline text-xl">
              <h2 className="pt-4 pb-2 text-center">What documents can I use with Document Chat Application?</h2>
            </strong>
            <p className="text-lg pb-4">
              You can use <strong> PDF (.pdf)</strong> documents.
              Please make sure to upload only PDF (.pdf) files,{" "}
              <strong>other file types will not be accepted.</strong>
            </p>
            <div className="flex items-center justify-center">
              <Lottie animationData={pdf} className="w-2/5 h-2/5" />
            </div>
          </div>
          <div className="bg-sky-100 px-4 py-4 rounded-lg">
            <strong className="inline text-xl">
              <h2 className="pt-4 pb-2 text-center">How does Document Chat Application work?</h2>
            </strong>
            <p className="text-lg pb-4">
              Document Chat Application utilizes the GPT4All created by
              Nomic AI, an information cartography company that aims to improve access to AI resources. The chat
              is designed to run without the need of GPU, and it
              stores the latest document sent by user in user-level isolated
              data storage.
            </p>
            <strong className="inline text-base">
              Note: You can only see the documents that you have uploaded yourself. No
              chats or other information is shared between the users.
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
 };

export default Info;
