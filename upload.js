document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const gallery = document.getElementById('gallery');
  const files = fileInput.files;

  if (!files.length) {
    status.textContent = 'Lütfen en az bir dosya seçin.';
    return;
  }

  status.textContent = 'Yükleniyor...';
  gallery.innerHTML = ''; // eski fotoğrafları temizle

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'photo-upload'); // preset adın

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlgw466il/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      // Yüklenen fotoğrafı galeriye ekle
      const img = document.createElement('img');
      img.src = data.secure_url;
      img.className = 'uploadedImage';
      gallery.appendChild(img);

    } catch (error) {
      console.error(error);
      status.textContent = '❌ Yükleme sırasında hata oluştu.';
    }
  }

  status.textContent = '✅ Yükleme tamamlandı!';
});
