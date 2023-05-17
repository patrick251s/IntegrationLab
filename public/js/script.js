let laptops = []; 
let isEditModeEnabled = false;
let isEditProcess = false;
let featuresForNumberValidation = [];

$("#loadDataBTN").click(function() {
    $.ajax({
        url: "katalog.txt",
        cache: false
    })
    .done(function(data) {
        divideText(data);
    })
    .fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas wczytawania danych z pliku TXT!");
    });
});

function divideText(data) {
    isEditProcess = false;
    let dataLines = data.split("\n");
    localLaptops = [];
    let rowCounter = 0;
    dataLines.forEach(element => {
        let laptop = new Laptop();
        rowCounter++;
        let singleLine = element.split(";");
        let singleLineLength = singleLine.length; //16, ostatnim jest znak końca linii lub pliku
        let lineCounter = 0;
        let singleLineValues = [rowCounter];
        singleLine.forEach(el => {
            lineCounter++;
            if(lineCounter !== singleLineLength) {
                singleLineValues.push(el);
            }
        });
        for(let i=0; i<Object.keys(laptop).length; i++) {
            laptop[Object.keys(laptop)[i]] = singleLineValues[i];
        }
        localLaptops.push(laptop);
    });
    duplicatedIDs = getDuplicates(laptops, localLaptops);
    laptops = localLaptops;
    showLaptopTable();
    markDuplicatedInTable(duplicatedIDs);
    showDuplicatedInfo("success", "Dane zostały wczytane z pliku TXT", laptops.length-duplicatedIDs.length, duplicatedIDs.length);
}

function showLaptopTable() {
    if($("#laptopTableDIV").length) $("#laptopTableDIV").remove();
    $("main").append("<div class='pt-5 justify-content-center col-12' id='laptopTableDIV'></div>");
    let HTML = "<table id='laptopTable' class='table table-bordered text-light'><thead><tr>";
    headers = ["Producent", "Przekątna", "Rozdzielczość", "Powierzchnia", "Dotykowy", "Procesor", "Liczba rdzeni", "Pr. taktowania MHz", "RAM", "Pojemność dysku", "Rodzaj dysku", "Układ graficzny", "Pamięć ukł. graf.", "System oper.", "Napęd fiz."];
    for(let i=0; i<headers.length; i++) {
        HTML += "<th scope='col'>"+headers[i]+"</th>";
    }
    HTML += "</tr></thead><tbody>";
    laptops.forEach(laptop => {
       HTML += "<tr id=tr"+laptop.id+">";
       for(let i=1; i<Object.keys(laptop).length; i++) {
           let name = laptop[Object.keys(laptop)[i]];
           let key = Object.keys(laptop)[i];
           let background = "";
           if(checkNewDataCorrectness(name, laptop.id, key) === -1) background = "bg-danger";
           HTML += "<td id=\""+laptop.id+"?"+key+"\" class=\""+background+"\">"+name+"</td>";
       } 
       HTML += "</tr>";
    });
    HTML += "</tbody></table>";
    $("#laptopTableDIV").html(HTML);
    
    //Kliknięcie komórki tabeli
    $("#laptopTable").on("click", "td", function() {
        if(!isEditModeEnabled) return;
        isEditModeEnabled = false;
        isEditProcess = true;
        $(this).removeClass("tdHovered");
        let thisTD = $(this);
        let clickedID = $(this).attr("id");
        let clickedValue = $(this).html();
        let fields = clickedID.split("?");
        let laptopID = fields[0];
        let laptopFeature = fields[1];
        let oldValue = thisTD[0].innerHTML;
        $(this).html("<input type=\"text\" class=\"form-control\" value=\""+clickedValue+"\"><button class=\"btn btn-primary\" id=\"saveChangesBTN\">Save</button>");
            
        //Naciśnięcie przycisku Save (zmiana wartości)
        $("#saveChangesBTN").on("click", function() {
            let inputValue = $("#laptopTable td input").val();
            saveChanges(laptopID, laptopFeature, inputValue);
            thisTD.html(inputValue);
            isEditProcess = false;
            checkEditModeSwitch(); 
            //Zmiana koloru edywanego rekordu
            if(oldValue != inputValue) {
                $("#tr"+laptopID).css("background-color", "#3871FD");
            }
            if(checkNewDataCorrectness(inputValue, laptopID, laptopFeature) === -1) {
                thisTD.addClass("bg-danger");
            }
            else thisTD.removeClass("bg-danger");
        });
    });

    //Najechanie na komórkę tabeli
    $("#laptopTable").on("mouseover", "td", function() {
        if(!isEditModeEnabled) return;
        $(this).css("cursor","pointer"); 
        $(this).addClass("tdHovered");
    });
    
    //Zjechanie z komórki tabeli
    $("#laptopTable td").mouseleave(function() {
        $(this).css("cursor","auto"); 
        $(this).removeClass("tdHovered");
      });
}

$("#editModeSwitch").on('change', function() {
    checkEditModeSwitch();
});

function checkEditModeSwitch() {
    if($("#editModeSwitch").is(':checked') && !isEditProcess) {
        enableEditMode();
    }
    else {
        disableEditMode();
    }
}

function enableEditMode() {
    $("#editModeLabel").html("Tryb edycji odblokowany");
    isEditModeEnabled = true;
}

function disableEditMode() {
    $("#editModeLabel").html("Tryb edycji zablokowany");
    isEditModeEnabled = false;
}

function saveChanges(laptopID, laptopFeature, newValue) {
    for(let i=0; i<laptops.length; i++) {
        if(laptops[i].id == laptopID) {
           laptops[i][laptopFeature] = newValue;
           break;
       } 
    }
}

function checkNewDataCorrectness(newValue, laptopID, laptopFeature) {
    if(newValue === "") return -1;
    
    if(["coreNumber", "timingSpeed"].includes(laptopFeature)) {
        let newValueInt = parseInt(newValue);
        if(!Number.isInteger(newValueInt) || newValueInt < 1) return -1;
    }
    else if(laptopFeature === "isTactile") {
        if(newValue.toUpperCase() !== "TAK" && newValue.toUpperCase() !== "NIE") return -1;
    }
    else if(laptopFeature === "diagonal") {
        let lastChar = String(newValue).slice(-1);
        let inchChar;
        let inchValue;
        if(lastChar === '"') {
            inchChar = newValue.slice(-1);
            inchValue = newValue.slice(0, -1);
        }
        else if(lastChar === "'") {
            inchChar = newValue.slice(-2);
            inchValue = newValue.slice(0, -2);
        }
        if((inchChar !== '"' && inchChar !== "''") || parseInt(inchValue) < 1) return -1;
    }
    else if(laptopFeature === "discType") {
        if(newValue.toUpperCase() !== "SSD" && newValue.toUpperCase() !== "HDD") return -1;
    }
    else if(laptopFeature === "resolution") {
        let ifStringContainChar = String(newValue).includes("x");
        if(!ifStringContainChar) return -1;
        let dimensions = newValue.split("x");
        let height = parseInt(dimensions[0]);
        let width = parseInt(dimensions[1]);
        if((!Number.isInteger(height) || height < 1) || (!Number.isInteger(width) || width < 1)) return -1;
    }
    else if(["discCapacity", "ram", "graphicsCardMemory"].includes(laptopFeature)) {
        if(newValue.length < 2) return -1;
        let memorySize = String(newValue).slice(-2);
        let memoryValue = parseFloat(String(newValue).slice(0, -2));
        if((!memorySize.includes("GB") && !memorySize.includes("MB") && !memorySize.includes("TB")) || isNaN(memoryValue) || memoryValue < 0) return -1;
    }
}

$("#saveDataBTN").click(function() {
    if(laptops.length === 0) {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do pliku lub plik nie został załadowany!");
        return;
    }
    $.post('/saveToFile', {
        laptops: JSON.stringify(laptops),
        _token: $('meta[name="csrf-token"]').attr('content')
        }, 
        function(data, status) {
            if(data == true) showSimpleInfo("success", "Dane zostały zapisane do pliku TXT");
        }
    ).fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do pliku lub plik nie został załadowany!");
    });
});

$("#saveXMLDataBTN").click(function() {
    if(laptops.length === 0) {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do pliku lub plik nie został załadowany!");
        return;
    }
    $.post("/saveToXMLFile", {
        laptops: JSON.stringify(laptops),
        _token: $('meta[name="csrf-token"]').attr('content')
        }, 
        function(data, status) {
            if(data == true) showSimpleInfo("success", "Dane zostały zapisane do pliku XML");
        }
    ).fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do pliku lub plik nie został załadowany!");
    });
});

$("#loadXMLDataBTN").click(function() {
    $.ajax({
        url: "katalog.xml",
        cache: false,
        dataType: "text"
    })
    .done(function(data) {
        getObjectsFromXML(data);
        console.log(data);
    })
    .fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas wczytywania danych z pliku XML!");
    });
});

function getObjectsFromXML(data) {
    $.post("/readFromXMLFile", {
        xmlData: data,
        _token: $('meta[name="csrf-token"]').attr('content')
        }, 
        function(data, status) {
            console.log(data);
            convertDataToLaptopObject(data);
        }, 
        "json"
    ).fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas wczytywania danych z pliku XML!");
    });
}

function convertDataToLaptopObject(data) {
    let laptopsFromXML = data.laptop;
    if(laptopsFromXML.length === 0) return;
    localLaptops = [];
    laptopsFromXML.forEach(laptopXML => {
       let laptop = new Laptop();
       laptop.id = parseInt(laptopXML["@attributes"].id);
       laptop.producer = laptopXML.manufacturer;
       laptop.diagonal = laptopXML.screen.size;
       laptop.resolution = laptopXML.screen.resolution;
       laptop.surface = laptopXML.screen.type;
       laptop.isTactile = laptopXML.screen["@attributes"].touch;
       laptop.procesor = laptopXML.processor.name;
       laptop.coreNumber = laptopXML.processor.physical_cores;
       laptop.timingSpeed = laptopXML.processor.clock_speed;
       laptop.ram = laptopXML.ram;
       laptop.discCapacity = laptopXML.disc.storage;
       laptop.discType = laptopXML.disc["@attributes"].type;
       laptop.graphicsCard = laptopXML.graphic_card.name;
       laptop.graphicsCardMemory = laptopXML.graphic_card.memory;
       laptop.operatingSystem = laptopXML.os;
       laptop.physicalDrive = laptopXML.disc_reader;
       localLaptops.push(laptop);
    });
    localLaptops = checkLaptopsValuesAfterCovenrtingFromXML(localLaptops);
    duplicatedIDs = getDuplicates(laptops, localLaptops);
    laptops = localLaptops;
    showLaptopTable();
    markDuplicatedInTable(duplicatedIDs);
    showDuplicatedInfo("success", "Dane zostały wczytane z pliku XML", laptops.length-duplicatedIDs.length, duplicatedIDs.length);
}

function checkLaptopsValuesAfterCovenrtingFromXML(localLaptops) {
    localLaptops.forEach(laptop => {
       let objectKeys = Object.keys(laptop);
       objectKeys.forEach(key => {
           //Sprawdzamy czy wartość jest obiektem {}
           if(typeof laptop[key] === 'object' && laptop[key] !== null) laptop[key] = "";
       });
    });
    return localLaptops;
}

$("#saveDatabaseBTN").click(function() {
    if(laptops.length === 0) {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do bazy danych lub plik nie został załadowany!");
        return;
    }
    $.post("/saveToDatabase", {
        laptops: JSON.stringify(laptops),
        _token: $('meta[name="csrf-token"]').attr('content')
        }, 
        function(data, status) {
            console.log(data);
            if(data == true) showSimpleInfo("success", "Dane zostały zapisane do bazy danych!");
            else showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do pliku lub plik nie został załadowany!");
        }
    ).fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas zapisywania danych do bazy danych!");
    });
});

$("#loadDatabaseBTN").click(function() {
    $.get("/loadFromDatabase", {
        _token: $('meta[name="csrf-token"]').attr('content')
        }, 
        function(data, status) {
            if(data.lenght === 0) {
                showSimpleInfo("danger", "Brak laptopów w bazie danych!");
            }
            duplicatedIDs = getDuplicates(laptops, data);
            saveLaptopObjectFromDatabase(data);
            showLaptopTable();
            markDuplicatedInTable(duplicatedIDs);
            showDuplicatedInfo("success", "Dane zostały wczytane z bazy danych", laptops.length-duplicatedIDs.length, duplicatedIDs.length);
        }, "JSON"
    ).fail(function() {
        showSimpleInfo("danger", "Wystąpił błąd podczas wczytawania danych z bazy danych!");
    });
});

function saveLaptopObjectFromDatabase(laptopsData) {
    localLaptops = [];
    laptopsData.forEach(laptopData => {
        laptop = new Laptop();
        laptopKeys = Object.keys(laptopsData[0]);
        laptopKeys.forEach(laptopKey => {
            laptop[laptopKey] = laptopData[laptopKey];
        });
        localLaptops.push(laptop);
    });
    laptops = localLaptops;
}