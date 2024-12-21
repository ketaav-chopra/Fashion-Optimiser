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
          "Authorization": `Bearer ${ask-proj-4aDmx52D1DzRb55rDkW2ZoysSojfkul61S2Jh5KhEnIiYtKsSYAzYvMcarni80i2U6YUaRi_vfT3BlbkFJZS7TgMScmK2mxB1B8FBQxCVMsylX2Wu5NFONLmMWeBAT8XErdNyZpP_93_GkdPjd3fGCcgu3UA}`,
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
