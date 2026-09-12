const calculateBtn = document.getElementById("calculateBtn");
const errorMsg = document.getElementById("error-message");
const resultBox = document.getElementById("resultBox");

const markInputs = document.querySelectorAll(".subject-mark");
const creditInputs = document.querySelectorAll(".subject-credit");

function getGradeDetails(marks) {
  if (marks >= 90) return { letter: "A+", point: 10 };
  if (marks >= 80) return { letter: "A", point: 9 };
  if (marks >= 70) return { letter: "B", point: 8 };
  if (marks >= 60) return { letter: "C", point: 7 };
  if (marks >= 50) return { letter: "D", point: 6 };
  if (marks >= 40) return { letter: "E", point: 5 };
  return { letter: "F", point: 0 };
}

calculateBtn.addEventListener("click", () => {
  errorMsg.textContent = "";
  resultBox.className = "hidden";
  resultBox.classList.remove("pass-theme", "fail-theme");

  let totalMarks = 0;
  let totalCredits = 0;
  let totalCreditPoints = 0; // This will store (Grade Point * Credit)
  let hasFailed = false;
  let subjectsHTML = "<h3>Subject Breakdown:</h3><ul>";

  for (let i = 0; i < markInputs.length; i++) {
    const markValue = markInputs[i].value;
    const creditValue = creditInputs[i].value;

    if (markValue === "" || creditValue === "") {
      errorMsg.textContent = `Please enter both marks and credits for Subject ${i + 1}.`;
      return;
    }

    const marks = Number(markValue);
    const credits = Number(creditValue);

    if (marks < 0 || marks > 100) {
      errorMsg.textContent = `Invalid marks in Subject ${i + 1}. Must be 0-100.`;
      return;
    }
    if (credits <= 0) {
      errorMsg.textContent = `Invalid credits in Subject ${i + 1}. Must be greater than 0.`;
      return;
    }

    const { letter, point } = getGradeDetails(marks);

    totalMarks += marks;
    totalCredits += credits;
    totalCreditPoints += point * credits;

    if (marks < 40) {
      hasFailed = true;
    }

    subjectsHTML += `<li>Subject ${i + 1}: ${marks} marks (Credit: ${credits}) - Grade: <b>${letter}</b> (${point} pts)</li>`;
  }

  subjectsHTML += "</ul>";

  const percentage = ((totalMarks / 500) * 100).toFixed(2);

  const sgpa = (totalCreditPoints / totalCredits).toFixed(2);

  if (hasFailed) {
    resultBox.classList.add("fail-theme");
  } else {
    resultBox.classList.add("pass-theme");
  }

  resultBox.innerHTML = `
    ${subjectsHTML}
    <hr>
    <p><strong>Total Marks:</strong> ${totalMarks} / 500</p>
    <p><strong>Percentage:</strong> ${percentage}%</p>
    <h2><strong>Final SGPA:</strong> ${sgpa}</h2>
    <h2><strong>Result:</strong> ${hasFailed ? "FAIL" : "PASS"}</h2>
  `;

  resultBox.classList.remove("hidden");
});
