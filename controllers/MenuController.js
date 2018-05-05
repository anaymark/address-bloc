const inquirer = require('inquirer');
let date = require('date-and-time');
const ContactController = require("./ContactController");

module.exports = class MenuController {
	constructor(){
		this.mainMenuQuestions = [
		{
			type:"list",
			  name:"mainMenuChoice",
			  message:"Please choose from an option below",
			  choices:[
			    "Add new contact",
			    "Exit",
			    "Date and Time"
			  ]
		}
	];
	this.book = new ContactController();
	}
		main(){
			console.log('Welcome to AddressBloc!');
			inquirer.prompt(this.mainMenuQuestions).then((response)=>{
				switch(response.mainMenuChoice){
					case "Add new contact":
					  this.addContact();
					  break;
					case "Exit":
					  this.exit();
					  break;
					case "Date and Time":
					  this.getDate();
					  break;
					default:
					  console.log("Invalid input");
					  this.main();
				}
			})
			.catch((err) => {
       		console.log(err);
     		});
		}

		getDate(){
			let now = new Date();
			console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));  
			this.main();
		}


 		remindMe(){
 			return "Learning is a life-long pursuit";
 		}

		clear(){
			console.log("\x1Bc");
		}

		addContact(){
			this.clear();
			inquirer.prompt(this.book.addContactQuestions).then((answears)=>{
				this.book.addContact(answears.name, answears.phone).then((contact)=>{
					console.log("Contact added successfully!");
					this.main();
				}).catch((err)=>{
					console.log(err);
					this.main();
				})
			})
		}
		exit(){
			console.log("Thanks for using AddressBloc!")
			process.exit();
		}
}