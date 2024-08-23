let wheelstate = -1;

let items = [];
let itemPositions = [];
let preMain = 0;
let navimgpaths = ["url('img/차체용버튼.png') no-repeat",
"url('img/샤시용버튼.png') no-repeat",
"url('img/배터리팩용버튼.png') no-repeat",
"url('img/구동모터용버튼.png') no-repeat",
"url('img/전기차배터리버튼.png') no-repeat",

"url('img/엔진버튼.png') no-repeat",
"url('img/기타버튼.png') no-repeat",
"url('img/수소차연료전지버튼.png') no-repeat",
];

let navimgoverpaths = ["url('img/차체용버튼_over.png') no-repeat",
"url('img/샤시용버튼_over.png') no-repeat",
"url('img/배터리팩용버튼_over.png') no-repeat",
"url('img/구동모터용버튼_over.png') no-repeat",
"url('img/전기차배터리버튼_over.png') no-repeat",

"url('img/엔진버튼_over.png') no-repeat",
"url('img/기타버튼_over.png') no-repeat",
"url('img/수소차연료전지버튼_over.png') no-repeat",
];

let navicount = 0;

window.addEventListener("wheel", (event) => {
  calcYPosition();
});

window.addEventListener("scroll", (event) => {
  calcYPosition();
});

function calcYPosition() {
  for (let i = 1; i < items.length; i++) {
    let windowCenter = window.pageYOffset + window.innerHeight / 2.7;

    let rate = windowCenter / itemPositions[i];

    

    if (rate < 0.6) rate = 0.6;
    else if (rate > 1) rate = 1;

    let mul = 1 - rate;
    let yoffset = 150 * mul;

    let opacity = 0;
    if(rate > 0.9)opacity = rate;

    //console.log("matrix(" + rate + ",0,0," + rate + ",0," + yoffset + ")");
    items[i].style.transform = "matrix(" + rate + ",0,0," + rate + ",0," + yoffset + ")";
    //items[i].style.opacity = opacity;
  }
}

window.onload = function () {
  let option = {
    threshold: 1.0,
  };

  // const io = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     const $target = entry.target;
  //     console.log(wheelstate);
  //     if (entry.isIntersecting) {
  //       if (entry.target.value != 1 && wheelstate == 1) {
  //         $target.classList.add("half2one_animation");
  //         entry.target.value = 1;

  //         //   let addvalue = 0;

  //         //   if (entry.target.id == "1") {
  //         //     addvalue = add;
  //         //   } else if (entry.target.id != "0") {
  //         //     addvalue = add + add2 * (parseInt(entry.target.id) - 1);
  //         //   }
  //         //   window.scrollTo({
  //         //     top: 1030 + addvalue,
  //         //     behavior: "smooth",
  //         //   });
  //       }
  //     } else if (entry.target.value != -1 && wheelstate == 0) {
  //       $target.classList.remove("half2one_animation");
  //       entry.target.value = -1;
  //     }
  //   });
  // }, option);

  items = document.getElementsByClassName("target");

  // for (let i = 0; i < $items.length; i++) {
  //   io.observe($items[i]);
  // }

  for (let i = 0; i < items.length; i++) {
    itemPositions.push(
      items[i].getBoundingClientRect().top + window.pageYOffset
    );
    if(i != 0 )items[i].style.transform = "matrix(0.6,0,0,0.6,0,150)";
  }

  let sliderbtns = document.getElementsByClassName("img_slider_btn");

  for (let i = 0; i < sliderbtns.length; i++) {
    sliderbtns[i].addEventListener("mouseover", function (event) {

      let curMain = (parseInt(event.target.value) + (4 * navicount)).toString();

      if (preMain != curMain) {

        document.getElementById(preMain).classList.remove("fadeout_animation");
        document.getElementById(preMain).classList.remove("fadein_animation");
        document.getElementById(curMain).classList.remove("fadeout_animation");
        document.getElementById(curMain).classList.remove("fadein_animation");

        document.getElementById(preMain).classList.add("fadeout_animation");
        document.getElementById(curMain).classList.add("fadein_animation");
        preMain = curMain;
      }
      event.target.style.background = navimgoverpaths[parseInt(event.target.value) + (4 * navicount)];
    });

    sliderbtns[i].addEventListener("mouseout",(event)=>{
      event.target.style.background = navimgpaths[parseInt(event.target.value) + (4 * navicount)];
    });

    sliderbtns[i].onclick = (event)=>{
      window.scrollTo({
        top: itemPositions[parseInt(event.target.value) + (4 * navicount)] - window.innerHeight / 4,
        behavior: "smooth",
      });
    };
  }

  let sliderArrowBtns = document.getElementsByClassName("img_slider_arrow");
  console.log(sliderArrowBtns);
  for(let i = 0;i < sliderArrowBtns.length; i++)
  {
    sliderArrowBtns[i].addEventListener("click",(event)=>{
      navicount++;
      navicount = navicount % 2;
      updateNaviBtn();
      updatedot();
    });
  }
  // document.getElementById("btn").onclick = scrollaction;
  calcYPosition();
  //   $items.forEach((item) => {
  //     io.observe(item);
  //   });
};

function updateNaviBtn(){
  let sliderbtns = document.getElementsByClassName("img_slider_btn");
  for (let i = 0; i < sliderbtns.length; i++) {
    sliderbtns[i].style.background = navimgpaths[i + (4 * navicount)]
  }
}

function updatedot(){

  let sliderdots = document.getElementsByClassName("img_dot");

  if(navicount == 0)
  {
    sliderdots[0].src = "img/selected_dot.png";
    sliderdots[1].src = "img/normal_dot.png";
  }
  else if(navicount == 1)
  {
    sliderdots[0].src = "img/normal_dot.png";
    sliderdots[1].src = "img/selected_dot.png";
  }
}

function scrollaction() {
  window.scrollTo({
    top: 2000,
    behavior: "smooth",
  });
}
