async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.innerText = "Lütfen en az 1 fotoğraf seçin.";
    return;
  }

  status.innerText = "Yükleniyor...";

  for (let file of fileInput.files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "photo-upload"); // Buraya kendi Cloudinary preset'ini yaz
    formData.append("cloud_name", "dlgw466il"); // Buraya kendi Cloudinary hesabını yaz

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dlgw466il/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log("Yükleme başarılı:", data.secure_url);
      status.innerText = "Fotoğraf(lar) başarıyla yüklendi 🎉";
    } catch (error) {
      console.error("Hata:", error);
      status.innerText = "Yükleme sırasında bir hata oluştu!";
    }
  }
}
