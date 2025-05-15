//http://192.168.0.206:5500/index.html
let current_language="en";
let menu_lables=[];
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
ctx.fillStyle = 'lightblue'; 
ctx.fillRect(0, 0, canvas.width, canvas.height); 
function loadText(language){
  fetch(`text_${language}.json`)
  .then(response => response.json())
  .then(texts => {
    document.getElementById("title").innerText = texts.title;
    document.getElementById("click_to_start").innerText = texts.click_to_start;
    document.getElementById("game_name").innerText=texts.game_name;
    menu_lables=texts.main_menu;
    setMainInterface();
  })
  .catch(err => console.error('Error loading text:', err));
}
function hideStartInterface(){
  document.getElementById('gameCanvas').style.display="none";
    document.getElementById('start_interface').style.display="none";
}
function setMainInterface(){
  let mi=document.getElementById('mainInterface');
  mi.width=window.innerWidth;
  mi.height=window.innerHeight;
  mi.getContext("2d").fillStyle="black";
  mi.getContext("2d").fillRect(0, 0, canvas.width, canvas.height); 
  setMainMenu();
}
function setMainMenu(){
  let mic=document.getElementById('mainInterface').getContext("2d");
  let width=window.innerWidth;
  let height=window.innerHeight;
  let radius=width/20;
  let gap=width/45;
  let gap_count=1;
  let y=height/3;
  for(let i=0;i<8;i++){
    let centerX=gap*gap_count+radius*(i*2+1), centerY=y;
    mic.beginPath();
    mic.strokeStyle="gold";
    mic.arc(centerX, centerY, radius, 0, Math.PI * 2);
    mic.stroke();
    gap_count++;
    //text
    mic.fillStyle = "white";           // 文字颜色
    mic.font = `${radius*0.7}px Arial`;    // 字体大小，设置为半径大小比较合适
    mic.textAlign = "center";          // 水平居中
    mic.textBaseline = "middle";       // 垂直居中
    mic.fillText(`${menu_lables[i]}`, centerX, centerY); // 在圆心写文字
  }
}
document.getElementById('languageSelect').addEventListener('change', (event) => {
  current_language = event.target.value;
  loadText(current_language);
});
document.getElementById("gameCanvas").addEventListener("click", (event)=>{

  hideStartInterface();
  document.getElementById('mainInterface').style.display="block";
  setMainInterface();
});

loadText(current_language);
