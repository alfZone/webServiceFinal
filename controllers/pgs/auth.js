const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        })
        if (user) {
            // é usada para comparar uma senha em texto simples (pass1) com uma senha criptografada (pass2) usando o algoritmo de hash bcrypt
            var passwordIsValid = bcrypt.compareSync(password,user.password);
            //var passwordIsValid=password==user.password;
            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name, isAdmin : user.isAdmin });
                res.status(200).json({ name: user.name, token: accessToken });
            }else{
                res.status(401).json({ msg: "Invalid Password!" });
            }
        }
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

//criar um utilizador
exports.signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin
            },
        })
        return this.signin(req, res);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

//ver o token
exports.readToken= async (req, res) =>{
    try{
        //const token = req.headers['x-access-token'];
        const { token } = req.body;
        //res.status(200).json(token);
        authenticateUtil.certifyAccessToken(token)
         .then(decode => {
            res.status(200).json(decode);
            //console.log(decoded); 
            // Aqui pode ler os dados decodificados do token
            // Faça o que quiser com os dados decodificados, como salvá-los em variáveis ou usar em outras operações
          })
          .catch(err => {
            res.status(401).json(err);
            //console.error('Erro ao verificar o token:', err);
          });

        //res.status(200).json(decode);
        //res.send(decoded.email);
    }catch(error){
        res.status(401).json({ msg: error.message })
    }
}



