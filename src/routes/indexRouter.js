const express = require("express");
const usuarioController = require("../controllers/usuarioController.js");
const pedidoController = require("../controllers/pedidoController.js");
const doacaoController = require("../controllers/doacaoController.js");
const router = express.Router();


router.route("/").get(usuarioController.all);
router.route("/create").post(usuarioController.create);
router.route("/update/:id").put(usuarioController.update);
router.route("/user/:id").get(usuarioController.one)
router.route("/delete/:id").delete(usuarioController.delete);
router.route("/login").post(usuarioController.login);
router.route("/auth/:id").get(usuarioController.logado);

router.route("/pedidos").get(pedidoController.all);
router.route("/create-pedido").post(pedidoController.create);
router.route("/pedido/update/:id").put(pedidoController.update);
router.route("/pedido/:id").get(pedidoController.one);
router.route("/delete/pedido/:id").delete(pedidoController.delete);

router.route("/doacoes").get(doacaoController.all);
router.route("/create-doacao").post(doacaoController.create);
router.route("/doacao/update/:id").put(doacaoController.update);
router.route("/doacao/:id").get(doacaoController.one);
router.route("/doacao/delete/:id").delete(doacaoController.delete);


module.exports = router;