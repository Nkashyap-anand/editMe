const submitBtn = document.getElementById('submitBtn');
const imageInput = document.getElementById('imageInput');
const outputImage = document.getElementById('outputImage');

submitBtn.addEventListener('click', async () => {
	const selectedImage = imageInput.files[0];

	if (selectedImage) {
		const randomImage = await fetchRandomImage();
		outputImage.src = randomImage;
	} else {
		alert('Please select an image.');
	}
});

async function fetchRandomImage() {
	const response = await fetch('/randomImage');
	const blob = await response.blob();
	return URL.createObjectURL(blob);
}
