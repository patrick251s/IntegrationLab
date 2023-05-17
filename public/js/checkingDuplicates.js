function getDuplicates(oldLaptops, newLaptops) {
    duplicatesIDs = [];
    laptopKeys = Object.keys(newLaptops[0]);
    for(let i=0; i<newLaptops.length; i++) {
        for(let j=0; j<oldLaptops.length; j++) {
            isNewLaptopDuplicated = true;
            for(let k=0; k<laptopKeys.length; k++) {
                if(laptopKeys[k] == "id") continue;
                if(newLaptops[i][laptopKeys[k]] != oldLaptops[j][laptopKeys[k]]) { 
                    isNewLaptopDuplicated = false;
                    break;
                }
            } 
            if(isNewLaptopDuplicated) {
                duplicatesIDs.push(newLaptops[i]["id"]);
                break;
            }
        }
    }
    return duplicatesIDs;
}

function markDuplicatedInTable(duplicatedIDs) {
    duplicatedIDs.forEach(id => {
       $("#tr"+id).css("background-color", "#ff4500");
    });
}


