let xp = 0;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let fighting;
let monsterHealth;
// Have to use array as well
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// All these are ID
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// You will then use arrays index to access the few different objects within 
const monsters = [
  {
    name: "Blue Slime",
    level: 2,
    health: 15
  },
  {
    name:"Goblin",
    level: 8,
    health: 60
  },
    {
    name: "Fiery Dragon",
    level: 20,
    health: 300
  }
];

const weapons = [
  {
    name: "Wooden Stick",
    power: 5
  },
  {
    name: "Iron Mace",
    power: 15
  },
  {
    name: "Shadow Dagger",
    power: 30
  },
  {
    name: "Long Sword",
    power: 50
  }
];

const locations = [
  {
      name: "town square", // with , you creating more key value pairs
      "button text": ["Go to store","Go to cave","Fight Dragon"],
      "button functions": [goStore,goCave,fightDragon],
      text: "You are in the town square, You see a sign that says 'store'."
  },
  
  {
      name: "store",
      "button text": ["Buy 1 Health Potion (10 Gold)","Buy weapon","Go to town Square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You entered the store."
    
  },
  {
    name:"cave",
    "button text": ["Fight Slime", "Fight Goblin","Go to town Square"],
    "button functions": [fightSlime,fightGoblin,goTown],
    text: "Prepare for battle!"
  },
  {
    // another location for fighting a monster
    name:"fight",
    "button text":["Attack","Dodge","Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
	{
		name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown, goTown, goTown],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	}
  {
    name:"lose",
    "button text":["Replay?","Replay?","Replay?"],
    "button functions":[restart,restart,restart],
    text='L';
  }
]


function update(location){
  // we have to create objectts
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0]; 
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  }


function goTown(){
  update(locations[0]); // to pass in the index functions
}


function goStore(){
  update(locations[1]);
}

function goCave(){
  update(locations[2]);
}
function fightDragon(){
  console.log("Attack!");
}

function buyHealth(){
  if(gold>=10){
    gold-=10;
    health+=10;  
    healthText.innerText = health;
    goldText.innerText = gold;
  }
  else{
    text.innerText = "Insufficient Gold"
  }
  

}

function buyWeapon(){
  if(currentWeapon<weapons.length-1){
    if(gold>=30){
      gold-=30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name; // Make use of the dot notation
      // Then you will append the new weapon into the the inventory 
      text.innerText = "You have a " + newWeapon + ". ";
      inventory.push(newWeapon);
      text.innerText += "In you inventory you have " + inventory +".";
    }else{
      text.innerText = "Insufficient Gold";
    }
  }else{
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell Weapon for 15 Gold"
    button2.onclick = sellWeapon;
  }
}

function sellWeapon(){
  if(inventory.length>1)
  {
      gold+=15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold a " + currentWeapon + ".";
      text.innerText += "In you inventory you have " + inventory +".";
    }else{
      text.innerText = "Don't sell your only weapon!"}
}


function fightSlime(){
  fighting = 0; // These are the index for the array
  goFight();
}
function fightGoblin(){
  fighting = 1;
  goFight();
}
function fightDragon(){
  fighting = 2;
  goFight();
}



function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health-=monsters[fighting].level; // This will - your own health
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp)+1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <=0){
    lose();
  }else if(monsterHealth<=0){
    defeatMonster();
  }
}
function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
  // Have to always rmb to add the dot notation to retrieve what you want. 
}

function lose(){
  
}

function defeatMonster(){
  // Then you will earn xp and gold when you defeat the monster
  gold += Math.floor(monsters[fighting].level*6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  monsterStats.style.display = "none";
  update(locations[4]); // Something new 
}

// restart(){
  
// }