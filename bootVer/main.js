// 유저가 값을 입력한다. ㅇ
// 유저가 +버튼을 누르면 값이 추가된다. ㅇ
// 유저가 췍 버튼 누르면 내용에 줄이 그려진다. (t > f) ㅇ
// 반대로 돌리기 버튼 누르면 즐이 사라진다. ㅇ
// 유저가 Del버튼을 누르면 값이 삭제된다.
// 탭 누르면, 언더바가 이동한다.
// 완료탭은 끝낸 값만, 진행중탭은 진행중인 값만 들어가기
// 전체탭 누르면 다시 전체 값으로 돌아옴

let taskInput = document.getElementById("task_input");
let addBtn = document.getElementById("add_btn");
let taskList = [];
let mode = "all";
let filterList = [];
let tabs = document.querySelectorAll(".task_tabs div");
let horizontalUnderLine = document.getElementById("under_line");
let horizontalMenus = document.querySelectorAll(".all, .ing, .done");
// console.log(horizontalMenus)
addBtn.addEventListener("click", addTask);

horizontalMenus.forEach(menu => menu.addEventListener("click", (e) => horizontalIndicator(e)));

function horizontalIndicator(e) {
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = e.currentTarget.offsetTop + 
                            e.currentTarget.offsetHeight + "px";
}


for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
        }
    );
}


function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent : taskInput.value,
        // 끝났는지 안끝났는지 물어보는 함수
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

// UI업데이트 하는 곳
function render() {
    let list = [];
    if(mode == "all") {
        list = taskList;
    } else if(mode == "ing" || mode == "done") {
        list = filterList;
    }
    let resultHTML = "";

    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML +=  `
                            <div class="task">
                                <div class="taskDone">${list[i].taskContent}</div>
                                <div class="taskBtn">
                                    <button onclick="CheckBtn('${list[i].id}')">
                                        <i class="fa-solid fa-rotate fa-xl fa-bounce" style="color: #9dafcd;"></i>
                                    </button>
                                    <button onclick="DeleteBtn('${list[i].id}')"> 
                                        <i class="fa-regular fa-trash-can fa-xl fa-bounce" style="color: #9a0e0e;"></i>
                                    </button>
                                </div>
                            </div>
                            `
        } else {
            resultHTML +=  `
                            <div class="task">
                                <div>${list[i].taskContent}</div>
                                <div>
                                    <button onclick="CheckBtn('${list[i].id}')">
                                        <i class="fa-solid fa-circle-check fa-xl fa-bounce" style="color: #11e481;"></i>
                                    </button>
                                    <button onclick="DeleteBtn('${list[i].id}')"> 
                                        <i class="fa-regular fa-trash-can fa-xl fa-bounce" style="color: #9a0e0e;"></i>
                                    </button>
                                </div>
                            </div>
                            `
        }
    };
    document.getElementById("task_board").innerHTML = resultHTML;
}

function CheckBtn(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function DeleteBtn(id) {
    // console.log("삭제하기", id);
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event) {
    // console.log("탭탭", event.target.id);
    mode = event.target.id;
    filterList = [];

    if(mode == "all") {
        render();
    } else if(mode == "ing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log(filterList);
}

function randomIdGenerate() {
    // 구글에 generate random id javascript 검색했음
    return '_' + Math.random().toString(36).substring(2, 9);
};