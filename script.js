const quizData = [
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style Sheets", "Computer Style Sheet"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    choices: ["<style>", "<css>", "<script>", "<link>"],
    answer: "<style>"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  choicesEl.innerHTML = "";

  current.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  resultEl.textContent = "";
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    resultEl.textContent = "Correct!";
    resultEl.style.color = "green";
    score++;
  } else {
    resultEl.textContent = Wrong! Correct answer is: ${correct};
    resultEl.style.color = "red";
  }

  // Disable all buttons
  Array.from(choicesEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#a5d6a7"; // green
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#ef9a9a"; // red
    }
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quiz.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score is ${score} out of ${quizData.length}.</p>
    <button onclick="location.reload()">Play Again</button>
  `;
}

loadQuestion();
