const carrosRouter = require('express').Router();
const controller = require('../../controllers/pgs/carros');

//testa a ligação à BD
carrosRouter.get('/testeConn', controller.testConnection); 

//CRUD para carros
carrosRouter.get('/', controller.getAll); //le todos
carrosRouter.get('/:id', controller.getById); //le um carro indicado pelo id
carrosRouter.post('/create', controller.create); //criar um carro
carrosRouter.put('/update', controller.update); //atualizar um carro
carrosRouter.delete('/delete/:id', controller.delete); //apagar um carro


module.exports = carrosRouter;
