const { createServer } = require('http');

let cartlist = '';
let productlist = '';

let products = [`apple`, `orange`, `banana`];
let cart = [];

function displayCart(list) {
    for (let i = 0; i < cart.length; i++) {
        list = list + `
        <li>
            ${cart[i]}
            <form action="/remove" method="POST">
                <button type="submit" name="product" value="${cart[i]}">Remove</button>
            </form>
        </li>\n`;
    }
    return list;
}

function displayProducts(list) {
    for (let i = 0; i < products.length; i++) {
        list = list + `
        <li>
            ${products[i]}
            <form action="/add" method="POST">
                <button type="submit" name="product" value="${products[i]}">Add To Cart</button>
            </form>
        </li>\n`;
    }
    return list;
}

const server = createServer((req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <h1>My Store</h1>
            <h2>Products</h2>
            <ul>${displayProducts(productlist)}</ul>
            <h2>Cart</h2>
            <ul>${displayCart(cartlist)}</ul>
        `);
        return res.end();
    }

    if(req.url === '/add' && req.method === 'POST') {
        
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            body = body + chunk;
        });
        req.on('end', () => {
            message = body.split('=')[1];
            cart.push(message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (req.url === '/remove' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            body = body + chunk;
        });
        req.on('end', () => {
            message = body.split('=')[1];
            let del = products.indexOf(message);
            cart.splice(del, 1);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);

/* Cart System Raw
const { createServer } = require('http');

let cartlist = '';
let productlist = '';

let products = [`apple`, `orange`, `banana`];
let cart = [];

function displayCart(list) {
    for (let i = 0; i < cart.length; i++) {
        list = list + `
        <li>
            ${cart[i]}
            <form action="/remove" method="POST">
                <button type="submit" name="product" value="${cart[i]}">Remove</button>
            </form>
        </li>\n`;
    }
    return list;
}

function displayProducts(list) {
    for (let i = 0; i < products.length; i++) {
        list = list + `
        <li>
            ${products[i]}
            <form action="/add" method="POST">
                <button type="submit" name="product" value="${products[i]}">Add To Cart</button>
            </form>
        </li>\n`;
    }
    return list;
}

const server = createServer((req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <h1>My Store</h1>
            <h2>Products</h2>
            <ul>${displayProducts(productlist)}</ul>
            <h2>Cart</h2>
            <ul>${displayCart(cartlist)}</ul>
        `);
        return res.end();
    }

    if(req.url === '/add' && req.method === 'POST') {
        
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            cart.push(message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (req.url === '/remove' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Rem Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Rem Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Rem Message is ", message, "\n");
            let del = products.indexOf(message);
            //console.log("Del is ", del, "\n");
            cart.splice(del, 1);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);

/* Testing Multiple Routes with Array Manipulation
const { createServer } = require('http');

let products = [`apple`, `orange`, `banana`];

const server = createServer((req, res) => {

    if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <form action="/message" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Add</button>
        </form>
        <form action="/remove" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Remove</button>
        </form>
        `);
    return res.end();
    }

    if (req.url === '/message' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            products.push(message);
            console.log(products);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (req.url === '/remove' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Rem Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Rem Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Rem Message is ", message, "\n");
            let del = products.indexOf(message);
            //console.log("Del is ", del, "\n");
            products.splice(del, 1);
            console.log(products);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);

/* Testing Multiple Routes 3
const { createServer } = require('http');

const server = createServer((req, res) => {

    if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <form action="/message" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Send</button>
        </form>
        <form action="/remove" method="POST">
            <button type="submit" name="message" value="remove">Remove</button>
        </form>
        `);
    return res.end();
    }

    if (req.url === '/message' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (req.url === '/remove' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Rem Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Rem Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Rem Message is ", message, "\n");
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);

/*Test Multiple Routes 2
const { createServer } = require('http');

const server = createServer((req, res) => {

    if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <form action="/message" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Send</button>
        </form>
        `);
    return res.end();
    }

    if (req.url === '/message' && req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
        });
        req.on('end', () => {
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            console.log(message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);
*/

/* Testing Multiple Routes */
/*

// Importing http libraries
const { createServer } = require('http');

// Creating a server
const server = createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        // Sending the response
        //res.write('<html>');
        //res.write('<head><title>Enter Message</title><head>');
        res.write(`
            <form action="/message" method="POST">
    <input type="text" name="message"></input>
    <button type="submit">Send</button></form>
    `);
        //res.write('</html>');
        return res.end();
    }

    // Handling different routes for different type request
    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {

            // Storing the chunk data
            body.push(chunk);
            console.log(body)
        });

        req.on('end', () => {

            // Parsing the chunk data
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            // Printing the data
            console.log(message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(8080);
*/

/* Delete from Array */
/*
let products = [`apple`, `orange`, `banana`, `apple`];

//console.log(products);
//console.log(products.indexOf(`apple`));

let del = products.indexOf(`apple`);

products.splice(del, 1);

console.log(products);

del = products.indexOf(`apple`);

products.splice(del, 1);

console.log(products);
*/


/*Add To Cart
const { createServer } = require('http');

let cartlist = '';
let productlist = '';

let products = [`apple`, `orange`, `banana`];
let cart = [];

function displayCart(list) {
    for(let i = 0;i < cart.length;i++) {
        list = list + `<li>${cart[i]}</li>\n`;
    }
    return list;
}

function displayProducts(list) {
    for(let i = 0;i < products.length;i++) {
        list = list + `
        <li>
            ${products[i]}
            <form action="/" method="POST">
                <button type="submit" name="product" value="${products[i]}">Add To Cart</button>
            </form>
        </li>\n`;
    }
    return list;
}

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <h1>My Store</h1>
        <h2>Products</h2>
        <ul>${displayProducts(productlist)}</ul>
        <h2>Cart</h2>
        `);

    if (req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            cart.push(message);
            console.log(cart);
        });

        req.on('end', () => {
            res.end(`
                    <ul>${displayCart(cartlist)}</ul>
                `);
        });
    }
});

server.listen(8080);
*/

// HTML FORM Inputs
/*
const { createServer } = require('http'); 

let cart = [];
 
const server = createServer((req, res) => {
 
  res.setHeader('Content-Type', 'text/html'); 
  res.end(`
    <form action="/" method="POST">
        <button type="submit" name="addtocart" value="apple">Add To Cart</button>
    </form>
    `); 

    if (req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            cart.push(message);
            console.log(cart);
        });
    }
});
server.listen(8080);
*/

/*
const { createServer } = require('http');

let cartlist = '';
let productlist = '';

let products = [`apple`, `orange`, `banana`];
let cart = [];

function displayCart(list) {
    for(let i = 0;i < cart.length;i++) {
        list = list + `<li>${cart[i]}</li>\n`;
    }
    return list;
}

function displayProducts(list) {
    for(let i = 0;i < products.length;i++) {
        list = list + `<li>${products[i]}</li>\n`;
    }
    return list;
}

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <h1>My Store</h1>
        <h2>Products</h2>
        <ul>${displayProducts(productlist)}</ul>
        <form action="/" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Send</button>
        </form>
        <h2>Cart</h2>
        `);

    if (req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            cart.push(message);
            console.log(cart);
        });

        req.on('end', () => {
            res.end(`
                <ul>${displayCart(cartlist)}</ul>
                `);
        });
    }
});

server.listen(8080);
*/

/*
//Display items from an array
let list = '';

let cart = [`apple`, `orange`, `banana`, `apple`, `banana`];

function displayCart() {
    for(let i = 0;i < cart.length;i++) {
        list = list + `<li>${cart[i]}</li>\n`;
        //console.log(`<li>${cart[i]}</li>`);
    }
}


displayCart();
console.log(list);
*/

/* Add items to cart in array
const { createServer } = require('http');

let cart = [];

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <form action="/" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Send</button>
        </form>
        `);

    if (req.method === 'POST') {
        let body = '';
        let message = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
            message = body.split('=')[1];
            console.log("Message is ", message, "\n");
            cart.push(message);
            console.log(cart);
        });
    }
});

server.listen(8080);
*/

/* NO routing
const { createServer } = require('http');

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <form action="/" method="POST">
            <input type="text" name="message"></input>
            <button type="submit">Send</button>
        </form>
        `);

    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            console.log("Chunk is ", chunk, "\n");
            body = body + chunk;
            console.log("Body is ", body, "\n");
        });
   
        req.on('end', () => {
            res.end(`<h1>Received POST Data: ${body}</h1>`);
        });
    }
});

server.listen(8080);
*/


/*
//Tring to understand how POST requests work in Node.js

const { createServer } = require('http');

const server = createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Received POST Data: ${body}</h1>`);
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Hello World</h1>');
    }
});

server.listen(8080);
*/


/*const http = require('http');

let products = [`apples`, `oranges`, `bananas`];

console.log(products);

let cart = [];

function addToCart(product) {
    cart.push(product);
    console.log("Added ", product, " to cart");
}

addToCart("pines");

console.log(cart); 

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <h1>My Store</h1>
        <h2>Products</h2>
        <ul>
            <li>${products[0]}</li>
            <li>${products[1]}</li>
            <li>${products[2]}</li>
        </ul>
        <hr>
        <h2>Cart</h2>
        <ul>
            <li>${products[0]}</li>
        </ul>
        `);
});

server.listen(8080);*/

/*
// Start
const { createServer } = require('http'); 
 
const server = createServer((req, res) => {
 
  res.setHeader('Content-Type', 'text/html'); 
  res.end('<h1>Hello World</h1>'); 
});
server.listen(8080);
*/