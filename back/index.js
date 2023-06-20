const express = require('express')
const express_session = require('./config/modules/session')

const passport = require('passport')
const bodyParser = require('body-parser')

const utils = require('./utils/utils')
const security = require('./config/security.json')

const mariadb = require('./config/modules/db')


const app = express()
const port = 3000



  const LocalStrategy = require('passport-local').Strategy


  passport.use(new LocalStrategy(
      {usernameField: 'username', passwordField: 'password'},
      (username, password, done)=>{
          const password_hash = utils.hash(password+security.salt)
         mariadb.getConnection().then(conn=>{
              // Requête pour récupérer l'utilisateur correspondant au nom d'utilisateur fourni
              const query = "SELECT id FROM login_log WHERE username='"+username+"'AND password = '"+password_hash+"'";
              conn.query(query, [username,password_hash]).then((rows)=>{
                  // Vérification des identifiants
                  if (rows.length === 0) {
                      // L'utilisateur n'a pas été trouvé
                      return done(null, false, { message: 'Nom d\'utilisateur incorrect' });
                  }
  
                  const user = rows[0];
  
              // L'authentification est réussie, retourne l'utilisateur
              return done(null, user);
              }).catch((err)=>{
                  return done(err);
              })
              conn.release()
          })
      }
    ));


    passport.serializeUser((user,cb)=>{
      process.nextTick(()=>{
          cb(null,{test:"test"})
      })
  })
  
  passport.deserializeUser((user,cb)=>{
      process.nextTick(()=>{
          return cb(null,user)
      })
  })


  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: false }));
  //app.use(express.json)
  app.use(express_session);
  app.use(passport.initialize());
  app.use(passport.session());



app.post('/api/login', passport.authenticate('local'),(req,rep,next)=>{
  if(req.isAuthenticated){
    rep.status(200).json({test:"test"})
  }else{
    res.status(400).json({test:"pas bon"})
  }
})

app.get('/api/logout',(req,rep,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
  })
  rep.sendStatus(200)
})



app.get('*', (req, res) => {
  res.json({ok: req.isAuthenticated()})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
