let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/',(req, res,next) => {
    // let projects = data.myProjects;
    let random = Math.floor(Math.random()  * data.myBlog.isLength )
    let nav = data.blogCategories;
    let projects = data.myBlog

    res.render('blog', {
        layout: 'layout',
        title: 'blog',
        navblog: true,
        blog: projects,
         categories: nav,
         featuredBlog:data.myBlog[random],
         blogCss:'<link rel="stylesheet" href="/css/blog.css">'
    })
})

module.exports = router;


