import express from 'express';
import { Resizing } from '../all_utilities/resizeimages';
import path from 'path';
import fs from 'fs';

const Router = express.Router();
//URL : http://localhost:3009/api?Image_Name=icelandwaterfall&Image_Width=100&Image_Height=300
// invalid URL : http://localhost:3009/api?Image_Name=icelandwaterfall&Image_Width=KKJ0&Image_Height=5JG3
// Empty parameter val: http://localhost:3009/api?Image_Name=HJ&Image_Width=90&Image_Height=90
Router.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    //get values of each parameters

    const Image_Name = request.query.Image_Name as string;
    const Image_Width = request.query.Image_Width as string;
    const Image_Height = request.query.Image_Height as string;
    const Width_Contain_Numbers = /^[0-9]+$/.test(Image_Width);
    const Height_Contain_Numbers = /^[0-9]+$/.test(Image_Height);

    const SourceFile = path.resolve(`./images/${Image_Name}.jpg`);

    const ImageExisting = fs.existsSync(SourceFile);
    console.log(ImageExisting);

    let booleanvalue: boolean = false;
    if (ImageExisting == false) {
      booleanvalue = true;
    }

    const distPath = path.resolve(
      `./images/resize_images/${Image_Name}-${Image_Width}-${Image_Height}.jpg`
    );

    if (ImageExisting && Width_Contain_Numbers && Height_Contain_Numbers) {
      if (parseInt(Image_Width) > 0 && parseInt(Image_Height)) {
        Resizing(
          SourceFile,
          parseInt(Image_Width),
          parseInt(Image_Height),
          distPath
        ).then((resized_image) => {
          response.status(200).sendFile(resized_image);
        });
      } else {
        response
          .status(400)
          .send(
            'Make Sure to enter values for width and heigth that greater than zero'
          );
      }
    } else if (
      booleanvalue &&
      !Width_Contain_Numbers &&
      !Height_Contain_Numbers
    ) {
      response
        .status(400)
        .send(
          'Make sure to enter avaliable image name, positive and integer values for width and heigth'
        );
    } else {
      if (
        ImageExisting == false &&
        (Width_Contain_Numbers == false || Height_Contain_Numbers == false)
      ) {
        response
          .status(404)
          .send(
            'Make Sure to enter avaliable image name, integer and positive value for  width/heigth'
          );
      } else if (ImageExisting == false) {
        response.status(404).send('Image is not found   ' + SourceFile + '  ');
      } else if (
        Width_Contain_Numbers == false &&
        Height_Contain_Numbers == false
      ) {
        response
          .status(400)
          .send(
            'Make Sure to enter integer and positive value for width and heigth'
          );
      } else if (Width_Contain_Numbers == false) {
        response
          .status(400)
          .send('Make Sure to enter integer and positive value for  width');
      } else if (Height_Contain_Numbers == false) {
        response
          .status(400)
          .send('Make Sure to enter integer and positive value for  heigth');
      }
    }
  }
);

export default Router;
