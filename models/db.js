const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
require('./agenda.model');

//Valida conexão com MongoDB
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conexão com MongoDB estabelecida com sucesso!!");
})
