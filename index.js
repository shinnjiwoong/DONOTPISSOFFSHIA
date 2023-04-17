
// ENDNOTE 
const endnote_kr = 'ENDNOTE: <br />SNS에서는 모두가 슈퍼스타처럼 보인다. <br />‘나’를 제외한 모두가 의미있는 일들을 하며 멋지게 앞으로 나아가는 것만 같다. <br />‘나’에게도 분명 반짝이듯 머리에 떠올랐던 그 ‘일’이 있었던 것 같다. <br />다만, 이미 잘나가는 수많은 사람들을 보면 내가 떠올렸던 그 아이디어들은 하찮아보이기 시작하고, 이내 그 반짝임은 사라진다. 그렇게 우리는 상상했던 그 ‘일’은 수많은 의심과 불안과 ‘그럴 여유가 없다’는 이유로 행동으로 옮겨지지 못한다. <br />너무나 흔한 일이고, 질타받아야 할 일도 아니다. <br />다만… <br />샤이아 라보프는 이러한 우리를 보며 속으로 분노를 삭인다. <br />분노를 삭이고 삭이다 그는 결국 참지 못하고 터뜨리며 소리친다. <br />DO IT! JUST DO IT! <br />분노를 터뜨리는 샤이아 라보프를 보면 저러다 혈압이 터져 쓰러지는 건 아닐까 하는 걱정이 든다. <br />이내 그의 화를 진정시키며 달래고 싶은 마음이 든다. <br />그의 분노를 듣다보면 그가 원하는 건 단 한가지인 것 같다. <br />우리가 주저했던 그 ‘일’을 더이상은 망설이지 않고 하는 것. <br />이 웹사이트에서 그의 분노에 귀기울여 보자. <br />그리고 오늘 하루만이라도 그의 화를 달래줘보자. 사람 한명 살리는 셈 치고. <br />우리가 각자 미뤄왔던 그것을 조금이라도 한다면, 그는 금방 온순해질 것이다.';
const endnote_en = 'ENDNOTE: <br />People in SNS world are all super stars. <br>Everyone seems to go on achieving meaningful works except ‘me’. <br>I also had one of those beautiful ideas of work. <br>But, feelings of doubt, anxiety and lack of time stopped me from actually working on it. <br>This happens to all of us and it’s not something to be blamed at. <br>But….<br>Shia LaBeouf gets mad upon us. <br>He’s getting pissed off and shouting at us like <br>”DO IT! JUST DO IT!”<br>Let’s listen to his anger in this website, and calm him down by doing something what we procrastinated TODAY. <br>Not for ourselves, but, for saving Shia’s mental peace. '
const endnoteKrBtn = document.getElementById('kr')
const endnoteEnBtn = document.getElementById('en')
const endnote = document.getElementById('endnote');

endnoteKrBtn.addEventListener('click', ()=>{
    endnote.innerHTML = endnote_kr;
})
endnoteEnBtn.addEventListener('click', ()=>{
    endnote.innerHTML = endnote_en;
})


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
const scriptBtn = document.getElementById('script-btn');

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

const topBtn = document.getElementById('top-btn')

topBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
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

const introShia = document.getElementById('intro-shia');

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

const cursor = document.getElementById('cursor-wrapper');

window.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
})

const endnoteBtn = document.getElementById('header-endnote-btn');
const endnoteWrapper = document.getElementById('endnote-wrapper');
const endnoteEsc = document.getElementById('esc-btn');

endnoteBtn.addEventListener('click', ()=>{
    endnoteWrapper.style.transform = 'translateX(0%)';
})

endnoteEsc.addEventListener('click', ()=>{
    endnoteWrapper.style.transform = 'translateX(100%)';
})


