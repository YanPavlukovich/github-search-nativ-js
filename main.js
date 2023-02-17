import { Api } from "./modules/api.js";
import { Log } from "./modules/log.js";
import { Search } from "./modules/search.js";
import { View } from "./modules/view.js";

const api = new Api();

//? Не забываем проставить второй аргумент, когда создали новый класс для запроса.
const app = new Search(new View(api), api, new Log());
