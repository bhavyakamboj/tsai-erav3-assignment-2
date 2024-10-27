const animalRadios = document.getElementsByName('animal');
const animalImage = document.getElementById('animalImage');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');

// Animal selection
animalRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const animal = e.target.value;
        animalImage.src = `images/${animal}.png`;
        animalImage.style.display = 'block';
    });
});

// File upload
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const name = file.name;
        const size = (file.size / 1024).toFixed(2) + ' KB';
        const type = file.type || 'Unknown';
        fileInfo.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Size:</strong> ${size}</p>
            <p><strong>Type:</strong> ${type}</p>
        `;
    } else {
        fileInfo.innerHTML = '';
    }
});