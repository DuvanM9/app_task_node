/**
 * _listado:
 *          {'uuid-123715-54545-2':{id: 12, desc: asd, completeEn:9665}},
 *          {'uuid-123715-54545-2':{id: 12, desc: asd, completeEn:9665}},
 *          {'uuid-123715-54545-2':{id: 12, desc: asd, completeEn:9665}},
 *
 */

const Task = require("./tarea");

class Tasks {
  _listado = {};

  get listadoArr() {
    const listado = Object.keys(this._listado).map((key) => this._listado[key]);
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  isEmptyStr(str) {
    if (str !== null) {
      return true;
    }
    return false;
  }

  borrarTask(id='') {
    if(this._listado[id]){
        delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Task(desc);
    this._listado[tarea.id] = tarea;
  }

  setListObject(tasks = []) {
    tasks.map((obj) => (this._listado[obj.id] = obj));
  }

  listadoCompleto(list) {
    console.log("");
    list.map((item, index) =>
      console.log(
        `${`${index + 1}`.green}. ${item.desc} :: ${
          item.completadoEn ? `${item.completadoEn}`.green : "pendiente".red
        }`
      )
    );
  }

  listadoCompletasAndTerminadas(completed = true) {
    const list = this.listadoArr.filter((item) => this.isEmptyStr(item.completadoEn) === completed );
    this.listadoCompleto(list);
  }

  toogleCompletTask(ids=[]){
    ids.forEach(id => {
        const task = this._listado[id];
        if(!task.completadoEn){
            task.completadoEn = new Date().toISOString();
        }
    })

    this.listadoArr.forEach(({id}) => {
        if(!ids.includes(id)){
            this._listado[id].completadoEn = null;
        }
    })
  }
}

module.exports = Tasks;
