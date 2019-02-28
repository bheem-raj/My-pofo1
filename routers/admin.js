let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
let Client = require('mongodb').MongoClient;


let dbUrl = 'mongodb://localhost:27017';


let db;

Client.connect(dbUrl, { useNewUrlParser: true }, function (error, client) {
    if (error) {
        console.log(error)
    } else {
        console.log('Successfully Connected to DB');
        db = client.db('mean')
    }
})

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard',{
        title:'DashBoard',
        layout:'examples'
    })
})
router.get('/projects', (req, res) => {

    // console.log(req.get('Cookie'));

    // var isLoggedIn  = req.get('Cookie').trim().split('=')[1]

    // console.log(isLoggedIn)


    // if(isLoggedIn == true) {
        // console.log('Inside loggedin')
        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'examples',
            projects: data.myProjects
        })
    // }else {
    //     console.log('else')
    //     res.redirect('/login')
    // }
    
})

// router.get('/projects',(req,res)=> {
//     console.log(req.get('Cookie'));

//     var isLoggedIn  = req.get('Cookie').trim().split('=')[1]

//     console.log(isLoggedIn)


//     if(isLoggedIn == true) {
//         console.log('Inside loggedin')
//         res.render('admin/project-list', {
//             title: 'Project List',
//             layout: 'layout-admin',
//             projects: data.myProjects
//         })
//     }else {
//         console.log('else')
//         res.redirect('/login')
//     }
    
// })
router.get('/projects/create', (req, res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "examples"

    })

})
router.post('/projects/create', (req, res) => {
    let data = req.body;
    console.log(data)
    let projectCollection = db.collection('projects');
    projectCollection.insertOne(data, function (err, project) {
        if (err) {
            console.log(err)
            next(err)
        } else {
            console.log(project.toJSON())
            res.redirect('/admin/projects')
        }
    })
})


router.get('/projects/:alias',(req,res)=> {
    let alias = req.params.alias;

    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('admin/project-detail',{
        title:'Project List',
        layout:'examples',
        project: project
    })
}) 

module.exports =  router;