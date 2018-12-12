import mongoose from 'mongoose';
import util from 'util';
import expressGraphQL from 'express-graphql';
import schema from './schema/schema';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';

// config should be imported before importing any other file
import config from '../config/config';
import app from '../config/express';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

mongoose.connect(config.MONGO_HOST, { keepAlive: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
    .on('error', error => console.log('Error connecting to MongoLab:', error));

if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}
const MongoStore = (connectMongo)(session);
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    store: new MongoStore({
        url: config.MONGO_HOST,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

export default app;