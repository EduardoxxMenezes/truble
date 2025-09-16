
let plantPictureBase64 = null;



const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const dropZoneText = document.getElementById('dropZoneText');


dropZone.addEventListener('click', () => {
  fileInput.click();
});


fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
});


dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
});


function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Por favor, selecione um arquivo de imagem.');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {

    plantPictureBase64 = reader.result;
    dropZoneText.innerHTML = `<b>Arquivo:</b> ${file.name}`;
  };
  reader.onerror = () => {
    console.error("Erro ao ler o arquivo.");
    alert("Ocorreu um erro ao carregar a imagem.");
  };
  reader.readAsDataURL(file);
}



const form = document.getElementById('plant-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const plantName = document.getElementById("nome").value;
  const plantScientificName = document.getElementById("nome-cientifico").value;
  const description = document.getElementById("descricao").value;

  if (!plantName || !plantScientificName) {
      alert('Por favor, preencha o nome e o nome científico.');
      return;
  }

  if (!plantPictureBase64) {
    alert('Por favor, adicione uma foto da planta.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/plant', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}` // Se precisar de autenticação
      },
      body: JSON.stringify({
        plantName: plantName,
        plantScientificName: plantScientificName,
        description: description,
        plantPicture: plantPictureBase64 
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao adicionar planta");
    }

    alert('Planta cadastrada com sucesso!');
    form.reset(); 
    dropZoneText.innerHTML = '<b>Arraste e solte</b> uma imagem aqui ou <b>clique para selecionar</b>';
    plantPictureBase64 = null;

  } catch (error) {
    console.error("Erro ao adicionar planta:", error);
    alert("Erro ao adicionar planta: " + error.message);
  }
});


function abrirLista() {
  window.location.href = "/index.html";
}