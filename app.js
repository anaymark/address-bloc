const inquirer = require('inquirer');
const MenuController = require('./controllers/MenuController.js');
const menu = new MenuController();

menu.clear();
menu.main();

