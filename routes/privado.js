const middleware = require('../middleware/auth.js');
const privadoRouter = require('express').Router();
const path = require('path');

// __dirname representa o diretório atual do arquivo
const diretorioAtual = __dirname;

// Navegar para cima um diretório
const diretorioPai = path.join(__dirname, '..');

// Define uma rota para a página HTML
privadoRouter.get('/', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile(diretorioPai+'/templates/backOffice/index.html');
});

// Define uma rota para a página HTML
privadoRouter.get('/gerirCarros', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(diretorioPai+'/templates/backOffice/tabelaCarros.html');
    //res.render(diretorioPai+'/templates/backOffice/tabelaCarros.html')
  });


module.exports = privadoRouter;