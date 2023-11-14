const fs = require('fs');

class Todo {
  constructor(id, task, status){
    this.id = id;
    this.task = task;
    this.status = status || false; // by default statusnya false
  }
  
  static getTodos(){ // untuk read dari JSON
    let data = fs.readFileSync('./data.json', 'utf-8');
    let parsedData = JSON.parse(data);
    let todos = parsedData.map(element => {
      const {id, task, status} = element
      return new Todo(id, task, status);
    })
    return todos;
  }

  static show(){
    let todos = this.getTodos();
    return todos;
  }

  static add(todo){
    let todos = this.getTodos();
    let id = todos[todos.length - 1].id + 1;
    let task = todo[0];    
    let temp = new Todo(id, task); // buat instance
    todos.push(temp);
    this.save(todos)
  }

  static delete(todo){
    let todos = this.getTodos();
    let id = Number(todo[0]);
    todos = todos.filter(todo => todo.id !== id) // ambil semua kecuali id yang dihapus
    this.save(todos);
  }

  static update(todo){
    let todos = this.getTodos();
    let id = Number(todo[0]); // index 0: diambil dari params index 0
    let task = todo[1]; // index 1: diambil dari params index 1
    todos = todos.map(todo => {
      if (todo.id === id){ // cari id yang sama di database sesuai inputan di params
        todo.task = task; // ubah tasknya        
      }
      return todo; // harus di-return karena map menghasilkan array baru
    })
    this.save(todos); // overwrite data.json
  }

  static save(data){
    // konsepnya adalah data.json tidak benar-benar dihapus atau diupdate tapi dioverwrite dengan data yang baru
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 3)); // 3: jumlah space di JSON-nya, opsional
  }
}

module.exports = Todo;