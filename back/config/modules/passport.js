const passport =require('passport')
const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy(
    {usernameField: 'username', passwordField: 'password'},
    (username, password, done)=>{
        const password_hash = utils.hash(passowrd+security.salt)
       mariadb.getConnection().then(conn=>{
            // Requête pour récupérer l'utilisateur correspondant au nom d'utilisateur fourni
            const query = "SELECT id FROM login_log WHERE username='"+username+"'AND password = '"+password_hash+"'";
            conn.query(query, [username,password_hash]).then((x)=>{
                // Vérification des identifiants
                if (rows.length === 0) {
                    // L'utilisateur n'a pas été trouvé
                    return done(null, false, { message: 'Nom d\'utilisateur incorrect' });
                }

                const user = rows[0];
            if (user.password !== password) {
            // Le mot de passe est incorrect
            return done(null, false, { message: 'Mot de passe incorrect' });
            }

            // L'authentification est réussie, retourne l'utilisateur
            return done(null, user);
            }).catch((err)=>{
                return done(error);
            })
            conn.release()
        })
    }
  ));


passport.serializeUser((user,cb)=>{
    process.nextTick(()=>{
        console.log("serialize")
        cb(null,{test:"test"})
    })
})

passport.deserializeUser((user,cb)=>{
    process.nextTick(()=>{
        console.log("deserialize")
        return cb(null,user)
    })
})


module.exports = passport