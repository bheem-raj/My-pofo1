module.exports.logger = function(res,req,next){
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
