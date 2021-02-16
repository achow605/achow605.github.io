(function(){
  "use strict";
  console.log("Reading js");

  const boxes = document.querySelectorAll(".box");

  // const pothos = document.getElementById("pothos");
  // const philo = document.getElementById("philo");
  // const others = document.getElementById("others");
  // const monstera = document.getElementById("monstera");


// I make a plant group class that holds the name, elements, and plants of each plant group
  class Plant {
    constructor(refname, nickname, fullname, description) {
      this.refname = refname;
      this.nickname = nickname;
      this.fullname = fullname;
      this.description = description;
    }
  }

  const neon = new Plant("neon", "Neon Pothos", "Epipremnum aureum 'Neon'", "This vining plant has bright neon green heart-shaped leaves and is considered a tough and easy-to-grow plant. This plant is perfect for beginners as it is very tolerant to underwatering and low-light.")

  const manjula = new Plant("manjula", "Manjula Pothos", "Epipremnum 'Manjula'", "This vining plant has wide, heart-shaped leaves that have a unique pattern of green and white. While there are many variations of pothos, this 'Manjula' type has a very specific type of pattern and is a patented variery produced in the University of Florida");

  const brasil = new Plant("brasil", "Philodendron Brasil", "Philodendron Hederaceum 'Brasil'", "This vining Philodendron is known for its unique patterns (variegation) on the leaves sporting shades of lighter green in the center of the leaves. This is a particularly tough plant that can withstand underwatering and still thrive in low-light conditions");

  const blushing = new Plant("blushing", "Blushing Philodendron", "Philodendron erubescens", "This larger leaf Philodendron is called 'blushing' because of it's red color on the stems of the plant. The cuttings I have are single leaves but they are climbing plants that usually grow on the side of trees in nature.")

  const split = new Plant("split", "Split Leaf Philodendron", "Monstera Deliciosa", "Although one of the nicknames for this plant has 'Philodendron' in it, it is actually part of the Monstera family! This is considered a 'juvenile' version of the plant which basically means it is a baby version of the plant. Once it gets older and bigger, it will start getting the notorious holes!")

  const zzplant = new Plant("zzplant", "Zz Plant", "Zamioculcas Zamiifolia", "This plant is probably one of the easiest to care for plant I've ever had in my life. Its roots are very thick and tough meaning that it can retain a lot of water on its own, so you can go for a very long time without watering and still watch it grow. It can even withstand low light!")

  const syngonium = new Plant("syngonium", "Arrowhead Vine", "Syngonium Podophyllum", "This is a pretty popular house plant notorious for being easy to care for and extremely fast growing. Although it doesn't really look like it, these actually are vines! There are many color variations for this and the one I have is a mix of 'Imperial White' and 'Pixie'. ")

  const mini = new Plant ("mini", "Mini Monstera", "Raphidophora Tetrasperma", "This is my absolute favorite plant! Although they look like the norotious Swiss Cheese Plant, they are of an entirely different species. This vining plant grows extremely fast for me and is a bit more difficult to find than other common houseplants in my opinion.")

  const adansonii = new Plant("adansonii", "Swiss Cheese Vine", "Monstera Adansonii", "This vining Monstera plant is known for having lots of holes (fenestrations) that makes it resemble swiss cheese. As you can see from the vines sticking out, this one has grown so much over just the past few weeks and it still thriving!")

  const deliciosa = new Plant("deliciosa", "Swiss Cheese Plant", "Monstera Deliciosa", "This is the largest plant in my collection and is the one I am most proud of! I actually bought this at Trader Joes for $20 and it was only a third of its size now. This one likes lots of bright, indirect sunlight and prefers a humid room.")


  class PlantGroup {
    constructor(name, glowElement, plants) {
      this.name = name;
      this.glowElement = glowElement;
      this.plants = plants;
    }
  }

  const pothos = new PlantGroup("pothos", document.getElementById('pothos'), [neon, manjula]);
  const philo = new PlantGroup("philo", document.getElementById('philo'), [blushing, brasil, split]);
  const others = new PlantGroup("others", document.getElementById('others'), [zzplant, syngonium]);
  const monstera = new PlantGroup ("monstera", document.getElementById('monstera'), [deliciosa, adansonii, mini]);

// Then I make an array of all these objects to iterate through
  const plantGroups = [pothos, philo, others, monstera];

// If the box hovered over or click on is corresponding to a certain plant group, it will reveal the image layer highlighting the group

  for (const group of plantGroups) {
    for (const box of boxes) {
      if (box.className == `box ${group.name}`) {
        box.addEventListener("mouseover", function() {
          group.glowElement.className = "glow revealed";
        });

        box.addEventListener("mouseout", function() {
          group.glowElement.className = "glow hidden";
        });

        box.addEventListener("click", function() {
          // document.getElementById(`${option[0]}-section`).scrollIntoView();
          createOverlay(group)
        })
      }
    }
  }

// Overlay

// Creating the dynamic overlay elements by iterating through the list of plant objects in the specified plant group

function createOverlay(plantGroup) {
  document.getElementById('overlay').className = "revealOverlay";

  for (const plant of plantGroup.plants) {
    displayPlant(plant);
  }
}

// This creates the container for each plant and dynamically updates the information based on the selected plant group

function displayPlant(plant) {
  let plantContainer = document.createElement('div');
    plantContainer.className = "plant-container";

      let plantImgs = document.createElement('div');
        plantImgs.className = "plant-imgs" ;

          let plantImg1 = document.createElement('img');
            plantImg1.className = "plantImg1";
            plantImg1.src = `images/${plant.refname}1.jpg`;

          let plantImg2 = document.createElement('img');
            plantImg2.className = "plantImg2";
            plantImg2.src = `images/${plant.refname}2.jpg`;

          plantImgs.appendChild(plantImg1);
          plantImgs.appendChild(plantImg2);

          let plantDesc = document.createElement('div');
            plantDesc.className = "plant-desc";

          let planth1 = document.createElement('h1');
            planth1.innerHTML = plant.nickname;

          let planth2 = document.createElement('h2');
            planth2.innerHTML = plant.fullname;

          let plantp = document.createElement('p');
            plantp.innerHTML = plant.description;

              plantDesc.appendChild(planth1);
              plantDesc.appendChild(planth2);
              plantDesc.appendChild(plantp);

      plantContainer.appendChild(plantImgs);
      plantContainer.appendChild(plantDesc);

    document.getElementById("overlay").appendChild(plantContainer);


}


// Close overlay

const overlay = document.getElementById('overlay');

function closeOverlay() {
  // hides overlay elements
  overlay.className = "hiddenOverlay";

  // deletes dynamically made plant elements to reset
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
}
}

overlay.addEventListener('click', closeOverlay);

document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closeOverlay();
  }
});




}())
