const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
const username = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

const config = {
    dialect: 'mysql',
    database, // 使用哪个数据库
    username, // 用户名
    password, // 口令
    host, // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;