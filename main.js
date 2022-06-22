require('harvester');
require('role.builder');
require('role.upgrader');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	const roles = ['harvester', 'hauler', 'builder', 'upgrader']
	const creepCount = {}
	var worker
    for (const creepName in Game.creeps){
		worker = Game.creeps[creepName]
		creepCount[worker.memory.role] += 1
	}
    var energy = Room.energyAvailable
    var harvesterWork = math.round(energy - 50 / 100)
    for (var harvesterBody = [MOVE]; harvesterBody.length <harvesterWork + 1;) {
        harvesterBody.unshift(WORK)
    }
    var nearSource = creep.pos.findInRange(FIND_SOURCES, 1)
    var openSpot = 0
    nearSource.forEach(function(spot) {
        if (creep.room.lookForAt(LOOK_TERRAIN, spot) == 'plains') {
        openSpot++
        }
    })
    var harvesterName
    var spawnPrio = []
    if (creepCount < creepCount.harvester)
    if (creepCount.harvester < openSpot){
        spawnPrio.unshift({role: 'harvester', body: harvesterBody})
    }
    if (spawnPrio == 'harvester') {
        Game.spawns['spawn1'].spawnCreep(harvesterBody, 'harvester' + harvesterName, {
            memory: {role: 'harvester'}
        });
        harvesterName++
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
	creep.harvester()
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}