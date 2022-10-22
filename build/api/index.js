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
const express_1 = __importDefault(require("express"));
const resizeimages_1 = require("../all_utilities/resizeimages");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Router = express_1.default.Router();
//URL : http://localhost:3009/api?Image_Name=icelandwaterfall&Image_Width=100&Image_Height=300
// invalid URL : http://localhost:3009/api?Image_Name=icelandwaterfall&Image_Width=KKJ0&Image_Height=5JG3
// Empty parameter val: http://localhost:3009/api?Image_Name=HJ&Image_Width=90&Image_Height=90
Router.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //get values of each parameters
    const Image_Name = request.query.Image_Name;
    const Image_Width = request.query.Image_Width;
    const Image_Height = request.query.Image_Height;
    const Width_Contain_Numbers = /^[0-9]+$/.test(Image_Width);
    const Height_Contain_Numbers = /^[0-9]+$/.test(Image_Height);
    const SourceFile = path_1.default.resolve(`./images/${Image_Name}.jpg`);
    const ImageExisting = fs_1.default.existsSync(SourceFile);
    console.log(ImageExisting);
    let booleanvalue = false;
    if (ImageExisting == false) {
        booleanvalue = true;
    }
    const distPath = path_1.default.resolve(`./images/resize_images/${Image_Name}-${Image_Width}-${Image_Height}.jpg`);
    if (ImageExisting && Width_Contain_Numbers && Height_Contain_Numbers) {
        if (parseInt(Image_Width) > 0 && parseInt(Image_Height)) {
            (0, resizeimages_1.Resizing)(SourceFile, parseInt(Image_Width), parseInt(Image_Height), distPath).then((resized_image) => {
                response.status(200).sendFile(resized_image);
            });
        }
        else {
            response
                .status(400)
                .send('Make Sure to enter values for width and heigth that greater than zero');
        }
    }
    else if (booleanvalue &&
        !Width_Contain_Numbers &&
        !Height_Contain_Numbers) {
        response
            .status(400)
            .send('Make sure to enter avaliable image name, positive and integer values for width and heigth');
    }
    else {
        if (ImageExisting == false &&
            (Width_Contain_Numbers == false || Height_Contain_Numbers == false)) {
            response
                .status(404)
                .send('Make Sure to enter avaliable image name, integer and positive value for  width/heigth');
        }
        else if (ImageExisting == false) {
            response.status(404).send('Image is not found   ' + SourceFile + '  ');
        }
        else if (Width_Contain_Numbers == false &&
            Height_Contain_Numbers == false) {
            response
                .status(400)
                .send('Make Sure to enter integer and positive value for width and heigth');
        }
        else if (Width_Contain_Numbers == false) {
            response
                .status(400)
                .send('Make Sure to enter integer and positive value for  width');
        }
        else if (Height_Contain_Numbers == false) {
            response
                .status(400)
                .send('Make Sure to enter integer and positive value for  heigth');
        }
    }
}));
exports.default = Router;
