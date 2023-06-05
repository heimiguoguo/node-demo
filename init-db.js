const model = require('./model.js');
const sync = async () => {
    await model.sync();
    console.log('init db ok.');
    // 不能exit，否则sync还没有完成，process就结束了，但是sync不成功
    // process.exit(0);
}
sync()