let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/',(req, res,next) => {
    let projects = data.myProjects
    res.render('projects', {


        layout: 'layout',
        title: 'projects',
        navProject: true,
        projects: projects
    })
})

router.get('/:alias',(req,res,next)=>
{
        let alias = req.params.alias;
        let index = data.projectIndex[alias];
        let project = data.myProjects[index];
    
        res.render('project-detail', {
            title: 'Project-detail',
            layout: 'layout',
            project: project
    
        })
    }
)

module.exports = router;
