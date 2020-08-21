//this program is the second Microbit for the game Battleship

//Turn = 0 is the first phase of the game, setting the position of the boats
//Turn = 2 is th second phase of the game, attacking the opponents boats

input.onButtonPressed(Button.A, function () {
    if (Turn == 0) {
        basic.clearScreen()
        MoveH()
    } else if (Turn == 2) {
        basic.clearScreen()
        MoveHo()
    }
})
//If button A is pressed and the variable Turn is equal to 0
//you will do the first part of the game which is moving the
//positioning of the boats by clearing the screen and calling
//up MoveH(), if Turn is equal to 2, you do the second part of
//the game which is selecting where to hit by clearing the screen 
//and calling MoveHO()
input.onButtonPressed(Button.B, function () {
    if (Turn == 0) {
        basic.clearScreen()
        MoveV()
    } else if (Turn == 2) {
        basic.clearScreen()
        MoveVe()
    }
})
//If button B is pressed, it is similar to button A that if
//Turn is equal to 0 it is the first part of the game where you
//clear the screen and call MoveV(). If Turn is equal to 2
//clear screen and call MoveVe()
input.onButtonPressed(Button.AB, function () {
    if (Turn == 0) {
        basic.clearScreen()
        SaveBoat()
    } else if (Turn == 2) {
        SaveHit()
    } else if (Turn == 4) {
        basic.clearScreen()
        Clear_Variable()
        led.plot(x,y)
        Boat3()
    }
})
//If button A&B is pressed, same as button A, if Turn is equal to 0
// clear screen and call SaveBoat(). If Turn is equal to 2, call 
//SaveHit() and if Turn is equal to 4 restart the game by
//clearing the screen, variable and plot x,y and calling the function Boat3()
input.onGesture(Gesture.Shake, function () {
    if (Turn == 0) {
    	
    } else if (Turn == 2) {
        Check()
    }
})
//If the microbit is shaken, in the first part if Turn is equal to 0
// do nothing if Turn is equal to 2 call function Check()
function MoveH () {
    if (x == 5 - Boat) {
        x = -1
    }
    x += 1
    for (let index = 0; index <= Boat - 1; index++) {
        led.plot(index + x, y)
    }
}
//This is to move the boat, it is to see if the boat has gone
//past the edge of the microbit. If so set x to -1 and start moving
//x 1 at a time. For example if Boat is equal to three, 5-3 is 2, this 
//then knows that x can only be 2 before it has to restart.
function MoveV () {
    if (y == 4) {
        y = -1
    }
    y += 1
    for (let index2 = 0; index2 <= Boat - 1; index2++) {
        led.plot(index2 + x, y)
    }
}
// This is the same function as MoveH() except it moves vertically
//There is no subtraction as the boat only takes up one LED vertically
function Boat1 () {
    led.plot(0, 0)
    Boat = 1
}
//When this function is called it plots the LED at 0,0 and change
//Boat to 1.
function Boat2 () {
    led.plot(0, 0)
    led.plot(1, 0)
    Boat = 2
}
//This is the same as above but Boat is now 2
function Boat3 () {
    led.plot(0, 0)
    led.plot(1, 0)
    led.plot(2, 0)
    Boat = 3
}
//This is the same as above but Boat is now 3
function Boat1Save () {
    PosBoat1 = "" + x + y
    SetBoatComplete()
}
//The positioning(coordinates) of Boat1 is saved in a string
// and SetBoatComplete() is called.
function Boat2Save () {
    PosBoat2 = "" + x + y + (x + 1) + y
    x = 0
    y = 0
    Boat1()
}
//This is the same as above but two sets of coordinaters are
// joined in the string, the second coordinate has the first 
//x coordinate is the same but added 1 because it is the one next
//to it and the y is the same as the boat is horizantally placed
//Than calling Boat1() to bring up the next boat.
function Boat3Save () {
    PosBoat3 = "" + x + y + (x + 1) + y + (x + 2) + y
    x = 0
    y = 0
    Boat2()
}
//This is the same as above but the third coordinate is x + 2
//As it is 2 coordinates over from the first x as the boat is 
//3 wide, Boat2() is called to bring up the next boat.
function SaveBoat () {
    if (Boat == 1) {
        Boat1Save()
    } else if (Boat == 2) {
        Boat2Save()
    } else if (Boat == 3) {
        Boat3Save()
    }
}
//This function calls each of the functions that save the coordinates 
//of the boat.
function SetBoatComplete () {
    radio.sendValue(PosBoat1, 1)
    radio.sendValue(PosBoat2, 2)
    radio.sendValue(PosBoat3, 3)
    Turn = 1
}
//This function sends the cooridnates the the other micro bit and
//sending the length of the boat
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 10) {
        Turn = 2
        basic.clearScreen()
        x2 = 0
        y2 = 0
        led.plot(x2, y2)
//If this microbit receives the number 10, it sets Turn to 2
//and plots x2,y2 at 0,0. This allows the microbit to enable
//the functions that show it is microbit 2's turn to go.
    } else if (receivedNumber == 30) {
        HOLD = 1
        basic.clearScreen()
        basic.showString("HIT")
        basic.pause(200)
        basic.showString("Go")
        HOLD = 0
//If they recieve the number 30, HOLD will be changed to 1
//the screen will be cleared and will show 'Hit', then if
//the variable Stop does not equal 1, show go and then 
//change HOLD to 0, This is to show that the other user has hit
//your boat and now it is their turn to go
    } else if (receivedNumber == 40) {
        HOLD = 1
        basic.clearScreen()
        basic.showString("SAFE")
        basic.pause(200)
        if (Stop != 1) {
            basic.showString("Go")
        }
        HOLD = 0
//If they receive 40, Hold will be set to 1, then the screen
//cleared and shown 'safe' then 'go'. This is to show that the
//other user did not hit your boat and it is your time to go
    } else if (receivedNumber == 50) {
        HOLD = 1
        Stop = 1
        basic.clearScreen()
        basic.showString("You Lose")
        basic.pause(200)
        Turn = 4
    }
})
//If they receive 50, HOLD turns to 1, Stop will turn to 1
//signifying, that 'Go' should not appear. The screen will
//clear and 'You Lose' will be shown and Turn to 4
radio.onReceivedValue(function (name, value) {
    if (value == 1) {
        PosBoat12 = name
    } else if (value == 2) {
        PosBoat22 = name
    } else if (value == 3) {
        PosBoat32 = name
    }
    Ready = 1
})
//This function changes the PosBoat12 to the name which was sent
//from the first microbit and the same for the other two.
function MoveHo () {
    if (x2 == 4) {
        x2 = -1
    }
    x2 += 1
    led.plot(x2, y2)
}
//This function moves the x coordinate around by 1 each time 
//but if the x2 is 4 meaning against the edge of the screen 
//then it changes x2 to -1.
function MoveVe () {
    if (y2 == 4) {
        y2 = -1
    }
    y2 += 1
    led.plot(x2, y2)
}
//This is the same as above but it is for moving vertically
function SaveHit () {
    SavedHit = "" + x2 + y2
}
function HitAction () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(200)
    basic.showString("HIT")
    radio.sendNumber(35)
    basic.clearScreen()
}
//If the user hits a boat, teh screen will light up and display
//'Hit', then the radio Number was set to 35
function Check () {
    CheckMiss = 0
    for (let index4 = 0; index4 <= Miss.length / 2 - 1; index4++) {
        if (Miss.substr(index4 * 2, 2) == SavedHit) {
            CheckMiss = 1
        }
    }
    HOLD = 1
    if (HitBoat1 == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (HitBoat2.substr(0, 2) == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (HitBoat2.substr(2, 2) == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (HitBoat3.substr(0, 2) == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (HitBoat3.substr(2, 2) == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (HitBoat3.substr(4, 2) == SavedHit) {
        basic.showIcon(IconNames.No)
    } else if (CheckMiss == 1) {
        basic.showIcon(IconNames.No)
    } else {
        Send()
    }
    HOLD = 0
    basic.pause(100)
    basic.clearScreen()
}
//This function checks if the user has already chosen that coordinate. 
//First set checkMiss to 0 and for the last coordinate in the Miss string, 
//if that was in the SavedHit than display an X on the screen. The next If 
//loop is if any of the coordinates is already in SavedHit, if yes, then show 
//an X on the screen. If not, call the function Send(). Then at the end pause 
//the screen and then clear it.
function Send () {
    HOLD = 1
    if (PosBoat12 == SavedHit) {
        HitAction()
        HitBoat1 = "" + x2 + y2
    } else if (PosBoat22.substr(0, 2) == SavedHit || PosBoat22.substr(2, 2) == SavedHit) {
        HitAction()
        if (PosBoat22.substr(0,2) == SavedHit){
            HitBoat2 = "" + x2 + y2 + HitBoat2
        } else {HitBoat2 = "" + HitBoat2 + x2 + y2}
    } else if (PosBoat32.substr(0,2) == SavedHit || (PosBoat32.substr(2, 2) == SavedHit || PosBoat32.substr(4, 2) == SavedHit)) {
        HitAction()
        if (PosBoat32.substr(0,2) == SavedHit) {
            HitBoat3 = "" + x2 + y2 + HitBoat3
        } else if (PosBoat32.substr(4,2) == SavedHit) {
            HitBoat3 = "" + HitBoat3 +x2 + y2
        } else if (HitBoat3 == PosBoat32.substr(0,2)) {
            HitBoat3 = "" + HitBoat3 +x2 + y2    
        } else if (HitBoat3 == PosBoat32.substr(4,2)) {
            HitBoat3 = "" +x2 + y2 + HitBoat3 
        } else {
            HitBoat3a = HitBoat3.substr(0,2)+ x2 + y2+ HitBoat3.substr(2,4)
            HitBoat3 = HitBoat3a}
    } else {
        basic.showString("MISS")
        radio.sendNumber(45)
        Miss = "" + Miss + x2 + y2
    }
    HOLD = 0
    x2 = 0
    y2 = 0
    radio.sendNumber(15)
    led.plot(x2, y2)
}
//This function is to see if the user has hit the other player's 
//boat. First, if the positionboat12, or the first user's 
//positioning is equal to the save position, call the function 
//HitAction and save the coordinates in the string. Else if either 
//the first coordinate of the second boat, or the second coordinate 
//of the second boat is equal to the save position then call the function 
//HitAction and save the coordinates in the string. Else if either the first 
//coordinate of the third boat, or the second coordinate of the third boat or 
//the third coordinate of the third boat is equal to the SavedBoats, then call 
//HitAction and add it to the string. Else if none of those, display string 'Miss', 
//send the number 45 and add it to the string. After all this set Hold to 0, Turn to 
//3, x2 to 0, y2 to 0 and send the number 15. This function is important as it is 
//checking if the user hit the right position.
function EndGame () {
    basic.clearScreen()
    basic.showString("YOU WIN")
    radio.sendNumber(55)
    Turn = 4
}
//This function clears the screen, displays'You Win' and sends
//the number 50 and changes Turn to 4 if the user won
function Clear_Variable () {
    Ready = 0
    PosBoat32 = ""
    PosBoat22 = ""
    PosBoat12 = ""
    HitBoat3 = ""
    HitBoat3a = ""
    HitBoat2 = ""
    HitBoat1 = ""
    Miss = ""
    CheckMiss = 0
    PosBoat3 = ""
    PosBoat2 = ""
    y = 0
    x = 0
    PosBoat1 = ""
    SavedHit = ""
    Stop = 0
    Turn = 0
    Boat = 0
    HOLD = 0
    CheckMiss2 = 0
}
//This function resets the variables when the users want to
//restart the games
basic.forever(function () {
    if (Turn == 1 && Ready == 1) {
        Ready = 0
        basic.clearScreen()
        basic.showString("W")
    }
//If both users have submited their boat positioning 
//the user of the microbit second bit is shown "W" for Wait 
// as the first user chooses the location.  The user needs to 
// until the send Number = 10 to continue with the users term.
    if (Turn == 0) {
        for (let index3 = 0; index3 <= PosBoat3.length / 2 - 1; index3++) {
            xx = parseFloat(PosBoat3.substr(index3 * 2, 1))
            yy = parseFloat(PosBoat3.substr(index3 * 2 + 1, 1))
            led.plotBrightness(xx, yy, 100)
        }
        for (let index32 = 0; index32 <= PosBoat2.length / 2 - 1; index32++) {
            xx = parseFloat(PosBoat2.substr(index32 * 2, 1))
            yy = parseFloat(PosBoat2.substr(index32 * 2 + 1, 1))
            led.plotBrightness(xx, yy, 100)
        }
        for (let index33 = 0; index33 <= PosBoat1.length / 2 - 1; index33++) {
            xx = parseFloat(PosBoat1.substr(index33 * 2, 1))
            yy = parseFloat(PosBoat1.substr(index33 * 2 + 1, 1))
            led.plotBrightness(xx, yy, 100)
        }
//This function is used at the begning of the game when Turn is
//1, it plots the positioning of each boat and keeping them there
//at a low brightness untill the game.        
    } else if (Turn == 2) {
        if (HOLD == 0) {
            if (HitBoat1 == PosBoat12) {
                led.plotBrightness(parseFloat(HitBoat1.substr(0, 1)), parseFloat(HitBoat1.substr(1, 1)), 255)
            }
//If you hit the first boat plot it at full brightness
            if (HitBoat2 == PosBoat22) {
                led.plotBrightness(parseFloat(HitBoat2.substr(0, 1)), parseFloat(HitBoat2.substr(1, 1)), 255)
                led.plotBrightness(parseFloat(HitBoat2.substr(2, 1)), parseFloat(HitBoat2.substr(3, 1)), 255)
//If you have hit the whole 2nd boat plot it at full brightness
            } else if (HitBoat2.length >= 2) {
                led.plotBrightness(parseFloat(HitBoat2.substr(0, 1)), parseFloat(HitBoat2.substr(1, 1)), 150)
            }
//If you have hit one coordinate of the 2nd boat plot it at 75% brightness
            if (HitBoat3 == PosBoat32) {
                led.plotBrightness(parseFloat(HitBoat3.substr(0, 1)), parseFloat(HitBoat3.substr(1, 1)), 255)
                led.plotBrightness(parseFloat(HitBoat3.substr(2, 1)), parseFloat(HitBoat3.substr(3, 1)), 255)
                led.plotBrightness(parseFloat(HitBoat3.substr(4, 1)), parseFloat(HitBoat3.substr(5, 1)), 255)
//If you have hit the whole third boat plot it at full brightness
            } else if (HitBoat3.length == 2) {
                led.plotBrightness(parseFloat(HitBoat3.substr(0, 1)), parseFloat(HitBoat3.substr(1, 1)), 150)
//If you have missed the coordinate plot it at 25% brightness
            } else if (HitBoat3.length == 4) {
                led.plotBrightness(parseFloat(HitBoat3.substr(0, 1)), parseFloat(HitBoat3.substr(1, 1)), 150)
                led.plotBrightness(parseFloat(HitBoat3.substr(2, 1)), parseFloat(HitBoat3.substr(3, 1)), 150)
            }
//If you have not hit the whole third boat plot it at 75% brightness 
            if (Miss.length >= 2) {
                for (let index22 = 0; index22 <= Miss.length / 2 - 1; index22++) {
                    led.plotBrightness(parseFloat(Miss.substr(index22 * 2, 1)), parseFloat(Miss.substr(index22 * 2 + 1, 1)), 50)
                }
            }
//If you have missed the coordinate plot it at 25% brightness
            if (HitBoat1 == PosBoat12 && (HitBoat2 == PosBoat22 && HitBoat3 == PosBoat32)) {
                EndGame()
            }
//If you have hit all of the boats call the function EndGame()
        }
    }
})
let Ready = 0//If the other person won the game,ready will turn to 1 to end the game
let PosBoat32 = ""//Empty positioning of the other user's positioning of Boats
let PosBoat22 = ""
let PosBoat12 = ""
let HitBoat3 = ""//The coordintates that the user has hit of the other persons boats 
let HitBoat3a = ""
let HitBoat2 = ""
let HitBoat1 = ""
let Miss = ""//Empty list of coordinates they have missed
let CheckMiss = 0//When checkmiss turns to 1 something different will happen 
let PosBoat3 = ""//The position the first user chose for their boats
let PosBoat2 = ""
let y = 0//Starting of the coordinates
let x = 0//Starting of the coordinates
let PosBoat1 = ""
let SavedHit = ""
let Stop = 0
let y2 = 0//Starting of the coordinates
let x2 = 0//Starting of the coordintates
let Turn = 0//Signifys the different parts of the games
let Boat = 0//Length of boats
let HOLD = 0
let CheckMiss2 = 0
HOLD = 0
let yy;
let xx;
Boat3() // The Game starts here by calling the Function that sets the
// position of Boat 3
