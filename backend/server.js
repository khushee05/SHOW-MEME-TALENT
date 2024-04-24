// const { IgApiClient } = require('instagram-private-api');
// const fs = require('fs');

// (async () => {
//     const ig = new IgApiClient();
//     const username = 'og_lame_page';
//     const password = 'khui0511_jain';

//     try {
//         ig.state.generateDevice(username);
//         await ig.account.login(username, password);

//         const photoBuffer = fs.readFileSync('C:/Users/jaink/Documents/insta-app/backend/download_test.jpg');
//         const upload = await ig.publish.photo({
//             file: photoBuffer,
//             caption: 'Your photo caption here',
//         });

//         console.log('Photo uploaded:', upload);
//     } catch (error) {
//         console.error('Error uploading photo:', error);
//     }
// })();
const express = require('express');
const multer = require('multer');
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
require('dotenv').config();

const app = express();
const upload = multer();

const port = process.env.PORT;

app.post('/upload', upload.single('image'), async (req, res) => {
    const ig = new IgApiClient();
    const username = process.env.IG_USERNAME;
    const password = process.env.IG_PASSWORD;

    try {
        ig.state.generateDevice(username);
        await ig.account.login(username, password);

        const photoBuffer = req.file.buffer;
        const caption = req.body.caption || 'No caption provided';

        const upload = await ig.publish.photo({
            file: photoBuffer,
            caption: caption,
        });

        console.log('Photo uploaded:', upload);
        res.status(200).json({ success: true, message: 'Photo uploaded successfully' });
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ success: false, error: 'Error uploading photo' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

