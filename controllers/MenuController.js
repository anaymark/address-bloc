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
			    "View all contacts",
			    "Search for a contact",
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
					case "View all contacts":
					  this.getContacts();
					  break
					case "Search for a contact":
					  this.search();
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
				this.book.addContact(answears.name, answears.phone, answears.email).then((contact)=>{
					console.log("Contact added successfully!");
					this.main();
				}).catch((err)=>{
					console.log(err);
					this.main();
				})
			})
		}

		getContacts(){
			this.clear();
			this.book.getContacts().then((contacts)=>{
				for(let contact of contacts){
					console.log(
					`
					name: ${contact.name}
					phone number: ${contact.phone}
					email: ${contact.email}
					------------------`
					);
				}
				this.main();
			}).catch((err)=>{
				console.log(err);
				this.main();
			});
		}

		search(){
			inquirer.prompt(this.book.searchQuestions)
			.then((target)=>{
				this.book.search(target.name)
				.then((contact)=>{
					if(contact === null){
						this.clear();
						console.log("contact not found");
						this.search();
					} else{
						this.showContact(contact);
					}
				});
			})
			.catch((err)=>{
				console.log(err);
				this.main();
			});
		}

		showContact(contact){
			this._printContact(contact);
			inquirer.prompt(this.book.showContactQuestions)
    		.then((answer) => {
      			switch(answer.selected){
       			 case "Delete contact":
         		   this.delete(contact);
         		   break;
        		 case "Main menu":
          		   this.main();
          	       break;
       			 default:
         		  console.log("Something went wrong.");
          	  	  this.showContact(contact);
      		}
    		})
    	   .catch((err) => {
      		  console.log(err);
      		  this.showContact(contact);
    	});
		}

		 _printContact(contact){
      		console.log(`
        		name: ${contact.name}
        		phone number: ${contact.phone}
        		email: ${contact.email}
        		---------------`
      		);
    	}

		delete(contact){
      	    inquirer.prompt(this.book.deleteConfirmQuestions)
        	.then((answer) => {
        	  if(answer.confirmation){
          		this.book.delete(contact.id);
       			console.log("contact deleted!");
          		this.main();
        	  } else {
          		console.log("contact not deleted");
          		this.showContact(contact);
        	  }
     	    })
      	    .catch((err) => {
      		  console.log(err);
        	  this.main();
 			});
    	}

		exit(){
			console.log("Thanks for using AddressBloc!")
			process.exit();
		}
}