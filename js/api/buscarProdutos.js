console.log("olamundo de novo");
import {conectApi} from "./conectApi.js";
import {deleteProd} from "./deleteProduto.js";

  const divProdutos = document.querySelector("[data-product]");
  
 

/** função que ira construir os cards para exibição dos produtos     */
 export default function card_prod(imgProd,name,price,id){
    const CriarCard = document.createElement("div");
    

     CriarCard.className = "item__card"; /**adicionamos a class item__card pra estilizar o container dos nossos  */

     /** abaixo criamos a estrutura do card que irá conter as informações do produto */
    CriarCard.innerHTML = ` <img  class="item__card__img" src="${imgProd}" alt="imagem do produto">
                        <div class="item__card__info">
                            <p class="product__name">${name}</p>
                              <div class="item__card__price">
                                <p class="product__price">$${price}</p>
                                <button class="btn__lixeira " data-id=${id}  >
                                <img width="25px" src="./img/lixeira-de-reciclagem.png" alt="icone de lixeira">
                                </button>
                                
                            </div>
                        </div> `


         

                
    return CriarCard;

}

/** função que ira chamar a função listarProdutos, que por sua vez é uma função que faz uma requisição http, e retorna os produtos 
 * e os armazena na variavel listProdutos*/
async function buscarProdutos(){
    const erroAoCarregar = document.querySelector(".product__title");
    try{ // try e catch para tratamento de erros
        const listProdutos = await conectApi.listarProdutos(); // armazenamos os produtos na variavel listaProdutos
        console.log(listProdutos); // aqui temo o teste dos produtos da resposta da requisição http

        // aqui iremos percorrer o array listProdutos que é onde nos armazenamos o resultado da requisição http
        // com as informações de cada produto, a cada produto que percorrermos: pegaremos suas propriedades
        // e passaremos como argumento para a função card_prod(), que irá construir os cards de cada produto com as informações 
        // que recebemos da requisição http
        listProdutos.forEach(element => { 
            divProdutos.appendChild(card_prod(element.imagem,element.name,element.price,element.id));
             
        });


        
        const btn = document.querySelectorAll(".btn__lixeira"); // seleciono o elemento botão pela class btn__lixeira
       
        btn.forEach(btn => {// percorremos o array btn para que cada botão tenha um atributo data-id
            const id = btn.getAttribute("data-id"); // pego o atributo data-id e armazeno na variavel id
            console.log("ID do produto:" + id);
            deleteProd.deletarProdutos(btn,id); /** quando eu clicar no botão da lixeira o id atribuido ao data-id irá ser passado para a funcao deletarProdutos  */
               
        })
       
         
    }catch(error){// se não for encontrado nenhum produto, ou seja, se a requisição http falhar, iremos exibir uma mensagem de erro
        console.log(error,'verifique a função que cria os cards');
        erroAoCarregar.innerHTML = `<h2 class="mensagem__titulo">Não foi possivel carregar  a lista de videos </h2>`


    } 
}
 buscarProdutos();  // chamamos a função buscarProdutos para que ela seja executada ao carregar a pagina e assim teremos a listagem dos produtos na tela    