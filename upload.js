// upload.js

document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');

  const file = fileInput.files[0];
  if (!file) {
    status.textContent = "Lütfen bir dosya seçin.";
    return;
  }

  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child('uploads/' + file.name);

  status.textContent = "Yükleniyor...";

  try {
    await fileRef.put(file);
    status.textContent = "✅ Yükleme tamamlandı!";
  } catch (error) {
    console.error(error);
    status.textContent = "❌ Yükleme başarısız.";
  }
});
