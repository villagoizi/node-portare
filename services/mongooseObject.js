const multipleMongooseToObj = (arrayOfMongooseDoc)=>{
    const docArray = [];
    if(arrayOfMongooseDoc.lenght !== 0) {
        arrayOfMongooseDoc.forEach( doc => docArray.push(doc.toObject()));
    }
    return docArray;
}

const mongooseToObj = (doc) => {
    if(doc == null) return null;
    return doc.toObject();
}

module.exports = {
    multipleMongooseToObj,
    mongooseToObj
};