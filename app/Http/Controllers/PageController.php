<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use DB;
use DOMDocument;
use SimpleXMLElement;

class PageController extends Controller
{
    public function saveJumper(Request $request) {
        $firstname = $request->input("firstname");
        $surname = $request->input("surname");
        DB::insert("INSERT INTO jumpers (firstname, surname) VALUES (?, ?)", [$firstname, $surname]);
        return redirect("/jumpers");
    }

    public function getJumpers() {
        $jumpersArray = DB::select("SELECT * FROM jumpers");
        return view("jumpers", compact("jumpersArray"));
    }

    public function deleteJumper($jumperID) {
        DB::delete("DELETE FROM jumpers WHERE id = ?", [$jumperID]);
        return redirect("/jumpers");
    }

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
}