let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
const Project = require('../models/projectSchema')

router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'DashBoard',
        layout: 'examples'
    })
})

router.get('/projects', (req, res) => {

    Project.find().then(projectList => {

        console.log(projectList)

        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'examples',
            projects: projectList
        })
    }).catch(err => next(err))
})


router.get('/projects/create', (req, res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "examples"

    })

})

router.post('/projects/create', (req, res) => {
    let data = req.body;

    let alias = data.name.toLowerCase().trim().split(' ').join('-')
    console.log(alias)
    data.alias = alias;

    let newProject = new Project(data);

    newProject.save().then(projectSaved => {
        res.redirect('/admin/projects')
    })
        .catch(err => next(err))
})


router.get('/projects/:alias', (req, res) => {
    let alias = req.params.alias;

    Project.findOne({ alias: alias }).then(data => {
        res.render('admin/project-detail', {
            title: 'Project Detail',
            layout: 'examples',
            project: data
        })
    }).catch(err => next(err))
})

module.exports = router;