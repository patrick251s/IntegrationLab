function showSimpleInfo(type, text) {
    let alert = "";
    alert = "<div id=\"statusAlert\" class=\"alert alert-"+type+" alert-dismissible fade show col-10 col-sm-6 mx-auto mt-5\" role=\"alert\">"+
                                "<strong>"+text+"</strong>"+
                                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                                    "<span aria-hidden=\"true\">&times;</span>"+
                                "</button>"+
                            "</div>";
    if($("#statusAlert").length) $("#statusAlert").remove();
    $(alert).insertAfter("#editModeSection");
}

function showDuplicatedInfo(type, text, oldRecNumb, dupRecNum) {
    let alert = "";
    alert = "<div id=\"statusAlert\" class=\"alert alert-"+type+" alert-dismissible fade show col-10 col-sm-6 mx-auto mt-5\" role=\"alert\">"+
                                "<strong>"+text+"</strong>"+
                                "<strong><br/>Liczba nowych rekordów: "+oldRecNumb+" (na czarno)<br/>Liczba duplikatów: "+dupRecNum+" (na pomarańczowo)</strong>"+
                                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                                    "<span aria-hidden=\"true\">&times;</span>"+
                                "</button>"+
                            "</div>";
    if($("#statusAlert").length) $("#statusAlert").remove();
    $(alert).insertAfter("#editModeSection");
}