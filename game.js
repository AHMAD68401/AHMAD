// 🧼 حذف بيانات اللاعبين عند تحميل الصفحة
// هذا السطر يحذف البيانات السابقة للاعبين من localStorage لبدء اللعبة من جديد في كل مرة يتم فيها تحميل الصفحة
localStorage.removeItem("players");

// 🧠 الأسئلة
// مصفوفة تحتوي على جميع الأسئلة، وكل سؤال عبارة عن كائن يحتوي على نص السؤال، الخيارات، والإجابة الصحيحة
const questions = [
  { question: "متى استُشهد عبد الباسط الساروت؟", options: ["2012", "2015", "2019", "2021"], answer: "2019" },
  { question: "متى استُشهد عبد القادر الصالح؟", options: ["2012", "2013", "2014", "2015"], answer: "2013" },
  { question: "متى استُشهد أبو الفرات؟", options: ["2011", "2012", "2013", "2014"], answer: "2012" },
  { question: "متى استُشهد قادة أحرار الشام في التفجير الشهير؟", options: ["2013", "2014", "2015", "2016"], answer: "2014" },
  { question: "متى استُشهد زهران علوش؟", options: ["2013", "2014", "2015", "2016"], answer: "2015" },
  { question: "من هو أول ضابط انشق عن الجيش السوري ومتى؟", options: ["المقدم حسين هرموش - 2011", "العقيد رياض الأسعد - 2012", "العميد مصطفى الشيخ - 2012", "العميد زهر الدين - 2011"], answer: "المقدم حسين هرموش - 2011" },
  { question: "متى وأين استشهد أحمد الفج وفي أي معركة؟", options: ["2013 في حلب - معركة مدرسة المشات", "2012 في دمشق - معركة دمشق", "2014 في إدلب - معركة إدلب", "2015 في حماة - معركة حماة"], answer: "2013 في حلب - معركة مدرسة المشات" },
  { question: "متى وقعت مجزرة حماة التي نفذها نظام حافظ الأسد؟", options: ["1976", "1982", "1990", "2000"], answer: "1982" },
  { question: "كم عدد الشهداء في مجزرة حماة؟", options: ["5,000", "10,000", "20,000 - 40,000", "50,000"], answer: "20,000 - 40,000" },
  { question: "متى بدأت الثورة السورية المباركة؟", options: ["15 مارس 2011", "27 نوفمبر 2011", "29 يناير 2011", "5 ديسمبر 2011"], answer: "15 مارس 2011" },
  { question: "متى تم تحرير إدلب؟", options: ["28 مارس 2015", "7 ديسمبر 2015", "8 ديسمبر 2015", "29 يناير 2015"], answer: "28 مارس 2015" },
  { question: "متى بدأت معركة ردع العدوان؟", options: ["27 نوفمبر 2024", "29 ديسمبر 2024", "5 ديسمبر 2024", "10 مارس 2024"], answer: "27 نوفمبر 2024" },
  { question: "متى تم تحرير حلب؟", options: ["29 نوفمبر 2024", "28 مارس 2015", "8 ديسمبر 2024", "13 مايو 2024"], answer: "29 نوفمبر 2024" },
  { question: "متى تم تحرير حماة؟", options: ["5 ديسمبر 2024", "29 نوفمبر 2024", "8 ديسمبر 2024", "15 مارس 2024"], answer: "5 ديسمبر 2024" },
  { question: "متى تم تحرير حمص؟", options: ["8 ديسمبر 2024", "5 ديسمبر 2024", "29 يناير 2024", "13 مايو 2024"], answer: "8 ديسمبر 2024" },
  { question: "متى سقط المخلوع؟", options: ["8 ديسمبر 2024", "29 نوفمبر 2024", "5 ديسمبر 2024", "29 يناير 2025"], answer: "8 ديسمبر 2024" },
  { question: "متى أُعلن انتصار الثورة؟", options: ["29 يناير 2025", "10 مارس 2025", "28 مارس 2025", "8 ديسمبر 2025"], answer: "29 يناير 2025" },
  { question: "متى أُعلنت سوريا موحدة خضراء؟", options: ["10 مارس 2025", "29 يناير 2025", "27 نوفمبر 2025", "13 مايو 2025"], answer: "10 مارس 2025" },
  { question: "متى رُفع العلم في الأمم المتحدة؟", options: ["25 أبريل 2025", "10 مارس 2025", "13 مايو 2025", "15 مارس 2025"], answer: "25 أبريل 2025" },
  { question: "متى رُفعت العقوبات عن سوريا؟", options: ["13 مايو 2025", "25 أبريل 2025", "29 يناير 2025", "5 ديسمبر 2025"], answer: "13 مايو 2025" }
   
];

// 🔢 ترتيب عربي للأسئلة
// هذه الدالة تحول الرقم إلى ترتيب عربي مثل: الأول، الثاني، الثالث...
const getArabicOrder = (n) => ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون", "الحادي والعشرون"][n - 1] || `رقم ${n}`;

// 🧑‍🤝‍🧑 حالة اللعبة
// متغيرات تُستخدم لتتبع حالة اللعبة الجارية
let players = JSON.parse(localStorage.getItem("players")) || [];
let currentPlayer = null, currentScore = 0, currentQuestionIndex = 0, timerInterval = null;
const container = document.getElementById("gameContainer"); // الحاوية التي سيعرض فيها محتوى اللعبة

// 🎮 بدء اللعبة
startGame();

// عرض واجهة إدخال الاسم أو إعادة تشغيل اللعبة إن تم اللعب 4 مرات
function startGame() {
  if (players.length >= 4) {
    container.innerHTML = `
      <h3>تم لعب اللعبة من قبل 4 لاعبين.</h3>
      <p><a href="stats.html">عرض الإحصائيات</a></p>
      <button onclick="resetGame()">إعادة اللعب من جديد</button>`;
    return;
  }

  container.innerHTML = `
    <div class="card">
      <h2>👤 أدخل اسم اللاعب ${getArabicOrder(players.length + 1)}</h2>
      <input id="playerName" placeholder="اسم اللاعب" autocomplete="off" /><br>
      <button onclick="startQuiz()">start</button>
    </div>`;
}

// 🚀 بدء الأسئلة
// تُنفذ بعد إدخال الاسم والتحقق منه
function startQuiz() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return alert("يرجى إدخال الاسم");
  if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(name)) return alert("الاسم يجب أن يحتوي فقط على حروف ومسافات");

  currentPlayer = { name, score: 0 };
  currentScore = currentQuestionIndex = 0;
  showQuestion();
}

// ❓ عرض السؤال
function showQuestion() {
  if (currentQuestionIndex >= questions.length) return finishPlayer();

  const q = questions[currentQuestionIndex];
  container.innerHTML = `
    <div class="question-box">
      <h2>السؤال ${getArabicOrder(currentQuestionIndex + 1)}</h2>
      <p class="question-text">${q.question}</p>
    </div>
    <div class="options-box">
      ${q.options.map((opt, i) => `
        <div class="option" onclick="checkAnswer('${opt}')">
          <span class="option-number">${i + 1}.</span> 
          <span class="option-text">${opt}</span>
        </div>`).join("")}
    </div>
    <p id="timer">الوقت المتبقي: 7 ثانية</p>`;

  let timeLeft = 7;
  clearInterval(timerInterval);
  const timerEl = document.getElementById("timer");
  timerInterval = setInterval(() => {
    if (--timeLeft <= 0) {
      clearInterval(timerInterval);
      disableOptions();
      showCorrectAnswer();
      setTimeout(() => (currentQuestionIndex++, showQuestion()), 1500);
    } else timerEl.textContent = `الوقت المتبقي: ${timeLeft} ثانية`;
  }, 1000);
}

// ✅ التحقق من الإجابة
function checkAnswer(selected) {
  clearInterval(timerInterval);
  const q = questions[currentQuestionIndex];
  const optionsEls = [...document.querySelectorAll(".option")];
  disableOptions();

  optionsEls.forEach(opt => {
    const text = opt.querySelector(".option-text").textContent;
    if (text === q.answer) Object.assign(opt.style, { backgroundColor: "#00ff40", color: "white" });
  });

  const clicked = optionsEls.find(el => el.querySelector(".option-text").textContent === selected);
  if (selected === q.answer) {
    currentScore++;
    Object.assign(clicked.style, { backgroundColor: "#00ff40", color: "white" });
  } else {
    Object.assign(clicked.style, { backgroundColor: "#c10202", color: "white" });
  }

  setTimeout(() => (currentQuestionIndex++, showQuestion()), 500);
}

// 🔒 تعطيل الخيارات
const disableOptions = () => document.querySelectorAll(".option").forEach(opt => opt.style.pointerEvents = "none");

// ✅ عرض الصحيح فقط
function showCorrectAnswer() {
  const q = questions[currentQuestionIndex];
  document.querySelectorAll(".option").forEach(opt => {
    if (opt.querySelector(".option-text").textContent === q.answer)
      Object.assign(opt.style, { backgroundColor: "#00ff40", color: "white" });
    opt.style.pointerEvents = "none";
  });
}

// 🏁 نهاية اللاعب
function finishPlayer() {
  Object.assign(currentPlayer, {
    score: currentScore,
    correct: currentScore,
    wrong: questions.length - currentScore,
    total: questions.length,
    date: new Date().toLocaleString()
  });

  players.push(currentPlayer);
  localStorage.setItem("players", JSON.stringify(players));
  startGame();
}

// ♻️ إعادة تعيين
const resetGame = () => {
  localStorage.removeItem("players");
  location.reload();
};




