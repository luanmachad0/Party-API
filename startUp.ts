import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import Database from './infra/db';
import UsersController from './controllers/usersController';
import Auth from './infra/auth';
import Uploads from './infra/uploads';


class StartUp {
    public app: express.Application;
    private _db: Database;
    private bodyParser;

    constructor() {
        this.app = express();
        this._db = new Database();
        this._db.createConnection();
        this.middler();
        this.routes();
    }

    enableCors(){
        const options: cors.CorsOptions  = {
            methods: "GET,OPTIONS,PUT,POST,DELETe",
            origin: "*"
        }

        this.app.use(cors(options));
    }

    middler(){
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes(){        
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1'});
        });

        this.app.route('/uploads').post(Uploads.single("file"), (req, res) => {
            try{
                res.send("arquivo enviado com sucesso");
            }catch(error){
                console.log(error);
            }
        })
    
        this.app.use(Auth.validate);

        //users
        this.app.route("/api/v1/users").get(UsersController.get);
        this.app.route("/api/v1/users:id").get(UsersController.getById);
        this.app.route("/api/v1/users").post(UsersController.create);
        this.app.route("/api/v1/users:id").put(UsersController.update);
        this.app.route("/api/v1/users:id").delete(UsersController.delete);
    }
}

export default new StartUp();