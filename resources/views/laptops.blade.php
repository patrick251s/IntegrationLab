<!DOCTYPE html>
<html>
<head>
    <title>Laptop Site</title>
    <meta name="description" content="This is a site about laptops">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="bg-dark text-light text-center">
    <main>
        <header class="py-4">
            <h2>Lista laptopów</h2>
        </header>

        <section id="readOrSaveBTNSection">
            <div class="row">
                <button class="btn btn-outline-primary col-8 col-md-3 mx-auto my-2" id="loadDataBTN">Wczytaj z pliku TXT</button>
                <button class="btn btn-outline-primary col-8 col-md-3 mx-auto my-2" id="loadXMLDataBTN">Wczytaj z pliku XML</button>
                <button class="btn btn-outline-primary col-8 col-md-3 mx-auto my-2" id="loadDatabaseBTN">Wczytaj z bazy danych</button>
            </div>
            <div class="row">
                <button class="btn btn-outline-success col-8 col-md-3 mx-auto my-2" id="saveDataBTN">Zapisz do pliku TXT</button>
                <button class="btn btn-outline-success col-8 col-md-3 mx-auto my-2" id="saveXMLDataBTN">Zapisz do pliku XML</button>  
                <button class="btn btn-outline-success col-8 col-md-3 mx-auto my-2" id="saveDatabaseBTN">Zapisz do bazy danych</button>
            </div>
        </section>
            
        <section class="pt-5" id="editModeSection">
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="editModeSwitch">
                <label class="custom-control-label h5" for="editModeSwitch" id="editModeLabel">Tryb edycji zablokowany</label>
            </div>
        </section>

    </main>

    <script src="js/jquery/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="js/Laptop.js"></script>
    <script src="js/status.js"></script>
    <script src="js/checkingDuplicates.js"></script>
    <script src="js/script.js"></script>
</body>
</html>