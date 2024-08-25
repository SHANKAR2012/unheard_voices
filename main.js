




import kaboom from "/node_modules/kaboom/dist/kaboom.mjs";
kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  background: [115, 199, 163],
});
loadSprite("school", "/sprites/school1.png");
loadSprite("water", "/sprites/water.png");
loadSprite("grass", "/sprites/grass1.jpg");
loadSprite("fence", "/sprites/fence.png");
loadSprite("fence2", "/sprites/fence2.png");
loadSprite("road", "/sprites/road2.png");
loadSprite("road2", "/sprites/road3.png");
loadSprite("supermarket", "/sprites/supermarket.png");
loadSprite("park", "/sprites/park.png");
loadSprite("bush", "/sprites/bush.png");
loadSprite("background", "sprites/pic1.jpeg");
loadSprite("dog", "sprites/dog-removebg-preview.png");
loadSprite("person", "sprites/new random.png");
loadSprite("car", "sprites/car-removebg-preview.png");
loadSprite("background2", "sprites/nature_images_like_minecrft.jpeg");
loadSprite("background3",'sprites/school2.jpeg');
loadSprite("background4","sprites/market.jpeg");
loadSprite("tileset", "/sprites/tileset.png", {
  sliceX: 4, 
  sliceY: 4, 
});
loadSprite("char", "/sprites/george.png", {
  sliceX: 4, 
  sliceY: 4, 
});

function showSplashScreen() {
  const splashScreen = document.createElement('div');
  splashScreen.style.position = 'absolute';
  splashScreen.style.top = '0';
  splashScreen.style.left = '0';
  splashScreen.style.width = '100%';
  splashScreen.style.height = '100%';
  splashScreen.style.backgroundImage = 'url("/sprites/galaxy.jpeg")';
  splashScreen.style.display = 'flex';
  splashScreen.style.alignItems = 'center';
  splashScreen.style.justifyContent = 'center';
  splashScreen.style.opacity = '1';
  splashScreen.style.transition = 'opacity 2s ease-in-out';

  document.body.appendChild(splashScreen);

  const text = document.createElement('div');
  text.innerText = 'UnheardVoices'; 
  text.style.color = 'white';
  text.style.fontSize = 'r5em';
  text.style.opacity = '0';
  text.style.transition = 'opacity 2s ease-in-out';

  splashScreen.appendChild(text);

  setTimeout(() => {
    text.style.opacity = '1'; 
  }, 500); 

  
  setTimeout(() => {
    splashScreen.style.opacity = '0'; 
    setTimeout(() => {
      document.body.removeChild(splashScreen); 
      startGame(); 
    }, 2000); 
  }, 3000); 
}

showSplashScreen();




function startGame() {
const map = [
  "gyg   gggtygggggytjw w",
  "gyg   ggggygggggytjw w",
  "gyrrrrrrrryrrrrrytjw w",
  "gytgggggggyt   tytjw w",
  "gyggggggggyg   gytjw w",
  "gytgggggggytgggtytjw w",
  "ggrrrrrrrrrrrrrr tjw w",
  "gt t t t t t t t tjw w",
  "f f f f f f f f f jw w",
  "w w w w w w w w w w w ",
  "w w w w w w w w w w w ",
];

const levelOptions = {
  tileWidth: 32,
  tileHeight: 32,
  tiles: {
    g: () => [sprite("grass"), area(), scale(0.1, 0.1), z(0)],
    b: () => [sprite("bush"), area(), scale(1, 1)],
    f: () => [sprite("fence"), area(), scale(0.1, 0.1)],
    j: () => [sprite("fence2"), area(), scale(0.1, 0.1), z(0.75)],
    r: () => [sprite("road"), area(), scale(0.15, 0.15), z(0.5)],
    y: () => [sprite("road2"), area(), scale(0.15, 0.15), z(0.5)],
    w: () => [sprite("water"), area(), scale(0.1, 0.1), z(1)],
    t: () => [sprite("tileset", { frame: 4 }), scale(0.7), z(0.6)],
  
  },
};

  const player = add([
    sprite("char"),
    pos(10, 20),
    area(),
    z(100),
  ]);
  const dog = add([
    sprite("dog"),
    pos(200, 20),
    area(),
    z(0.55),
    scale(0.05),
  ]);
  const dog2 = add([
    sprite("dog"),
    pos(400, 200),
    area(),
    z(0.55),
    scale(0.05),
  ]);
  const person1 = add([
    sprite("person"),
    pos(500, 180),
    area(),
    z(0.55),
    scale(0.08),
  ]);
  const person2 = add([
    sprite("person"),
    pos(200, 80),
    area(),
    z(0.55),
    scale(0.08),
  ]);
  const car = add([
    sprite("car"),
    pos(230, 43),
    area(),
    z(0.55),
    scale(0.3),
  ]);

  const level = addLevel(map, levelOptions);

  const speed = 120;

  onKeyDown("right", () => {
    player.move(speed, 0);
  });
  onKeyDown("left", () => {
    player.move(-speed, 0);
  });
  onKeyDown("up", () => {
    player.move(0, -speed);
  });
  onKeyDown("down", () => {
    player.move(0, speed);
  });

  const school = add([
    sprite("school"),
    pos(400, 100),
    area(),
    scale(0.2)
  ]);
  const supermarket = add([
    sprite("supermarket"),
    pos(415, 0),
    area(),
    scale(0.15)
  ]);
  const park = add([
    sprite("park"),
    pos(150, 100),
    area(),
    scale(0.25)
  ]);

  const house = add([
    sprite("tileset", { frame: 1 }),
    pos(100, 20),
    area(),
    scale(0.8)
  ]);

  let schoolquizCompleted = false;
  let houseQuizCompleted = false;
  let parkQuizCompleted = false; 

  

  function checkProximity() {
    if (schoolquizCompleted) return;

    const distance = player.pos.dist(school.pos);
    const proximityThreshold = 20;

    if (distance <= proximityThreshold) {
      showschoolQuestionScreen();
    }
  }

  player.onUpdate(() => {
    checkProximity();
    checkHouseProximity();
    checkParkProximity();  
    checkSupermarketProximity();
  });
  

  const schoolquestions = [
    {
      question: "What should you do if you see someone is being\nbullied at school?",
      options: ["Ignore it", "Tell a teacher or an adult"],
      correctAnswer: "Tell a teacher or an adult",
      message: "Correct! It's important to tell a teacher or adult.",
      explanation: "If you see bullying, it's important to report it to a teacher or another adult who can help address the situation."
    },
    {
      question: "What is a safe way to stand up to bullying?",
      options: ["Stay calm and seek help", "Yell and fight back"],
      correctAnswer: "Stay calm and seek help",
      message: "Correct! Staying calm and seeking help is the best approach.",
      explanation: "It’s always safer to stay calm and seek help from a teacher or adult rather than engaging in violence."
    },
    {
      question: "What should you do if someone says something mean to you?",
      options: ["Say something mean back", "Walk away and tell an adult"],
      correctAnswer: "Walk away and tell an adult",
      message: "Correct! Walking away and telling an adult is the best option.",
      explanation: "It's better to avoid conflict and seek help from an adult rather than responding with mean words."
    },
    {
      question: "How can you show kindness to others at school?",
      options: ["Help them if they are struggling", "Ignore them if they need help"],
      correctAnswer: "Help them if they are struggling",
      message: "Correct! Helping others shows kindness and respect.",
      explanation: "Offering help to others when they need it is a great way to show kindness and build a positive environment."
    },
    {
      question: "What should you do if you feel unsafe at school?",
      options: ["Keep it to yourself", "Tell a trusted adult"],
      correctAnswer: "Tell a trusted adult",
      message: "Correct! It's important to tell a trusted adult if you feel unsafe.",
      explanation: "If you ever feel unsafe, always inform a trusted adult who can help ensure your safety."
    }
  ];
  

  let currentQuestionIndex = 0;

  function showschoolQuestionScreen() {
    player.paused = true;

    destroyAll("ui");

    const bg = add([
			sprite("background3", {
					width: width(),
					height: height(),
			}),
			pos(0, 0),
			opacity(1),
			z(110),
			"ui",
	]);

    const currentQuestion = schoolquestions[currentQuestionIndex];

    const questionText = add([
      text(currentQuestion.question, { size: 24 }),
      pos(20, 20),
      z(110),
      "ui",
    ]);

    const options = currentQuestion.options.map((optionText, index) => {
      return add([
        text(optionText, { size: 24 }),
        pos(20, 100 + index * 50),
        area(),
        z(110),
        "ui",
        `option${index}`,
      ]);
    });

    options.forEach((option, index) => {
      option.onClick(() => {
        const selectedOption = option.text;

        if (selectedOption === currentQuestion.correctAnswer) {
          showMessage(currentQuestion.message, () => {
            if (isLastQuestion()) {
              endQuiz();
            } else {
              nextQuestion();
            }
          });
        } else {
          showMessage(`Incorrect! ${currentQuestion.explanation}`, () => {
            destroyAll("ui");
            showschoolQuestionScreen();
          });
        }
      });
    });
  }

  function showMessage(message, callback) {
    const messageText = add([
      text(message, { size: 24 }),
      pos(20, (height() / 2) + 100),
      z(120),
      "ui",
    ]);

    wait(2, () => {
      destroy(messageText);
      if (callback) callback();
    });
  }

  function nextQuestion() {
    destroyAll("ui");

    if (currentQuestionIndex < schoolquestions.length - 1) {
      currentQuestionIndex++;
      showschoolQuestionScreen();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    showMessage("Quiz complete! Well done.", () => {
      destroyAll("ui");
      player.paused = false;

      schoolquizCompleted = true;
    });
  }

  function isLastQuestion() {
    return currentQuestionIndex >= schoolquestions.length - 1;
  }

  function checkHouseProximity() {
    if (houseQuizCompleted) return;

    const distance = player.pos.dist(house.pos);
    const proximityThreshold = 20;

    if (distance <= proximityThreshold) {
      showHouseQuestionScreen();
    }
  }
  const houseQuestions = [
    {
      question: "What should a girl do if she's asked to do all\n"
               + "the chores while her brother is not asked \n help?",
      options: ["Do the chores anyway", "Talk to a parent about fairness"],
      correctAnswer: "Talk to a parent about fairness",
      message: "Correct! Talking to a parent about fairness\nis important.",
      explanation: "If chores are not being shared fairly,\n"
                   + "it's important to talk to a parent to address the imbalance\n"
                   + "and promote fairness."
    },
    {
      question: "How should a boy react if he feels pressured to not show emotions\n"
               + "because of traditional gender roles?",
      options: ["Hide his feelings", "Share his feelings with someone he trusts"],
      correctAnswer: "Share his feelings with someone he trusts",
      message: "Correct! Sharing feelings with someone you trust is a healthy way to cope.",
      explanation: "It's important for everyone to\nexpress their emotions"
                   + "and talk to someone they trust"
    },
    {
      question: "What can a child do if they notice that their\nsibling of a different gender "
               + "receives more\nprivileges?",
      options: ["Accept it quietly", "Discuss it with a parent or guardian"],
      correctAnswer: "Discuss it with a parent or guardian",
      message: "Correct! Discussing the situation with a\nparent or guardian is the best\napproach.",
      explanation: "Talking to a parent or guardian about\nunequal privileges can help"
                   + "address the\nissue and ensure fair treatment."
    },
    {
      question: "If a girl is always expected to\ntake care of younger siblings\n"
               + "while her brother is free to do\nother activities, what should she do?",
      options: ["Just accept it", "Speak up about how it affects her"],
      correctAnswer: "Speak up about how it affects her",
      message: "Correct! Speaking up about how it affects her is important.",
      explanation: "If responsibilities are not equally shared,\n"
                   + "it's important to communicate how it impacts her\n"
                   + "and seek a more balanced approach."
    },
    {
      question: "How can a boy challenge the expectation that he should only be interested\n"
               + "in traditionally masculine activities?",
      options: ["Conform to the expectation", "Express his interests and explore what he enjoys"],
      correctAnswer: "Express his interests and explore what he enjoys",
      message: "Correct! It's important to express and pursue one's own interests.",
      explanation: "Challenging traditional expectations by expressing and pursuing personal interests\n"
                   + "helps break down stereotypes and promotes self-acceptance."
    }
];


  let currentHouseQuestionIndex = 0;
  
  function showHouseQuestionScreen() {
    player.paused = true;

    destroyAll("ui");

    const bg = add([
			sprite("background", {
					width: width(),
					height: height(),
			}),
			pos(0, 0),
			opacity(1),
			z(110),
			"ui",
	]);

    const currentQuestion = houseQuestions[currentHouseQuestionIndex];

    const questionText = add([
      text(currentQuestion.question, { size: 24, }),
      pos(20, 20),
      z(110),
      "ui",
    ]);
    const optionsBoxBg = add([
      rect(width() - 40, 100 + (currentQuestion.options.length * 50)),
      pos(20, 80),
      color(0, 0, 0),
      opacity(0.7),
      z(120),
      "ui",
    ]);
    const options = currentQuestion.options.map((optionText, index) => {
      return add([
        text(optionText, { size: 24 }),
        pos(20, 100 + index * 50),
        area(),
        z(110),
        "ui",
        `option${index}`,
      ]);
    });

    options.forEach((option, index) => {
      option.onClick(() => {
        const selectedOption = option.text;

        if (selectedOption === currentQuestion.correctAnswer) {
          showMessage(currentQuestion.message, () => {
            if (isLastHouseQuestion()) {
              endHouseQuiz();
            } else {
              nextHouseQuestion();
            }
          });
        } else {
          showMessage(`Incorrect! ${currentQuestion.explanation}`, () => {
            destroyAll("ui");
            showHouseQuestionScreen();
          });
        }
      });
    });
  }

  function isLastHouseQuestion() {
    return currentHouseQuestionIndex >= houseQuestions.length - 1;
  }

  function nextHouseQuestion() {
    destroyAll("ui");

    if (currentHouseQuestionIndex < houseQuestions.length - 1) {
      currentHouseQuestionIndex++;
      showHouseQuestionScreen();
    } else {
      endHouseQuiz();
    }
  }

  function endHouseQuiz() {
    showMessage("House quiz complete! Well done.", () => {
      destroyAll("ui");
      player.paused = false;

      houseQuizCompleted = true;
    });
  }
  let currentParkQuestionIndex = 0;
  const parkQuestions = [
    {
      question: "What should a girl do if she is told she can't\nplay a certain sport at the park\nbecause it's considered a 'boy's game'?",
      options: ["Just walk away", "Speak up and ask to join"],
      correctAnswer: "Speak up and ask to join",
      message: "Correct! Speaking up and asking to join is the right approach.",
      explanation: "Everyone should have the opportunity to participate\nin activities they enjoy,\nregardless of gender. Speaking up helps challenge stereotypes and promotes inclusivity."
    },
    {
      question: "How should a boy respond if he is discouraged from playing with dolls or pretending to be a caregiver at the park\nbecause of traditional gender norms?",
      options: ["Ignore the discouragement", "Continue playing with the dolls or pretending"],
      correctAnswer: "Continue playing with the dolls or pretending",
      message: "Correct! Continuing to play with what he enjoys is important.",
      explanation: "It’s essential to follow your interests and ignore discouragement based on gender norms.\nEveryone should feel free to play and express themselves as they wish."
    },
    {
      question: "What can a child do if they notice\nthat only boys are being chosen\nfor team sports at the park,\nwhile girls are often left out?",
      options: ["Accept it and join another activity", "Talk to the game organizers about including everyone"],
      correctAnswer: "Talk to the game organizers about including everyone",
      message: "Correct! Discussing the situation with the organizers\nis the best approach.",
      explanation: "Addressing the issue with organizers\ncan help ensure that everyone has equal opportunities"
    },
    {
      question: "If a girl is told she should not climb on\nthe tallest playground equipment because it's\ntoo dangerous for girls, what\nshould she do?",
      options: ["Avoid climbing and choose something else", "Challenge the notion and climb if she feels comfortable"],
      correctAnswer: "Challenge the notion and climb if she feels\ncomfortable",
      message: "Correct! Challenging stereotypes and doing what\nfeels right for her is important.",
      explanation: "If she feels comfortable and safe, she should challenge stereotypes and pursue activities she enjoys,\nregardless of gender-based restrictions."
    },
    {
      question: "How can a boy address the situation if\nhe is teased for showing interest in art activities at\nthe park because they are stereotypicallyconsidered\n'for girls'?",
      options: ["Give up on art and try to fit in with others", "Continue with art and be confident in his interests"],
      correctAnswer: "Continue with art and be confident in his\ninterests",
      message: "Correct! Being confident and continuing\nwith what he enjoys is the best choice.",
      explanation: "It’s important to stay true to your interests and not be swayed by stereotypes.\nEveryone should have the freedom to pursue activities they enjoy without judgment."
    }
];

function checkParkProximity() {
  if (parkQuizCompleted) return;

  const distance = player.pos.dist(park.pos);
  const proximityThreshold = 20;

  if (distance <= proximityThreshold) {
    showParkQuestionScreen();
  }
}

function showParkQuestionScreen() {
  player.paused = true;

  destroyAll("ui");

  const bg = add([
    sprite("background2", {
        width: width(),
        height: height(),
    }),
    pos(0, 0),
    opacity(1),
    z(110),
    "ui",
]);

  const currentQuestion = parkQuestions[currentParkQuestionIndex];

  const questionText = add([
    text(currentQuestion.question, { size: 18 }),
    pos(20, 20),
    z(110),
    "ui",
  ]);

  const options = currentQuestion.options.map((optionText, index) => {
    return add([
      text(optionText, { size: 24 }),
      pos(20, 100 + index * 50),
      area(),
      z(110),
      "ui",
      `option${index}`,
    ]);
  });

  options.forEach((option, index) => {
    option.onClick(() => {
      const selectedOption = option.text;

      if (selectedOption === currentQuestion.correctAnswer) {
        showMessage(currentQuestion.message, () => {
          if (isLastParkQuestion()) {
            endParkQuiz();
          } else {
            nextParkQuestion();
          }
        });
      } else {
        showMessage(`Incorrect! ${currentQuestion.explanation}`, () => {
          destroyAll("ui");
          showParkQuestionScreen();
        });
      }
    });
  });
}

function isLastParkQuestion() {
  return currentParkQuestionIndex >= parkQuestions.length - 1;
}

function nextParkQuestion() {
  destroyAll("ui");

  if (currentParkQuestionIndex < parkQuestions.length - 1) {
    currentParkQuestionIndex++;
    showParkQuestionScreen();
  } else {
    endParkQuiz();
  }
}

function endParkQuiz() {
  showMessage("Park quiz complete! Well done.", () => {
    destroyAll("ui");
    player.paused = false;

    parkQuizCompleted = true;
  });
}
const supermarketQuestions = [
  {
    question: "What should a girl do if she is told\nshe can't help with heavy shopping bags\nbecause it's considered 'too much\nfor girls'?",
    options: ["Accept it and let someone else\nhandle it", "Ask to help with the bags anyway"],
    correctAnswer: "Ask to help with the bags anyway",
    message: "Correct! Asking to help with the bags is a good choice.",
    explanation: "Everyone should be able to participate in\ntasks based on their ability and willingness,\nnot gender. Helping with tasks like carrying bags promotes\nequality and challenges stereotypes."
  },
  {
    question: "How should a boy react if he is told he shouldn't choose items from the 'girl's section'\nwhile shopping because it's not considered\nx'appropriate' for boys?",
    options: ["Avoid choosing items from that section", "Choose what he likes regardless of the section"],
    correctAnswer: "Choose what he likes regardless of the section",
    message: "Correct! Choosing items based on personal preference\nis the best approach.",
    explanation: "It's important to select items based on\npersonal preference rather than conforming to gender-based\nexpectations.  "
  },
  {
    question: "What can a child do if they notice that shopping tasks\nare divided based on gender,with boys getting more\n'fun' items and girls being given chores?",
    options: ["Ignore the division and complete the tasks", "Talk to a parent about equal distribution of tasks"],
    correctAnswer: "Talk to a parent about equal distribution of tasks",
    message: "Correct! Discussing the situation with a parent is a good approach.",
    explanation: "Addressing the unequal distribution of tasks\nwith a parent can help ensure that all\nchildren have equal opportunities to engage in various activities."
  },
  {
    question: "If a girl is frequently asked to pick up groceries from lower shelves\nwhile her brother is asked to reach items from higher shelves, what should she do?",
    options: ["Continue picking from lower shelves", "Discuss with a parent about the fairness of tasks"],
    correctAnswer: "Discuss with a parent about the fairness of tasks",
    message: "Correct! Talking to a parent about fairness in tasks is important.",
    explanation: "It's important to ensure that tasks are distributed fairly and based on ability rather than gender.\nDiscussing the situation with a parent can help address any imbalances."
  },
  {
    question: "How can a boy address the situation if he feels pressured to only pick 'masculine' snacks\nwhile shopping, and is discouraged from choosing snacks he likes that are labeled for girls?",
    options: ["Choose only 'masculine' snacks", "Select snacks based on what he likes and ignore the labels"],
    correctAnswer: "Select snacks based on what he likes and ignore the labels",
    message: "Correct! Choosing snacks based on personal preference is the best choice.",
    explanation: "Everyone should be able to pick and enjoy snacks they like, regardless of gender labels.\nFollowing personal preferences helps challenge stereotypes and promotes self-expression."
  }
];



let supermarketQuizCompleted= false;
function checkSupermarketProximity() {
  if (supermarketQuizCompleted) return;

  const distance = player.pos.dist(supermarket.pos);
  const proximityThreshold = 20;

  if (distance <= proximityThreshold) {
    showSupermarketQuestionScreen();
  }
}



let currentSupermarketQuestionIndex = 0;


function showSupermarketQuestionScreen() {
  player.paused = true;

  destroyAll("ui");

  const bg = add([
    sprite("background4", {
        width: width(),
        height: height(),
    }),
    pos(0, 0),
    opacity(1),
    z(110),
    "ui",
]);

  const currentQuestion = supermarketQuestions[currentSupermarketQuestionIndex];

  const questionText = add([
    text(currentQuestion.question, { size: 18, color: 'black' }),

    pos(20, 20),
    z(110),
    "ui",
  ]);

  const options = currentQuestion.options.map((optionText, index) => {
    return add([
      text(optionText, { size: 24,color: 'black' }),
      pos(20, 100 + index * 50),
      area(),
      z(110),
      "ui",
      `option${index}`,
    ]);
  });

  options.forEach((option, index) => {
    option.onClick(() => {
      const selectedOption = option.text;

      if (selectedOption === currentQuestion.correctAnswer) {
        showMessage(currentQuestion.message, () => {
          if (isLastSupermarketQuestion()) {
            endSupermarketQuiz();
          } else {
            nextSupermarketQuestion();
          }
        });
      } else {
        showMessage(`Incorrect! ${currentQuestion.explanation}`, () => {
          destroyAll("ui");
          showSupermarketQuestionScreen();
        });
      }
    });
  });
}

function isLastSupermarketQuestion() {
  return currentSupermarketQuestionIndex >= supermarketQuestions.length - 1;
}

function nextSupermarketQuestion() {
  destroyAll("ui");

  if (currentSupermarketQuestionIndex < supermarketQuestions.length - 1) {
    currentSupermarketQuestionIndex++;
    showSupermarketQuestionScreen();
  } else {
    endSupermarketQuiz();
  }
}

function endSupermarketQuiz() {
  showMessage("Supermarket quiz complete! Well done.", () => {
    destroyAll("ui");
    player.paused = false;

    supermarketQuizCompleted = true;
  });
}
  x







}

