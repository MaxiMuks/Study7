// 유저가 값을 입력한다. ㅇ
// 유저가 +버튼을 누르면 값이 추가된다. ㅇ
// 유저가 췍 버튼 누르면 내용에 줄이 그려진다. (t > f) ㅇ
// 반대로 돌리기 버튼 누르면 즐이 사라진다. ㅇ
// 유저가 Del버튼을 누르면 값이 삭제된다. ㅇ
// 탭 누르면, 언더바가 이동한다. ㅇ
// 완료탭은 끝낸 값만, 진행중탭은 진행중인 값만 들어가기 ㅇ
// 전체탭 누르면 다시 전체 값으로 돌아옴 ㅇ

// let taskInput = document.getElementById("task_input");
// let addBtn = document.getElementById("add_btn");
// let taskList = [];
// let mode = "all";
// let filterList = [];
// let tabs = document.querySelectorAll(".task_tabs div");
// let horizontalUnderLine = document.getElementById("under_line");
// let horizontalMenus = document.querySelectorAll(".all, .ing, .done");
// // console.log(horizontalMenus)
// // 클릭 이벤트
// addBtn.addEventListener("mousedown", addTask);

// taskInput.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//       addTask(event);
//     }
//   });

// // 엔터로 글 등록(How to add enter event javascript 검색)
// taskInput.addEventListener("keypress", function(event){
//     if(event.key == "Enter") {
//         event.preventDefault();
//         document.getElementById("add_btn").click();
//         taskInput.value = "";
//     }
// });

// // 밑줄
// horizontalMenus.forEach((menu) => menu.addEventListener("click", (e) => horizontalIndicator(e.currentTarget)));

// function horizontalIndicator(e) {
//     horizontalUnderLine.style.left = e.offsetLeft + "px";
//     horizontalUnderLine.style.width = e.offsetWidth + "px";
//     // -4를 한건 underline 위치 재조정 시키기위해
//     horizontalUnderLine.style.top = (e.offsetTop + e.offsetHeight - 4) + "px";
// }


// for(let i=1; i<tabs.length; i++) {
//     tabs[i].addEventListener("click", function(event) {
//         filter(event)
//         }
//     );
// }


// function addTask() {
//     let task = {
//         id: randomIdGenerate(),
//         taskContent : taskInput.value,
//         // 끝났는지 안끝났는지 물어보는 함수
//         isComplete : false
//     }
//     taskList.push(task);
//     taskInput.value = "";
//     render();
//     console.log(taskList);
// }

// // UI업데이트 하는 곳 
// function render() {
//     let resultHTML = "";
//     let list = [];

//     if(mode == "all") {
//         list = taskList;
//     } else if(mode == "ing" || mode == "done"){
//         list = filterList;
//     }

//     for(let i=0; i<list.length; i++) {
//         if(list[i].isComplete == true) {
//             resultHTML +=  `<div class="task taskDone" id="${list[i].id}">
//                                 <span>${list[i].taskContent}</span>
//                                 <div class="button-box">
//                                     <button onclick="CheckBtn('${list[i].id}')"><i class="fa-solid fa-rotate"></i> </button>
//                                     <button onclick="DeleteBtn('${list[i].id}')"> <i class="fa fa-trash"></i></button>
//                                 </div>
//                             </div>`
//         } else {
//             resultHTML +=  `<div class="task taskDone" id="${list[i].id}">
//                                 <span>${list[i].taskContent}</span>
//                                 <div class="button-box">
//                                     <button onclick="CheckBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
//                                     <button onclick="DeleteBtn('${list[i].id}')"> <i class="fa fa-trash"></i></button>
//                                 </div>
//                             </div>`
//         }
//     };
//     document.getElementById("task_board").innerHTML = resultHTML;
// }

// function CheckBtn(id) {
//     for(let i=0; i<taskList.length; i++) {
//         if(taskList[i].id === id) {
//             taskList[i].isComplete = !taskList[i].isComplete;
//             break;
//         }
//     }
//     render();
//     console.log(taskList);
// }

// function DeleteBtn(id) {
//     console.log("삭제하기", id);
//     for(let i=0; i<taskList.length; i++) {
//         if(taskList[i].id === id) {
//             taskList.splice(i,1);
//             // filter();
//             break;
//         }
//     }
//     render();
// }

// function filter(event) {
//     // console.log("탭탭", event.target.id);
//     mode = event.target.id;
//     filterList = [];

//     if(mode == "all") {
//         render();
//     } else if(mode == "ing") {
//         for(let i=0; i<taskList.length; i++) {
//             if(taskList[i].isComplete == false) {
//                 filterList.push(taskList[i]);
//             }
//             render();
//         }
//     } else if(mode == "done") {
//         for(let i=0; i<taskList.length; i++) {
//             if(taskList[i].isComplete == true) {
//                 filterList.push(taskList[i]);
//             }
//         }
//         render();
//     }
//     console.log(filterList);
// }

// function randomIdGenerate() {
//     // 구글에 generate random id javascript 검색했음
//     return '_' + Math.random().toString(36).substring(2, 9);
// };
let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let selectedMenu = "tab-all";
let filteredList = [];

addButton.addEventListener("mousedown", addTask);

userInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = userInput.value;
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
  };

  taskList.push(task);
  userInput.value = "";
  render();
}

function render() {
  let result = "";
  list = [];
  
  if (selectedMenu === "tab-all") {
    list = taskList;
  } else {
    list = filteredList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}" >
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }

  filter();
}
function filter(e) {
  if (e) {
    selectedMenu = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filteredList = [];
  if (selectedMenu === "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (selectedMenu === "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}