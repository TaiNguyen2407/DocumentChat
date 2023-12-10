import { FontAwesomeIcon as BotIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

/* This component is created for showing the loading while question is uploaded to our backend api and waiting for the response */
const BotThinking = () => {

    return(
        <div className="flex flex-row">
        <BotIcon icon={faRobot} size="2xl" className="pl-4 pt-6 self-end" />
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-100 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-200 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>  
    )
}

export default BotThinking;