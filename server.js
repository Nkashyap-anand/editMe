const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/randomImage', (req, res) => {
	const imagesDir = path.join(__dirname, 'images');
	fs.readdir(imagesDir, (err, files) => {
		if (err) {
			res.status(500).send('Error reading images directory.');
			return;
		}

		const randomIndex = Math.floor(Math.random() * files.length);
		const randomImage = files[randomIndex];

		const imagePath = path.join(imagesDir, randomImage);
		const imageStream = fs.createReadStream(imagePath);

		res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image format
		imageStream.pipe(res);
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
