<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
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

    public function product($slug){
        $category = Category::where('slug', $slug)->where('status','0')->first();
        if($category){

            $product = Product::where('category_id', $category->id)->where('status','0')->get();
            if($product){

                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category,
                    ],
                ]);

            }else{
                return response()->json([
                    'status'=>400,
                    'message'=>'No Product Available',
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No Such Category Found',
            ]);
        }
    }
}
