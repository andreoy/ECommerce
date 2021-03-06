<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\ExpedisiController;
use App\Http\Controllers\API\FrontendController;

Route::post('register', [AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);
Route::get('getCategory',[FrontendController::class,'category']);
Route::get('getPopular',[FrontendController::class,'popular']);
Route::get('fetchproducts/{slug}',[FrontendController::class, 'product']);
Route::get('view-product-detail/{category_slug}/{product_slug}',[FrontendController::class, 'viewproduct']);
Route::post('add-to-cart',[CartController::class,'addtocart']);
Route::get('cart', [CartController::class,'viewcart']);
Route::put('cartupdatequantity/{cart_id}/{scope}', [CartController::class,'updatequantity']);
Route::delete('delete-cartitem/{cart_id}',[CartController::class,'deletecartitem']);

Route::post('place-order', [CheckoutController::class, 'placeorder']);

Route::get('get-provinsi',[ExpedisiCOntroller::class,'getProvinsi']);
Route::get('get-kota/{id_provinsi}',[ExpedisiCOntroller::class,'getKota']);
Route::get('shiping-fee/{id_kota}/{berat}/{kurir}',[ExpedisiController::class,'getCost']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated', function(){
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    Route::get('view-category', [CategoryController::class,'index']);    
    Route::post('store-category', [CategoryController::class,'store']);
    Route::get('edit-category/{id}',[CategoryController::class,'edit']);
    Route::post('edit-category/{id}',[CategoryController::class,'update']);
    Route::delete('delete-category/{id}',[CategoryController::class,'destroy']);
    Route::get('all-category', [CategoryController::class,'allcategory']);
    
    // Orders
    Route::get('admin/orders',[OrderController::class,'index']);
    Route::get('admin/order/{id}',[OrderController::class,'order']);
    Route::put('admin/completedOrder/{id}',[OrderController::class,'complateOrder']);
    // Products
    Route::post('store-product',[ProductController::class,'store']);
    Route::get('view-product',[ProductController::class,'index']);
    Route::get('edit-product/{id}', [ProductController::class,'edit']);
    Route::post('update-product/{id}', [ProductController::class,'update']);
});

Route::middleware(['auth:sanctum'])->group(function(){

    Route::post('logout', [AuthController::class,'logout']);

    // Route::post('/store-category', [CategoryController::class, 'store']);

});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
