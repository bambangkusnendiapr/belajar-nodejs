const fs = require('fs');
const http = require('http')

http
    .createServer((req, res) => {
        
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        const url = req.url;
        if(url === '/about') {
            res.write('<h1>About</h1>');
            res.end();
        } else if (url === '/contact') {
            res.write('<h1>Contact</h1>');
            res.end(); 
        } else {
            // res.write('Hello');
            fs. readFile('./index.html', (err, data) => {
                if(err) {
                    res.writeHead(404);
                    res.write('Error: file not found');
                } else {
                    res.write(data);
                }

                res.end();
            } );
        }

    })
    .listen(3000, () => {
        console.log('Server is listening on port 3000...');
    })