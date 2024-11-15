// alert("testa o import de  deletar produto na pagina principal");
import { conectApi } from "./conectApi.js";




async function deletarProdutos(btn, id) {

    btn.addEventListener("click", async (event) => {
        event.preventDefault(); // Previne qualquer comportamento padrão (como submeter formulário ou recarregar página)
        event.stopPropagation(); // Impede que o evento se propague para outros elementos

        console.log("produto deletado " + id);
        try {
            await conectApi.deletarProdutos(id);

            const card = btn.closest('.item__card'); // Encontra o card do produto
            if (card) {
                card.remove(); // Remove o card do produto
            }
            console.log("Produto deletado com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar produto", error);
        }

    })
}

export const deleteProd = { deletarProdutos };

