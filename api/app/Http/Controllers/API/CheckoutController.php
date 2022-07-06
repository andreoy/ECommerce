<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator = Validator::make($request->all(),[
                'firstname'=>'required|max:191',
                'lastname'=>'required|max:191',
                'phone'=>'required|max:191',
                'email'=>'required|max:191',
                'address'=>'required|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'bukti_bayar'=>'required|image|mimes:jpeg, png, jpg|max:2048',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else
            {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->firstname = $request->firstname;
                $order->lastname = $request->lastname;
                $order->phone = $request->phone;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;

                $order->payment_mode = "C0D";
                $order->tracking_no = "baby".rand(1111,9999);
                $order->shipping_fee = $request->shipping_fee;

                if($request->hasFile('bukti_bayar')){
                    $file=$request->file('bukti_bayar');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() .'.'.$extension;
                    $file->move('uploads/bukti_bayar/',$filename);
                    $order->bukti_bayar = 'uploads/bukti_bayar/'.$filename;
                }
        
                $order->save();
                
                $cart = Cart::where('user_id', $user_id)->get();

                $orderitems = [];

                foreach($cart as $item){
                    $orderitems[]=[
                        'product_id'=>$item->product_id,
                        'qty'=>$item->product_qty,
                        'price'=>$item->product->selling_price,
                    ];

                    $item->product->update([
                        'qty'=>$item->product->qty - $item->product_qty
                    ]);
                }

                $order->orderitems()->createMany($orderitems);
                
                Cart::destroy($cart);

                return response()->json([
                    'status'=>200,
                    'message'=>"Order Placed Successfully",
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login to Continue',
            ]);
        }
    }
}
