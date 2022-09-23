const inquirer = require("inquirer");
const colors = require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: "1", name: `${"1".green}. Crear Tarea` },
      { value: "2", name: `${"2".green}. Listar tareas` },
      { value: "3", name: `${"3".green}. Listar tareas completadas` },
      { value: "4", name: `${"4".green}. Listar tareas pendientes` },
      { value: "5", name: `${"5".green}. Completar tarea(s)` },
      { value: "6", name: `${"6".green}. Borrar tarea` },
      { value: "0", name: `${"0".green} . Salir` },
    ],
  },
];

const pauseItem = [
  {
    type: "input",
    name: "button",
    message: `presione ${"Enter".green} para continuar`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===============================".green);
  console.log("     Seleccione una opción     ".white);
  console.log("===============================".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pause = async () => {
  await inquirer.prompt(pauseItem);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTaskDelete = async (task = []) => {
  const choices = task.map(({ desc, id }, i) => {
    return { value: id, name: `${`${i + 1}`.green}. ${desc}` };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirmMessage = async (message) => {
  const questions = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(questions);

  return ok;
};

const mostrarListadoCheckList = async (task = []) => {

  const choices = task.map(({ desc, id, completadoEn }, i) => {
    return {
      value: id,
      name: `${`${i + 1}`.green}. ${desc}`,
      checked: completadoEn? true: false,
    };
  });


  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids} = await inquirer.prompt(questions);

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  listTaskDelete,
  confirmMessage,
  mostrarListadoCheckList
};
