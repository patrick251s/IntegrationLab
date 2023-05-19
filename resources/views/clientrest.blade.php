<!doctype html>
<html>
<head>
    <title>Laptopy</title>
    <meta name="description" content="This is a site about laptops for users">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="bg-dark text-light text-center">
    <main>
        <header class="py-4">
            <h2>Aplikacja klienta (REST)</h2>
        </header>
        
        <section class="text-center row">
            <article class="col-sm-6">
                <h5 class="">Wybierz nazwę producenta</h5>
                <div id="producerSelectList" class="my-2">
                    <select id="producerNameSelect" class="form-select py-2 col-4" aria-label="Default select example">
                        <option value="Dell">Dell</option>
                        <option value="Asus">Asus</option>
                        <option value="Fujitsu">Fujitsu</option>
                        <option value="Huawei">Huawei</option>
                        <option value="MSI">MSI</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                    </select>
                </div>
                <button id="showLaptopAmountByProducerBTN" class="btn btn-primary my-2">Pokaż liczbę laptopów producenta</button>
                <div id="producerResult" class="my-2">
                </div>
            </article>
            <article class="col-sm-6">
                <h5 class="">Wybierz proporcję matrycy</h5>
                <div id="matrixSelectList" class="my-2">
                    <select id="matrixResolutionSelect" class="form-select py-2 col-4" aria-label="Default select example">
                        <option value="16x9">16x9</option>
                        <option value="4x3">4x3</option>
                        <option value="8x5">8x5</option>
                        <option value="7x4">7x4</option>
                    </select>
                </div>
                <button id="showLaptopAmountByMatrixBTN" class="btn btn-success my-2">Pokaż liczbę laptopów z określoną matrycą</button>
                <div id="matrixResult" class="my-2">
                </div>
            </article>
            <article class="col-sm-6 mx-auto mt-4">
                <h5 class="">Wybierz rodzaj matrycy</h5>
                <div class="my-2">
                    <select id="matrixTypeSelect" class="form-select py-2 col-4" aria-label="Default select example">
                        <option value="matowa">matowa</option>
                        <option value="blyszczaca">błyszcząca</option>
                    </select>
                </div>
                <button id="showLaptopListByMatrixTypeBTN" class="btn btn-danger my-2">Pokaż listę laptopów</button>
                <div id="matrixTypeList" class="my-2 text-light">
                </div>
            </article>
        </section>

    </main>

    <script src="js/jquery/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="js/Laptop.js"></script>
    <script src="js/script.js"></script>
    <script src="js/checkingDuplicates.js"></script>
    <script src="js/clientRest.js"></script>
</body>
</html>