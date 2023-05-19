let restLaptops = [];

$("#showLaptopAmountByProducerBTN").click(function() {
    let producerName = $("#producerNameSelect").find(":selected").val();
    if(producerName === "") return;
    $.get('/getLaptopAmountByProducer', {
        producerName: producerName
        }, 
        function(data, status) {
            let news = "Liczba laptopów producenta "+producerName+" = <b>"+data+"</b>";
            $("#producerResult").html(news);
        }
    ).fail(function() {
        $("#producerResult").html("Wystąpił błąd podczas pobierania danych!");
    });
});

$("#showLaptopAmountByMatrixBTN").click(function() {
    let matrix = $("#matrixResolutionSelect").find(":selected").val();
    if(!matrix.includes("x")) return;
    let matrixValues = matrix.split("x");
    $.get('/getLaptopAmountByMatrix', {
        matrixValue1: matrixValues[0],
        matrixValue2: matrixValues[1]
        }, 
        function(data, status) {
            console.log(data);
            let news = "Liczba laptopów o proporcji "+matrix+" = <b>"+data+"</b>";
            $("#matrixResult").html(news);
        }
    ).fail(function() {
        $("#matrixResult").html("Wystąpił błąd podczas pobierania danych!");
    });
});

$("#showLaptopListByMatrixTypeBTN").click(function() {
    let matrixType = $("#matrixTypeSelect").find(":selected").val();
    if(matrixType === "") return;
    $.getJSON('/getLaptopListByMatrix', {
        matrixType: matrixType
        }, 
        function(data, status) {
            showTableFromRest(data);
        }
    ).fail(function() {
        $("#matrixTypeList").html("Wystąpił błąd podczas pobierania danych!");
    });
});

function showTableFromRest(newRestLaptops) {
    if($("#matrixTypeList").length) $("#matrixTypeList").remove();
    $("main").append("<div class='pt-5 justify-content-center col-12' id='matrixTypeList'></div>");
    let HTML = "<table id='laptopTable' class='table table-bordered text-light'><thead><tr>";
    let headers = ["Producent", "Przekątna", "Rozdzielczość", "Powierzchnia", "Dotykowy", "Procesor", "Liczba rdzeni", "Pr. taktowania MHz", "RAM", "Pojemność dysku", "Rodzaj dysku", "Układ graficzny", "Pamięć ukł. graf.", "System oper.", "Napęd fiz."];
    for(let i=0; i<headers.length; i++) {
        HTML += "<th scope='col'>"+headers[i]+"</th>";
    }
    HTML += "</tr></thead><tbody>";
    newRestLaptops.forEach(laptop => {
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
    $("#matrixTypeList").html(HTML);
    
    let duplicatedIDs = getDuplicates(restLaptops, newRestLaptops);
    markDuplicatedInTable(duplicatedIDs);
    restLaptops = newRestLaptops;
}