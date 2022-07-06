<?php

namespace App\Http\Controllers\API;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'status'=>200,
            'orders'=>$orders,
        ]);
    }

    public function order($id)
    {
        $order = Order::where('id', $id)->with('orderitems')->get()->first();

        if($order){
            return response()->json([
                'status'=>200,
                'order'=>$order,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Order Found',
            ]);
        }
    }

    public function complateOrder($id)
    {
        $order = Order::find($id);

        if($order){

            $order->status = '1';
            $order->update();

            return response()->json([
                'status'=>200,
                'message'=>"Order Completed",
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Order not FOund",
            ]);
        }
    }
}
