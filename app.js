const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var jwt = require('express-jwt');

const mongoose = require('./config/mongoose');
const { jwt_key, port } = require('./config/vars');
const { routes } = require('./config/routes');

const versionOneRouter = require('./routes/v1.route');

const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is Ecommerce Api',
            title: 'Ecommerce',
            version: '1.0.0',
        },
        host: `localhost:${port}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    apis: ['./routes/v1/*.js'] //Path to the API handle folder
};

const swaggerDocs=swaggerJSDoc(options);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
// open mongoose connection
mongoose.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public})); // Auth
//Routes

app.use('/v1', versionOneRouter);


app.get('/', (req, res) =>
  res.send(`Node and express server running on port ${port}`)
);
app.listen(port,()=>{
  console.log(`Your server is running on port ${port}`)
})