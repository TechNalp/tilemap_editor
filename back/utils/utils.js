const crypto = require('crypto')


function hash(content){
    return crypto.createHash('sha256').update(content).digest('hex');
}



module.exports = {
    hash
}