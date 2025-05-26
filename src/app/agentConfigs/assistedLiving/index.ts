import informationCollector from "./informationCollector";
import bookingAgent from "./bookingAgent";
import { injectTransferTools } from "../utils";

// Set up agent relationships
informationCollector.downstreamAgents = [bookingAgent];
bookingAgent.downstreamAgents = [informationCollector];

const agents = injectTransferTools([
  informationCollector,
  bookingAgent,
]);

export default agents; 