const {Router} = require('express');
const router = Router();
const {Home} = require('../controllers/homeController');
const {
    crearVacante,
    crearVacanteAction,
    verVacanteUrl,
    editarVacanteUrl,
    editarVacanteUrlAction
} = require('../controllers/vacantesController');

const { 
    crearCuenta,
    validarRegistro,
    crearCuentaAction,
    iniciarSesion,
    iniciarSesionAction 
 } = require('../controllers/usuariosController');

 const { 
     authUsuario,
     panelDeAdmin, 
     verificarUsuario
    } = require('../controllers/authController');

router.get('/', Home);
router.get('/vacantes/nueva',verificarUsuario, crearVacante);
router.post('/vacantes/nueva',verificarUsuario, crearVacanteAction);

router.get('/vacantes/:url', verVacanteUrl);

router.get('/vacantes/editar/:url',verificarUsuario, editarVacanteUrl);
router.post('/vacantes/editar/:url',verificarUsuario, editarVacanteUrlAction);

router.get('/crear-cuenta', crearCuenta);
router.post('/crear-cuenta', validarRegistro, crearCuentaAction);

router.get('/iniciar-sesion', iniciarSesion);
router.post('/iniciar-sesion',authUsuario)//,(req,res) =>{console.log(req.user);res.redirect('/')});

//Panel admin
router.get('/admin',verificarUsuario, panelDeAdmin);
module.exports = router;