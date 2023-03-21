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

addBtn.addEventListener("click", addTask);

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

function render() {
    let resultHTML = "";

    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML +=  `
                            <div class="task">
                                <div class="taskDone">${taskList[i].taskContent}</div>
                                <div>
                                    <button onclick="CheckBtn('${taskList[i].id}')">
                                        <i class="fa-solid fa-rotate fa-xl fa-bounce" style="color: #9dafcd;"></i>
                                    </button>
                                    <button onclick="DeleteBtn()"> 
                                        <i class="fa-regular fa-trash-can fa-xl fa-bounce" style="color: #9a0e0e;"></i>
                                    </button>
                                </div>
                            </div>
                            `
        } else {
            resultHTML +=  `
                            <div class="task">
                                <div>${taskList[i].taskContent}</div>
                                <div>
                                    <button onclick="CheckBtn('${taskList[i].id}')">
                                        <i class="fa-solid fa-circle-check fa-xl fa-bounce" style="color: #11e481;"></i>
                                    </button>
                                    <button onclick="DeleteBtn()"> 
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

function DeleteBtn() {
    
}

function randomIdGenerate() {
    // 구글에 generate random id javascript 검색했음
    return '_' + Math.random().toString(36).substring(2, 9);
}