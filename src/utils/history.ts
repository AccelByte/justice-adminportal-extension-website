import { createBrowserHistory } from "history";
import { globalVar } from "../constants/env";

export const history = createBrowserHistory({
  basename: globalVar.JUSTICE_BASE_PATH,
});
