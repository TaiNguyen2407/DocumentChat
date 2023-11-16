
const Info = () => {
  return (
    <div className="flex flex-col justify-center items-start my-8 mx-20 leading-6">
		<strong className="inline">
			<h2>What is Document Chat Application?</h2>
		</strong>
		Document Chat is a project developed under Metropolia University of Applied Sciences's scope. It is an application where you could interact (e.g Q&A) with your own data.
		<strong className="inline">
			<h2>What documents can I use with Document Chat Application?</h2>
		</strong>
		You can use <strong>Word (.docx) or PDF (.pdf)</strong> documents. Please make sure to upload only Word (.docx) or PDF (.pdf) files, <strong>other file types will not be accepted</strong> 
		<strong className="inline">
			<h2>How does Document Chat Application work?</h2>
		</strong>
		Document Chat Application utilizes the ChatGPT offered by Microsoft Azure, ensuring
		we have appropriate data NDA. The chat stores the latest document sent by
		user in user-level isolated data storage in AWS
		<strong className="inline">
			You can only see the documents that you have uploaded yourself. No chats
			or other information is shared between the users.
		</strong>
		<br />
		<strong className="inline">
			<h2>How to use the chat?</h2>
		</strong>
		<ol>
			<li>
			Upload a document by clicking the "Upload document" button. Wait until
			upload is done and input field appears.
			</li>
			<li>Write your question related to the document. </li>
			<li>
			If the chat gives you a good answer, please click the "thumbs up" icon
			on the right upper corner of the chatbot assistant answer. If the
			answer is wrong, please click the "thumbs down" icon, and leave
			feedback on what was wrong. After you have given feedback, the
			conversation is stored anonymously into AWS, where we can monitor the
			performance and adjust the application.
			</li>
		</ol>
    </div>
  );
};

export default Info;