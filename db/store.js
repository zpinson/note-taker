const util = require('util');


const uuidv1 = require('uuid')

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
        return readFileAsync('db/db.json', 'utf8')
    }

    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    //create a function to get note

    //create a function to add note

    //create a function to remove note by id



}

module.exports = new Store();