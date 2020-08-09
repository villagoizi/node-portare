const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, path.join(__dirname, '../public/uploads/profiles/') )
    },
    filename: function (req,file,cb){
        const extname = file.mimetype.split('/')[1];
        const name = file.fieldname + '-' + Date.now();
        const fieldName = `${name}.${extname}` 
        cb(null, fieldName);
    }
})

const upload = multer({
    storage: storage,
    fileFilter(req,file,cb){
        const mimeSupported = [
            'image/jpeg',
            'image/png',
            'image/svg+xml'
        ];
    
        if(mimeSupported.includes(file.mimetype)){
            return cb(null,true);
        }else{
         return cb("Archivo no soportado",false);
        }
    },
    limits: { fileSize: 1000000}
}).single('perfil');

module.exports = {
    upload
}
