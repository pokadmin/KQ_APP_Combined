<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_answers', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('question_level');  // level from 1 to 10
            $table->string('language');
            $table->text('question');
            $table->text('correct_answer');
            $table->text('wrong_answer1')->nullable();
            $table->text('wrong_answer2')->nullable();
            $table->text('wrong_answer3')->nullable();
            $table->text('wrong_answer4')->nullable();
            $table->text('wrong_answer5')->nullable();
            $table->text('explanation')->nullable();
            $table->text('pokp_link')->nullable();
            $table->text('bodhitube_podbean_link')->nullable();
            $table->string('created_by');
            $table->string('reviewed_by')->nullable();
            $table->string('last_modified_by');
            $table->boolean('verification_status');  // default is 0
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_answers');
    }
}
