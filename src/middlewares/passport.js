import passport from 'passport'
import { Strategy } from 'passport-local'
import { usersDAO } from '../DAOs/DAOs.js';
import { User } from '../models/user.js'
import logger from '../misc/logger.js';

passport.use('register', new Strategy(
    { passReqToCallback: true, usernameField: 'email' }, 
    (req, username, password, done) => {
        usersDAO.getByEmail(username)
        .then(existingUser => {
            if (existingUser) {
                logger.error(`Username is already in use.`)
                return done(null, false)
            } else {
                try {
                    const user = new User(req.body)
                    usersDAO.save(user.getData())
                    .then(() => {
                        return done(null, user)
                    })
                } catch(error) {
                    logger.error(error.message)
                    return done(null, false)
                }
            }
        })
    }
))

passport.use('login', new Strategy( 
    { usernameField: 'email' }, 
    (username, password, done) => {
        usersDAO.getByEmail(username)
            .then(userData => {
                if (!userData){
                    logger.error('User not found')
                    return done(null, false)
                }
                const user = new User(userData)
                if (!user.checkPassword(password)) {
                    logger.error('Invalid password')
                    return done(null, false)
                }
                done(null, user)
            })
    }
))
    
passport.serializeUser((user, done) => {
    const userSessionInfo = {
        id: user.getId(),
        username: user.getEmail()
    }
    done(null, userSessionInfo)
})

passport.deserializeUser((userSessionInfo, done) => {
    done(null, userSessionInfo)
})
    
export const passportAuthentication = passport.initialize()
export const passportSession = passport.session()