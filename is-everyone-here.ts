/**
 * Custom blocks
 */
namespace Two_Player_Check {

    let everyoneHere = false;
    radio.setGroup(1)
    enum RadioMessages {
        here = 15547,
        p2Joined = 49434
    }

    //% block
    export function onEveryoneHereCheckEvery(pollInterval: number, callback: () => void) {
        radio.onReceivedMessage(RadioMessages.p2Joined, function () {
            if (everyoneHere) {
                return;
            }
            everyoneHere = true;
            clearInterval(theInterval);
            callback();
        })

        radio.onReceivedMessage(RadioMessages.here, function () {
            radio.sendMessage(RadioMessages.p2Joined);
        })
    }

    let theInterval = -1

    function startPolling() {
        theInterval = setInterval(() => {
            radio.sendMessage(RadioMessages.here)
        }, 1000)
    }
}
