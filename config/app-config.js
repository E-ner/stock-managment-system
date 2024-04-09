require("./dotenv.config")
module.exports={
    app_port:process.env.PORT,
    admin_user:process.env.APP_ADMIN,
    admin_password:process.env.APP_ADMIN_PASSWORD,
    __jwtk:process.env.APP_WEBTOKEN_KEY
}