
var homeWindow = document.getElementById("main-window"), 
rulesWindow = document.getElementById("rules-window"),
genFightingWindow = document.getElementById("fight-windows"),
fightWind1 = document.getElementById("text-level-1"),
fightWind2 = document.getElementById("text-level-2"),
fightWind3 = document.getElementById("text-level-3"),
fightWind4 = document.getElementById("text-level-4"),
fightWind5 = document.getElementById("text-level-5"),
pauseWindow = document.getElementById("pause-window"),
lostWindow = document.getElementById("player-lost-window"),
winWindow = document.getElementById("player-win-window"),
finalWinWindow = document.getElementById("final-winning-window");

var winds = [homeWindow, rulesWindow, genFightingWindow, pauseWindow, lostWindow, winWindow,
                finalWinWindow, fightWind1, fightWind2, fightWind3, fightWind4, fightWind5];
var numOfLevels = winds.length - 7, curLv;

for (var i = 0 ; i < winds.length ; i++) 
    winds[i].style.display = "none";
homeWindow.style.display = "block";

// for (var i = 0 ; i < winds.length ; i++) {
//     if ()       //condition for the window to be displayed
//         winds[i].style.display = "block";
//     else 
//         winds[i].style.display = "none";
// }

var windowDim = document.getElementById("game-window-layout");
// windowPos = windowDim.getBoundingClientRect();
var offset = windowDim.getBoundingClientRect().left;
var windowWidth = 900, windowHeight = 500;

var mouseClick01 = document.getElementById("mouse-click-01");
var punchRightSound = document.getElementById("punch-right-sound");
var punchLeftSound = document.getElementById("punch-left-sound");

var player, playerPos, playerWidth, opp, oppPos, oppWidth, 
    playerHPBar, playerHP, oppHPBar, oppHP;
var animationIntervalOpp, isGamePaused = true, count, curLv;
const initialHP = 200;

player = document.getElementById("initial-pose-right-ingame");
opp = document.getElementById("initial-pose-left-ingame");
const initialPlayerLeft = 10, initialOppLeft = 690;
playerHPBar = document.getElementById("player-hp-bar");
oppHPBar = document.getElementById("opponent-hp-bar");


function goToHomePage() {
    mouseClick01.currentTime = 0;
    mouseClick01.play();
    for (var i = 0 ; i < winds.length ; i++) {
        if (winds[i] == homeWindow)       //condition for the window to be displayed
            winds[i].style.display = "block";
        else 
            winds[i].style.display = "none";
    } 
}

function showRules() {
    mouseClick01.currentTime = 0;
    mouseClick01.play();
    for (var i = 0 ; i < winds.length ; i++) {
        if (winds[i] == rulesWindow)       //condition for the window to be displayed
            winds[i].style.display = "block";
        else 
            winds[i].style.display = "none";
    } 
}

function nextLevel() {
    playLevel(curLv);
}

function startGame() {
    mouseClick01.currentTime = 0;
    mouseClick01.play();
    curLv = 1;
    playLevel(curLv);
    
}

function playLevel(currentLevel) {
    count = 0;
    if (currentLevel == 6) {
        console.log("Game Completed");
    }
    else {
        isGamePaused = false;
        player.src = "initial_pose_right.png", opp.src = "initial_pose_left.png";
        player.style.left = initialPlayerLeft + "px", opp.style.left = initialOppLeft + "px";
        playerHP = initialHP, oppHP = initialHP;
        playerHPBar.style.width = playerHP + "px", oppHPBar.style.width = oppHP + "px";
        for (var i = 0 ; i < winds.length ; i++) {
            if (winds[i] == genFightingWindow || winds[i].id == "text-level-" + currentLevel)       //condition for the window to be displayed
                winds[i].style.display = "block";
            else 
                winds[i].style.display = "none";
        }
        movePlayers(currentLevel);
        
        //increment level or set to one somehow : if calling from other function by
        //updating the level then remove the following line
        // playLevel(currentLevel);
    }
}

function movePlayers(currentLevel) {
    document.body.onkeydown = movePlayerOnKey;
    if (!isGamePaused)
        animateOpponent(currentLevel);
}

function movePlayerOnKey(e) {
    if (!isGamePaused) {
        var playerLeft = player.getBoundingClientRect().left - offset, oppLeft = opp.getBoundingClientRect().left - offset;
        var playerWidth = player.getBoundingClientRect().width;
        var rightRestrictor = playerLeft + playerWidth/2 <= oppLeft && playerLeft <= windowWidth;
        if ((e.key.toUpperCase() == "D") && playerLeft + playerWidth < windowWidth && rightRestrictor) {
            player.style.left = (playerLeft + 10) + "px";
        }
        else if (e.key.toUpperCase() == "A" && playerLeft >= 10) {
            player.style.left = (playerLeft - 10) + "px";
        }
        else if (e.key == "Shift") {
            player.src = "punching-man-right.png";
            if (checkCollision() == 1) {
                punchRightSound.currentTime = 0;
                punchRightSound.play();
                oppHP = oppHPBar.getBoundingClientRect().width;
                var decrement = oppHPDecrement(curLv), increOpp = Math.floor(Math.random() * 2);
                if (decrement > oppHP)
                    decrement = oppHP;
                oppHPBar.style.width = oppHP - decrement + "px";
                if (decrement < oppHP) {
                    setTimeout(() => {
                        oppHPBar.style.width = oppHP + increOpp + "px";
                    }, 100);
                }
                if (checkLooser() == 2) {
                    curLv++;
                    stopLevel(2);       //opponent lost
                }
            }
                setTimeout(() => {
                player.src = "initial_pose_right.png";
            }, 250);
        }
    }
    if (e.key == "Escape") {
        var ClickPauseConditon = checkLooser() == 1 || checkLooser() == 2;
        if (!ClickPauseConditon) 
            pauseGame();
    }
}

function pauseGame() {
    var ClickPauseConditon = checkLooser() == 1 || checkLooser() == 2;
    if (!ClickPauseConditon) {
        mouseClick01.currentTime = 0;
        mouseClick01.play();
    }
    if (count % 2 == 0) {
        pauseOppAnimation();
        console.log("Game Paused");
        if (!ClickPauseConditon)
            pauseWindow.style.display = "flex";
    }
    else {
        if (!ClickPauseConditon) {
            resumeOppAnimation();
            console.log("Game Resumed");
            pauseWindow.style.display = "none";
        }
    }
    count++;
}

function pauseOppAnimation() {
    clearInterval(animationIntervalOpp);
    isGamePaused = true;
}

// Function to resume the opponent's animation
function resumeOppAnimation() {
    isGamePaused = false;
    animateOpponent(curLv); // Resume animation from stored position
}

function checkCollision() {
    var playerLeft = player.getBoundingClientRect().left - offset, oppLeft = opp.getBoundingClientRect().left - offset;
    var oneSidedDiff = oppLeft - playerLeft;
    playerWidth = player.getBoundingClientRect().width;
    if (oneSidedDiff >= playerWidth/2 && oneSidedDiff <= playerWidth)
        return 1;       //in punching range
    return 0;           //out of punching range
}

function checkLooser() {
    playerHP = playerHPBar.getBoundingClientRect().width;
    oppHP = oppHPBar.getBoundingClientRect().width;
    if (playerHP == 0) {
        return 1;       //player lost
    }
    else if (oppHP == 0) {
        return 2;       //opponent lost
    }
    return 0;           //match still ongoing
}

function stopLevel(looser) {
    clearInterval(animationIntervalOpp);
    if (looser == 1) {
        //player lost
        player.src = "mid-defeat-pose-right.png";
        setTimeout(() => {
            pauseGame();
        }, 100);
        setTimeout(() => {
            var lostWindow = document.getElementById("player-lost-window");
            lostWindow.style.display = "flex";
            console.log("Player lost");
        }, 2000);
    }
    else if (looser == 2) {
        //opponent lost
        opp.src = "mid-defeat-pose-left.png";
        setTimeout(() => {
            pauseGame();
        }, 100);
        setTimeout(() => {
            var winWindow;
            if (curLv < 6)      //not 5 as already incremented in source function
                winWindow = document.getElementById("player-win-window");
            else
                winWindow = document.getElementById("final-winning-window");
            winWindow.style.display = "flex";
            console.log("Player won");
        }, 2000);
    }
}

function oppPunch(currentLevel) {
    if (!isGamePaused) {
        var tryPunch = Math.floor(Math.random() * 500);
        if (tryPunch % 2 != 0 && checkCollision() == 1) {
            opp.src = "punching-man-left.png";
            punchLeftSound.currentTime = 0;
            punchLeftSound.play();
            playerHP = playerHPBar.getBoundingClientRect().width;
            var decrement = playerHPDecrement(currentLevel), increPlayer = Math.floor(Math.random() * 1);
            if (decrement > playerHP)
                decrement = playerHP;
            playerHPBar.style.width = playerHP - decrement + "px";
            if (decrement < playerHP) {
                setTimeout(() => {
                    playerHPBar.style.width = playerHP + increPlayer + "px";
                }, 100);
            }
            if (checkLooser() == 1) {
                stopLevel(1);       //player lost
            }
            setTimeout(() => {
                opp.src = "initial_pose_left.png";
            }, 250);
        }
    }
}

function animateOpp(point, currentLevel) {             //point : indicator of which direction to move 
    clearInterval(animationIntervalOpp); 
    let position = opp.getBoundingClientRect().left - offset;
    oppWidth = opp.getBoundingClientRect().width;
    if (!isGamePaused) {
        animationIntervalOpp = setInterval(() => {
            playerLeft = player.getBoundingClientRect().left - offset;
            let conditionLeft = position + oppWidth > windowWidth/2 && playerLeft + oppWidth/2 <= position;
            let conditionRight = position + oppWidth < windowWidth; 
            if (conditionLeft && point == 1) {
                position -= 2;
                opp.style.left = position + "px";
            }
            else if (conditionRight && point == 2) { 
                position += 2;
                opp.style.left = position + "px";
            }
            else {
                clearInterval(animationIntervalOpp); // Stop the animation
            }
            oppPunch(currentLevel);
        }, 10);
    }
}

function animateOpponent(currentLevel) {
    clearInterval(animationIntervalOpp); // Clear any existing intervals
    function nextMove() {
        // if (isGamePaused && (checkLooser() == 1 || checkLooser() == 2)) return; // Stopping Condition
        var tryMove = Math.floor(Math.random() * 200);
        if (tryMove % 2 == 0) {
            animateOpp(2, currentLevel);      //move Right
        } else {
            animateOpp(1, currentLevel);      //move Left
        }
        if (checkLooser() != 1 && checkLooser != 2)
            setTimeout(nextMove, 1500); // Wait 1.5 second before next move
    }
    nextMove();
}

function playerHPDecrement(currentLevel) {
    const [a1, a2, a3, a4, a5] = [7, 6, 5, 4, 3];//17, 12, 10, 8, 6];        //Using Destructuring Assignment
    if (currentLevel == 1) 
        return a1;
    else if (currentLevel == 2) 
        return a2;
    else if (currentLevel == 3) 
        return a3;
    else if (currentLevel == 4) 
        return a4;
    else if (currentLevel == 5) 
        return a5;
    return 0;
}

function oppHPDecrement(currentLevel) {
    const [a1, a2, a3, a4, a5] = [18, 14, 11, 8, 5];        //Using Destructuring Assignment
    if (currentLevel == 1) 
        return a1;
    else if (currentLevel == 2) 
        return a2;
    else if (currentLevel == 3) 
        return a3;
    else if (currentLevel == 4) 
        return a4;
    else if (currentLevel == 5) 
        return a5;
    return 0;
}

