import * as Controllers from "../controllers";
import * as helpers from "../helpers";

//     ____              __
//    / __ \____  __  __/ /____  _____
//   / /_/ / __ \/ / / / __/ _ \/ ___/
//  / _, _/ /_/ / /_/ / /_/  __(__  )
// /_/ |_|\____/\__,_/\__/\___/____/

export default app => {
  app.post("/distance/eta", Controllers.estimateArrivalTime);
};
