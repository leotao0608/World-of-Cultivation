let current_language = "en";
let menu_labels = [];
let partner_names=["0","1","2","3","4","5"];
let partner_levels=[0,1,2,3,4,5];
let user_id = "月";

const userIdDiv = document.getElementById("user_id");
const mainInterfaceDiv = document.getElementById("mainInterface");
const startInterfaceDiv = document.getElementById("start_interface");
const gameName = document.getElementById("game_name");
const clickToStart = document.getElementById("click_to_start");
const mainMenuDiv = document.getElementById("main_menu");

// 加载语言文本
function loadText(language) {
  fetch(`text_${language}.json`)
    .then((response) => response.json())
    .then((texts) => {
      document.getElementById("title").innerText = texts.title;
      clickToStart.innerText = texts.click_to_start;
      gameName.innerText = texts.game_name;
      menu_labels = texts.main_menu;
      setMainInterface();
    })
    .catch((err) => console.error("Error loading text:", err));
}

// 设置主界面内容
function setMainInterface() {
  setUserId();
  setMainMenu();
  setFightingZone();
}

// 显示用户ID
function setUserId() {
  userIdDiv.innerText = user_id;
}

// 设置战斗区域（这里只是一个边框，样式已用CSS）
function setFightingZone() {
  // 这里不用JS画，CSS已处理边框和位置
}

// 创建主菜单按钮
function setMainMenu() {
  mainMenuDiv.innerHTML = "";
  for (let i = 0; i < menu_labels.length; i++) {
    let btn = document.createElement("div");
    btn.classList.add("menu_button");
    btn.addEventListener("click",()=>{
      setMenuDisplay(i);
    });
    btn.innerText = menu_labels[i];
    mainMenuDiv.appendChild(btn);
  }
}
function setMenuDisplay(menu){
  const menu_list=["Ally","Ring", "Lair","Shop","Explore","Duel","Guide","Bonus"];
  for(let i=0;i<1;i++){//This should be 8----=================================================
    document.getElementById(`${menu_list[i]}`).style.display="none";
  }
  switch(menu){
    case 0:
      openAlly();
      break;
    case 1:
      openRing();
      break;
    case 2:
      openLair();
      break;
    case 3:
      openShop();
      break;
    case 4:
      openExplore();
      break;
    case 5:
      openDuel();
      break;
    case 6:
      openGuide();
      break;
    case 6:
      openBonus();
      break;
  }
}
function openAlly(){
  document.getElementById("Ally").style.display="block";
  for(let i=0;i<6;i++){
    document.getElementById(`name${i}`).innerText=partner_names[i];
    document.getElementById(`lv${i}`).innerText=partner_levels[i];
  }
}
// 事件监听 - 语言切换
document.getElementById("languageSelect").addEventListener("change", (event) => {
  current_language = event.target.value;
  loadText(current_language);
});

// 点击开始界面，切换主界面
clickToStart.addEventListener("click", () => {
  startInterfaceDiv.style.display = "none";
  mainInterfaceDiv.style.display = "block";
  setMainInterface();
});

// 页面加载时初始化文本
loadText(current_language);

const partnerContainer = document.getElementById("partnerContainer");

let startX = 0;
let currentX = 0;
let translateX = 0;
let isDragging = false;

partnerContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  partnerContainer.style.transition = "none";
});

partnerContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;
  partnerContainer.style.transform = `translateX(${translateX + deltaX}px)`;
});

partnerContainer.addEventListener("touchend", () => {
  translateX += currentX - startX;
  isDragging = false;

  // 限制滑动范围，避免滑出边界
  const maxTranslate = 0;
  const minTranslate = -(partnerContainer.scrollWidth - document.getElementById("partnerWrapper").offsetWidth);
  if (translateX > maxTranslate) translateX = maxTranslate;
  if (translateX < minTranslate) translateX = minTranslate;

  partnerContainer.style.transform = `translateX(${translateX}px)`;
});
