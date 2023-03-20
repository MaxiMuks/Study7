// 유저가 값을 입력한다.
// 유저가 +버튼을 누르면 값이 추가된다.
// 유저가 Del버튼을 누르면 값이 삭제된다.
// 탭 누르면, 언더바가 이동한다.
// 완료탭은 끝낸 값만, 진행중탭은 진행중인 값만 들어가기
// 전체탭 누르면 다시 전체 값으로 돌아옴

let underLine = document.getElementById("UnderLine");
let menuList = document.querySelectorAll(".All, .Done, .NDone");

menuList.forEach(menu => menu.addEventListener("click", (e) => horizontalIndicator(e)));

function horizontalIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + 
                            e.currentTarget.offsetHeight + "px";
}
