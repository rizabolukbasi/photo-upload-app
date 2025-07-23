document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const previewContainer = document.getElementById('imagePreview');
  const files = fileInput.files;

  if (!files.length) {
    status.textContent = 'Lütfen en az bir dosya seçin.';
    return;
  }

  status.textContent = 'Yükleniyor...';
  previewContainer.innerHTML = '';

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'photo-upload'); // preset adını sen verdin
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlgw466il/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      const img = document.createElement('img');
      img.src = data.secure_url;
      img.style.maxWidth = '200px';
      img.style.border = '1px solid #ccc';
      img.style.padding = '5px';
      img.style.margin = '10px';
      previewContainer.appendChild(img);

    } catch (error) {
      console.error('Yükleme hatası:', error);
      status.textContent = '❌ Bazı dosyalar yüklenirken hata oluştu.';
    }
  }

  status.textContent = '✅ Tüm yüklemeler tamamlandı!';
});
