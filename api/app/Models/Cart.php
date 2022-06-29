<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table='carts';
    protected $fillable = [
        'user_id',
        'product_id',
        'product_qty',

    ];

    protected $with = ['product'];

    public function product()
    {
        return $this->belongsTO(Product::class,'product_id','id');
    }
}
