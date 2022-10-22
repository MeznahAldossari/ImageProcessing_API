import sharp from 'sharp';
import fs from 'fs';

const Resizing = async (
  FilePath: string,
  image_width: number,
  image_height: number,
  resized_image: string
): Promise<string> => {
  try {
    const existsimage = await fs.existsSync(resized_image);

    if (existsimage) {
      console.log('Image Already Exists');
      return resized_image;
    } else {
      await sharp(FilePath)
        .resize(image_width, image_height)
        .toFormat('jpg')
        .toFile(resized_image);

      return resized_image;
    }
  } catch (error) {
    return 'Some Mistakes Happend';
  }
};

export { Resizing };
