const button = document.getElementById('editPlantButton');
const plantId = new URLSearchParams(window.location.search).get('id');

button.addEventListener('click', async () => {
  const plantName = document.getElementById("nome").value;
  const plantScientificName = document.getElementById("nome-cientifico").value;
  const plantPicture = document.getElementById("data").value;
  const description = document.getElementById("descricao").value;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/plant/${plantId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plantName: plantName,
                 plantScientificName: plantScientificName,
                plantPicture: plantPicture, 
                description: description }),
        });
        if (response.ok) {
            alert('Planta atualizada com sucesso!');
            window.location.href = '/index.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao atualizar planta: ' + errorData.message);
        }}catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição.');
        }
    });