const express = require('express');
const router = express.Router();
const employeemodel = require('../models/employeemodel');


router.get('/', async (req, res) => {
    const nav = [
        { name: 'Home', link: '/' },
        { name: 'Add Employee', link: '/api/add' }
    ];

    const employees = await employeemodel.find(); // or your employee data

    res.render('home', { nav, employees });
});



router.get('/add', (req, res) => {
    res.render('addemployee');
});


router.post('/add', async (req, res) => {
    const { name, designation, location, salary } = req.body;
    await employeemodel.create({ name, designation, location, salary });
    res.redirect('/api');
});

router.get('/edit/:id', async (req, res) => {
    const employee = await employeemodel.findById(req.params.id);
    res.render('edit', { employee });
});


router.put('/edit/:id', async (req, res) => {
    const { name, designation, location, salary } = req.body;
    await employeemodel.findByIdAndUpdate(req.params.id, { name, designation, location, salary });
    res.redirect('/api');
});


router.delete('/delete/:id', async (req, res) => {
    await employeemodel.findByIdAndDelete(req.params.id);
    res.redirect('/api');
});

module.exports = router;
