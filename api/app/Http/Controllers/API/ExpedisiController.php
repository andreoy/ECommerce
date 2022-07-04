<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class ExpedisiController extends Controller
{
    public function getProvinsi(){
        
        $response = Http::withHeaders([
            'key'=>'c88d05b014cff1d1e82a02f25879e906',
        ])->get("https://api.rajaongkir.com/starter/province");

        return response()->json([
            'status'=>200,
            'provinsi'=>$response->json(),
        ]);
    }

    public function getKota($id_provinsi){

        $response = Http::withHeaders([
            'key'=>'c88d05b014cff1d1e82a02f25879e906',
        ])->get('https://api.rajaongkir.com/starter/city',[
            'province'=>$id_provinsi,
        ]);

        return response()->json([
            'status'=>200,
            'kota'=>$response->json(),
        ]);

    }

    public function getCost($id_kota, $berat, $kurir){

        $response = Http::withHeaders([
            'key'=>'c88d05b014cff1d1e82a02f25879e906',
        ])->post('https://api.rajaongkir.com/starter/cost',[
            'origin'=>442,
            'destination'=>$id_kota,
            'weight'=>$berat,
            'courier'=>$kurir,
        ]);

        return response()->json([
            'status'=>200,
            'kota'=>$response->json(),
        ]);


    }
}
