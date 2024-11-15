// step 1 para uma requisição:
// criar uma função assincrona com async e await
 async function listarProdutos(){ // criamos uma  função assincrona, o async permite o uso do awayt dentro da função, 
  try{ // try e catch para tratamento de erros
    
    // criamos uma variavel onde vamos atribuir como valor o metodo fetch(), 
    //a quem passareemos uma url para quee seeja feita uma requisição http 
    //para o caminho espeeecificado na url, e o resultado sera armazenado na constante conection
    const conection= await fetch("http://localhost:3000/produtos"); 


    const resJson = await conection.json(); // converte a resposta da requisição em um json
    
    console.log(resJson); // conveertido para json
    return resJson;
    
  }catch(error){    
    console.log(error,'Nao foi possivel carregar a lista de produtos, verifique a url da requisição http');
  }

}

async function registrarProdutos(imagem, name, price){
  const conection= await fetch("http://localhost:3000/produtos",{
          method: "POST", // tipo de requisição
          headers: {/**define o tipo de conteúdo dos dados enviados na requisição HTTP, especificando que o corpo da requisição contém dados no formato JSON */
            "Content-Type": "application/json"
          },
      body: JSON.stringify({/**define o corpo da requisição HTTP e os dados que serão enviados */
        imagem: imagem,
        name: name,
        price: price,
      
    })
  });
     if(!conection.ok){/** tratamento de erros */
        throw new Error('Nao foi possivel enviar o produto');
     }

  const resJson = await conection.json(); // converte a resposta da requisição em um json
  return resJson;
}


// deletar produtos
async function deletarProdutos(id){
  const conection= await fetch(`http://localhost:3000/produtos/${id}`,{
          method: "DELETE", // tipo de requisição
          headers: {/**define o tipo de conteúdo dos dados enviados na requisição HTTP, especificando que o corpo da requisição contém dados no formato JSON */
            "Content-Type": "application/json"
          }
          /** aqui poderiamos usar o body para passar o corpo da requisição, porem não seria necessário
           * pois o id foi passado na url
           */
    
  });
     if(!conection.ok){/** tratamento de erros */
        throw new Error('Nao foi possivel deletar o produto');
     }
}
export const conectApi = {listarProdutos,registrarProdutos,deletarProdutos};