"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import {all_routes} from './all_routes/index'
//import {all_utilities} from './all_utilities/'
const index_1 = __importDefault(require("./api/index"));
const middelwares_1 = __importDefault(require("./all_utilities/middelwares"));
const app = (0, express_1.default)();
const port = 3009;
app.use('/api', middelwares_1.default, index_1.default);
app.use(express_1.default.static('/images'));
app.listen(port, () => console.log(`The Server is Working Successfully on Port ${port}`));
exports.default = app;
