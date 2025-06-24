export const uploadImageToCloudinary = async (imageUri, nombre = 'foto.jpg') => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: nombre, // 👈 ahora es dinámico
    });
    formData.append('upload_preset', 'adoptapUpload');

    const res = await fetch('https://api.cloudinary.com/v1_1/dipufstkk/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!data.secure_url) throw new Error("No se pudo subir la imagen");

    return data.secure_url;
  } catch (err) {
    console.error("Error subiendo a Cloudinary:", err);
    return null;
  }
};
