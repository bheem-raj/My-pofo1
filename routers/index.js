let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        layout: 'layout',
        title: 'Album Page',
        navHome: true,
    })
})
router.get('/projects', (req, res, next) => {
    let projects = data.myProjects
    res.render('projects', {
        layout: 'layout',
        title: 'projects',
        navProject: true,
        projects: projects
    })
})
router.get('/about', (req, res, next) => {
    res.render('contact', {
        layout: 'layout',
        title: 'Contact Us',
        navcontacts: true
    })
})
router.get('/blog', (req, res, next) => {
    // let projects = data.myProjects;
    let random = Math.floor(Math.random() * data.myBlog.isLength)
    // let projects = data.myBlog

    res.render('blog', {
        layout: 'layout',
        title: 'blog',
        navblog: true,
        // blogs: data.myBlog
        blogs: data.myBlog,
        blogCategories: data.blogCategories,
        featuredBlog: data.myBlog[random]

    })
})
router.get('/contact', (req, res, next) => {
    res.render('contact', {
        layout: 'layout',
        title: 'Contact Us',
        navcontacts: true

    })
})
router.get('/login', (req, res) => {
    res.render('loginpage', {
        title: 'Login',
        layout: 'layout-signin',
        extraCss: '<link rel="stylesheet" href="/css/signin.css">'
    })
});

let users = [
    {
        name: 'Bheemaraj',
        email: "test@test.com",
        password: 'test'
    },
    {
        name: 'JS',
        email: "js@js.com",
        password: 'javascript'
    }
]

router.post('/login', (req, res) => {
    req.checkBody('email', 'Email is required').isEmail().withMessage('Invalid Email');

    req.checkBody('password', 'Password is required').notEmpty().withMessage('Password is required').isLength({ min: 3 }).withMessage('Length should be min 5')

    var errors = req.validationErrors();

    if (errors) {
        let msgs = errors.map(ele => ele.msg);
        res.render('login', {
            title: 'Login',
            layout: 'layout-signin',
            extraCss: '<link rel="stylesheet" href="/css/signin.css">',
            messages: msgs
        });
    } else {
        let data = req.body;
        let foundUser = users.filter(user => data.email == user.email && data.password == user.password)

        if (foundUser.length > 0) {

            req.session.isLoggedIn = true;
            req.session.user = foundUser[0];

            res.redirect('/admin/dashboard')
            // res.setHeader('Set-Cookie', "isLoggedIn= true;Max-Age=10; HttpOnly")
            // res.redirect('/admin/dashboard')

        } else {
            res.render('loginpage', {
                title: 'Login',
                layout: 'layout-signin',
                extraCss: '<link rel="stylesheet" href="/css/signin.css">',
                messages: ['Email or Password Wrong']
            });
        }

    }
})
router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;

    console.log('logout',req.session.isLoggedIn);
    res.redirect('/')
})
// router.get('/login', (req, res, next) => {
//     res.render('loginpage', {
//         title: 'login-page',
//         layout: 'layout-signin',
//         navlogin: true,

//         extraCss: '<link rel="stylesheet" href="/css/signin.css">',
//     })
// })
// const user = {
//     email:"test@test.com",
//     password:'test'
// }
// router.post('/login', (req, res, next) => {
//     // var email = req.body.email;
//     // console.log(email);
//     req.checkBody('email','Email is Required').isEmail().withMessage('Invalid Email');

//     req.checkBody('password','Password is required').notEmpty().withMessage('Password is required').isLength({min:3}).withMessage('Length should be min 5');

//     var errors = req.validationErrors();
//     // console.log(errors);
//     if (errors) {
//         let msgs = errors.map(ele => ele.msg);

//         res.render('loginpage', {
//             title: 'login-page',
//             layout: 'layout-signin',
//             navlogin: true,

//             extraCss: '<link rel="stylesheet" href="/css/signin.css">',
//             messages: ['Email or Password Wrong']
//         })
//     } else {
//         if(data.email == user.email && data.password == user.password){
//             res.setHeader('set-cookie','isLoggedIn=true; Max-Age=10; Httponly')
//             res.redirect('/admin/dashboard')
//         }
//         res.redirect('/admin/dashboard')
//     }
// })
router.get('/signup', (req, res, next) => {
    res.render('signup', {
        title: 'sign-up',
        layout: 'layout-signin',
        navlogin: true,

        extraCss: '<link rel="stylesheet" href="/css/signin.css">',
    })
})
router.post('/signup', (req, res, next) => {
    var data = req.body;
    // console.log(data)
    res.redirect('/login')
})

module.exports = router;

// module.exports.dashboard = function (req, res) {
//     res.render('admin/dashboard', {
//         layout: 'examples',
//         title: 'Dashboard-Template',
//         // extra_css: '<link rel="stylesheet" href="/css/dashboard.css">',
//         // extra_js:'<script src="/js/dashboard.js" ></script>'
//     })
// }
// module.exports.admiprojectdettail = function (req, res) {
//     let alias = req.params.alias;
//     let index = data.projectIndex[alias];
//     let project = data.myProjects[index];


//     res.render('admin/project-detail', {
//         layout: 'examples',
//         title: 'Dashboard-Template',
//         project: project

//         // extra_css: '<link rel="stylesheet" href="/css/dashboard.css">',
//         // extra_js:'<script src="/js/dashboard.js" ></script>'
//     })
// }

// module.exports.projectdetail = function (req, res) {
//     let alias = req.params.alias;
//     let index = data.projectIndex[alias];
//     let project = data.myProjects[index];

//     res.render('project-detail', {
//         title: 'Project-detail',
//         layout: 'layout',
//         project: project

//     })
// }

// module.exports.adminProjectList = (req, res) => {
//     res.render('admin/Project-list', {
//         title: 'Project-list',
//         layout: 'examples',
//         navProjects: true,
//         navblog: true,
//         projects:data.myProjects

//     })
// }

