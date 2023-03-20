// 유저가 값을 입력한다. ㅇ
// 유저가 +버튼을 누르면 값이 추가된다. ㅇ
// 유저가 Del버튼을 누르면 값이 삭제된다.
// 탭 누르면, 언더바가 이동한다.
// 완료탭은 끝낸 값만, 진행중탭은 진행중인 값만 들어가기
// 전체탭 누르면 다시 전체 값으로 돌아옴

let taskInput = document.getElementById("task_input");
let addBtn = document.getElementById("add_btn");
let taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    // console.log(taskList);
    board();
}

function board() {
    let resultHTML = "";

    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
                        <div>${taskList[i]}</div>
                        <div>
                            <button>Check</button>
                            <button>Delete</button>
                        </div>
                        </div>`
    };

    document.getElementById("task_board").innerHTML = resultHTML;
}