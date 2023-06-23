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
  { usernameField: 'username', passwordField: 'password' },
  (username, password, done) => {
    const password_hash = utils.hash(password + security.salt)
    mariadb.getConnection().then(conn => {
      // Requête pour récupérer l'utilisateur correspondant au nom d'utilisateur fourni
      const query = "SELECT id FROM login_log WHERE login_log.username='" + username + "'AND login_log.password = '" + password_hash + "'";
      conn.query(query, [username, password_hash]).then((rows) => {
        // Vérification des identifiants
        if (rows.length === 0) {
          // L'utilisateur n'a pas été trouvé
          
          return done(null);
        }
        const userid = rows[0].id
        const projectIdsQuery = "SELECT id_projec FROM tj_project_user WHERE id_user"
        console.log(user)

        // L'authentification est réussie, retourne l'utilisateur
        return done(null, user);
      }).catch((err) => {
        return done(err);
      })
      conn.release()
    })
  }
));


passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user)
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user)
  })
})


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
//app.use(express.json)
app.use(express_session);
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // L'authentification a échoué, renvoie une réponse d'erreur
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // L'authentification est réussie, renvoie une réponse réussie
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ success: 'Authenticated' });
    });
  })(req, res, next);
});


app.get('/api/projects/:id', utils.loggedIn, (req, res, next) => {
  const id = req.params.id
  const response = {
    id,
    tilemap,
    tilesets
  }

  mariadb.getConnection().then(conn=>{
    // Requête pour voir si l'id d
    const query = "SELECT id FROM login_log WHERE username='"+username+"'AND password = '"+password_hash+"'";
    conn.query(query, [username,password_hash]).then((x)=>{
        // Vérification des identifiants
        if (rows.length === 0) {
            // L'utilisateur n'a pas été trouvé
            return done(null, false, { message: 'Nom d\'utilisateur incorrect' });
        }

        const user = rows[0];

    // L'authentification est réussie, retourne l'utilisateur
    return done(null, user);
    }).catch((err)=>{
        return done(error);
    })
    conn.release()
})


})


app.post('/api/save/tilemap', utils.loggedIn, (req, res, next) => {
  let tilemap = req.body.tilemap
  let tilesets = req.body.tilesets
  if (tilemap == null || tilesets == null) {
    res.sendStatus(400)
  }
})

app.get('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ success: 'Logged out' });
  });
});


app.use(express.static('../tilemapeditor/dist'))

app.get('*', (req, res) => {
  res.json({ test: req.user})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
