

// Intro Canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;


const introBtn = document.querySelector('#intro-btn');
const doItGif = document.querySelectorAll('.just-do-it');

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
const cursorHaptic = new Audio('src/audio/cursor_haptic.mp3');
const shia_full = new Audio('src/audio/shia_full.mp3');
shia_full.loop = 'true'


function playHaptic() {
    cursorHaptic.play();
}
function playShia(){
    shia_full.play();
}

setTimeout(()=>{
    doItGif.forEach((e)=>{
        e.style.opacity = '100%'
    })

}, 1500)

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
        console.log(color)

        particles.push(particle)

    }
}



const feGaussian = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');


const controls = new function(){
    this.blurValue = 40;
    this.alphaChannel = 100;
    this.alphaOffset = -23;
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

const doorLeft = document.getElementById('door-left');
const doorRight = document.getElementById('door-right');

introBtn.addEventListener('click', ()=>{
    doorLeft.style.transform = 'translateX(-100%)'
    doorRight.style.transform = 'translateX(100%)'
    playHaptic();

    setTimeout(() => {
        playShia();
    }, 1000)
})

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
        // 음수 -> 마찰력 || 양수 -> 중력
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
            // particle.y = -particle.radius;
            // particle.x = randomNumBetween(0, canvasWidth);
            // particle.radius = randomNumBetween(15, 50);
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
    init();
    animate();
})

window.addEventListener('resize', ()=>{
    init();
})

const cursor = document.getElementById('cursor-wrapper');

window.addEventListener('mousemove', (e) => {
    console.log('moved')
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
})