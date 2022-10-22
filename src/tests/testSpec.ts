import app from '../index';
import supertest from 'supertest';
import { Resizing } from '../all_utilities/resizeimages';
import path from 'path';

describe('Testing', () => {
  it('There Are Missing Paramaters', async () => {
    const res = await supertest(app).get('/api');
    expect(res.status).toBe(400);
  });

  it('Image Not Exists', async () => {
    const Path = '/api?Image_Name=Sky&Image_Width=50&Image_Height=300';
    const res = await supertest(app).get(Path);
    expect(res.status).toBe(404);
  });

  it('Incorrect Type of Width & Heigth', async () => {
    const Path =
      '/api?Image_Name=icelandwaterfall&Image_Width=numbers&Image_Height=300';
    const res = await supertest(app).get(Path);
    expect(res.status).toBe(400);
  });

  it('Negative Value of Width or Heigth', async () => {
    const Path =
      '/api?Image_Name=icelandwaterfall&Image_Width=90&Image_Height=-300';
    const res = await supertest(app).get(Path);
    expect(res.status).toBe(400);
  });

  it('Check Resize Images', async () => {
    const Path =
      '/api?Image_Name=icelandwaterfall&Image_Width=500&Image_Height=200';
    const res = await supertest(app).get(Path);
    expect(res.status).toBe(200);
  });

  it('Resize Image', async () => {
    const MainSource = path.resolve('./images/palmtunnel.jpg');
    const DistPath = path.resolve(
      './images/resize_images/palmtunnel-300-400.jpg'
    );

    const restult = await Resizing(MainSource, 300, 400, DistPath);
    expect(restult).toEqual(DistPath);
  });
});
