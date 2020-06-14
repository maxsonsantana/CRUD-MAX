const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Agenda = mongoose.model('Agenda');

router.get('/', (req, res) => {
    res.render("agenda/addOrEdit", {
        viewTitle: "Inserir Contato"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var agenda = new Agenda();
    agenda.fullName = req.body.fullName;
    agenda.email = req.body.email;
    agenda.mobile = req.body.mobile;
    agenda.city = req.body.city;
    agenda.save((err, doc) => {
        if (!err)
            res.redirect('agenda/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("agenda/addOrEdit", {
                    viewTitle: "Inserir Contato",
                    agenda: req.body
                });
            }
            else
                console.log('Erro ao inserir: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Agenda.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('agenda/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("agenda/addOrEdit", {
                    viewTitle: 'Atualizar Contato',
                    agenda: req.body
                });
            }
            else
                console.log('Erro durante a gravação : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Agenda.find((err, docs) => {
        if (!err) {
            const context = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fullName: doc.fullName,
                        email : doc.email,
                        mobile : doc.mobile,
                        city : doc.city
                    }
                })
            }

            res.render('agenda/list', {
                list: context.list
            })
        }
        else {
            console.log('Erro ao tentar recuperar lista:' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Agenda.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("agenda/addOrEdit", {
                viewTitle: "Atualizar Contato",
                agenda: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Agenda.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/agenda/list');
        }
        else { console.log('Erro ao excluir Contato:' + err); }
    });
});

module.exports = router;