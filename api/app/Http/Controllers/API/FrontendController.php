<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FrontendController extends Controller
{
    public function category(){
        $category = Category::where('status','a')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }
}
