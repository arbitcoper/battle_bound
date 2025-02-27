// document.addEventListener("DOMContentLoaded", function() {
var wind = document.getElementById("main-window").style;
wind.display = "none";
console.log(wind.display);
// var a = prompt("hello12");
if (a == 2)
console.log("hello1");
else
console.log("none1");



var windowWidth = 900, windowHeight = 500;
var animationIntervalOpp;
var mouseClick01 = document.getElementById("mouse-click-01");
var punchRightSound = document.getElementById("punch-right-sound");
var punchLeftSound = document.getElementById("punch-left-sound");
var finalWinningWindow = document.getElementById("final-winning-window");
finalWinningWindow.style.display = "none";
var pauseWindow = document.getElementById("pause-window");
var pauseButton = document.getElementById('pause-game-button');
var initialHP = 200.0;

var player, playerPos, playerWidth, opp, oppPos, oppWidth, playerHPBar, playerHP, oppHPBar, oppHP;
//console.log(windowWidth);
player = document.getElementById("initial-pose-right-ingame");
opp = document.getElementById("initial-pose-left-ingame");

playerHPBar = document.getElementById("player-hp-bar");
playerHP = playerHPBar.getBoundingClientRect().width;
console.log(playerHP);

oppHPBar = document.getElementById("opponent-hp-bar");
oppHP = oppHPBar.getBoundingClientRect().width;

var windowDim = document.getElementById("game-window-layout");
var windowPos = windowDim.getBoundingClientRect();
var offset = windowPos.left;
var playerWin = 0, result;
var curLevel, curLevel1;
var curLevelID, curLevel1ID;

function nextLevel() { //playerWin, curLevelID, curLevel1ID) {
    curLevelID = "level-" + (playerWin+1);
    curLevel1ID = curLevelID + 1;
    if (curLevelID == "level-2")
        console.log("hell");
    console.log(curLevelID, document.getElementById(curLevelID).getBoundingClientRect().display);
    console.log("level : " , playerWin);
    if (playerWin == 5) {
        //final level cleared
        console.log("All levels cleared.");
        finalWinningWindow.style.display = "flex";
    }
    else {
        curLevel = document.getElementById(curLevelID);
        curLevel1 = document.getElementById(curLevel1ID);
        console.log(curLevel, curLevel1);
        curLevel.style.display = "none";
        curLevel1.style.display = "none";
        var i = playerWin + 1;
        curLevel = document.getElementById("level-"+i);
        curLevel1 = document.getElementById("level-"+i+i);
        curLevel.style.display = "block";
        curLevel1.style.display = "block";

        //LEVEL-2
        movePlayers("level-"+i, "level-"+i+i);
        // result = movePlayers();
        if (result == 0) {
            //display you lost window & go to home
            playerWin = 0;
            stopLevel(checkLooser(), i);
        }
        else {
            playerWin++;
            curLevel.style.display = "none";
            curLevel1.style.display = "none";
            nextLevel(playerWin, curLevel.id, curLevel1.id);
        }
    }
}
// var goNext;
// function nextLevel() {
//     if (result == 1)
//         goNext = 1;
//     else
//         goNext = 0;
//     return;
    
// }

function startGame() {
    isGamePaused = false;
    finalWinningWindow.style.display = "none";
    playerHP = initialHP;
    playerHPBar.style.width = initialHP + "px";
    oppHP = initialHP;
    oppHPBar.style.width = initialHP + "px";
    windowPos = windowDim.getBoundingClientRect();
    offset = windowPos.left, playerWin = 0;
    console.log(playerHP, oppHP);

    mouseClick01.currentTime = 0;
    mouseClick01.play();
    document.getElementById("main-window").style.display = "none";
    document.getElementById("fight-window").style.display = "block";
    pauseWindow.style.display = "none";
    var curLevel = document.getElementById("level-1");
    var curLevel1 = document.getElementById("level-11");
    // if (curLevel.id == "level-1") {
        document.getElementById("level-1").style.display = "block";
        document.getElementById("level-11").style.display = "block";
        
        //LEVEL-1
        movePlayers("level-1", "level-11");
        // var result = movePlayers();  //checkLooser() or movePlayers() ?
        if (result == 0) {
            //display you lost window
            playerWin = 0;
            stopLevel(1, 1);
        }
        else {//if (goNext == 1) {
            playerWin++;
            document.getElementById("level-1").style.display = "none";
            document.getElementById("level-11").style.display = "none";
            // document.getElementById("level-1").style.display = "none";
            // curLevel = document.getElementById("level-1");
            // console.log("hello",curLevel.style.display);
            // nextLevel();     //playerWin, curLevel.id, curLevel1.id);
            // curLevel.style.display = "none";
            // curLevel1.style.display = "none";
            // curLevel = document.getElementById("level-2");
            // curLevel1 = document.getElementById("level-22");

            // //LEVEL-2
            // movePlayers("level-2", "level-22");
            // // result = movePlayers();
            // if (result == 0) {
            //     //display you lost window & go to home
            //     playerWin = 0;
            //     stopLevel(1, 2);
            // }
            // else if (goNext == 1) {
            //     playerWin++;
            //     curLevel.style.display = "none";
            //     curLevel1.style.display = "none";
            //     curLevel = document.getElementById("level-3");
            //     curLevel1 = document.getElementById("level-33");
                
            //     //LEVEL-3
            //     movePlayers("level-3", "level-33");
            //     // result = movePlayers();
            //     if (result == 0) {
            //         //display you lost window & go to home
            //         playerWin = 0;
            //         stopLevel(1, 3);
            //     }
            //     else if (goNext == 1) {
            //         playerWin++;
            //         curLevel.style.display = "none";
            //         curLevel1.style.display = "none";
            //         curLevel = document.getElementById("level-4");
            //         curLevel1 = document.getElementById("level-44");

            //         //LEVEL-4
            //         movePlayers("level-4", "level-44");
            //         // result = movePlayers();
            //         if (result == 0) {
            //             //display you lost window & go to home
            //             playerWin = 0;
            //             stopLevel(1, 4);
            //         }
            //         else if (goNext == 1) {
            //             playerWin++;
            //             curLevel.style.display = "none";
            //             curLevel1.style.display = "none";
            //             curLevel = document.getElementById("level-5");
            //             curLevel1 = document.getElementById("level-55");

            //             //LEVEL-5
            //             movePlayers("level-5", "level-55");
            //             // result = movePlayers();
            //             if (result == 0) {
            //                 //display you lost window & go to home
            //                 playerWin = 0;
            //                 stopLevel(1, 5);
            //             }
            //             else if (goNext == 1) {
            //                 playerWin++;
            //                 //display you won & go to home
            //                 console.log("You cleared all levels.");
            //             }
            //         }
            //     }
            // }
        }
    // }
}
// startGame();

var count = 0;
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
// pauseButton.addEventListener('click', pauseGame);

function showRules() {
    mouseClick01.currentTime = 0;
    mouseClick01.play();
    document.getElementById("main-window").style.display = "none";
    document.getElementById("fight-window").style.display = "none";
    document.getElementById("rules-window").style.display = "block";
    pauseWindow.style.display = "none";
}

function resetPosition() {
}

function goToHomePage() {
    isGamePaused = true;
    clearInterval(animationIntervalOpp);
    mouseClick01.currentTime = 0;
    mouseClick01.play();
    playerHPBar.style.width = 200 + "px";
    oppHPBar.style.width = 200 + "px";
    document.getElementById("rules-window").style.display = "none";
    document.getElementById("fight-window").style.display = "none";
    document.getElementById("player-lost-window").style.display = "none";
    document.getElementById("main-window").style.display = "block";
    pauseWindow.style.display = "none";
    finalWinningWindow.style.display = "none";
    // var idd = document.getElementById("player-hp-bar").style.width;
    document.getElementById("player-hp-bar").style.display = "block";
    console.log("hello",playerHPBar.getBoundingClientRect().width);
    console.log("hello",parseInt(playerHPBar.style.width));
}

// movePlayers();

function movePlayers(curLv, curLv1) {
    document.getElementById("main-window").style.display = "none";
    document.getElementById("fight-window").style.display = "block";
    pauseWindow.style.display = "none";
    var curLevel = document.getElementById(curLv);
    var curLevel1 = document.getElementById(curLv1);
    curLevel.style.display = "block";
    curLevel1.style.display = "block";
    console.log("nope : ",playerWin);
    document.body.onkeydown = movePlayerOnKey;
    animateOpponent(playerWin+1);
    
    //updation
    // //console.log(playerHP);
    // playerHPBar.style.width = playerHP + 10 + "px";
    // playerHP = playerHPBar.getBoundingClientRect().width;
    // //console.log(playerHP);
}

function pauseOppAnimation() {
    clearInterval(animationIntervalOpp);
    isGamePaused = true;
}

// Function to resume the opponent's animation
function resumeOppAnimation() {
    isGamePaused = false;
    animateOpp(); // Resume animation from stored position
}

function playerHPDecrement(currentLevel, playerHP) {
    const [a1, a2, a3, a4, a5] = [5, 5, 5, 5, 5];//12, 10, 8, 6];        //Using Destructuring Assignment
    if (currentLevel == 1) {
        if (playerHP < a1)
            return playerHP;
        return a1;
    }
    else if (currentLevel == 2) {
        if (playerHP < a2)
            return playerHP;
        return a2;
    }
    else if (currentLevel == 3) {
        if (playerHP < a3)
            return playerHP;
        return a3;
    }
    else if (currentLevel == 4) {
        if (playerHP < a4)
            return playerHP;
        return a4;
    }
    else if (currentLevel == 5) {
        if (playerHP < a5)
            return playerHP;
        return a5;
    }
    return 0;
}

function oppHPDecrement(currentLevel, oppHP) {
    const [a1, a2, a3, a4, a5] = [17, 17, 17, 17, 17];//14, 11, 8, 5];        //Using Destructuring Assignment
    if (currentLevel == 1) {
        if (oppHP < a1)
            return oppHP;
        return a1;
    }
    else if (currentLevel == 2) {
        if (oppHP < a2)
            return oppHP;
        return a2;
    }
    else if (currentLevel == 3) {
        if (oppHP < a3)
            return oppHP;
        return a3;
    }
    else if (currentLevel == 4) {
        if (oppHP < a4)
            return oppHP;
        return a4;
    }
    else if (currentLevel == 5) {
        if (oppHP < a5)
            return oppHP;
        return a5;
    }
    return 0;
}

function checkLooser() {
    playerHP = playerHPBar.getBoundingClientRect().width;
    oppHP = oppHPBar.getBoundingClientRect().width;
    if (playerHP == 0) {
        return 1;       //player lost
    }
    else if (oppHP == 0)
        return 2;       //opponent lost
    return 0;           //match still ongoing
}

function stopLevel(looser, curLv) {
    clearInterval(animationIntervalOpp);
    if (looser == 1) {
        //player lost
        setTimeout(() => {
            player.src = "mid-defeat-pose-right.png";
            pauseGame();
        }, 100);
        setTimeout(() => {
            var lostWindow = document.getElementById("player-lost-window");
            lostWindow.style.display = "flex";
            console.log("Player lost");
        }, 2000);
        setTimeout(() => {
            playerHPBar.style.width = 200 + "px";
            oppHPBar.style.width = 200 + "px";
        } , 3000);
        result = 0;
    }
    else if (looser == 2) {
        //opponent lost
        setTimeout(() => {
            opp.src = "mid-defeat-pose-left.png";
            pauseGame();
        }, 100);
        setTimeout(() => {
            var winWindow = document.getElementById("player-win-window");
            winWindow.style.display = "flex";
            console.log("Player won");
        }, 2000);
        setTimeout(() => {
            playerHPBar.style.width = 200 + "px";
            oppHPBar.style.width = 200 + "px";
        } , 3000);
        result = 1;
    }
}

// var increOpp, increPlayer;
function movePlayerOnKey(e) {
    if (!isGamePaused) {
        var left1 = player.getBoundingClientRect().left - offset;
        playerWidth = player.getBoundingClientRect().width;
        oppPos = opp.getBoundingClientRect().left - offset;
        // console.log(left1, oppPos);
        var rightRestrictor = left1 + playerWidth/2 <= oppPos && left1 <= windowWidth/2;
        if ((e.key.toUpperCase() == "D") && left1 + playerWidth < windowWidth && rightRestrictor) {
            player.style.left = (left1 + 10) + "px";
        }
        else if (e.key.toUpperCase() == "A" && left1 >= 25) {
            player.style.left = (left1 - 10) + "px";
        }
        else if (e.key == "Shift") {
            player.src = "punching-man-right.png";
            if (checkCollision() == 1) {
                punchRightSound.currentTime = 0;
                punchRightSound.play();
                oppHP = oppHPBar.getBoundingClientRect().width;
                var decrement = oppHPDecrement(playerWin + 1, oppHP);
                oppHPBar.style.width = oppHP - decrement + "px";
                // increOpp = decrement/4;
                // setTimeout(() => {
                //     if (decrement == oppHP)
                //         oppHPBar.style.width = oppHP + increOpp + "px";
                // }, 200); 
                // console.log(oppHP);
                if (checkLooser() == 2) {
                    playerWin++;
                    stopLevel(2, playerWin);       //opponent lost
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

    // console.log(left1);
    // playerHP = playerHPBar.getBoundingClientRect().width;
    // if (left1 >= 50) {
    //     playerHPBar.style.width = playerHP - 10 + "px";
    // }
    // playerHP = playerHPBar.getBoundingClientRect().width;
    // console.log(playerHP);
    //why players are not moving properly in changed window size
    // solution : subtract the offset
    // //console.log(left1, oppPos, playerWidth);
    //console.log(e.key);
    // checkIntersection(playerPos, oppPos);
}

function checkCollision() {
    var playerLeft = player.getBoundingClientRect().left - offset, oppLeft = opp.getBoundingClientRect().left - offset;
    var oneSidedDiff = oppLeft - playerLeft;
    playerWidth = player.getBoundingClientRect().width;
    if (oneSidedDiff >= playerWidth/2 && oneSidedDiff <= playerWidth)
        return 1;       //in punching range
    return 0;           //out of punching range
}

function oppPunch(curLv) {
    if (!isGamePaused) {
        var tryPunch = Math.floor(Math.random() * 500);
        if (tryPunch % 2 != 0 && checkCollision() == 1) {
            opp.src = "punching-man-left.png";
            if (checkCollision() == 1) {
                punchLeftSound.currentTime = 0;
                punchLeftSound.play();
                playerHP = playerHPBar.getBoundingClientRect().width;
                var decrement = playerHPDecrement(curLv, playerHP);
                playerHPBar.style.width = playerHP - decrement + "px";
                // console.log(playerHP);
                // increPlayer = decrement/2;
                // setTimeout(() => {
                //     if (decrement == oppHP)
                //         playerHPBar.style.width = oppHP + increPlayer + "px";
                // }, 200); 
                if (checkLooser() == 1) {
                    stopLevel(1, curLv);       //player lost
                }
            }
            setTimeout(() => {
                opp.src = "initial_pose_left.png";
            }, 250);
        }
    }
}

function animateOpp(point, curLv) {
    clearInterval(animationIntervalOpp); 
    // var loc = opp.getBoundingClientRect();
    let position = opp.getBoundingClientRect().left - offset;
    oppWidth = opp.getBoundingClientRect().width;
    animationIntervalOpp = setInterval(() => {
        if (!isGamePaused) {
            playerPos = player.getBoundingClientRect().left - offset;
            let conditionLeft = position + oppWidth > windowWidth/2 && playerPos + oppWidth/2 <= position;
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
            // //console.log(position);
            oppPunch(curLv);
        }
    }, 10);
}

function animateOpponent(curLv) {
    clearInterval(animationIntervalOpp); // Clear any existing intervals
    // var i = 1;
    function nextMove() {
        // if (isGamePaused && (checkLooser() == 1 || checkLooser() == 2)) return; // Stopping Condition
        var tryMove = Math.floor(Math.random() * 200);
        if (tryMove % 2 == 0) {
            animateOpp(2, curLv);      //move Right
        } else {
            animateOpp(1, curLv);      //move Left
        }
        // i++;
        setTimeout(nextMove, 1500); // Wait 1.5 second before next move
    }
    nextMove();
}


// } );
    
// var e = Math.floor(Math.random() * n);   //Get a random integer between 0 (inclusive) & n (exclusive)

//input in javascript
// let a = window.prompt("enter a value : ");
// //console.log("Entered value : ",a);