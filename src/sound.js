let ctx = null;
let muted = true;

export function initAudio() {
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
}

export function setMuted(m) {
    muted = m;
}

export function isMuted() {
    return muted;
}

function tone(freq, dur = 0.08, { type = 'square', vol = 0.12, when = 0, slideTo = null } = {}) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
}

export const sounds = {
    click: () => tone(520, 0.03),
    open: () => {
        tone(440, 0.08);
        tone(660, 0.1, { when: 0.08 });
    },
    close: () => {
        tone(660, 0.06);
        tone(440, 0.08, { when: 0.06 });
    },
    boot: () => {
        tone(220, 0.5, { slideTo: 880, vol: 0.1 });
        tone(880, 0.25, { when: 0.5 });
        tone(1174, 0.3, { when: 0.72 });
    },
    trash: () => {
        tone(300, 0.08, { type: 'sawtooth' });
        tone(200, 0.1, { when: 0.08, type: 'sawtooth' });
        tone(110, 0.18, { when: 0.16, type: 'sawtooth' });
    },
    blip: () => tone(784, 0.05, { vol: 0.08 }),
    meow: () => {
        tone(880, 0.09, { type: 'triangle', vol: 0.14 });
        tone(660, 0.16, { when: 0.09, type: 'triangle', vol: 0.14 });
    },
    achievement: () => {
        tone(523, 0.09);
        tone(659, 0.09, { when: 0.09 });
        tone(784, 0.09, { when: 0.18 });
        tone(1046, 0.18, { when: 0.27 });
    },
};

const MELODY = [523, 659, 784, 659, 698, 880, 784, 659, 523, 659, 784, 880, 1046, 880, 784, 659];
const BASSLINE = [131, 165, 196, 165, 175, 220, 196, 165];

let musicTimer = null;
let musicStep = 0;

export const music = {
    playing: false,
    start() {
        if (music.playing) return;
        music.playing = true;
        musicTimer = setInterval(() => {
            if (!ctx) return;
            tone(MELODY[musicStep % MELODY.length], 0.16, { vol: 0.045 });
            if (musicStep % 2 === 0) {
                tone(BASSLINE[Math.floor(musicStep / 2) % BASSLINE.length], 0.28, { type: 'triangle', vol: 0.05 });
            }
            musicStep += 1;
        }, 230);
    },
    stop() {
        music.playing = false;
        if (musicTimer) clearInterval(musicTimer);
        musicTimer = null;
    },
};
