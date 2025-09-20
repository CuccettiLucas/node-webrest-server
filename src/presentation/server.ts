import express, { Router } from 'express'
import path from 'node:path';

interface Options{
    port: number;
    public_path?:string;
    routes: Router;
}


export class Server{

    private app = express();
    private readonly port:number;
    private readonly publicPath:string;
    private readonly routes:Router;

    constructor(options:Options){
        const {port,public_path = 'public',routes} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        /*Middlewares*/
        this.app.use(express.json()); // -----> raw format
        this.app.use(express.urlencoded({extended:true})); // ----> urlencoded format

        //* Routes
        this.app.use(this.routes);

        /*Public Folder*/
        this.app.use(express.static(this.publicPath));
        
        this.app.use((req, res) => {
            res.sendFile(path.join(process.cwd(), this.publicPath, 'index.html'));
        });

        this.app.listen(this.port, () =>{
            console.log(`Server running on port: ${this.port}`);
        })
        
    }


}