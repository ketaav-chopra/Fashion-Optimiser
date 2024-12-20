function processImage() {
  const imageUpload = document.getElementById('imageUpload');
  const file = imageUpload.files[0];

  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  // Fetch the API key from the backend
  fetch("/get-api-key")
    .then(response => response.json())
    .then(({ apiKey }) => {
      // Use the fetched API key in the request
      return fetch("https://api.example.com/analyze", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
        body: formData
      });
    })
    .then(response => response.json())
    .then(data => {
      displayFashionTips(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function displayFashionTips(data) {
  const resultSection = document.getElementById('result');
  resultSection.innerHTML = `<p>Suggested Outfit Tips: ${data.tips}</p>`;
}
