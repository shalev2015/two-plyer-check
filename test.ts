// --- CONFIG ---
const TARGET_PLAYERS = 3
Multiplayer_Check.setMax(TARGET_PLAYERS)

console.log(">>> INITIALIZING MULTIPLAYER TEST")
console.log("My Local ID: " + Multiplayer_Check.yourId())

// --- CONNECTION EVENTS ---

Multiplayer_Check.on__PHere(TARGET_PLAYERS, 1000, function () {
    console.log("********************************")
    console.log("STATUS: LOBBY READY")
    console.log("Total Players: " + Multiplayer_Check.playerCount())
    console.log("My Position: P" + Multiplayer_Check.pNum())
    console.log("Device List: " + Multiplayer_Check.arrayOfAllDevices().join(", "))
    console.log("********************************")
})

Multiplayer_Check.onDisconnect(function () {
    console.log("--- DISCONNECT DETECTED ---")
    console.log("Updated Count: " + Multiplayer_Check.playerCount())
    console.log("New Position: P" + Multiplayer_Check.pNum())
    console.log("Remaining IDs: " + Multiplayer_Check.arrayOfAllDevices().join(", "))
})

// --- DIAGNOSTIC POLLING ---
// Logs current state every 5 seconds to catch silent errors
game.onUpdateInterval(5000, function () {
    let id = Multiplayer_Check.yourId()
    let pNum = Multiplayer_Check.pNum()
    let check = Multiplayer_Check.pNumForId(id)

    console.log(">> Ping | Slot: P" + pNum + " | Mapping Valid: " + (pNum == check))
})

// --- INPUT TRIGGER ---
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    console.log(">> MANUAL CHECK")
    console.log("Everyone Here? " + Multiplayer_Check.checkEveryoneHere())
    console.log("Network Map: " + Multiplayer_Check.arrayOfAllDevices().map((id, idx) => "P" + (idx + 1) + ":" + id).join(" | "))
})
