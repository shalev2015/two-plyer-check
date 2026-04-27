/**
 * Custom blocks for Multiplayer Sync
 */
//% color="#2695b5" icon="\uf0c0"
//% groups=['Events', 'Status', 'Settings']
namespace Multiplayer_Check {
    let everyoneHere = false;
    let id = randint(100000, 999999);
    let idList: number[] = [id];
    let pollIntervalId = -1;
    let maxPlayers = 2;

    radio.setGroup(1);

    enum RadioMessages {
        here = 15547
    }

    // --- SETTINGS SECTION ---

    //% block="set max number of players $maxNum"
    //% maxNum.defl=2
    //% group="Settings"
    //% weight=100
    export function setMax(maxNum: number) {
        maxPlayers = maxNum;
    }

    // --- STATUS SECTION ---

    //% block="everyone here"
    //% group="Status"
    //% weight=90
    export function yeah(): boolean {
        return everyoneHere;
    }

    //% block="max number of players"
    //% group="Status"
    //% weight=80
    export function no() : number {
        return maxPlayers;
    }

    // --- EVENTS SECTION ---

    //% block="on $numP players join, check every $pollInterval (ms)"
    //% numP.defl=2
    //% pollInterval.defl=1000
    //% group="Events"
    //% weight=80
    //% draggableParameters="reporter"
    export function onEveryoneHere(numP: number, pollInterval: number, callback: () => void) {
        maxPlayers = numP;

        radio.onReceivedNumber(function (receivedNumber: number) {
            if (everyoneHere) return;

            if (receivedNumber != id && idList.indexOf(receivedNumber) == -1) {
                idList.push(receivedNumber);
            }

            if (idList.length >= maxPlayers) {
                everyoneHere = true;
                clearInterval(pollIntervalId);
                callback();
            }
        });

        radio.onReceivedMessage(RadioMessages.here, function () {
            radio.sendNumber(id);
        });

        pollIntervalId = setInterval(() => {
            if (!everyoneHere) {
                radio.sendMessage(RadioMessages.here);
                radio.sendNumber(id);
            }
        }, pollInterval);
    }
}
