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
            'questions'=>$this->faker->text($maxNbChars = 50),
            'answers'=>$this->faker->text($maxNbChars = 50),
            'last_modified_by'=>$this->faker->name()
        ];
    }
}
