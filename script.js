const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

let mx = innerWidth / 2;
let my = innerHeight / 2;

let rx = mx;
let ry = my;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;

    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
});

(function trackRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    requestAnimationFrame(trackRing);
})();

/* STARFIELD */
const cv = document.getElementById('stars');
const ct = cv.getContext('2d');

function resizeCanvas() {
    cv.width = innerWidth;
    cv.height = innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 110 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * .9 + .15,
    ph: Math.random() * Math.PI * 2,
    sp: Math.random() * .005 + .002,
    a: Math.random() * .6 + .1
}));

(function animate(t) {

    ct.clearRect(0, 0, cv.width, cv.height);

    stars.forEach(st => {

        const alpha =
            (Math.sin(t * .001 * st.sp * 1000 + st.ph) * .45 + .55) * st.a;

        ct.beginPath();
        ct.arc(st.x, st.y, st.r, 0, Math.PI * 2);

        ct.fillStyle =
            `rgba(196,181,253,${alpha})`;

        ct.fill();

    });

    requestAnimationFrame(animate);

})(0);

/* PROGRESS */
const bar = document.getElementById('progBar');
const pct = document.getElementById('ppct');

let progress = 0;

const interval = setInterval(() => {

    progress = Math.min(
        84,
        progress + Math.random() * 2.4 + .6
    );

    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';

}, 110);

/* PLUG ANIMATION */

const pl = document.getElementById('pl');
const pr = document.getElementById('pr');

setTimeout(() => {

    pl.style.left = '32%';
    pr.style.right = '32%';

}, 650);

/* FINAL TRANSITION */

setTimeout(() => {

    clearInterval(interval);

    bar.style.width = '100%';
    pct.textContent = '100%';

    setTimeout(() => {

        document.getElementById('flash').classList.add('pop');

        document.body.classList.add('lit');

        pl.style.opacity = '0';
        pr.style.opacity = '0';

        document.querySelector('.track').style.opacity = '0';

        document.getElementById('progWrap').style.opacity = '0';
        document.getElementById('chips').style.opacity = '0';

        setTimeout(() => {

            document.getElementById('connector').remove();
            document.getElementById('progWrap').remove();
            document.getElementById('chips').remove();

            document.getElementById('final').classList.add('show');
            document.getElementById('cta').classList.add('show');

        }, 750);

    }, 520);

}, 3800);