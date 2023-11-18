import Lottie from "lottie-react";
import document from "../resources/lottie/document.json";

const Info = () => {
  return (
    <div className="flex flex-col justify-center items-start my-20 mx-40 leading-6 max-w-8xl">
      <div className="grid bg-white w-full border rounded shadow-lg">
        <div className="grid mt-8">
          <h1 className="text-3xl font-extrabold justify-self-center">
            Document Chat
          </h1>
          <div className="grid grid-cols-3 ml-4 mt-12">
            <div className="col-start-1 col-span-2 pt-8 2xl:pt-20">
              <strong className="inline text-2xl">
                <h2>What is Document Chat Application?</h2>
              </strong>
              <p className="text-lg pb-4">
                Document Chat is a project developed under Metropolia University
                of Applied Sciences's scope. It is an application where you
                could interact (e.g Q&A) with your own data.
              </p>
            </div>
            <Lottie animationData={document} className="w-4/5 h-4/5" />
          </div>
          <div className="px-8 pb-8">
            <strong className="inline text-2xl">
              <h2>What documents can I use with Document Chat Application?</h2>
            </strong>
            <p className="text-lg pb-4">
              You can use <strong>Word (.docx) or PDF (.pdf)</strong> documents.
              Please make sure to upload only Word (.docx) or PDF (.pdf) files,{" "}
              <strong>other file types will not be accepted.</strong>
            </p>
            <strong className="inline text-2xl">
              <h2>How does Document Chat Application work?</h2>
            </strong>
            <p className="text-lg pb-4">
              Document Chat Application utilizes the ChatGPT offered by
              Microsoft Azure, ensuring we have appropriate data NDA. The chat
              stores the latest document sent by user in user-level isolated
              data storage in AWS
            </p>

            <strong className="inline text-xl">
              You can only see the documents that you have uploaded yourself. No
              chats or other information is shared between the users.
            </strong>
            <br />
            <strong className="inline text-2xl">
              <h2>How to use the chat?</h2>
            </strong>
            <ol className="text-lg pb-4">
              <li>
                Upload a document by clicking the "Upload document" button. Wait
                until upload is done and input field appears.
              </li>
              <li>Write your question related to the document. </li>
              <li>
                If the chat gives you a good answer, please click the "thumbs
                up" icon on the right upper corner of the chatbot assistant
                answer. If the answer is wrong, please click the "thumbs down"
                icon, and leave feedback on what was wrong. After you have given
                feedback, the conversation is stored anonymously into AWS, where
                we can monitor the performance and adjust the application.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
