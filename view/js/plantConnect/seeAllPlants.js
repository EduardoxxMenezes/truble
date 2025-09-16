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

    let currentRow = null; // Variável para manter a referência da fileira atual

    plants.forEach((plant, index) => {
        // A cada 2 cards (índice 0, 2, 4, etc.), cria uma nova fileira
        if (index % 2 === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('row');
            gridContainer.appendChild(currentRow);
        }

        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');

        // ... (o restante do código para criar imgWrapper, buttonsDiv, img, etc. continua o mesmo)
        
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
        
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        photoDiv.appendChild(buttonsDiv);
        
        // Adiciona o card na fileira atual
        if (currentRow) {
            currentRow.appendChild(photoDiv);
        }

        editBtn.addEventListener('click', () => editBtnFunction(plant.id));
        
        deleteBtn.addEventListener('click', () => deleteBtnFunction(plant.id, photoDiv));
    });
}
function editBtnFunction(plantId) {
    window.location.href = `editPlant.html?id=${plantId}`;

}

function deleteBtnFunction(plantId, cardElement) {
    if (confirm("Tem certeza que deseja deletar esta planta?")) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:3000/api/plant/${plantId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Planta deletada com sucesso!');
                cardElement.remove();
            } else {
                alert('Erro ao deletar planta.');
            }
        })
        .catch(error => console.error('Erro:', error));
    }
}