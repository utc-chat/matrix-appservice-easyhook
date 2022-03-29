exports.index = function (req, res) {
    if(req.user){
        res.redirect('/products/');
    }else{
        res.render('index', {
            title: 'UTC Chat'
        });
    }
};