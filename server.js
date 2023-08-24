const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT

app.use(express.static(path.join(__dirname, 'public')));

app.get('/randomImage', (req, res) => {
	const imagesDir = path.join(__dirname, 'public/images');
	fs.readdir(imagesDir, (err, files) => {
		if (err) {
			res.status(500).send('Error reading images directory.');
			return;
		}

		const randomIndex = Math.floor(Math.random() * files.length);
		const randomImage = files[randomIndex];

		const imagePath = path.join(imagesDir, randomImage);

		// Read the image file as binary data
		fs.readFile(imagePath, (err, data) => {
			if (err) {
				res.status(500).send('Error reading image file.');
				return;
			}
			const imageBuffer = Buffer.from(data);

			// Set the appropriate Content-Type header
			res.setHeader('Content-Type', 'image/png'); // Adjust content type based on your image format

			// Send the binary image data as the response
			res.send(imageBuffer);
		});
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
