<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('laptops');
});

Route::get('/client', function () {
    return view('client');
});

Route::get('/clientrest', function () {
    return view('clientrest');
});

Route::post('/saveToFile', "PageController@saveToFile");

Route::post('/saveToXMLFile', "PageController@saveToXMLFile");

Route::post('/readFromXMLFile', "PageController@readFromXMLFile");

Route::post('/saveToDatabase', "PageController@saveToDatabase");

Route::get('/loadFromDatabase', "PageController@loadFromDatabase");

Route::get('/callSoapClient', "PageController@callSoapClient");

Route::get('/getLaptopAmountByProducer', "PageController@getLaptopAmountByProducer");

Route::get('/getLaptopAmountByMatrix', "PageController@getLaptopAmountByMatrix");

Route::get('/getLaptopListByMatrix', "PageController@getLaptopListByMatrix");