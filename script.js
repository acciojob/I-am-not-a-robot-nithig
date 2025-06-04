//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("para");

let selectedImages = [];
let imageElements = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[array[i], array[j]] = [array[j], array[i]];
  }
}

function setupImages() {
  imageContainer.innerHTML = "";
  selectedImages = [];
  imageElements = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  message.textContent = "";
  
  let images = [...imageClasses];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);
  shuffle(images);

  images.forEach((cls, idx) => {
	const img = document.createElement("img");
	img.classList.add(cls);
	img.dataset.class = cls;
	img.addEventListener("click", () => handleImageClick(img));
	imageContainer.appendChild(img);
	imageElements.push(img);
  });
}

function handleImageClick(img) {
  if (!selectedImages.includes(img)) {
	if (selectedImages.length < 2) {
	  img.classList.add("selected");
	  selectedImages.push(img);
	}
  } else {
	img.classList.remove("selected");
	selectedImages = selectedImages.filter(i => i !== img);
  }

  resetButton.style.display = selectedImages.length > 0 ? "inline-block" : "none";
  verifyButton.style.display = selectedImages.length === 2 ? "inline-block" : "none";
}

resetButton.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  message.textContent = "";
});

verifyButton.addEventListener("click", () => {
  const [img1, img2] = selectedImages;
  if (img1.dataset.class === img2.dataset.class) {
	message.textContent = "You are a human. Congratulations!";
  } else {
	message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = "none";
});

window.onload = setupImages;