// alert("testa o import de  enviar produto na pagina principal");  
import {conectApi} from "./conectApi.js";

const form = document.querySelector("[data-form]"); // pega o formulário com o data-form e armazena na variavel form

async function enviarProduto(evento){ /*recebe como parametro o objeto de evento, que sera passado pelo addEventListener conforme o evento do formulário, como por exemplo o submit */

    evento.preventDefault(); // previne o comportamento padrão do formulário, que seria enviar o formulário para outra pagina ou executar uma ação padrão, como recarregar a página

    const imagem = document.querySelector("[data-img]").value; // pega o valor do input com o data-imagem e armazena na variavel imagem
    const name = document.querySelector("[data-name]").value; // pega o valor do input com o data-name e armazena na variavel name
    const price = document.querySelector("[data-price]").value; // pega o valor do input com o data-price e armazena na variavel price

    const resJson = await conectApi.registrarProdutos(imagem,name,price); // chama a funcao registrarProdutos e armazena o resultado na variavel resJson
    console.log(resJson); // imprime o resultado da funcao registrarProdutos no console
     window.location.href = "index.html"; // redireciona para a pagina index.html
    
}

form.addEventListener("submit", evento => enviarProduto(evento));// adiciona um manipulador de evento ao formulário, que chama a funcao enviarProduto quando o formulário for submetido