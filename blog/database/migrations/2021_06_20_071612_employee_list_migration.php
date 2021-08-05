<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EmployeeListMigration extends Migration
{

    public function up()
    {
        Schema::create('employee_list',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('name',1000);
            $table->string('employee_id',1000);
            $table->string('employee_mobile',2000);
            $table->text('photo_des');
        });
    }


    public function down()
    {

    }
}
