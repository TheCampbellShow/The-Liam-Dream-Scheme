const hearts = document.querySelector(".hearts");
function dropHeart(){
  const heart=document.createElement("span");
  heart.className="heart";
  heart.textContent=["♡","♥","✧"][Math.floor(Math.random()*3)];
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(12+Math.random()*18)+"px";
  const duration=7+Math.random()*7;
  heart.style.animationDuration=duration+"s";
  hearts.appendChild(heart);
  setTimeout(()=>heart.remove(),duration*1000);
}
setInterval(dropHeart,650);

const form=document.getElementById("application");
const result=document.getElementById("result");
const resultCopy=document.getElementById("result-copy");
const submitButton=form.querySelector('button[type="submit"]');

form.addEventListener("submit", async event=>{
  event.preventDefault();
  submitButton.disabled=true;
  submitButton.textContent="SENDING YOUR APPLICATION… 💗";
  const data=new FormData(form);
  const payload={};
  for(const [key,value] of data.entries()){
    if(payload[key]){
      payload[key]=Array.isArray(payload[key]) ? [...payload[key],value] : [payload[key],value];
    } else payload[key]=value;
  }
  payload._subject="Liam has submitted his boyfriend application 💗";
  payload._template="table";
  payload._captcha="false";
  try{
    const response=await fetch("https://formsubmit.co/ajax/charliecampbell1108@icloud.com",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(payload)
    });
    const resultData=await response.json();
    if(!response.ok || resultData.success===false) throw new Error("Submission failed");
    const name=(data.get("name")||"Liam").trim();
    resultCopy.textContent=`Thanks, ${name}! Your application has been sent successfully. The manager will be in touch after a very serious review. Those eyes may help, but the answers still count. 💗`;
    result.hidden=false;
    result.scrollIntoView({behavior:"smooth",block:"center"});
    submitButton.textContent="APPLICATION SENT 💗";
  }catch(error){
    resultCopy.textContent="We couldn't send the application just now. Please try again. If this is the first submission, FormSubmit may need you to verify your email address first.";
    result.hidden=false;
    result.scrollIntoView({behavior:"smooth",block:"center"});
    submitButton.disabled=false;
    submitButton.textContent="TRY SUBMITTING AGAIN ♥";
  }
});
document.getElementById("again").addEventListener("click",()=>{
  result.hidden=true;
  submitButton.disabled=false;
  submitButton.innerHTML='SUBMIT MY APPLICATION <span>♥</span>';
  form.scrollIntoView({behavior:"smooth",block:"start"});
});
