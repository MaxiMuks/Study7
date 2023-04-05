"use strict";

let TaskInput = document.getElementById("input");
let AddBtn = document.getElementById("add_btn");
let TaskList = [];
let tabs = document.querySelectorAll(".task_tabs div");
let FilterList = [];
let mode = "all";

AddBtn.addEventListener("mousedown", AddTask);

// 엔터로 아이템 추가
TaskInput.addEventListener('keyup', (e)=>{
    if (e.keyCode === 13) {
        AddTask(e);
    }
});

// 탭 라인
tabs.forEach(menu => menu.addEventListener("click", (e) => tabLine(e)));

function tabLine(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth+ "px";
    underLine.style.top = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight -4) + "px";
};

// 탭 이동
for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(e) {
        Filter(e)
    });
};

// +버튼
function AddTask() {
    let Info = {
        id: RandomId(),
        TaskContents: TaskInput.value,
        isComplete: false
    };
    TaskList.push(Info);
    TaskInput.value = "";
    UIPart();
    console.log(TaskList);
};

// UI 
function UIPart() {
    let resultHTML = "";
    let list = [];

    if(mode === "all") {
        list = TaskList;
    } else {
        list = FilterList;
    }    
    // } else if(mode == "onGoing" || mode == "done") {
    //     list = FilterList;

    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete) {
            resultHTML += ` <div class="task task_done" id="${list[i].id}">
                                <span>${list[i].TaskContents}</span>
                                <div class="task_btn">
                                    <button onclick="CheckBtn('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                                    <button onclick="DeleteBtn('${list[i].id}')"><i class="fa-solid fa-circle-xmark"></i></button>
                                </div>
                            </div> `
        } else {
            resultHTML += ` <div class="task" id="${list[i].id}">
                                <span>${list[i].TaskContents}</span>
                                <div class="task_btn">
                                    <button onclick="CheckBtn('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                                    <button onclick="DeleteBtn('${list[i].id}')"><i class="fa-solid fa-circle-xmark"></i></button>
                                </div>
                            </div> `
        };
    };

    document.getElementById("task_board").innerHTML = resultHTML;
};

// 완료버튼
function CheckBtn(id) {
    for(let i = 0; i < TaskList.length; i++) {
        if(TaskList[i].id === id) {
            TaskList[i].isComplete = !TaskList[i].isComplete;
            break;
        };
    };
    Filter();
    console.log(TaskList);
}; 

// 삭제버튼
function DeleteBtn(id) {
    for(let i = 0; i < TaskList.length; i++) {
        if(TaskList[i].id === id) {
            TaskList.splice(i,1)
            // break;
        };
    };
    Filter();
    console.log(id, "삭제");
};

// 탭
function Filter(e) {
    if(e) {
        mode = e.target.id;
    }
    FilterList = [];

    // if(mode == "all") {
    //     UIPart();
    // } else
    if(mode === "onGoing") {
        for(let i = 0; i < TaskList.length; i++) {
            if(TaskList[i].isComplete == false) {
                FilterList.push(TaskList[i]);
            };
        };
        // UIPart();
    } else if(mode === "done") {
        for(let i = 0; i < TaskList.length; i++) {
            if(TaskList[i].isComplete) {
                FilterList.push(TaskList[i]);
            };
        };
    }
    UIPart();
};

// 랜덤의 ID값
function RandomId() {
    return '_' + Math.random().toString(36).substring(2, 9);
};