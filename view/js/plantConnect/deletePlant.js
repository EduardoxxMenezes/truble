async function deletePlant(id, cardElement) {
  const confirmar = confirm("Tem certeza que deseja deletar esta planta?");
  if (!confirmar) return;

  try {
    const res = await fetch(`http://localhost:3000/api/pets/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar pet");

    cardElement.remove();
    alert("Pet deletado com sucesso!");
  } catch (error) {
    alert("Erro ao deletar pet: " + error.message);
    console.error(error);
  }
}