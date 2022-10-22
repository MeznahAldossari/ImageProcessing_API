"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const resizeimages_1 = require("../all_utilities/resizeimages");
const path_1 = __importDefault(require("path"));
describe('Testing', () => {
    it('There Are Missing Paramaters', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/api');
        expect(res.status).toBe(400);
    }));
    it('Image Not Exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const Path = '/api?Image_Name=Sky&Image_Width=50&Image_Height=300';
        const res = yield (0, supertest_1.default)(index_1.default).get(Path);
        expect(res.status).toBe(404);
    }));
    it('Incorrect Type of Width & Heigth', () => __awaiter(void 0, void 0, void 0, function* () {
        const Path = '/api?Image_Name=icelandwaterfall&Image_Width=numbers&Image_Height=300';
        const res = yield (0, supertest_1.default)(index_1.default).get(Path);
        expect(res.status).toBe(400);
    }));
    it('Negative Value of Width or Heigth', () => __awaiter(void 0, void 0, void 0, function* () {
        const Path = '/api?Image_Name=icelandwaterfall&Image_Width=90&Image_Height=-300';
        const res = yield (0, supertest_1.default)(index_1.default).get(Path);
        expect(res.status).toBe(400);
    }));
    it('Check Resize Images', () => __awaiter(void 0, void 0, void 0, function* () {
        const Path = '/api?Image_Name=icelandwaterfall&Image_Width=500&Image_Height=200';
        const res = yield (0, supertest_1.default)(index_1.default).get(Path);
        expect(res.status).toBe(200);
    }));
    it('Resize Image', () => __awaiter(void 0, void 0, void 0, function* () {
        const MainSource = path_1.default.resolve('./images/palmtunnel.jpg');
        const DistPath = path_1.default.resolve('./images/resize_images/palmtunnel-300-400.jpg');
        const restult = yield (0, resizeimages_1.Resizing)(MainSource, 300, 400, DistPath);
        expect(restult).toEqual(DistPath);
    }));
});
