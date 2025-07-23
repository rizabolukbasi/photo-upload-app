document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const imagePreview = document.getElementById('uploadedImage');
  const file = fileInput.files[0];

  if (!file) {
    status.textContent = 'Lütfen bir dosya seçin.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'photo-upload'); // kendi preset adınla değiştir

  status.textContent = 'Yükleniyor...';

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data);
    status.textContent = '✅ Yükleme tamamlandı!';
    imagePreview.src = data.secure_url;
  } catch (error) {
    console.error(error);
    status.textContent = '❌ Yükleme başarısız.';
  }
});
