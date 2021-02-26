class JogoDaMemoria {


    constructor({tela, util}){
        this.tela = tela
        this.util = util

        this.iconePadrao = './arquivos/padrao.png'
        this.heroisIniciais = [
            {img: './arquivos/batman.png', nome: 'batman'},
            {img: './arquivos/flash.png', nome: 'flash'},
            {img: './arquivos/groot.png', nome: 'groot'},
            {img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha'},
            {img: './arquivos/wolverine.png', nome: 'wolverine'},
            {img: './arquivos/ironman.png', nome: 'ironman'},
            {img: './arquivos/thanos.png', nome: 'thanos'},
            {img: './arquivos/spiderman.png', nome: 'spiderman'},
            {img: './arquivos/smurfete.png', nome: 'smurfete'},
            {img: './arquivos/papaismurf.png', nome: 'papaismurf'},
            {img: './arquivos/zangado.png', nome: 'zangado'},
            {img: './arquivos/genio.png', nome: 'genio'}
        ]
        this.heroisEscondidos = []
        this.heroisSelecionados = [] 
    }

    inicializar(){
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClickVerificarSelecao(this.verificarSelecao.bind(this)) 
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
 
     }

     esconderHerois(herois){
        const heroisOcultos =  herois.map(({nome, id, img}) => ({
            id,
            nome,
            imgOriginal: img,
            img: this.iconePadrao
        }))

        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos 

    }


    exibirHerois(nomeHeroi){
        const {img} = this.heroisIniciais.find(({nome}) => nomeHeroi === nome)
        this.tela.exibirHerois(nomeHeroi, img)
    }

    exibirClicado(nomeHeroi, idHeroi){
        console.log(this.heroisEscondidos)
        const {imgOriginal} = this.heroisEscondidos.find(({nome}) => nomeHeroi === nome)
        const {img} = this.heroisEscondidos.find(({nome}) => nomeHeroi === nome)
        const {id} = this.heroisEscondidos.findIndex(({id}) => idHeroi === id)
         this.tela.exibirClicado(nomeHeroi, idHeroi, img, imgOriginal)
    }


    verificarSelecao(id, nome) {
        const item = {id, nome}
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados){
            case 0:
                this.exibirClicado(item.nome, item.id)
                this.heroisSelecionados.push(item)
                break
            case 1:
                const [opcao1] = this.heroisSelecionados
                this.heroisSelecionados = []
                let deveMostrarMensagem = false
                if(opcao1.nome === item.nome &&
                    opcao1.id !== item.id){
                        deveMostrarMensagem = true
                        this.exibirHerois(item.nome)
                        this.tela.exibirMensagem(true)
                        return
                    } else {
                        this.exibirClicado(item.nome, item.id)
                    }
                this.tela.exibirMensagem(false)
                break;
        }
    }


    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos

        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    async embaralhar(){

        const copias = this.heroisIniciais
        //duplicar
        .concat(this.heroisIniciais)
        .map(item => {
            return Object.assign({}, item, {id: Math.random() / 0.50})
        })
        .sort(() =>Math.random()-0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()
        const idDoIntervalo = this.tela.iniciarContador()
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        

    }

    jogar(){

        this.embaralhar()
    }
}