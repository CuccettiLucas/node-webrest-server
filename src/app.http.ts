import http from 'http';
import fs from 'fs';

const server = http.createServer((req,resp)=>{
    console.log(req.url);

    // const data = {name:'Jorge', age:30, city:'New York'};
    // resp.writeHead(200,{'Content-Type':'application/json'});
    // resp.end(JSON.stringify(data));

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200,{'Content-Type':'text/html'});
        resp.end(htmlFile);
    }
    if(req.url?.endsWith('.css')) {
        resp.writeHead(200,{'Content-Type':'text/css'});
        resp.end();
    }else if(req.url?.endsWith('.js')) {
        resp.writeHead(200,{'Content-Type':'application/javascript'});
        resp.end();
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    resp.end(responseContent);
    
    // if() {
    //     resp.writeHead(404,{'Content-Type':'text/html'});
    //     resp.end();
    // }

});

server.listen(8000, () =>{
    console.log('Server runing on port 8000');
})