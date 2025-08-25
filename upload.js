const cloudName = "dlgw466il";  
const uploadPreset = "photo-upload";

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const files = document.getElementById("fileInput").files;
  const status = document.getElementById("status");

  if (!files.length) {
    status.innerText = "Lütfen en az bir fotoğraf seçin.";
    return;
  }

  status.innerText = "Fotoğraflar yükleniyor...";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("Yüklendi:", data.secure_url);

    } catch (err) {
      console.error("Hata:", err);
      status.innerText = "Bir hata oluştu. Tekrar deneyin.";
      return;
    }
  }

  status.innerText = "✅ Fotoğraflar başarıyla yüklendi!";
});
