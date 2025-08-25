// Cloudinary bilgilerin
const cloudName = "dlgw466il";
const uploadPreset = "photo-upload"; // Cloudinary'de unsigned preset

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.innerText = "Lütfen en az 1 fotoğraf seçin.";
    return;
  }

  status.innerText = "Yükleniyor...";

  // Seçilen tüm dosyaları sırasıyla yükle
  for (const file of fileInput.files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "uploads"); // -> uploads/ klasörüne atar (istersen 'kina' yap)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        status.innerText = `Hata: ${data.error.message}`;
        return;
      }
      console.log("Yüklendi:", data.secure_url);
    } catch (err) {
      console.error("İstek hatası:", err);
      status.innerText = "Yükleme sırasında bir ağ hatası oluştu.";
      return;
    }
  }

  status.innerText = "✅ Fotoğraf(lar) başarıyla yüklendi!";
}
