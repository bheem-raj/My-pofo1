const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const validator = require('express-validator')
const session = require('express-session')


const index  = require('./routers/index');
const projects  = require('./routers/projects');
const blogs  = require('./routers/blog');
const admin = require('./routers/admin')


const middleware = require('./Middlewares/appmiddleware')

const app = express();

app.set('views'.__dirname + '/views');
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('inc',function(value,options){
    return value+1;
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(session({
    secret:'My Secret',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000000}
}))

app.use(express.static(__dirname+'/static'))
app.use(middleware.logger);
app.use(middleware.authenticated)

function auth(req,res,next) {
    var loggedIn = req.session.isLoggedIn;
    console.log(loggedIn)
    if(loggedIn){
        next();
    }else{
        res.redirect('/login')
    }
}

app.use('/', index)
app.use('/projects', projects)
app.use('/blog',blogs)
app.use('/admin',auth, admin)


// app.get('/',routes.index)


// app.get('/projects', routes.projectlist);
// app.get('/projects/:alias', routes.projectdetail);

// app.get('/project-list', routes.projectlist);


// app.get('/contact', routes.contacts);

// app.get('/blog', routes.blog);


// app.get('/admin/projects', routes.adminProjectList)
// app.get('/admin/projects/:alias',routes.projectdetail)

// app.get('/login', routes.login)
// app.post('/login', routes.dslogin)

// app.get('/signup',routes.signup)
// app.post('/signup',routes.dssignup)

// app.get('/dashboard',routes.dashboard)

app.use(middleware.notFoundError)
app.use(middleware.somethingWrong)

app.listen(3020 , ()=>console.log('server started at port 3020'))
