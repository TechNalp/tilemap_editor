const crypto = require('crypto')


function hash(content){
    return crypto.createHash('sha256').update(content).digest('hex');
}

function loggedIn(req,rep,next){
    if(req.user){
        next()
    }else{
        rep.json({error:"Non identifié"}).send(403)
    }
}



module.exports = {
    hash,
    loggedIn
}