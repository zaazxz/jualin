<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'product_info',
        'generated_content',
        'template',
        'status',
        'slug'
    ];

    protected $casts = [
        'product_info' => 'array',
        'generated_content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
