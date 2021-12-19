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
            'question_level_id'=>$this->faker->numberBetween(1,10),
            'language'=>$this->faker->randomElement(['English','Hindi']),
            'question'=>$this->faker->text($maxNbChars = 50),
            'correct_answer'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer1'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer2'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer3'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer4'=>$this->faker->text($maxNbChars = 50),
            'wrong_answer5'=>$this->faker->text($maxNbChars = 50),
            'pokp_link'=>$this->faker->url(),
            'bodhitube_podbean_link'=>$this->faker->url(),
            'created_by'=>$this->faker->name(),
            'reviewed_by'=>$this->faker->name(),
            'last_modified_by'=>$this->faker->name(),

        ];
    }
}
