const questions = [
  {q:"What is a Prompt?", o:["A type of GPU","An instruction/input given to an AI model","A programming language","A database"], a:1},
  {q:"What does a high temperature setting do?", o:["Makes output more creative","Makes output more factual","Stops the model","Reduces tokens"], a:0},
  {q:"What is a token?", o:["A password","A unit of text processed by the model","An image file","A GitHub repo"], a:1},
  {q:"What does RAG stand for?", o:["Random AI Generation","Retrieval Augmented Generation","Rapid API Gateway","Read And Group"], a:1},
  {q:"Which HTTP status means 'Too Many Requests'?", o:["404","500","429","200"], a:2}
];
let current = 0, score = 0, selected = null, answered = false;
const $ = id => document.getElementById(id);

function load(){
  const item = questions[current];
  answered = false; selected = null;
  $("progress").textContent = `Question ${current+1} of ${questions.length}`;
  $("question").textContent = `Q${current+1}. ${item.q}`;
  $("options").innerHTML = "";
  item.o.forEach((text,i)=>{
    const b = document.createElement("button");
    b.className = "option"; b.textContent = text;
    b.onclick = () => { if(answered) return; selected = i;
      document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected"); $("submit").disabled = false; };
    $("options").appendChild(b);
  });
  $("submit").textContent = "Submit"; $("submit").disabled = true;
}

$("submit").onclick = () => {
  const opts = document.querySelectorAll(".option");
  if(!answered){
    answered = true;
    const correct = questions[current].a;
    if(selected === correct) score++;
    opts[correct].classList.add("correct");
    if(selected !== correct) opts[selected].classList.add("wrong");
    $("submit").textContent = current === questions.length-1 ? "See Result" : "Next";
  } else {
    current++;
    if(current < questions.length) load(); else showResult();
  }
};

function showResult(){
  $("quiz").hidden = true; $("progress").hidden = true;
  $("result").hidden = false;
  $("result").innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>
    <p>${score>=4?"Great job! 🎉":"Keep practicing! 💪"}</p>
    <button id="submit" onclick="location.reload()">Restart</button>`;
}
load();
