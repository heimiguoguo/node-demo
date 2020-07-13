const { User } = require('../model')

var fn_index = async (ctx, next) => {
    ctx.render('register.html', {
        title: 'Register'
    })
}

var fn_register = async (ctx, next) => {
    const body = ctx.request.body
    console.log(body)
    var email = body.email || ''
    var password = body.password || ''
    var name = body.name || ''
    var gender = body.gender || ''
    var user = await User.create({
        email,
        password,
        name,
        gender
    })
    if(user){
        ctx.render('login.html')
    }
}


module.exports = {
    'GET /page/register': fn_index,
    'POST /register': fn_register
}