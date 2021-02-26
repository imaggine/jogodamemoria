const util = Util
const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
    sucesso: {
        texto: 'Parabéns, você acertou. Combinação Correta',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação Incorreta. Tente mais uma vez',
        classe: 'alert-danger'
    }

}

class Tela {
    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 10%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" id="${item.id}" class="card-img-top" alt="...">
            </div>   
            <br />     
        </div>
        `
    } 


    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHTMLPelaImagem(itens){
        //para cada item da lista, vai executar a função obterCodigoHtml
        //ao final, concatena em única string
        //muda de array para string 
        return itens.map(Tela.obterCodigoHtml).join('')
    }




    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso){
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(2000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static iniciarContador(){
        let contarAte = 3
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        const elementoContador = document.getElementById(ID_CONTADOR)

        const atualizarTexto = () => 
            (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))
        
            atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static limparContador (idContador){
        clearInterval(idContador)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static exibirCarregando(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }

    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static async exibirHerois(nomeDoHeroi, img) {
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        //para cada elemento encontrado na tela, vamos alterar a imagem
        //para a imagem inicial dele
        //com o forEach, para cada item, dentro dos (), setamos o valor
        //de imagem
        await util.timeout(500)
        elementosHtml.forEach(item => (item.src = img))


    }

    static async exibirClicado(nomeHeroi, idHeroi, img, imgOriginal) {
        const elementosHtml = document.getElementById(idHeroi)
        console.log(`desvirar ${nomeHeroi} no id ${idHeroi}. Imagem Original é ${imgOriginal}. Default é ${img}`)
        elementosHtml.src = imgOriginal
        await util.timeout(500)
        elementosHtml.src = img

    }

    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick

    }

    static configurarClickVerificarSelecao(funcaoOnclick){
        window.verificarSelecao = funcaoOnclick
    }

    static configurarBotaoMostrarTudo(funcaoOnClick){
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }

}