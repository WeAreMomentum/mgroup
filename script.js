//////////////////////////////
/// WEBFLOW EDITOR FIX
//////////////////////////////

let editables = []
document.querySelectorAll(".editable").forEach(element => {
  editables.push(element)
})

console.log(editables);
editables.forEach(element => {
  element.classList.remove("editable");
})

//////////////////////////////
/// UTILS
//////////////////////////////

let scrollDisabled = false;

function disableScroll() {
  // Get the current page scroll position
  scrollDisabled = true;
  //scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //console.log(scrollTop)
  //scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  ///if any scroll is attempted, set this to the previous value
  //window.onscroll = function() {
  //window.scrollTo(scrollLeft, scrollTop);f
  //console.log("disabled scrolling")
  //};
}

function enableScroll() {
  scrollDisabled = false;
  window.onscroll = function() { };
}

let footerAnimatedIn = false;

const footer = document.querySelector(".footer");
let mt = parseInt(getComputedStyle(footer).marginTop);

//scrolling
let lastKnownScrollPosition = 0;
let ticking = false;

function moveScrollBar(scrollPos) {

  if (scrollPos < 20) { //ios scroll bounce fix
    return
  }

  if (scrollPos > lastKnownScrollPosition) {
    try { navbar.classList.add("navbar-transition-up"); }
    catch { }
  }

  else if (scrollPos < lastKnownScrollPosition) {
    try { navbar.classList.remove("navbar-transition-up") }
    catch { }
  }

  lastKnownScrollPosition = scrollPos;
}

function isInViewport(el) {

  if (el === null) { return }

  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

//////////////////////////////
/// NAV
//////////////////////////////

const navbar = document.querySelector(".navbar");
const burgerBtn = document.querySelector(".navbar__burger-button");
const navDrawer = document.querySelector(".nav-drawer");
const contentWrapper = document.querySelector(".content-wrapper");
const navDrawerCloseBtn = document.querySelector(".nav-drawer__close-btn");
const navDrawerLinks = document.querySelectorAll(".nav-drawer-link");
const navDrawerMGroupLogo = document.querySelector(".svg-background-wrapper-big--nav");
const navDrawerButtons = document.querySelectorAll(".nav-drawer__buttons");
const navDrawerSocials = document.querySelector(".nav-drawer__socials-wrapper");

setTimeout(() => navDrawer.style.display = "block", 100) //fixes cached open drawer on load

const toggleDrawerAnims = () => {
  navDrawerLinks.forEach(link => {
    link.classList.toggle("animate-from-below");
  })

  navDrawerMGroupLogo.classList.toggle("animate-fade");
  navDrawerSocials.classList.toggle("animate-fade");
  navDrawerButtons.forEach(button => button.classList.toggle("animate-fade"));

}
if (burgerBtn !== null) {
  burgerBtn.onclick = () => {
    navDrawer.classList.toggle("nav-drawer--in");
    contentWrapper.overflowY = "hidden";
    disableScroll();
    toggleDrawerAnims();
  }
}

navDrawerCloseBtn.onclick = () => {
  navDrawer.classList.toggle("nav-drawer--in");
  contentWrapper.style.maxHeight = "none";
  contentWrapper.overflowY = "visible";
  enableScroll();
  toggleDrawerAnims();

}

// Function to handle clicks outside the target element
function handleClickOutsideNavDrawer(event) {
  if (navDrawer && navDrawer.classList.contains("nav-drawer--in") && !navDrawer.contains(event.target) && !burgerBtn.contains(event.target)) {
    try {
      navDrawer.classList.toggle("nav-drawer--in");
      contentWrapper.style.maxHeight = "none";
      contentWrapper.overflowY = "visible";
      enableScroll();
      toggleDrawerAnims();
    }
    catch { }
    console.log('Clicked outside the target element');
    // Add your logic here to handle the click outside the target element
  }
}

// Add a click event listener to the document object
document.addEventListener('click', handleClickOutsideNavDrawer);

//////////////////////////////
/// HOME
//////////////////////////////

//headline animations
const headings = document.querySelectorAll(".heading-1");
headings.forEach(heading => {
  heading.classList.remove("animate-from-below");
})

//header box
const box = document.querySelector('.header__bg');
const box2 = document.querySelector('.header__bg-2');
const box3 = document.querySelector('.header__bg-3');

//contact box
const contactBox = document.querySelector('.cta-contact__wrapper');
let contactBoxExists = contactBox !== null;


//what we do animation
let whatWeDoExists, whatWeDoExists2 = false;
let whatWeDoBox, whatWeDoBox2, whatWeDoImage1, whatWeDoImage2, whatWeDoImage3, whatWeDoButtonBox;

whatWeDoBox = document.querySelector("#what-we-do-box");
whatWeDoBox2 = document.querySelector("#what-we-do-box-2"); //HACK: investor relations page
whatWeDoImage1 = document.querySelector("#what-we-do-anchor-1");
whatWeDoImage2 = document.querySelector("#what-we-do-anchor-2");
whatWeDoImage3 = document.querySelector("#what-we-do-anchor-3");
whatWeDoButtonBox = document.querySelector("#what-we-do-button-box");

if (whatWeDoBox !== null) { whatWeDoExists = true }
if (whatWeDoBox2 !== null) { whatWeDoExists2 = true }

let whatWeDoPart1, whatWeDoPart2, whatWeDoPart3 = false; //checks if what we do animation has completed

//////////////////////////////
/// SCROLLING
//////////////////////////////

//body-text
const bodyText = document.querySelectorAll(".body-text");
let paraImages = document.querySelectorAll(".para-img");
let paraImages2 = document.querySelectorAll(".para-img-2")

//sub-headings
const subHeadings = document.querySelectorAll(".heading-fade-in");

document.addEventListener('scroll', function(e) {

  if (scrollDisabled) {
    document.body.style.height = "100vh";
    return;
  }

  scrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      moveScrollBar(scrollPosition);
      ticking = false;
    });

    ticking = true;
  }

  //footer
  if (!footerAnimatedIn) {
    if (isInViewport(footer)) {
      footerAnimatedIn = true;
      document.querySelectorAll(".footer__item").forEach(item => item.classList.remove("animate-fade"));
    }
  }

  //navbar
  if (isInViewport(box) || isInViewport(box2) || isInViewport(box3)) {
    try {
      document.querySelector(".navbar").classList.remove("navbar--light");
      document.querySelectorAll(".navbar__text").forEach(element => element.classList.remove("navbar__text--light"));
      document.querySelector("#navbar-logo").classList.remove("navbar__logo--light");
      document.querySelectorAll(".navbar-logo__fill-light").forEach(element => element.setAttribute('class', "navbar-logo__fill"));
      //mobile nav in light no logo
      document.querySelector("#nav-logo-svg").classList.remove("hidden-mobile-when-light");

      //weglot
      try {
        document.querySelector(".navbar__link.navbar__link--language").classList.remove("navbar__text--light")
      }
      catch { }

      try { document.querySelector(".header-text").classList.remove("text-block-fade-in") }
      catch { }
    }
    catch { }
    return;
  };



  //contact box
  if (contactBoxExists && isInViewport(contactBox)) {
    try {
      document.querySelectorAll(".heading-contact").forEach(line => {
        line.classList.remove("animate-from-below");
      })

      document.querySelector(".m-group-bg-contact").classList.remove("animate-fade");
      document.querySelector(".contact-button").classList.remove("animate-fade");

    }
    catch { }
  }

  //parallax effects
  if (bodyText.length !== 0) {
    bodyText.forEach(textBlock => {
      if (isInViewport(textBlock)) {
        try {
          textBlock.classList.remove("text-block-fade-in");
        }
        catch { }
      }
    })
  }

  if (paraImages.length !== 0) {
    paraImages.forEach(img => {
      if (isInViewport(img)) {
        try { img.classList.remove("animate-fade") }
        catch { }
      }
    })
  }

  if (subHeadings.length !== 0) {
    subHeadings.forEach(subHeading => {
      if (isInViewport(subHeading)) {
        try {
          subHeading.style.opacity = "unset";
          subHeading.classList.remove("heading-fade-in")

        }
        catch { }
      }
    })
  }

  //what-we-do
  if (whatWeDoExists) { PlayWhatWeDoAnim() }
  if (whatWeDoExists2) { PlayWhatWeDo2Anim() }

  //what-we-do how-we-work
  if (whatWeDoSteps.length !== 0) {
    playWhatWeDoStepsAnim()
  }

  //about us number animation
  if (numbersToAnimate.length !== 0) {
    playNumberAnim()
  }


  try {
    document.querySelector("#nav-logo-svg").classList.add("hidden-mobile-when-light")
    document.querySelector(".navbar").classList.add("navbar--light");
    document.querySelectorAll(".navbar__text").forEach(element => element.classList.add("navbar__text--light"));
    document.querySelector("#navbar-logo").classList.add("navbar__logo--light");
    document.querySelectorAll(".navbar-logo__fill").forEach(element => element.setAttribute('class', "navbar-logo__fill-light"));
    try {
      document.querySelector(".navbar__link.navbar__link--language").classList.add("navbar__text--light")
    }
    catch { }
  }
  catch { }


}, {
  passive: true
});

//////////////////////////////
/// HOME
//////////////////////////////

const PlayWhatWeDo2Anim = () => { //Hack: investor relations two "what we do headings" on one page
  if (isInViewport(whatWeDoBox2)) {
    document.querySelectorAll(".what-we-do-heading-2").forEach(heading => {
      heading.classList.remove("animate-from-below");
    })
  }
}

const PlayWhatWeDoAnim = () => {
  if (!whatWeDoPart1 || !whatWeDoPart2 || !whatWeDoPart3) {
    if (isInViewport(whatWeDoBox)) {

      document.querySelectorAll(".what-we-do-heading").forEach(heading => {
        heading.classList.remove("animate-from-below");
      })
      if (isInViewport(whatWeDoImage1) || isInViewport(whatWeDoButtonBox)) {
        whatWeDoPart1 = true;
        document.querySelectorAll(".what-we-do__line-1").forEach(line => {
          line.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__image-1").forEach(image => {
          image.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__text-1").forEach(text => {
          text.classList.remove("animate-fade");
        })
      }
      if (isInViewport(whatWeDoImage2) || isInViewport(whatWeDoButtonBox)) {
        whatWeDoPart2 = true;
        document.querySelectorAll(".what-we-do__line-2").forEach(line => {
          line.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__image-2").forEach(image => {
          image.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__text-2").forEach(text => {
          text.classList.remove("animate-fade");
        })
      }
      if (isInViewport(whatWeDoImage3) || isInViewport(whatWeDoButtonBox)) {
        whatWeDoPart3 = true;
        document.querySelectorAll(".what-we-do__line-3").forEach(line => {
          line.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__image-3").forEach(image => {
          image.classList.remove("animate-image");
        })
        document.querySelectorAll(".what-we-do__text-3").forEach(text => {
          text.classList.remove("animate-fade");
        })

        whatWeDoAnimatedIn = true;
      }

    }
  }
}

//project links slider animation
const projectLinkText = document.querySelectorAll(".project-link__link-text");
const projectLinkBox = document.querySelectorAll(".project-link__link-block");

projectLinkBox.forEach((linkbox, index) => {
  linkbox.onmouseover = () => {
    linkbox.children[0].classList.toggle("fade-in-out");
    linkbox.children[0].textContent = "Mehr Erfahren";
    linkbox.children[0].style.fontSize = "18px";
    linkbox.children[0].style.paddingBottom = "0px";
    //projectLinkText[index].classList.toggle("fade-in-out");
    //projectLinkText[index].textContent = "Mehr Erfahren";
    //projectLinkText[index].style.fontSize = "18px";
    //projectLinkText[index].style.paddingBottom = "0px";
  }
  linkbox.onmouseout = () => {
    linkbox.children[0].classList.toggle("fade-in-out");
    linkbox.children[0].textContent = "+";
    linkbox.children[0].style.fontSize = "28px";
    linkbox.children[0].style.paddingBottom = "4px";
    //projectLinkText[index].classList.toggle("fade-in-out");
    //projectLinkText[index].textContent = "+";
    //projectLinkText[index].style.fontSize = "28px";
    //projectLinkText[index].style.paddingBottom = "4px";
  }
})

//////////////////////////////
/// PARALLAX
//////////////////////////////


new simpleParallax(paraImages, {
  overflow: true,
  scale: 1.5
});

//$("[data-paroller-factor]").paroller(); 09.01. change


//////////////////////////////
/// All Projects List
//////////////////////////////

//currently shown items counter

let allProjectItems, currentlyVisibleProjectItems = 0;
let shownItemsIncrementNum = 0;

const countCurrentItems = () => {
  currentlyVisibleProjectItems = 0;
  shownItemsIncrementNum += 9
  document.querySelectorAll(".project-item").forEach((item, i) => {
    if (i >= shownItemsIncrementNum) {
      item.style.display = "none";
    }
    else {
      item.style.display = "flex"
      currentlyVisibleProjectItems++;
    }
  });

  $(".current-items").text("" + currentlyVisibleProjectItems + "");
  if (currentlyVisibleProjectItems === allProjectItems) {
    document.querySelector("#more-projects-button").style.display = "none"
  }
}

if (document.querySelectorAll(".project-item").length !== 0) {
  $('.w-dyn-items').each(function() {
    allProjectItems = $(this).children('.w-dyn-item').length;
  });

  document.getElementById("more-projects-button").onclick = () => {
    countCurrentItems();
  }

  $(".all-items").text("" + allProjectItems + "");

}

const showItemCounter = () => {
  document.querySelector(".project-list__end").style.display = "flex";
}

const hideItemCounter = () => {
  document.querySelector(".project-list__end").style.display = "none";
}

//selects and list filtering
const filterList = (selection, selector) => {
  filterSelection[selector] = selection;



  document.querySelectorAll(".project-item-data").forEach(project => {

    let projectLocation = project.getAttribute("data-location");
    let projectType = project.getAttribute("data-type");
    let projectStatus = project.getAttribute("data-status");

    if (projectStatus.includes("In Planung")) {
      project.parentElement.nextElementSibling.children[0].children[0].children[0].style.display = "flex"; //sets coming soon overlay
      project.parentElement.nextElementSibling.children[0].children[0].children[1].style.display = "none"; //hides standard cta overlay
    }


    if (filterSelection.location !== "" && !projectLocation.includes(filterSelection.location)) {
      project.parentElement.parentElement.style.display = "none";
      return;
    }

    if (filterSelection.type !== "" && !projectType.includes(filterSelection.type)) {
      project.parentElement.parentElement.style.display = "none";
      return;
    }

    if (filterSelection.status !== "" && !projectStatus.includes(filterSelection.status)) {
      project.parentElement.parentElement.style.display = "none";
      return;
    }
    project.parentElement.parentElement.style.display = "flex";

  })

  if (filterSelection.location === '' && filterSelection.type === '' && filterSelection.status === '') {
    showItemCounter();
    countCurrentItems();
  }

  else {
    hideItemCounter();
  }

}


let filterSelection = {
  location: "",
  type: "",
  status: ""
};

let selectLocation, selectType, selectStatus;

try {

  selectLocation = document.querySelector("#location-select");
  selectType = document.querySelector("#type-select");
  selectStatus = document.querySelector("#status-select");

  filterList("", "init") //initializes coming soons

  selectLocation.addEventListener("change", event => {
    filterList(event.target.value, "location");
  })

  selectType.addEventListener("change", event => {
    filterList(event.target.value, "type");
  })

  selectStatus.addEventListener("change", event => {
    filterList(event.target.value, "status");
  })
}
catch { }



//////////////////////////////
///// Subpage Header Animations
//////////////////////////////

let heading2s, heading4s, headerButtons;

heading2s = document.querySelectorAll(".heading-2");
heading2s.forEach(heading2 => {
  try {
    if (!heading2.classList.contains("what-we-do-heading") && !heading2.classList.contains("what-we-do-heading-2")) {
      heading2.classList.remove("animate-from-below")
    }
  }
  catch { }
})

heading4s = document.querySelectorAll(".heading-4")
heading4s.forEach(heading4 => {
  try { heading4.classList.remove("animate-from-below") }
  catch { }
})

headerButtons = document.querySelectorAll(".header__button-wrapper");
headerButtons.forEach(headerButton => {
  try { headerButton.classList.remove("animate-fade") }
  catch { }
})

//////////////////////////////
/// PROJECT DETAILS
/////////////////////////////

let tourismOnly = document.querySelectorAll(".tourism-only");

if (tourismOnly.length !== 0) {

  if (document.querySelector("#type-indicator").textContent === "Tourismus") {
    tourismOnly.forEach(tourismOnlyComponent => tourismOnlyComponent.style.display = "flex")
  }

}

//////////////////////////////
/// PROJECT MAP
/////////////////////////////

let mapIndicatorItems = document.querySelectorAll(".map-indicator-item");
if (mapIndicatorItems.length !== 0) {
  mapIndicatorItems.forEach(item => {
    let posX = item.children[0].children[0].children[0].dataset.positionX;
    let posY = item.children[0].children[0].children[0].dataset.positionY;

    item.style.left = posX + "%";
    item.style.bottom = posY + "%";
    console.log(posY)

    try {
      item.addEventListener("mouseenter", () => { item.children[1].style.display = "block"; })
      item.addEventListener("mouseleave", () => { item.children[1].style.display = "none"; })
    }
    catch { }
  })
}

//////////////////////////////
/// SAVE PROJECT
/////////////////////////////

let saveBtn = document.querySelector('#save-btn');
let saveBtns = document.querySelectorAll(".save-btn")

if (saveBtn) {
  //saveBtn.onclick = () => {
  //document.querySelectorAll('.coming-soon-project-map-wrapper').forEach(map => map.style.display = "none");
  //document.querySelector('.header-coming-soon').style.display = "none";
  //document.querySelector('.coming-soon-save-header').style.display = "block";
  //}

  saveBtns.forEach(btn => btn.onclick = () => {
    document.querySelectorAll('.coming-soon-project-map-wrapper').forEach(map => map.style.display = "none");
    document.querySelector('.header-coming-soon').style.display = "none";
    document.querySelector('.coming-soon-save-header').style.display = "block";

    console.log("click")

  })

}


//////////////////////////////
/// WHAT WE DO STEPS
/////////////////////////////

const whatWeDoSteps = document.querySelectorAll(".how-we-work__step-number-svg");
let animationStep = 0;


const playWhatWeDoStepsAnim = () => {

  const whatWeDo1 = document.querySelector("#what-we-do-1");
  const whatWeDo2 = document.querySelector("#what-we-do-2");
  const whatWeDo3 = document.querySelector("#what-we-do-3");
  const whatWeDo4 = document.querySelector("#what-we-do-4");
  const whatWeDo5 = document.querySelector("#what-we-do-5");
  const whatWeDo6 = document.querySelector("#what-we-do-6");

  let closestToCenter = 0;
  let stepToColor;

  whatWeDoSteps.forEach(step => {
    step.children[0].children[0].children[0].style.fill = "white";
    step.children[0].children[0].children[1].style.fill = "#FF902B";
  })

  whatWeDoSteps.forEach((step, index) => {
    let rect = step.getBoundingClientRect();

    if (index === 0) {
      stepToColor = step;
    }

    else if (Math.abs(rect.top) <= Math.abs(stepToColor.getBoundingClientRect().top - window.innerHeight / 2)) {
      stepToColor = step;
    }

  })

  stepToColor.children[0].children[0].children[0].style.fill = "#FF902B";
  stepToColor.children[0].children[0].children[1].style.fill = "white";

}


if (document.querySelectorAll("[data-accordion='wrapper']").length !== 0) {

  document.querySelectorAll("[data-accordion='wrapper']").forEach(wrapper => {
    const trigger = wrapper.querySelector("[data-accordion='trigger']");
    const icon = wrapper.querySelector(".arrow-svg-accordion");

    try {
      const image = wrapper.querySelector(".accordion__image");
      const headline = wrapper.querySelector(".accordion__text-block");
      const headerImage = wrapper.querySelector(".accordion__image-wrapper");
      const triggerBox = wrapper.querySelector(".accordion__trigger");
      headline.classList.remove("active");
      headerImage.classList.remove("active");
      triggerBox.classList.remove("active");
    }
    catch { }
    icon.classList.remove("active");


    const content = wrapper.querySelector("[data-accordion='content']");
    trigger.addEventListener("click", function() {

      this.classList.toggle("active");
      icon.classList.toggle("active");
      try {
        image.classList.toggle("active");
        headerImage.classList.toggle("active");
        triggerBox.classList.toggle("active");
        headline.classList.toggle("active");
      }
      catch { }

      if (content.style.maxHeight == '0px') {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
    content.style.maxHeight = '0px';
  });
}


//////////////////////////////
/// LANDING PAGES
/////////////////////////////


//CMS comma parser . -> ,
let unitFields = document.querySelectorAll(".unit-text");

if (unitFields.length !== 0) {
  unitFields.forEach(unit => {
    unit.textContent = unit.textContent.replace(".", ",")
  })
}

//Floor parser
let floorFields = document.querySelectorAll(".unit-text--stock");

if (floorFields.length !== 0) {
  floorFields.forEach(floor => {

    //TODO: Keller?
    if (floor.textContent == 0) {
      console.log(floor)
      console.log(floor + " is 0")
      floor.textContent = "Erdgeschoß";
      return;
    }

    floor.textContent = `${floor.textContent}. Stock`
  })
}



/*let parent = document.querySelector('.sticky').parentElement;

if (document.querySelector)
while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
        console.log("overflow:::")
        console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
}*/


/////////////
/// ABOUT US
////////////

let numbersToAnimate = document.querySelectorAll(".figure-text");

const playNumberAnim = () => {
  numbersToAnimate.forEach(number => {
    if (isInViewport(number) && number.getAttribute("animated") !== "true") {
      animateValue(number, 0, parseInt(number.textContent), 2000);
      number.setAttribute("animated", "true");
    }
  })
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

console.log("test")
