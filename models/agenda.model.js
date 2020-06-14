const mongoose = require ('mongoose');

var agendaSchema = new mongoose.Schema({
    fullName: { type: String, required: 'Campo Obrigatório!'} ,
    email: { type: String },
    mobile: { type: String },
    city: { type: String }    
});

agendaSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Email inválido.');

mongoose.model('Agenda', agendaSchema);