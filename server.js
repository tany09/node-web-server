const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `now ${req.method} ${req.url}` + '\n';
    fs.writeFile('server.log', now + log, (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 'Bad request'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        aboutMe: 'Tany'
    })
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my Website'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});