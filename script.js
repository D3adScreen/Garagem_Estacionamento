const input_matricula_EL=document.getElementById("Matricula")
const Vagas_Disponiveis_EL=document.getElementById("VagasDisponiveis")
const tabela_garagem=document.getElementById("Tabela")

let selectedPlace = null;


function Remover_Veiculo(btn_remover){
    
    const linha = btn_remover.closest("tr"); // Encontrar a linha (tr) pai do botão
    const lugarCell = linha.children[1]; // Segunda coluna é o lugar
    const lugarText = lugarCell.textContent; // "Lugar: X"
    const lugarNum = lugarText.replace("Lugar: ", "");
    // Encontrar a vaga correspondente
    const vagas = document.querySelectorAll(".vaga");
    vagas.forEach(vaga => {
        if (vaga.innerText === lugarNum) {
            vaga.classList.remove("ocupada");
            vaga.classList.remove("selecionada"); // Por segurança
        }
    });
    linha.remove(); // Remover a linha
    const vagas_atuais=parseInt(Vagas_Disponiveis_EL.innerText) //Usamos Parseint porque o + serve para concatenar texto
    Vagas_Disponiveis_EL.innerText= vagas_atuais + 1
}

function Registar_Entrada(){
    //Criar Button Remover
    const btn_RemoverVeiculo=document.createElement("button")
    btn_RemoverVeiculo.className="btn_RemoverVeiculo"
    btn_RemoverVeiculo.textContent="Remover Veiculo" //Texto do botão
    btn_RemoverVeiculo.onclick=() => {Remover_Veiculo(btn_RemoverVeiculo)} //Quando o botão for clicado, chama a função Remover_Veiculo passando o próprio botão como argumento

    //Tabela
    //Cria as linhas e colunas
    const novaLinha = document.createElement('tr') //tr  linha da tabela
    const td_matricula=document.createElement('td') //td  coluna da tabela
    const lugar=document.createElement('td')
    const td_hora=document.createElement('td')
    const acao=document.createElement ('td')
    acao.appendChild(btn_RemoverVeiculo)

    //Coloca os valores nas colunas
    td_matricula.textContent = input_matricula_EL.value; //Pega o valor do input e coloca na tabela
    lugar.textContent = "Lugar: " + selectedPlace.innerText; // Pega o valor do lugar selecionado
    td_hora.textContent ="Hora de entrada: " + new Date().toLocaleTimeString(); // Pega a hora atual

    //Adiciona a linha com os valores a tabela
    novaLinha.appendChild(td_matricula); //Adiciona a coluna da matricula à linha
    novaLinha.appendChild(lugar); //Adiciona a coluna do lugar à linha
    novaLinha.appendChild(td_hora); //Adiciona a coluna da hora à linha
    novaLinha.appendChild(acao); 
    tabela_garagem.appendChild(novaLinha); 

    input_matricula_EL.value="";  //Apaga o conteudo do input para uma nova matricula
}

function Send_Form(event){
    event.preventDefault()  //Evita que a pagina dê refresh
    console.log(input_matricula_EL.value)  //Verificar valor do input na consola
    if(input_matricula_EL.value==""){   //value so existe em inputs
        alert("Insira uma matricula válida!")
    }
    else if (!selectedPlace) {
        alert("Selecione um lugar antes de registar!")
    }
    else{
        if(Vagas_Disponiveis_EL.innerText>=1){
            event.preventDefault()
            Vagas_Disponiveis_EL.innerText=Vagas_Disponiveis_EL.innerText-1
            Registar_Entrada()
            selectedPlace.classList.add("ocupada")
            selectedPlace = null; // Reset selection after registering
        }
        else{
            alert("Não há mais Lugares Disponiveis")
        }
    }
    
}


//teste
const vagas = document.querySelectorAll(".vaga")
vagas.forEach(vaga => {vaga.addEventListener("click", escolher_lugar)})
function escolher_lugar(event){
    const vaga = event.target;
    if (vaga.classList.contains("ocupada")) {
        return; // Não pode selecionar vaga ocupada
    }
    if (selectedPlace === vaga) {
        selectedPlace = null;
        vaga.classList.remove("selecionada");
    } else {
        if (selectedPlace) {
            selectedPlace.classList.remove("selecionada");
        }
        selectedPlace = vaga;
        vaga.classList.add("selecionada");
    }
}
