<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionAnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question'=>$this->faker->text($maxNbChars = 50),
            'correct_answer'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer1'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer2'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer3'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer4'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer5'=>$this->faker->text($maxNbChars = 50),
            'last_modified_by'=>$this->faker->name()
        ];
    }
}
