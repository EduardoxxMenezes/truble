const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/plant', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao encontrar plantas");
        }

        const plants = await response.json();
        console.log("Plantas encontradas:", plants);
        displayPlants(plants);

    } catch (error) {
        console.error(error);
        alert("Erro na requisição: " + error.message);
    }
});


function displayPlants(plants) {
    const gridContainer = document.querySelector('.grid');
    gridContainer.innerHTML = ''; 

    if (plants.length === 0) {
        gridContainer.innerHTML = '<p style="color: white;">Nenhuma planta encontrada.</p>';
        return;
    }

    plants.forEach(plant => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');

        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img-wrapper');

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const img = document.createElement('img');
        img.classList.add('img');
      
        img.src = plant.plantPicture || '../img/oldWomen.jpeg';
        img.alt = plant.plantName;

        const editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.textContent = 'Editar';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Deletar';

        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        descDiv.textContent = `${plant.plantName} (${plant.plantScientificName}): ${plant.description}`;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(descDiv);
        photoDiv.appendChild(imgWrapper);
        gridContainer.appendChild(photoDiv);
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        photoDiv.appendChild(buttonsDiv);

        editBtn.addEventListener('click', () => editBtnFunction(plant.id));
        deleteBtn.addEventListener('click', () => deleteBtnFunction(plant.id));
    });
}

function editBtnFunction(plantId) {
    window.location.href = `editPlant.html?id=${plantId}`;
    
}