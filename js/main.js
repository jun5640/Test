let wheelstate = -1;

let items = [];
let itemPositions = [];
let preMain = 0;

window.addEventListener("wheel", (event) => {
  calcYPosition();
});

window.addEventListener("scroll", (event) => {
  calcYPosition();
});

function calcYPosition() {
  for (let i = 0; i < items.length; i++) {
    let windowCenter = window.pageYOffset + window.innerHeight / 3;

    let rate = windowCenter / itemPositions[i];

    if (rate < 0.6) rate = 0.6;
    else if (rate > 1) rate = 1;

    let mul = 1 - rate;
    let yoffset = 150 * mul;

    //console.log("matrix(" + rate + ",0,0," + rate + ",0," + yoffset + ")");
    items[i].style.transform =
      "matrix(" + rate + ",0,0," + rate + ",0," + yoffset + ")";
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
    items[i].style.transform = "matrix(0.6,0,0,0.6,0,150)";
  }

  let sliderbtns = document.getElementsByClassName("img_slider_btn");

  for (let i = 0; i < sliderbtns.length; i++) {
    sliderbtns[i].addEventListener("mouseover", function (event) {
      if (preMain != event.target.value) {

        document.getElementById(preMain).classList.remove("fadeout_animation");
        document.getElementById(preMain).classList.remove("fadein_animation");
        document.getElementById(event.target.value).classList.remove("fadeout_animation");
        document.getElementById(event.target.value).classList.remove("fadein_animation");

        document.getElementById(preMain).classList.add("fadeout_animation");
        document.getElementById(event.target.value).classList.add("fadein_animation");
        preMain = event.target.value;
      }
    });

    sliderbtns[i].onclick = (event)=>{
      window.scrollTo({
        top: itemPositions[parseInt(event.target.value)] - window.innerHeight / 4,
        behavior: "smooth",
      });
    };
  }

  // document.getElementById("btn").onclick = scrollaction;
  calcYPosition();
  //   $items.forEach((item) => {
  //     io.observe(item);
  //   });
};

function scrollaction() {
  window.scrollTo({
    top: 2000,
    behavior: "smooth",
  });
}
