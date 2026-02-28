const input_matricula_EL=document.getElementById("Matricula")
const Vagas_Disponiveis_EL=document.getElementById("VagasDisponiveis")
const tabela_garagem=document.getElementById("Tabela")
function Send_Form(event){
    event.preventDefault()  //Evita que a pagina dê refresh
    console.log(input_matricula_EL.value)  //Verificar valor do input na consola
    if(input_matricula_EL.value==""){   //value so existe em inputs
        alert("Insira uma matricula válida!")
    }
    else{
        if(Vagas_Disponiveis_EL.innerText>=1){
            event.preventDefault()
            Vagas_Disponiveis_EL.innerText=Vagas_Disponiveis_EL.innerText-1

            //Criar Button Remover
            const btn_RemoverVeiculo=document.createElement("button")
            btn_RemoverVeiculo.id="btn_RemoverVeiculo"
            btn_RemoverVeiculo.textContent="Remover Veiculo"


            //Tabela
            //Cria as linhas e colunas
            const novaLinha = document.createElement('tr') //tr  linha da tabela
            const td_matricula=document.createElement('td') //td  coluna da tabela
            const td_hora=document.createElement('td')
            const acao=document.createElement ('td')
            acao.appendChild(btn_RemoverVeiculo)

            //Coloca os valores nas colunas
            td_matricula.textContent = input_matricula_EL.value; //Pega o valor do input e coloca na tabela
            td_hora.textContent ="Hora de entrada: " + new Date().toLocaleTimeString(); // Pega a hora atual

            //Adiciona a linha com os valores a tabela
            novaLinha.appendChild(td_matricula); //Adiciona a coluna da matricula à linha
            novaLinha.appendChild(td_hora); //Adiciona a coluna da hora à linha
            novaLinha.appendChild(acao);
            tabela_garagem.appendChild(novaLinha);

            input_matricula_EL.value="";  //Apaga o conteudo do input para uma nova matricula
        }
        else{
            alert("Não há mais Lugares Disponiveis")
        }
    }
}