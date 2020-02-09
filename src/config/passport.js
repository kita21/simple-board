const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const models = require('../sequelize/models');
const auth = require('./auth');

const localLogin = new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
}, (name, password, done) => {
    models.user.findOne({
        where: {name: name}
    }, (err, user) => {
        if(err){
            return done(err);
        }

        if(! user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        }

        return done(null, user);
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: auth.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    models.user.findById(payload._id, function(err, user){

        if(err){
            return done(err, false);
        }

        if(! user) {
            done(null, false);
        }

        done(null, user);

    });
});

passport.use(jwtLogin);
passport.use(localLogin);
