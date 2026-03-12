const input_matricula_EL = document.getElementById("Matricula");
const Vagas_Disponiveis_EL = document.getElementById("VagasDisponiveis");
const tabela_garagem = document.getElementById("Tabela"); //Tabela principal onde ficam os veiculos que estão atualmente na garagem
const Tabela_Historico = document.getElementById("Tabela_Entrada"); //Tabela Historico de Entrada, onde ficam registados os veiculos que entraram, mesmo depois de sairem da garagem
const Tabela_Historico_Saida = document.getElementById("Tabela_Saida"); //Tabela Historico de Saida, onde ficam registados os veiculos que sairam da garagem, mesmo depois de sairem da garagem

let selectedPlace = null;

function Remover_Veiculo(btn_remover) {
  const linha = btn_remover.closest("tr"); // Encontrar a linha (tr) pai do botão
  const lugarCell = linha.children[1]; // Segunda coluna é o lugar
  const lugarNum = lugarCell.textContent;

  // Encontrar a vaga correspondente
  const vagas = document.querySelectorAll(".vaga"); // Seleciona todos os itens da classe vaga
  vagas.forEach((vaga) => {
    if (vaga.innerText === lugarNum) {
      // Encontrou a vaga correspondente
      vaga.classList.remove("ocupada"); // Marca a vaga como desocupada
      vaga.classList.remove("selecionada"); // Por precaução, remove a classe de seleção também
    }
  });

  // Extrair dados para a tabela de saída
  const matricula = linha.children[0].textContent;
  const lugar = linha.children[1].textContent; //
  const entrada = parseInt(linha.getAttribute("data-entrada"));
  const saida = Date.now();
  const horas = Math.ceil((saida - entrada) / (1000 * 60 * 60)); // Tempo em horas, arredondado para cima em milissegundos/segundos/minutos
  console.log("Horas estacionado: " + horas);
  const preco_por_hora = parseFloat(document.getElementById("Tarifa").value); // Pega o valor da tarifa por hora
  const preco = horas * preco_por_hora; // Calcula o preço total

  const horaSaida = new Date().toLocaleTimeString();
  // Criar nova linha para Tabela_Saida
  const novaLinhaSaida = document.createElement("tr"); // Cria uma nova linha para a tabela de saída
  const td_matricula_saida = document.createElement("td"); // Cria a coluna da matrícula para a tabela de saída
  td_matricula_saida.textContent = matricula; // Define o texto da coluna da matrícula com o valor extraído da linha original
  const td_lugar_saida = document.createElement("td"); // Cria a coluna do lugar para a tabela de saída
  td_lugar_saida.textContent = lugar; // Define o texto da coluna do lugar com o valor extraído da linha original
  const td_preco_saida = document.createElement("td"); // Cria a coluna do preço para a tabela de saída
  td_preco_saida.textContent = preco + " €"; // Define o texto da coluna do preço com o valor calculado, adicionando o símbolo de euro
  const td_hora_saida = document.createElement("td"); // Cria a coluna da hora de saída para a tabela de saída
  td_hora_saida.textContent = horaSaida; // Define o texto da coluna da hora de saída com a hora atual formatada como string
  novaLinhaSaida.appendChild(td_matricula_saida); // Adiciona a coluna da matrícula à nova linha da tabela de saída
  novaLinhaSaida.appendChild(td_lugar_saida); // Adiciona a coluna do lugar à nova linha da tabela de saída
  novaLinhaSaida.appendChild(td_preco_saida); // Adiciona a coluna do preço à nova linha da tabela de saída
  novaLinhaSaida.appendChild(td_hora_saida); // Adiciona a coluna da hora de saída à nova linha da tabela de saída
  Tabela_Historico_Saida.appendChild(novaLinhaSaida);

  linha.remove(); // Remover a linha
  const vagas_atuais = parseInt(Vagas_Disponiveis_EL.innerText); //Usamos Parseint porque o + serve para concatenar texto
  Vagas_Disponiveis_EL.innerText = vagas_atuais + 1;

  const dadoSaida = { //Criar um dicionario para armazenar os dados da saída do veículo
    matricula,
    place: lugar,
    data: horaSaida,
    preco,
  };

  const dadosArmazenados = localStorage.getItem("historicoSaida"); //Pega os dados armazenados no localStorage, se existirem, para manter o histórico mesmo após recarregar a página
  let dados = []; //Cria um array vazio para armazenar os dados da saída do veículo, caso não haja dados armazenados anteriormente
  if (dadosArmazenados) { //Se houver dados armazenados, converte o JSON para o array de dados
    dados = JSON.parse(dadosArmazenados);
  }
  dados.push(dadoSaida); //Adiciona o novo dado da saída do veículo ao array de dados
  localStorage.setItem("historicoSaida", JSON.stringify(dados)); //Armazena o array atualizado de dados da saída do veículo no localStorage, convertendo-o para JSON para que possa ser recuperado posteriormente
}

function Registar_Entrada() {
  //Criar Button Remover
  const btn_RemoverVeiculo = document.createElement("button");
  btn_RemoverVeiculo.className = "btn_RemoverVeiculo";
  btn_RemoverVeiculo.textContent = "Remover Veiculo"; //Texto do botão
  btn_RemoverVeiculo.onclick = () => {
    Remover_Veiculo(btn_RemoverVeiculo);
  }; //Quando o botão for clicado, chama a função Remover_Veiculo passando o próprio botão como argumento

  //Tabela
  //Cria as linhas e colunas
  const novaLinha = document.createElement("tr"); //tr  linha da tabela
  const td_matricula = document.createElement("td"); //td  coluna da tabela (Matricula)
  const lugar = document.createElement("td"); //td  coluna da tabela(Lugar)
  const td_hora = document.createElement("td");
  const acao = document.createElement("td");
  acao.appendChild(btn_RemoverVeiculo);

  //Coloca os valores nas colunas
  td_matricula.textContent = input_matricula_EL.value; //Pega o valor do input e coloca na tabela
  lugar.textContent = selectedPlace.innerText; // Pega o valor do lugar selecionado
  td_hora.textContent = new Date().toLocaleTimeString(); // Pega a hora atual
  novaLinha.setAttribute("data-entrada", Date.now()); // Salvar timestamp de entrada

  //Adiciona a linha com os valores a tabela
  novaLinha.appendChild(td_matricula); //Adiciona a coluna da matricula à linha
  novaLinha.appendChild(lugar); //Adiciona a coluna do lugar à linha
  novaLinha.appendChild(td_hora); //Adiciona a coluna da hora à linha
  novaLinha.appendChild(acao);
  tabela_garagem.appendChild(novaLinha);

  //Tabela Historico
  const novaLinhaHistorico = document.createElement("tr");
  const td_matricula_historico = document.createElement("td");
  const lugar_historico = document.createElement("td");
  const td_hora_historico = document.createElement("td");

  const valorMatricula = input_matricula_EL.value;
  const currentSelectedPlace = selectedPlace.innerText;
  const dataEntrade = new Date().toLocaleTimeString();

  //Coloca os valores nas colunas do Historico
  td_matricula_historico.textContent = valorMatricula;
  lugar_historico.textContent = currentSelectedPlace;
  td_hora_historico.textContent = dataEntrade;

  //Adiciona a linha com os valores a tabela do Historico
  novaLinhaHistorico.appendChild(td_matricula_historico); //Adiciona a coluna da matricula à linha
  novaLinhaHistorico.appendChild(lugar_historico); //Adiciona a coluna do lugar à linha
  novaLinhaHistorico.appendChild(td_hora_historico); //Adiciona a coluna da hora à linha
  Tabela_Historico.appendChild(novaLinhaHistorico);

  input_matricula_EL.value = ""; //Apaga o conteudo do input para uma nova matricula
}

function Send_Form(event) {
  event.preventDefault(); //Evita que a pagina dê refresh
  console.log(input_matricula_EL.value); //Verificar valor do input na consola
  if (input_matricula_EL.value == "" || input_matricula_EL.value.length < 8) {
    //value so existe em inputs
    alert("Insira uma matricula válida!");
  } else if (!selectedPlace) {
    alert("Selecione um lugar antes de registar!");
  } else {
    if (Vagas_Disponiveis_EL.innerText >= 1) {
      event.preventDefault();
      Vagas_Disponiveis_EL.innerText = Vagas_Disponiveis_EL.innerText - 1;
      Registar_Entrada(); //Chama a função para registar a entrada do veiculo
      selectedPlace.classList.add("ocupada"); // Marca a vaga como ocupada
      selectedPlace = null; // Reset selection after registering
    } else {
      alert("Não há mais Lugares Disponiveis");
    }
  }
}

const vagas = document.querySelectorAll(".vaga"); // Seleciona todas as vagas para adicionar o evento de clique
vagas.forEach((vaga) => {
  vaga.addEventListener("click", escolher_lugar);
}); // Adiciona o evento de clique a cada vaga, chamando a função escolher_lugar quando clicada
function escolher_lugar(event) {
  const vaga = event.target; // A vaga clicada
  if (vaga.classList.contains("ocupada")) {
    return; // Não pode selecionar vaga ocupada
  }
  if (selectedPlace === vaga) {
    // Deselecionar se clicar novamente
    selectedPlace = null;
    vaga.classList.remove("selecionada"); // Remove a classe de seleção
  } else {
    if (selectedPlace) {
      selectedPlace.classList.remove("selecionada"); // Remove a classe de seleção da vaga anteriormente selecionada
    }
    selectedPlace = vaga; // Atualiza a vaga selecionada
    vaga.classList.add("selecionada"); // Adiciona a classe de seleção à vaga clicada
  }
}

window.addEventListener("DOMContentLoaded", function () {  // Quando a página for carregada, executa esta função para carregar o histórico de saídas do localStorage
  const historicoSaida =
    JSON.parse(localStorage.getItem("historicoSaida")) ?? []; // Pega o histórico de saídas armazenado no localStorage, ou um array vazio se não houver nenhum histórico armazenado

  if (historicoSaida.length > 0) { // Se houver histórico de saídas, percorre o array e adiciona cada entrada à tabela de histórico de saídas
    historicoSaida.forEach((dado) => { // Para cada dado de saída no histórico, cria uma nova linha na tabela de histórico de saídas e preenche as colunas com os dados correspondentes (matrícula, lugar, preço e hora de saída)
      const novaLinhaSaida = document.createElement("tr");
      const td_matricula_saida = document.createElement("td"); 
      td_matricula_saida.textContent = dado.matricula; 
      const td_lugar_saida = document.createElement("td");
      td_lugar_saida.textContent = dado.place; 
      const td_preco_saida = document.createElement("td"); 
      td_preco_saida.textContent = dado.preco + " €"; 
      const td_hora_saida = document.createElement("td"); 
      td_hora_saida.textContent = dado.data; 
      novaLinhaSaida.appendChild(td_matricula_saida); 
      novaLinhaSaida.appendChild(td_lugar_saida);
      novaLinhaSaida.appendChild(td_preco_saida);
      novaLinhaSaida.appendChild(td_hora_saida); 
      Tabela_Historico_Saida.appendChild(novaLinhaSaida);
    });
  }
});