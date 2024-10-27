const animalRadios = document.getElementsByName('animal');
const animalImage = document.getElementById('animalImage');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');

// Animal selection remains the same
animalRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const animal = e.target.value;
        animalImage.src = `images/${animal}.png`;
        animalImage.style.display = 'block';
    });
});

// Updated File upload with server interaction
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            // Create FormData object to send file
            const formData = new FormData();
            formData.append('file', file);

            // Show loading state
            fileInfo.innerHTML = '<p>Uploading file...</p>';

            // Send file to server
            const response = await fetch('http://localhost:8080/upload/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            // Parse and display server response
            const data = await response.json();
            fileInfo.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Size:</strong> ${data.size}</p>
                <p><strong>Type:</strong> ${data.type}</p>
            `;
        } catch (error) {
            console.error('Upload error:', error);
            fileInfo.innerHTML = `<p style="color: red;">Error uploading file: ${error.message}</p>`;
        }
    } else {
        fileInfo.innerHTML = '';
    }
});