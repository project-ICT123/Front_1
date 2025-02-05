import React from "react";
import QuestionUI from "../quiz_component/QuestionUI";

const questions = [
  { question: "What is the tallest mountain in the world?", answers: ["Mount Everest", "Mount Kilimanjaro"] },
  { question: "Which is the largest ocean?", answers: ["Pacific Ocean", "Atlantic Ocean"] },
  // Add more questions as needed
];

function QuestionPersonal() {
  return(
    <QuestionUI questions={questions}/>
  );
}

export default QuestionPersonal;