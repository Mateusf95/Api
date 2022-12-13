const Usuario = require("../models/usuarioModel.js");

require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async all(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    async one(req, res) {
        try {
            const id = req.params.id;
            const user = await Usuario.findOne({ where: { id } });
            if (!user) {
                return res.status(400).json("User not found");
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    },
    async create(req, res) {
        const { name, email, senha } = req.body;
        if (!name) {
            return res.status(400).json("Name is Mandatory");
        }
        if (!email) {
            return res.status(400).json("E-mail is Mandatory");
        }
        if (!senha) {
            return res.status(400).json("Password is Mandatory");
        }
        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json("Please use another email!")
        }
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(senha, salt);
        const user = new Usuario({
            name,
            email,
            senha: password,
        })
        try {
            await user.save();
            res.status(200).json("User inserted!");    
              
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async update(req, res) {
        try {
            const { name, email, senha } = req.body;
            const id = req.params.id;
            const user = await Usuario.findOne({ where: { id } });
            if (!user) {
                return res.status(400).json("User not found!");
            }
            user.name = name;
            user.email = email;
            user.senha = senha;
            await user.save();
            res.status(201).json("User uptated!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await Usuario.destroy({ where: { id } });
            if (!user) {
                return res.status(400).json("User not found!");
            }
            res.status(200).json("User removed!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async login(req, res) {
        const { email, senha } = req.body;
        if (!email) {
            return res.status(400).json("E-mail is Mandatory");
        }
        if (!senha) {
            return res.status(400).json("Password is Mandatory");
        }
        const user = await Usuario.findOne({ email: email });
        if (!user) {
            return res.status(400).json("User not found");
        }
        const checksenha = await bcrypt.compare(senha, user.senha);

        if (!checksenha) {
            return res.status(400).json("Password invalid");
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: user._id,
            },
                secret,
            )
            res.status(200).json("Authentication performed successfully " + token);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async logado(req, res) {
        const id = req.params.id

        const user = await Usuario.findOne({ where:  {id} });
        if (!user) {
            return res.status(400).json("User not found");
        }
        // checkTpken();
        res.status(200).json({
            "id": `${user.id}`,
            "name": `${user.name}`,
            "email": `${user.email}`
        })
    },
};
function checkTpken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json("Access denied");
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        console.log(error);
            res.status(400).send(error);
    }
}