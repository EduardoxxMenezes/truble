document.getElementById("plant-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const nomeCientifico = document.getElementById("nome-cientifico").value;
  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;


});

function abrirLista() {
  window.location.href = "/index.html";
}
