
// DOM 
const endnote_kr = 'ENDNOTE: <br />이 웹사이트는 샤이아 라보프의 분노를 포함하고 있습니다. <br>그의 분노는 미래에 대한 불안과 자기 자신에 대한 의심으로 인해 빛바래져가는 우리의 수많은 아이디어를 그대로 두지 말고 지금 당장 뛰어들라고 말합니다. <br>당신의 아름다운 아이디어는 무엇입니까? <br>당장 그걸 하지 않으면 샤이아는 점점 더 화가 날 거에요. <br>이제 당장 뭐라도 하며 그의 화를 좀 달래줘봅시다.';
const endnote_en = 'ENDNOTE: <br />This website contains Shia LaBeouf’s rage. <br>His anger shouts at us to dive into our beautiful ideas that we procrastinated, due to the anxiety about the future and self-doubt. <br>What was your beautiful idea? <br>If you don’t do something to achieve your idea, Shia will be pissed off even more. <br>Let’s calm him down.'
const endnoteKrBtn = document.getElementById('kr')
const endnoteEnBtn = document.getElementById('en')
const endnote = document.getElementById('endnote');
const doorLeft = document.getElementById('door-left');
const doorRight = document.getElementById('door-right');
const scriptBtn = document.getElementById('script-btn');
const topBtn = document.getElementById('top-btn')
const vocalBtns = document.querySelectorAll('.vocal-btn');
const shiaDown = document.getElementById('shia-down');
const introShia = document.getElementById('intro-shia');
const endnoteBtn = document.getElementById('header-endnote-btn');
const endnoteWrapper = document.getElementById('endnote-wrapper');
const endnoteEsc = document.getElementById('esc-btn');
const cursor = document.getElementById('cursor-wrapper');

// CANVAS 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
const introBtn = document.querySelector('#intro-btn');
const doItGif = document.querySelectorAll('.just-do-it');
const feGaussian = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');
const controls = new function(){
    this.blurValue = 40;
    this.alphaChannel = 100;
    this.alphaOffset = -23;
}

// CLASSES
class Vocal {
    constructor(name, src){
        this.name = name;
        this.src = src;
        this.audio = new Audio(this.src);
        this.isPlaying = false
        
    }
    play(){
        this.audioDuration = Math.ceil(this.audio.duration);
        console.log(`playing ${this.name}`)
        console.log(this.audio)
        console.log(`duration : ${this.audioDuration}`);
        // this.audio.play()
    }
}

const vocal_1 = new Vocal(vocalBtns[0].innerText, 'src/audio/cursor_haptic.mp3');
const vocal_2 = new Vocal(vocalBtns[1].innerText, 'src/audio/cursor_haptic.mp3');
const vocal_3 = new Vocal(vocalBtns[2].innerText, 'src/audio/cursor_haptic.mp3');
const vocal_4 = new Vocal(vocalBtns[3].innerText, 'src/audio/cursor_haptic.mp3');
const vocal_5 = new Vocal(vocalBtns[4].innerText, 'src/audio/cursor_haptic.mp3');
const vocal_6 = new Vocal(vocalBtns[5].innerText, 'src/audio/cursor_haptic.mp3');

const vocals = [vocal_1, vocal_2, vocal_3, vocal_4, vocal_5, vocal_6];

class Particle {
    constructor(x, y, radius, vy, color){
        this.r = mouseX;
        this.g = mouseY;
        this.b = random;

        this.color = color
        this.x = x;
        this.y = y;
        this.radius = radius
        this.vy = vy;
        this.acc = 1.01
        // if this.acc = 음수 -> 마찰력 || 양수 -> 중력
    }
    update(){
        this.vy *= this.acc
        this.y += this.vy;
    }
    draw(){

        ctx.beginPath();
        // 나 이제 그리기 시작한다!
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
        // 라디안이라서 그럼
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.closePath(); 
    }
}

// AUDIO
const cursorHaptic = new Audio('src/audio/cursor_haptic.mp3');
const shia_full = new Audio('src/audio/shia_full.mp3');

endnoteKrBtn.addEventListener('click', ()=>{
    endnote.innerHTML = endnote_kr;
})
endnoteEnBtn.addEventListener('click', ()=>{
    endnote.innerHTML = endnote_en;
})

// Intro Canvas

let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

let particles;

let particlesColors = [
    '#f5071f',
    '#fc037b',
    '#d1000e',
    '#f50707',
    '#d62000',
    '#ff2600',
    '#ffd500',
    '#faf600'
]

// Audio
shia_full.loop = 'true'

function playHaptic() {
    cursorHaptic.play();
}
function playShia(){
    shia_full.play();
}


// INIT FUNCTION
function init(){

    // Initializing Canvas

    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;


    ctx.scale(dpr, dpr);

    const TOTAL = canvasWidth / 5;

    particles = [];

    for(let i = 0; i < TOTAL; i++){
        const color = particlesColors[Math.floor(Math.random()*particlesColors.length)]
        const x = randomNumBetween(0, canvasWidth);
        const y = 0;
        const radius = randomNumBetween(15, 50);
        const vy = randomNumBetween(1, 5);

        const particle = new Particle(x, y, radius, vy, color);

        particles.push(particle)

    }
}

// let gui = new dat.GUI();

// gui.add(controls, 'blurValue', 0, 100).onChange(value => {
//     feGaussian.setAttribute('stdDeviation', value);
// })
// gui.add(controls, 'alphaChannel', 1, 200).onChange(value => {
//     feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`)
// })
// gui.add(controls, 'alphaOffset', -50, 50).onChange(value => {
//     feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`)
// })

let mouseX
let mouseY
let random

introBtn.addEventListener('click', ()=>{
    introShia.style.opacity = '0%';
    introBtn.style.opacity = '0%'
    introBtn.style.pointerEvents = 'none';
    document.body.style.overflowY = 'scroll';
    document.body.style.cursor = 'default';
    cursor.style.display = 'none';
    doorLeft.style.transform = 'translateX(-100%)'
    doorRight.style.transform = 'translateX(100%)'
    endnoteBtn.style.display = 'inline-block'
    playHaptic();
    // Set the scroll speed factor
    let scrollSpeed = 0.1;

    // Add an event listener for the 'wheel' event
    document.addEventListener('mousewheel', function(event) {

        // Prevent default scrolling behavior
        event.preventDefault();

        // Calculate the new scroll position
        let delta = event.deltaY;
        let scrollPosition = window.scrollY + (delta * scrollSpeed); 

        // Set the new scroll position
        window.scrollTo({
          top: scrollPosition
        });
    }, {passive:false});


    setTimeout(()=>{
        doItGif.forEach((e)=>{
            e.style.opacity = '100%'
        })
        scriptBtn.style.opacity = '100%';
        introShia.style.display = 'none'
    }, 800)

    setTimeout(() => {
        playShia();
    }, 1000)
})



topBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
})

// CLASSES



vocalBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        vocals.forEach(vocal => {
            if(btn.innerText == vocal.name){
                shiaDown.style.animation = `faceUpAndDown 0.2s linear 10`;
                vocal.play();
                setTimeout(function(){
                    console.log(vocal.audioDuration * 1000)
                    shiaDown.style.animation = 'none';
                }, vocal.audioDuration*1000)
                
            }
        })
    })
})



const randomNumBetween = (min, max) => {
    return Math.random()*(max - min + 1) + min
}



// FPS에 따른 동일한 애니메이션 프레임 설정 (60 FPS)

let interval = 1000/60;
let now , delta
let then = Date.now()


function animate(){
    window.requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then
    
    if(delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    particles.forEach(particle => {
        particle.update();
        particle.draw();

        if(particle.y + particle.radius> innerHeight){
            particle.vy = -1 * randomNumBetween(1, 5);
        }else if(particle.y + particle.radius < 0){
            particle.y = -particle.radius;
            particle.x = randomNumBetween(0, canvasWidth);
            particle.radius = randomNumBetween(15, 50);
            particle.vy = randomNumBetween(1, 5);
        }
    })
 

    then = now - (delta % interval);
}



window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    init();
    animate();
    setInterval(function(){
        if(introShia.classList.contains('up')){
            introShia.classList.remove('up');
        }else{
            introShia.classList.add('up');
        }
        
    }, 2500)
})

window.addEventListener('resize', ()=>{
    init();
})



window.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
})



endnoteBtn.addEventListener('click', ()=>{
    endnoteWrapper.style.transform = 'translateX(0%)';
})

endnoteEsc.addEventListener('click', ()=>{
    endnoteWrapper.style.transform = 'translateX(100%)';
})


