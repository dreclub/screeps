var roleBuilder = {
//var LastPos = creep.pos;
    /** @param {Creep} creep **/
    run: function(creep) {
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        if(targets.length > 0) {
				creep.say('🚧 build');
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
	    }
	    else {
			if (creep.store.getFreeCapacity() == 0){
				creep.say('🔄 harvest');
	        	for (var traffic = 0; creep.store.getFreeCapacity() > 0;) {
                	var sources = creep.room.find(FIND_SOURCES);
                	if(creep.harvest(sources[traffic]) == ERR_NOT_IN_RANGE) {
                    	creep.moveTo(sources[traffic], {visualizePathStyle: {stroke: '#ffaa00'}});
                	}
                	var secondLastPos = lastPos
                	var lastPos = creep.pos
                	if(secondLastPos == creep.pos) {
                    	traffic++;
                	}
	        	}
	        }
	    }    //creep.memory.lastpos = {JSON.stringify(creep.pos)};
	}
};

module.exports = roleBuilder;