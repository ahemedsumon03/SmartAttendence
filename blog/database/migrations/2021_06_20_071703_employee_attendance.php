<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EmployeeAttendance extends Migration
{

    public function up()
    {
        Schema::create('employee_attendence',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('name',1000);
            $table->string('employee_id',1000);
            $table->string('employee_mobile',2000);
            $table->string('a_date',1000);
            $table->string('a_time',1000);
            $table->string('status',1000);
        });
    }


    public function down()
    {

    }
}
