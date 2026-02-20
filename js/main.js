// ============================================
// PREMIUM 3D LOADING OVERLAY WITH PERCENTAGE
// ============================================

let loadingProgress = 0;
const loadingOverlay = document.getElementById('loading-overlay');
const progressBarFill = document.querySelector('.progress-bar-fill');
const percentageText = document.querySelector('.percentage-text');

// Simulate loading progress - slower for better visibility
function updateLoadingProgress() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 8; // Slower loading for visibility
        if (loadingProgress > 100) loadingProgress = 100;
        
        // Update progress bar
        if (progressBarFill) progressBarFill.style.width = loadingProgress + '%';
        
        // Update percentage text
        if (percentageText) percentageText.textContent = Math.floor(loadingProgress);
        
        setTimeout(updateLoadingProgress, 150); // 150ms interval for smooth animation
    } else {
        // Loading complete - fade out
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 800);
            }
        }, 500); // Show 100% for 500ms
    }
}

// Start loading animation
if (loadingOverlay) {
    updateLoadingProgress();
}

// Also hide on window load as fallback
window.addEventListener('load', function() {
    loadingProgress = 100;
});

// ============================================
// NAVIGATION GLASSMORPHISM ON SCROLL
// ============================================

const nav = document.querySelector('#page1 > nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// ============================================
// HERO MOUSE SPOTLIGHT EFFECT
// ============================================

const spotlight = document.querySelector('.spotlight');
const page1 = document.querySelector('#page1');

if (spotlight && page1) {
    page1.addEventListener('mousemove', (e) => {
        const rect = page1.getBoundingClientRect();
        const x = e.clientX - rect.left - 300; // Center the spotlight
        const y = e.clientY - rect.top - 300;
        
        spotlight.style.transform = `translate(${x}px, ${y}px)`;
        spotlight.style.opacity = '1';
    });
    
    page1.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    const mainElement = document.querySelector('#main');
    if (!mainElement) return;
    
    // Calculate scroll percentage
    const scrollTop = mainElement.scrollTop || 0;
    const scrollHeight = mainElement.scrollHeight - mainElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Update progress bar width
    scrollProgress.style.width = scrollPercentage + '%';
}

// Update progress on scroll (works with Locomotive Scroll)
if (document.querySelector('#main')) {
    // Initial update
    updateScrollProgress();
    
    // Listen to scroll events on main container
    document.querySelector('#main').addEventListener('scroll', updateScrollProgress);
    
    // Also update on window resize
    window.addEventListener('resize', updateScrollProgress);
}

// ============================================
// SCROLL ANIMATION CODE
// ============================================

// Scroll Animation Code
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", function(args) {
    ScrollTrigger.update();
    
    // Update scroll progress indicator with Locomotive Scroll
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress && args.scroll) {
        const scrollPercentage = (args.scroll.y / args.limit.y) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }
});

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

// ============================================
// TEXT SECTIONS - WORD-BY-WORD REVEAL WITH GLOW
// ============================================

// Page2 H1 animation - Word by word
function animateTextSection(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const text = element.textContent.trim();
    const words = text.split(/\s+/); // Split by any whitespace
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-reveal';
        wordSpan.textContent = word;
        element.appendChild(wordSpan);
        
        // Add space after each word except the last one
        if (index < words.length - 1) {
            const space = document.createElement('span');
            space.className = 'word-space';
            space.textContent = ' ';
            element.appendChild(space);
        }
    });
    
    gsap.to(`${selector} .word-reveal`, {
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            end: 'bottom 60%',
            scroller: '#main',
            scrub: 0.5,
        },
        stagger: 0.1,
        color: '#fff',
        textShadow: '0 0 20px rgba(24, 99, 255, 0.6), 0 0 40px rgba(24, 99, 255, 0.3)',
        ease: 'power2.out'
    });
}

// Apply to all text sections
animateTextSection('#page2>h1');
animateTextSection('#page4>h1');
animateTextSection('#page6>h1');

// Add gradient animation to h2 headings
const headings = document.querySelectorAll('#page2>h2, #page4>h3, #page6>h3');
headings.forEach(heading => {
    heading.classList.add('gradient-heading');
});


// Page3 canvas code
function canvas(){
  const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
assets/frames00007.png
assets/frames00010.png
assets/frames00013.png
assets/frames00016.png
assets/frames00019.png
assets/frames00022.png
assets/frames00025.png
assets/frames00028.png
assets/frames00031.png
assets/frames00034.png
assets/frames00037.png
assets/frames00040.png
assets/frames00043.png
assets/frames00046.png
assets/frames00049.png
assets/frames00052.png
assets/frames00055.png
assets/frames00058.png
assets/frames00061.png
assets/frames00064.png
assets/frames00067.png
assets/frames00070.png
assets/frames00073.png
assets/frames00076.png
assets/frames00079.png
assets/frames00082.png
assets/frames00085.png
assets/frames00088.png
assets/frames00091.png
assets/frames00094.png
assets/frames00097.png
assets/frames00100.png
assets/frames00103.png
assets/frames00106.png
assets/frames00109.png
assets/frames00112.png
assets/frames00115.png
assets/frames00118.png
assets/frames00121.png
assets/frames00124.png
assets/frames00127.png
assets/frames00130.png
assets/frames00133.png
assets/frames00136.png
assets/frames00139.png
assets/frames00142.png
assets/frames00145.png
assets/frames00148.png
assets/frames00151.png
assets/frames00154.png
assets/frames00157.png
assets/frames00160.png
assets/frames00163.png
assets/frames00166.png
assets/frames00169.png
assets/frames00172.png
assets/frames00175.png
assets/frames00178.png
assets/frames00181.png
assets/frames00184.png
assets/frames00187.png
assets/frames00190.png
assets/frames00193.png
assets/frames00196.png
assets/frames00199.png
assets/frames00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page3",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas()

// Page4 h1 animation - Word by word
const page4H1 = document.querySelector("#page4>h1");
if (page4H1) {
    const text = page4H1.textContent.trim();
    const words = text.split(/\s+/); // Split by any whitespace
    page4H1.innerHTML = '';
    
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-reveal';
        wordSpan.textContent = word;
        page4H1.appendChild(wordSpan);
        
        // Add space after each word except the last one
        if (index < words.length - 1) {
            const space = document.createElement('span');
            space.className = 'word-space';
            space.textContent = ' ';
            page4H1.appendChild(space);
        }
    });
    
    gsap.to("#page4>h1 .word-reveal", {
        scrollTrigger: {
            trigger: "#page4>h1",
            start: 'top 80%',
            end: 'bottom 60%',
            scroller: '#main',
            scrub: 0.5,
        },
        stagger: 0.1,
        color: '#fff',
        textShadow: '0 0 20px rgba(24, 99, 255, 0.6)',
        ease: 'power2.out'
    });
}

function canvas1(){
const canvas = document.querySelector("#page5>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
assets/bridges00004.png
assets/bridges00007.png
assets/bridges00010.png
assets/bridges00013.png
assets/bridges00016.png
assets/bridges00019.png
assets/bridges00022.png
assets/bridges00025.png
assets/bridges00028.png
assets/bridges00031.png
assets/bridges00034.png
assets/bridges00037.png
assets/bridges00040.png
assets/bridges00043.png
assets/bridges00046.png
assets/bridges00049.png
assets/bridges00052.png
assets/bridges00055.png
assets/bridges00058.png
assets/bridges00061.png
assets/bridges00064.png
assets/bridges00067.png
assets/bridges00070.png
assets/bridges00073.png
assets/bridges00076.png
assets/bridges00079.png
assets/bridges00082.png
assets/bridges00085.png
assets/bridges00088.png
assets/bridges00091.png
assets/bridges00094.png
assets/bridges00097.png
assets/bridges00100.png
assets/bridges00103.png
assets/bridges00106.png
assets/bridges00109.png
assets/bridges00112.png
assets/bridges00115.png
assets/bridges00118.png
assets/bridges00121.png
assets/bridges00124.png
assets/bridges00127.png
assets/bridges00130.png
assets/bridges00133.png
assets/bridges00136.png
assets/bridges00139.png
assets/bridges00142.png
assets/bridges00145.png
assets/bridges00148.png
assets/bridges00151.png
assets/bridges00154.png
assets/bridges00157.png
assets/bridges00160.png
assets/bridges00163.png
`;
return data.split("\n")[index];
}

const frameCount = 54;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
scrub: .5,
trigger: `#page5`,
start: `top top`,
end: `250% top`,
scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
img,
0,
0,
img.width,
img.height,
centerShift_x,
centerShift_y,
img.width * ratio,
img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page5",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas1()

// Page6 H1 animation code
var clutter = "";

document.querySelector("#page6>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector("#page6>h1").innerHTML = clutter;
})
gsap.to("#page6>h1>span",{
  scrollTrigger:{
      trigger:`#page6>h1>span`,
      start:`top bottom`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5,    
  },
  stagger:.2,
  color:`#fff`
})

// ============================================
// FEATURE CARDS - 3D TILT & STAGGER ANIMATIONS
// ============================================

const featureCards = document.querySelectorAll('.feature-card');

// 3D Tilt Effect
featureCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Stagger entrance animations with Intersection Observer
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200);
      cardObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

featureCards.forEach(card => {
  cardObserver.observe(card);
});

// Page7 canvas

function canvas2(){
  const canvas = document.querySelector("#page7>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
return data.split("\n")[index];
}

const frameCount = 136;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page7`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page7",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas2()


// page 7 inner circle animation

gsap.to("#page7-circle",{
  scrollTrigger:{
    trigger:`#page7-circle`,
    start:`top center`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5,   
      // markers:true

  },
  // backgroundColor: `#0a3bce91`,
  scale:1.1
})

gsap.to("#page7-circle-inner",{
  scrollTrigger:{
    trigger:`#page7-circle-inner`,
    start:`top center`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5,   
      // markers:true

  },
  // Keep transparent background
  scale: 1.05
})


// ============================================
// SUCCESS STORIES - PARALLAX & SLIDE-IN ANIMATIONS
// ============================================

const storyCards = document.querySelectorAll('.story-card');

// Intersection Observer for slide-in animations
const storyObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const storyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      storyObserver.unobserve(entry.target);
    }
  });
}, storyObserverOptions);

storyCards.forEach(card => {
  storyObserver.observe(card);
  
  // Parallax image movement on mouse move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;
    
    const img = card.querySelector('.left11 img');
    if (img) {
      img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('.left11 img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  });
});

// ============================================
// CURSOR TRAIL EFFECT
// ============================================

const cursorTrails = [];
const trailCount = 8;

// Create cursor trail elements
for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);
  cursorTrails.push({
    element: trail,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor trails
function animateCursorTrails() {
  cursorTrails.forEach((trail, index) => {
    const delay = index * 0.05;
    
    trail.targetX = mouseX;
    trail.targetY = mouseY;
    
    trail.x += (trail.targetX - trail.x) * (0.2 - delay);
    trail.y += (trail.targetY - trail.y) * (0.2 - delay);
    
    trail.element.style.transform = `translate(${trail.x - 4}px, ${trail.y - 4}px)`;
    trail.element.style.opacity = 1 - (index / trailCount) * 0.8;
  });
  
  requestAnimationFrame(animateCursorTrails);
}

animateCursorTrails();

// ============================================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ============================================

const lazyAnimElements = document.querySelectorAll('#page2, #page4, #page6, #page9, #page12, #page13');

const lazyObserverOptions = {
  threshold: 0.15,
  rootMargin: '0px'
};

const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, lazyObserverOptions);

lazyAnimElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  lazyObserver.observe(element);
});

// ============================================
// SOCIAL LINKS - PLATFORM LOGOS
// ============================================

const socialLinks = document.querySelectorAll('.page14-inner');

socialLinks.forEach((link, index) => {
  const logo = document.createElement('i');
  logo.className = 'social-logo';
  
  if (index === 0) {
    logo.classList.add('ri-twitter-x-line');
  } else if (index === 1) {
    logo.classList.add('ri-linkedin-box-fill');
  } else if (index === 2) {
    logo.classList.add('ri-instagram-line');
  }
  
  link.insertBefore(logo, link.firstChild);
});
