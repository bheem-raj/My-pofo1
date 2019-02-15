let data = require('../my-data.json')
let express = require('express');
let router = express.Router();

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
    
// router.get('/projects/:alias',(req,res)=> {
//     let alias = req.params.alias;

//     let index = data.projectIndex[alias];
//     let project = data.myProjects[index];

//     res.render('admin/project-detail',{
//         title:'Project List',
//         layout:'examples',
//         project: project
//     })
// }) 

module.exports =  router;