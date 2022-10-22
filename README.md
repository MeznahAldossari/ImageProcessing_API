# Image Processing API

The Image Processing API project uses to resize the given images based on the width and height that deifned by user

### NPM Scripts

- build: npm run build
- test: npm run test
- start: npm run start
- prettier: npm run prettier
- lint: npm run lint

The server will work on http://localhost:3009

### Parameters the user have to write in the previous link:

#### 1- Image_Name

The images that avaliable are:

- fjord
- icelandwaterfall
- palmtunnel
- santamonica
- encenadaport

#### 2- Image_Width

The value must be positive and integer

#### 3- Image_Height

The value must be positive and integer

#### One Example is

http://localhost:3009/api?Image_Name=icelandwaterfall&Image_Width=100&Image_Height=300
