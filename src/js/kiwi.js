let monster = {
  modules: {}
}

monster.modules.action = (() => {
  let name, life, money, awake;

  let showme = () => {
    let etat = "";
    if (awake) {
      etat = "est réveillé ☀️";
    } else {
      etat = "est endormi 🌙 ";
    }
    log("<p>Le <strong>" + name + "</strong> a " + life + " <i class='heart red icon'></i>, possède " + money + " 💎 et " + etat + "</p>");
    displayStatus(life, money, awake);
  }

  let init = (nom, vie, argent) => {
    name = nom;
    life = vie;
    money = argent;
    awake = true;
    let titre = document.querySelector('.header');
    titre.innerHTML = name + " 🥝";
    displayStatus(life, money, awake);
  }

  let difficulteDeLaVie = () => {
    setInterval(() => {
      let val = Math.floor(Math.random() * Math.floor(5))
      if (life > 0) {
        life--;
        log("<p>- 1 <i class='heart red icon'></i></p>");
        if (life == 0) {
          log("<p>Vous êtes <strong>mort</strong> 💀</p>");
        }
        if (life > 0) {
          switch (val) {
            case 0:
              fight();
              break;
            case 1:
              work();
              break;
            case 2:
              run();
              break;
            case 3:
              sleep();
              break;
            case 4:
              eat();
              break;
          }
        }
      }
      displayStatus(life, money, awake);
    }, 12000)
  }

  let kill = () => {
    if (life != 0) {
      life = 0;
      log("<p>Vous êtes <strong>mort</strong> 💀</p>");
    } else {
      log("<p><span>Action impossible (Vous êtes mort)</span></p>");
    }
    displayStatus(life, money, awake);
  }

  let vider = () => {
    document.querySelector('#actionbox').innerHTML = "";
  }

  let fight = () => {
    let message = "<p><span>Action impossible (Vous êtes mort)</span></p>"
    if (!awake) {
      message = "<p><span>Action impossible (Vous êtes endormi)</span></p>";
    }
    if (life > 0 && awake) {
      if (life - 3 <= 0) {
        life = 0;
        message = "<p>Vous êtes <strong>mort</strong> 💀</p>"
      } else {
        life = life - 3;
        message = "<p>- 3 <i class='heart red icon'></i> après un <strong>combat</strong> difficile.</p>"
      }
    }
    log(message);
    displayStatus(life, money, awake);
  }

  let run = () => {
    let message = "<p><span>Action impossible (Vous êtes mort)</span></p>"
    if (!awake) {
      message = "<p><span>Action impossible (Vous êtes endormi)</span></p>";
    }
    if (life > 0 && awake) {
      if (life - 1 == 0) {
        life = 0;
        message = "<p>Vous êtes <strong>mort</strong> 💀</p>"
      } else {
        life = life - 1;
        message = "<p>- 1 <i class='heart red icon'></i> après une bonne <strong>course</strong>.</p>"
      }
    }
    log(message);
    displayStatus(life, money, awake);
  }

  let work = () => {
    let message = "<p><span>Action impossible (Vous êtes mort)</span></p>";
    if (!awake) {
      message = "<p><span>Action impossible (Vous êtes endormi)</span></p>";
    }
    if (life > 0 && awake) {
      if (life - 1 == 0) {
        life = 0;
        money = money + 2;
        message = "<p>Vous êtes <strong>mort</strong> 💀</p>"
      } else {
        life = life - 1;
        money = money + 2;
        message = "<p>- 1 <i class='heart red icon'></i> et + 2 💎 après un <strong>travail</strong> intense.</p>"
      }
    }
    log(message);
    displayStatus(life, money, awake);
  }

  let eat = () => {
    let message = "<p><span>Action impossible (Vous n'avez pas assez d'argent)</span></p>";
    if (life == 0) {
      message = "<p><span>Action impossible (Vous êtes mort)</span></p>";
    }
    if (!awake) {
      message = "<p><span>Action impossible (Vous êtes endormi)</span></p>";
    }
    if (life > 0 && money >= 3 && awake) {
      money = money - 3;
      message = "<p>+ 2 <i class='heart red icon'></i> et - 3 💎 après un bon <strong>repas</strong>.</p>"
      if (life + 2 > 10) {
        let v = 10 - life;
        message = "<p>+ " + v + " <i class='heart red icon'></i> et - 3 💎 après un bon <strong>repas</strong>.</p>"
        life = 10;
      } else {
        life = life + 2;
      }
    }
    log(message);
    displayStatus(life, money, awake);
  }

  let sleep = () => {
    let message = "<p><span>Action impossible (Vous êtes mort)</span></p>";
    if (!awake) {
      message = "<p><span>Action impossible (Vous êtes endormi)</span></p>";
    }

    if (life > 0 && awake) {
      awake = false;
      message = "<p>Une bonne nuit de <strong>sommeil</strong> 🌙</p>";
      setTimeout(() => {
        awake = true;
        if (life != 10) {
          life++;
          message = "<p>C'est l'heure de se <strong>lever</strong> ☀️ + 1 <i class='heart red icon'></i></p>";
        } else {
          message = "<p>C'est l'heure de se <strong>lever</strong> ☀️ + 0 <i class='heart red icon'></i></p>";
        }
        log(message);
        displayStatus(life, money, awake);
      }, 12000);
    }
    log(message);
    displayStatus(life, money, awake);
  }


  let log = (message) => {
    let parser = new DOMParser();
    let nouveau_message = parser.parseFromString(message, "text/xml");
    let actionbox = document.querySelector('#actionbox');
    actionbox.insertBefore(nouveau_message.documentElement, actionbox.firstChild);
  }

  let displayStatus = (vie, argent, etat) => {
    let monstre = document.querySelector(".ui.card");
    let image = document.querySelector("img");
    let life = document.querySelector("#status").childNodes[1];
    let money = document.querySelector("#status").childNodes[3];
    let awake = document.querySelector("#status").childNodes[5];
    life.innerHTML = "";
    if (vie == 0) {
      life.innerHTML = "Mort 💀";
      image.src = "images/kiwi_mort.jpg";
    } else {
      image.src = "images/kiwi.jpg";
    }

    for (var i = 0; i < vie; i++) {
      let pv = document.createElement("I");
      pv.setAttribute("class", "heart red icon");
      life.appendChild(pv);
    }
    life.innerHTML += " (" + vie + ")";
    money.innerHTML = argent + " 💎";
    if (etat) {
      awake.innerHTML = "Réveillé ☀️"
    } else {
      awake.innerHTML = "Endormi 🌙"
    }
  }

  return {
    init: init,
    showme: showme,
    log: log,
    fight: fight,
    work: work,
    run: run,
    eat: eat,
    sleep: sleep,
    kill: kill,
    vider: vider,
    difficulteDeLaVie: difficulteDeLaVie
  }

})();

monster.modules.app = (() => {
  let show = document.querySelector('#b6');
  let fight = document.querySelector('#b3');
  let work = document.querySelector('#b7');
  let courrir = document.querySelector('#b2');
  let eat = document.querySelector('#b5');
  let sleep = document.querySelector('#b4');
  let newlife = document.querySelector('#b1');
  let kill = document.querySelector('#k');
  let vider = document.querySelector('#vider');

  let run = () => {

    monster.modules.action.init("Kiwi", 11, 50);

    monster.modules.action.difficulteDeLaVie();

    show.addEventListener('click', (e) => {
      monster.modules.action.showme();
    });
    fight.addEventListener('click', (e) => {
      monster.modules.action.fight();
    });
    work.addEventListener('click', (e) => {
      monster.modules.action.work();
    });
    courrir.addEventListener('click', (e) => {
      monster.modules.action.run();
    });
    eat.addEventListener('click', (e) => {
      monster.modules.action.eat();
    });
    sleep.addEventListener('click', (e) => {
      monster.modules.action.sleep();
    });
    newlife.addEventListener('click', (e) => {
      monster.modules.action.init("Kiwi", 10, 50);
      monster.modules.action.displayStatus(10, 50, true);
    });
    kill.addEventListener('click', (e) => {
      monster.modules.action.kill();
    });
    vider.addEventListener('click', (e) => {
      monster.modules.action.vider();
    });

  }

  return {
    run: run
  }
})();


window.addEventListener('load', () => {

  monster.modules.app.run();
})
