<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee_list_model extends Model
{
    use HasFactory;

    public $table = 'employee_list';
    public $primaryKey ='id';
    public $keyType = 'int';
    public $incrementing = 'true';
    public $timestamps = false;
}
