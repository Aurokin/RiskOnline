function Room(name, id, owner){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.peopleLimit = 4;
	this.status = "available";
	this.private = false;
};
//add a person to the table
Room.prototype.addPerson = function(personID){
	if(this.status === "available"){
		this.people.push(personID);
	}
};
//removing a person from the room
Room.prototype.removePerson = function(person){
	var personIndex = -1;
	for(var i = 0; i < this.people.length; i++){
		if(this.people[i].id === person.id){
			personIndex = i;
			break;
		}
	}
	this.people.remove(personIndex);
};
//get a person
Room.prototype.getPerson = function(personID){
	var person = null;
	for(var i = 0; i < this.people.length; i++){
		if(this.people[i].id == personID){
			person = this.people[i];
			break;
		}
	}
	return person;
};
//private room 
Room.prototype.isPrivate = function(){
	if(this.private){
		return true;
	}
	else{
		return false;
	}
};

module.exports = Room;
