
const publicoRouter = require('express').Router();
const path = require('path');

// __dirname representa o diretório atual do arquivo
const diretorioAtual = __dirname;

// Navegar para cima um diretório
const diretorioPai = path.join(__dirname, '..');


// Define uma rota para a página HTML
publicoRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    //res.sendFile('/sites/ap2/webServicePSG/templates/frontEnd/index.html');
    //res.sendFile(__dirname +'/../templates/frontEnd/index.html');
    //__dirname='/sites/ap2/webServiceAuth/'
    res.sendFile(diretorioPai+'/templates/frontEnd/index.html');
  });


module.exports = publicoRouter;