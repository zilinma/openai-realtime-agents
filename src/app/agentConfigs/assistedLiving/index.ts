import informationCollector from "./informationCollector";
import bookingAgent from "./bookingAgent";
import checkInAgent from "./checkInAgent";
import { injectTransferTools } from "../utils";

// Set up agent relationships
informationCollector.downstreamAgents = [bookingAgent, checkInAgent];
bookingAgent.downstreamAgents = [informationCollector, checkInAgent];
checkInAgent.downstreamAgents = [informationCollector, bookingAgent];

const agents = injectTransferTools([
  informationCollector,
  bookingAgent,
  checkInAgent,
]);

export default agents; 