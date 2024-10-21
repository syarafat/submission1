/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

async function processImages() {
  try {
    const image = 'hero.jpg'; // Ganti dengan nama gambar yang sesuai

    if (image.includes('hero')) {
      // convert hero image lebar 1200px
      await sharp(`${target}/${image}`)
        .resize(1200)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-1200.jpg`,
          )
        );

      // convert hero image lebar 1000px
      await sharp(`${target}/${image}`)
        .resize(1000)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-1000.jpg`,
          )
        );

      // convert hero image lebar 600px
      await sharp(`${target}/${image}`)
        .resize(600)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-600.jpg`,
          )
        );
    } else {
      // convert loading image lebar 400px
      await sharp(`${target}/${image}`)
        .resize(400)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-400.jpg`,
          )
        );

      // convert loading image lebar 300px
      await sharp(`${target}/${image}`)
        .resize(300)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-300.jpg`,
          )
        );

      // convert loading image lebar 200px
      await sharp(`${target}/${image}`)
        .resize(200)
        .toFile(
          path.resolve(
            destination,
            `${image.split('.').slice(0, -1).join('.')}-200.jpg`,
          )
        );
    }

    console.log(`Processed ${image} successfully.`);
  } catch (error) {
    console.error(`Error processing images: ${error.message}`);
  }
}

processImages();
