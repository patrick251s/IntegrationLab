<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use DB;
use DOMDocument;
use SimpleXMLElement;
use SoapClient;

class PageController extends Controller
{
    public function saveToFile() {
        $laptops = json_decode(filter_input(INPUT_POST, 'laptops'), true);
        $text = "";
        for($i=0; $i<count($laptops); $i++) {
            unset($laptops[$i]["id"]);
            foreach($laptops[$i] as $key => $value) {
                $text .= $value.";";
            }
            if($i !== count($laptops)-1) {
                $text .= "\n";
            }
        }
        $file = fopen(public_path("katalog.txt"), "w");
        fwrite($file, $text);
        fclose($file);
        return true;
    }

    public function saveToXMLFile() {
        $laptops = json_decode(filter_input(INPUT_POST, 'laptops'), true);
        $date = date("Y-m-d H:i");
        $text = "<laptops moddate=\"$date\">";
        foreach($laptops as $laptop) {
            $text .= '<laptop id="'.$laptop["id"].'">'.
                        '<manufacturer>'.$laptop["producer"].'</manufacturer>'.
                        '<screen touch="'.$laptop["isTactile"].'">'.
                            '<size>'.$laptop["diagonal"].'</size>'.
                            '<resolution>'.$laptop["resolution"].'</resolution>'.
                            '<type>'.$laptop["surface"].'</type>'.
                        '</screen>'.
                        '<processor>'.
                            '<name>'.$laptop["procesor"].'</name>'.
                            '<physical_cores>'.$laptop["coreNumber"].'</physical_cores>'.
                            '<clock_speed>'.$laptop["timingSpeed"].'</clock_speed>'.
                        '</processor>'.
                        '<ram>'.$laptop["ram"].'</ram>'.
                        '<disc type="'.$laptop["discType"].'">'.
                            '<storage>'.$laptop["discCapacity"].'</storage>'.
                        '</disc>'.
                        '<graphic_card>'.
                            '<name>'.$laptop["graphicsCard"].'</name>'.
                            '<memory>'.$laptop["graphicsCardMemory"].'</memory>'.
                        '</graphic_card>'.
                        '<os>'.$laptop["operatingSystem"].'</os>'.
                        '<disc_reader>'.$laptop["physicalDrive"].'</disc_reader>'.
                    '</laptop>';
        }
        $text .= "</laptops>";
        $dom = new DOMDocument;
        $dom->loadXML($text);
        $dom->formatOutput = true;
        $dom->save(public_path("katalog.xml"));
        return true;
    }

    public function readFromXMLFile(Request $request) {
        $xml = simplexml_load_string($request->input("xmlData"), "SimpleXMLElement", LIBXML_NOCDATA);
        $json = json_encode($xml);
        return $json;
    }

    public function saveToDatabase() {
        $laptops = json_decode(filter_input(INPUT_POST, 'laptops'), true);
        DB::beginTransaction();
        try {
            DB::statement('TRUNCATE TABLE laptops');
            foreach($laptops as $laptop) {
                DB::insert("INSERT INTO laptops VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                    [$laptop["id"], $laptop["producer"], $laptop["diagonal"], $laptop["resolution"], 
                    $laptop["surface"], $laptop["isTactile"], $laptop["procesor"], $laptop["coreNumber"], 
                    $laptop["timingSpeed"], $laptop["ram"], $laptop["discCapacity"], $laptop["discType"], 
                    $laptop["graphicsCard"], $laptop["graphicsCardMemory"], $laptop["operatingSystem"], 
                    $laptop["physicalDrive"]]);
            }
            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollback();
            return false;
        }
    }

    public function loadFromDatabase() {
        try {
            $laptops = DB::select("SELECT * FROM laptops ORDER BY id");
            return json_encode($laptops);
        } catch (Exception $ex) {
            return false;
        }
    }

    public function callSoapClient(Request $request) {
        $methodName = $request->input("methodName");

        $options = array(
        "location" => "http://localhost/IS_Lab_SOAP/server.php",
        "uri" => "urn://localhost/IS_Lab_SOAP/server.php",
        "trace" => 1
        );

        $client = new SoapClient(null, $options);

        if($methodName == "laptopAmountByProducer") {
            $producerName = filter_input(INPUT_GET, 'producerName');
            $params = array("producerName" => $producerName);
            $response = $client->__soapCall("getLaptopAmountByProducer", $params);
            echo $response;
        }
        else if($methodName == "laptopAmountByMatrix") {
            $matrix1 = filter_input(INPUT_GET, 'matrixValue1');
            $matrix2 = filter_input(INPUT_GET, 'matrixValue2');
            $params = array("matrix1" => $matrix1, "matrix2" => $matrix2);
            $response = $client->__soapCall("getLaptopAmountByMatrix", $params);
            echo $response;
        }
        else if($methodName == "laptopListByMatrixType") {
            $matrixType = filter_input(INPUT_GET, 'matrixType');
            $params = array("matrixType" => $matrixType);
            $response = $client->__soapCall("getLaptopListByMatrixType", $params);
            echo json_encode($response);
        }
    }

    public function getLaptopAmountByProducer(Request $request) {
        try {
            $amount = DB::table('laptops')->where('producer', $request->input("producerName"))->count();
            return $amount;
        } catch (Exception $ex) {
            return false;
        }
    }

    public function getLaptopAmountByMatrix(Request $request) {
        try {
            $resolutions = DB::select("SELECT DISTINCT resolution FROM laptops");
            foreach($resolutions as $res) {
                if(!Str::contains($res->resolution, "x")) continue;
                $resValues = explode("x", $res->resolution);
                //Jeśli proporcja jest prawie równa
                if(abs((($request->input("matrixValue1"))/($request->input("matrixValue2")))-($resValues[0]/$resValues[1])) < 0.01) {      
                    $amount = DB::table('laptops')->where('resolution', $res->resolution)->count();
                    return $amount;
                }
            }
        } catch (Exception $ex) {
            return false;
        } 
        return 0;   
    }

    public function getLaptopListByMatrix(Request $request) {
        try {
            $laptops = DB::select("SELECT * FROM laptops WHERE surface = ? ORDER BY id", [$request->input("matrixType")]);
            return json_encode($laptops);
        } catch (Exception $ex) {
            return false;
        }
    }
}