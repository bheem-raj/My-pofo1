module.exports.logger = function(req,res,next){
    console.log(`${req.method} ${req.url}`)
    next();
}
module.exports.notFoundError = function(req,res,next){
    res.render('404',{
        title : 'Page not Found',
        layout : 'layout'

    })
}
module.exports.somethingWrong = function(req,res,next){
    res.render('500',{
        title : 'something went wrong',
        layout : 'layout'

    })
}
module.exports.authenticated = function(req,res,next) {
    req.session.isLoggedIn = req.session.isLoggedIn ? true : false;
    if(req.session.isLoggedIn) {
        res.locals.user = req.session.user;
        next();
    }else {
        next();
    }
    
}
