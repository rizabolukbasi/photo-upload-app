
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const status = document.getElementById('status');

uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    status.textContent = 'Lütfen bir dosya seçin.';
    return;
  }
  const storageRef = storage.ref('uploads/' + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      status.textContent = 'Yükleniyor: ' + progress.toFixed(2) + '%';
    }, 
    (error) => {
      status.textContent = 'Yükleme hatası: ' + error;
    }, 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        status.textContent = 'Yükleme tamamlandı! Dosya URL: ' + downloadURL;
      });
    }
  );
});
