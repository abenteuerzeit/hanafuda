import fs from 'fs';
import path from 'path';

const imagesDirectory = path.join(process.cwd(), 'public/images/cards');

fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
        return console.log('Failed to list contents of directory: ' + err);
    }

    const images = files.map((file, index) => {
        const fileName = path.basename(file, path.extname(file));
        const [month, flower, series, category, points, extraInfo, extraInfoDetails] = fileName.split('-');

        return {
            id: index,
            key: `${month}-${flower}-${series}-${category}-${index}`,
            src: `/images/cards/${file}`,
            month: parseInt(month),
            flower: flower,
            card_number: parseInt(series),
            category: category,
            points: parseInt(points),
            extraInfo: extraInfo ? extraInfo : '',
            extraInfoDetails: extraInfoDetails ? extraInfoDetails.split('.')[0] : ''
        };
    });

    const jsonContent = JSON.stringify(images);

    fs.writeFile('public/images.json', jsonContent, 'utf8', (err) => {
        if (err) {
            console.log("An error happened while writing JSON object to file.");
            return console.log(err);
        }
 
        console.log("JSON file has been saved.");
    });
});
