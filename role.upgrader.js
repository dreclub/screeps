var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var secondLastPos = lastPos
        var lastPos = creep.pos
        var traffic
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        traffic = 0
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(secondLastPos == creep.pos) {
                traffic++
            }
            if(creep.harvest(sources[traffic]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[traffic], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;