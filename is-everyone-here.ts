/**
 * Custom blocks for Multiplayer Sync with Unique ID & P-Num Mapping
 */
//% color="#2695b5" icon="\uf0c0"
//% groups=['Events', 'Status', 'Settings', 'Multiplayer Compactible']
namespace Multiplayer_Check {
    let everyoneHere = false;
    let id = randint(100000, 999999) + control.millis();
    let idList: number[] = [id];
    let lastSeen: { [key: number]: number } = {};
    let maxPlayers = 2;
    let disconnectCallback: () => void = null;

    radio.setGroup(1);
    lastSeen[id] = control.millis();

    // --- EVENTS SECTION ---

    //% block="on player disconnect"
    //% group="Events"
    //% weight=100
    export function onDisconnect(callback: () => void) {
        disconnectCallback = callback;
    }

    //% block="on $numP players join, check every $pollInterval (ms)"
    //% group="Events"
    //% weight=90
    export function onEveryoneHere(numP: number, pollInterval: number, callback: () => void) {
        maxPlayers = Math.max(2, numP);

        radio.onReceivedNumber(function (receivedNumber: number) {
            lastSeen[receivedNumber] = control.millis();

            if (idList.indexOf(receivedNumber) == -1) {
                idList.push(receivedNumber);
                idList = idList.filter((value, index) => idList.indexOf(value) === index);

                if (idList.length >= maxPlayers && !everyoneHere) {
                    everyoneHere = true;
                    callback();
                }
            }
        });

        game.onUpdateInterval(pollInterval, function () {
            let currentTime = control.millis();
            let timeout = pollInterval * 3;

            for (let i = idList.length - 1; i >= 0; i--) {
                let checkId = idList[i];
                if (checkId != id && (currentTime - lastSeen[checkId] > timeout)) {
                    idList.removeAt(i);
                    everyoneHere = false;
                    if (disconnectCallback) disconnectCallback();
                }
            }
            radio.sendNumber(id);
        });
    }

    // --- STATUS SECTION ---

    //% block="everyone here"
    //% group="Status"
    //% weight=100
    export function checkEveryoneHere(): boolean {
        return everyoneHere;
    }

    //% block="current player count"
    //% group="Status"
    //% weight=90
    export function playerCount(): number {
        return idList.length;
    }

    // --- SETTINGS SECTION ---

    //% block="set max number of players $maxNum"
    //% group="Settings"
    //% weight=100
    export function setMax(maxNum: number) {
        maxPlayers = Math.max(2, maxNum);
    }

    // --- MULTIPLAYER COMPACTIBLE SECTION ---

    //% block="my player number (P1-P4)"
    //% group="Multiplayer Compactible"
    //% weight=100
    export function pNum(): number {
        return idList.indexOf(id) + 1;
    }

    //% block="player number for ID $targetId"
    //% group="Multiplayer Compactible"
    //% weight=90
    export function pNumForId(targetId: number): number {
        let index = idList.indexOf(targetId);
        return index === -1 ? 0 : index + 1;
    }
}