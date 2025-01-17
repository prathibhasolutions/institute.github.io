<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock Test</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .question-buttons button {
            width: 30px;
            height: 30px;
            margin: 5px;
            border-radius: 50%;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
        }

        .not-visited {
            background-color: #f0f0f0;
        }

        .visited {
            background-color: #d3f9d8;
        }

        .active {
            background-color: #f2d7d5;
        }

        .question-container {
            display: flex;
        }

        .question-container .question-text {
            flex: 9;
        }

        .question-container .question-buttons {
            flex: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .result-page {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="exam-platform">
            <h1>Mock Test</h1>
            <div id="timer">Time Remaining: 60:00</div>

            <div class="question-container">
                <div class="question-text">
                    <p id="question-text">What is question 1?</p>
                    <div>
                        <button onclick="answerQuestion(1, 'A')">A. Option 1</button>
                        <button onclick="answerQuestion(1, 'B')">B. Option 2</button>
                        <button onclick="answerQuestion(1, 'C')">C. Option 3</button>
                        <button onclick="answerQuestion(1, 'D')">D. Option 4</button>
                    </div>
                </div>
                <div class="question-buttons">
                    <button onclick="goToQuestion(1)">1</button>
                    <button onclick="goToQuestion(2)">2</button>
                    <button onclick="goToQuestion(3)">3</button>
                    <button onclick="goToQuestion(4)">4</button>
                </div>
            </div>

            <div>
                <button onclick="navigateQuestion(-1)">Back</button>
                <button onclick="navigateQuestion(1)">Next</button>
            </div>
            <div>
                <button onclick="submitExam()">Submit Exam</button>
            </div>
        </div>

        <section id="result-page" class="result-page">
            <h2>Results</h2>
            <p>You completed the exam! You scored: <span id="exam-score">80%</span></p>
            <button onclick="goBackToExam()">Back to Exam</button>
        </section>
    </div>

    <script>
        let currentQuestion = 1;
        let answers = {}; // Store answers for each question
        let totalQuestions = 4; // Change this as per total number of questions
        let timer; // To hold the timer interval
        let timeLeft = 3600; // 1 hour in seconds

        // Start timer countdown
        function startTimer() {
            timer = setInterval(function () {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    submitExam();
                } else {
                    timeLeft--;
                    let minutes = Math.floor(timeLeft / 60);
                    let seconds = timeLeft % 60;
                    document.getElementById("timer").textContent = `Time Remaining: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
                }
            }, 1000);
        }

        // Initialize the timer when the page loads
        window.onload = function() {
            startTimer();
            updateQuestion();
        };

        // Navigate through questions
        function navigateQuestion(step) {
            currentQuestion += step;
            if (currentQuestion < 1) currentQuestion = 1;
            if (currentQuestion > totalQuestions) currentQuestion = totalQuestions;
            updateQuestion();
        }

        // Display current question
        function updateQuestion() {
            document.getElementById("question-text").textContent = `What is question ${currentQuestion}?`; // Customize your question text
        }

        // Answer question
        function answerQuestion(questionNumber, answer) {
            answers[questionNumber] = answer; // Save the answer for the respective question
            updateQuestionButtons();
        }

        // Update the question buttons state (answered/visited)
        function updateQuestionButtons() {
            for (let i = 1; i <= totalQuestions; i++) {
                const button = document.querySelector(`.question-buttons button:nth-child(${i})`);
                const answer = answers[i];
                if (answer) {
                    button.classList.remove('not-visited');
                    button.classList.add('visited');
                } else if (i < currentQuestion) {
                    button.classList.remove('not-visited');
                    button.classList.add('visited');
                } else {
                    button.classList.remove('visited');
                    button.classList.add('not-visited');
                }
            }
        }

        // Go to a specific question
        function goToQuestion(questionNumber) {
            currentQuestion = questionNumber;
            updateQuestion();
        }

        // Submit the exam and show result page
        function submitExam() {
            alert('Exam submitted!');
            document.querySelector(".exam-platform").style.display = 'none';
            document.getElementById("result-page").style.display = 'block'; // Show result page
            calculateScore();
        }

        // Calculate the score (dummy example)
        function calculateScore() {
            let correctAnswers = 0;
            for (let i = 1; i <= totalQuestions; i++) {
                // Replace 'A' with the correct answer for each question
                if (answers[i] === 'A') {
                    correctAnswers++;
                }
            }
            let score = (correctAnswers / totalQuestions) * 100;
            document.getElementById("exam-score").textContent = `${score}%`;
        }

        // Back to the exam
        function goBackToExam() {
            document.querySelector(".exam-platform").style.display = 'block';
            document.getElementById("result-page").style.display = 'none'; // Hide result page
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
