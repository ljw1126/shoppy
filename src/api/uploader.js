export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    formData.append("timestamp", new Date().getTime());
    formData.append("file", file);

    return await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
        method: "post",
        body: formData
        }).then((response) => response.json())
        .then((data) => data.url);
}
