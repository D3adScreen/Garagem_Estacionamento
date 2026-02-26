const input_matricula_EL=document.getElementById("Matricula")
const Vagas_Disponieis_EL=document.getElementById("VagasDisponiveis")
const btn_RegistarEntrada=document.getElementById("btn")

function Send_Form(event){
    event.preventDefault()  //Evita que a pagina dê refresh
    console.log(input_matricula_EL.value)  //Verificar valor do input na consola
    if(input_matricula_EL.value==""){   //value so existe em inputs
        alert("Insira uma matricula válida!")
    }
    else{
        if(Vagas_Disponieis_EL.innerText>=1){
            var valor_atual=Vagas_Disponieis_EL.innerText
            valor_atual=valor_atual -1
            Vagas_Disponieis_EL.innerText=valor_atual
        }
        else{
            alert("Não há mais Lugares Disponiveis")
        }
    }
}

