const inquirer = require('inquirer');
let date = require('date-and-time');

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
	this.contacts = [];
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

		getContactCount(){
    		return this.contacts.length;
 		}

 		remindMe(){
 			return "Learning is a life-long pursuit";
 		}

		clear(){
			console.log("\x1Bc");
		}

		addContact(){
			this.clear;
			console.log('addContact called');
		}
		exit(){
			console.log("Thanks for using AddressBloc!")
			process.exit();
		}
}