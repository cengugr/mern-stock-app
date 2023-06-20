import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db';
import props from './config/properties';  
import routes from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db();

var router = express.Router();
routes(router);
app.use('/api', router);


app.listen(props.PORT, (err) => {
    if (err) {
        console.log(`Error while starting server: ${err}`);
        process.exit(-1);
    }
    console.log(`Server is listening on port ${props.PORT}`);
}
);



