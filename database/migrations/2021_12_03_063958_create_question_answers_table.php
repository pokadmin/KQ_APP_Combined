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
            $table->smallInteger('question_level_id');  // level from 1 to 10
            $table->string('language');
            $table->text('question');
            $table->text('correct_answer');
            $table->text('wrong_answer1');
            $table->text('wrong_answer2');
            $table->text('wrong_answer3');
            $table->text('wrong_answer4');
            $table->text('wrong_answer5');
            $table->text('pokp_link');
            $table->text('bodhitube_podbean_link');
            $table->string('created_by');
            $table->string('reviewed_by');
            $table->string('last_modified_by');
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
