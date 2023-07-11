const dropzone = document.getElementById('dropzone');
const preview = document.getElementById('preview');

dropzone.addEventListener('dragover', e => {
    e.preventDefault();
});

dropzone.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type.match('image.*')) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = e => {
            preview.src = e.target.result;
        };
    } else {
        alert('Imagen no valida.');
    }
});
