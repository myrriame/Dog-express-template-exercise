const http = require('http');
const hostname = '127.0.0.1';
const express = require('express');
const port = 3333;
const dogs = require('./dogs');
const es6Renderer = require('express-es6-template-engine');

const app = express();

const server = http.createServer(app);


app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


app.get('/', (req, res) => {

    res.render('home', {

        locals: {
            title: "Check out these Dogs"
        },
        partials: {
            head: "partials/head"
        }

    });

})


app.get('/dogs', (req, res) => {

    res.render('doglist', {

        locals: {
            title: "A list of my favorite dogs",
            dogs: dogs
        },
        partials: {
            head: 'partials/head'
        }
    })
})


app.get('/dogs/:name', (req, res) => {

    var { name } = req.params;

    var dog = dogs.find(doggy => doggy.name === name)

    if (dogs) {


        res.render('dogs', {

            locals: {
                title: "Dog Type",
                dog
            },
            partials: {
                head: 'partials/head',
                image: 'partials/image'
            }
        });
    } else {
        res.status(404)
            .send('no doggy here :(')
    }
})

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

})

