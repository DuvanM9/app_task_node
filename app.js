require("colors");
const { inquirerMenu, pause, leerInput, listTaskDelete, confirmMessage, mostrarListadoCheckList } = require("./helpers/inquirer");
const { saveDatabase, readDatabase } = require("./helpers/dbFile");
const Tasks = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const newTareas = new Tasks();
  const readTask = readDatabase();

  if (readTask) {
    newTareas.setListObject(readTask);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": //Crear Tarea
        const desc = await leerInput("Description ");
        newTareas.crearTarea(desc);
        break;

      case "2": //Listar Tareas
        newTareas.listadoCompleto(newTareas.listadoArr);
        break;

      case "3": //Listar tareas completadas
        newTareas.listadoCompletasAndTerminadas(true);
        break;

      case "4": //Listar tareas pendientes
        newTareas.listadoCompletasAndTerminadas(false);
        break;

        
      case "5": //Complerado | pendiente
        const ids = await mostrarListadoCheckList(newTareas.listadoArr)
        newTareas.toogleCompletTask(ids);
      break;

        
      case "6": //Eliminar tareas
        const id = await listTaskDelete(newTareas.listadoArr)
        if(id !== '0'){
            const confirm = await confirmMessage('¿Estas segurno de borrar esta tarea ?')
            if(confirm) {
                newTareas.borrarTask(id)
                console.log("--Tarea borrada con exito--".green)
            }
        }

      break;

      default:
        break;
    }

    console.log("\n");
    saveDatabase(newTareas.listadoArr);
    await pause();
  } while (opt !== "0");
};

main();
