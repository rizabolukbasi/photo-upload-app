document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const imagePreview = document.getElementById('uploadedImage');
  const files = fileInput.files;

  if (!files.length) {
    status.textContent = 'Lütfen en az bir dosya seçin.';
    return;
  }

  status.textContent = 'Yükleniyor...';
  imagePreview.innerHTML = '';

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'photo-upload'); // preset adını kendi adınla değiştir

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlgw466il/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);

      const img = document.createElement('img');
      img.src = data.secure_url;
      img.style.maxWidth = '200px';
      img.style.margin = '10px';
      imagePreview.appendChild(img);

    } catch (error) {
      console.error(error);
      status.textContent = '❌ Bazı yüklemeler başarısız oldu.';
    }
  }

  status.textContent = '✅ Tüm yüklemeler tamamlandı!';
});
