const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const BPM = 125;
const BEAT_MS = 60000 / BPM;
const TRACK_DURATION = 104.149;
const ACTIVE_START = 7.2;
// Arrangement markers only select the side. Movement itself is driven by the
// individual vocal onsets below, not by equal-length sections or the beat.
const PHASE_BOUNDARIES = [ACTIVE_START, 18.72, 30.72, 42.24, 58.32, 74.40, TRACK_DURATION];
const CHANT_CUES = [
  ...[8.18, 9.82, 11.97, 13.66, 15.84, 17.50].map((time) => ({ time, side: 'quit' })),
  ...[19.17, 20.12, 21.07, 22.02, 22.98, 23.96].map((time) => ({ time, side: 'cheer' })),
  ...[31.22, 32.89, 35.08, 37.47, 38.95, 40.63].map((time) => ({ time, side: 'quit' })),
  ...[
    42.37, 43.35, 44.82, 45.78, 46.78, 48.24, 49.18, 50.14,
    51.12, 52.34, 53.06, 54.53, 55.50, 56.23, 57.46,
  ].map((time) => ({ time, side: 'cheer' })),
  ...[58.44, 60.09, 62.30, 63.93, 66.65, 67.86, 70.10, 71.82]
    .map((time) => ({ time, side: 'quit' })),
  ...[
    74.54, 75.30, 76.46, 77.38, 78.38, 79.35, 80.34,
    81.30, 82.29, 83.26, 84.68, 85.66, 86.66, 88.14,
  ].map((time) => ({ time, side: 'cheer' })),
];
const COUNT_CUES = [
  [4.32, 'ONE'], [4.80, 'TWO'], [5.28, 'ONE'],
  [5.76, 'TWO'], [6.24, 'さん'], [6.72, 'はい！'],
];

const YAME_SHOUTS = [
  '煙草、やめちまえ！', '惰性で飲む酒、やめちまえ！', '心を壊す仕事、やめちまえ！',
  'サービス残業、やめちまえ！', '脈のない恋愛、やめちまえ！', '無理して続ける結婚、やめちまえ！',
  '他人との比較、やめちまえ！', 'SNSの数字、やめちまえ！', '使わないサブスク、やめちまえ！',
  '深夜のラーメン、やめちまえ！', '明日からやる、やめちまえ！', 'ゴミ分別で喧嘩、やめちまえ！',
];

const DONMAI_SHOUTS = [
  '気にするな', 'よかです', '心配ないぜ', '大丈夫、大丈夫',
  '次があるさ', 'そんな日もある', '無理せんでええ', 'ぼちぼちいこう',
];

const track = new Audio('./audio/original-track.m4a');
track.preload = 'auto';

const state = {
  playing: false,
  balance: 50,
  targetBalance: 50,
  remaining: TRACK_DURATION,
  beat: -1,
  cueIndex: 0,
  chantCueIndex: 0,
  lastChantSide: null,
  muted: false,
  pausedByVisibility: false,
  phaseIndex: -1,
  animationId: null,
};

const els = {
  app: $('#app'), arena: $('#arena'), timer: $('#timer'), roundLabel: $('#roundLabel'),
  pushButton: $('#pushButton'), pushLabel: $('#pushLabel'), hint: $('#hint'),
  judgement: $('#judgement'), particles: $('#particles'), startPanel: $('#startPanel'),
  resultPanel: $('#resultPanel'), soundButton: $('#soundButton'), resultStamp: $('#resultStamp'),
  resultTitle: $('#resultTitle'), resultCopy: $('#resultCopy'), crowdScene: $('#crowdScene'),
  quitShoutLayer: $('#quitShoutLayer'), cheerShoutLayer: $('#cheerShoutLayer'),
};

function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

function getPhaseIndex(time = track.currentTime) {
  if (time < ACTIVE_START) return -1;
  const nextBoundary = PHASE_BOUNDARIES.findIndex((boundary, index) => index > 0 && time < boundary);
  return nextBoundary === -1 ? PHASE_BOUNDARIES.length - 2 : nextBoundary - 1;
}

function phaseSide(time = track.currentTime) {
  const phase = getPhaseIndex(time);
  return phase % 2 === 1 ? 'cheer' : 'quit';
}

function setBalance(next) {
  state.balance = Math.max(3, Math.min(97, next));
  document.documentElement.style.setProperty('--balance', `${state.balance}%`);
  els.crowdScene.style.setProperty('--crowd-shift', `${(state.balance - 50) * .34}px`);
}

function showCallout(label, kind = 'good') {
  els.judgement.textContent = label;
  els.judgement.className = `judgement ${kind}`;
  void els.judgement.offsetWidth;
  els.judgement.classList.add('show');
}

function spawnParticles(side, amount = 10) {
  const color = side === 'quit' ? '#ffdb55' : '#82faff';
  for (let i = 0; i < amount; i++) {
    const particle = document.createElement('i');
    particle.className = 'particle'; particle.style.color = color;
    particle.style.left = `${state.balance + (Math.random() - .5) * 5}%`;
    particle.style.top = `${48 + (Math.random() - .5) * 18}%`;
    particle.style.setProperty('--dx', `${(Math.random() - .5) * 190}px`);
    particle.style.setProperty('--dy', `${(Math.random() - .5) * 160}px`);
    els.particles.appendChild(particle);
    setTimeout(() => particle.remove(), 700);
  }
}

function spawnHeartWave(amount = 24) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle'; heart.textContent = '♥';
    heart.style.left = `${65 + Math.random() * 27}%`;
    heart.style.top = `${28 + Math.random() * 48}%`;
    heart.style.setProperty('--dx', `${-90 - Math.random() * 260}px`);
    heart.style.setProperty('--dy', `${(Math.random() - .5) * 190}px`);
    heart.style.animationDelay = `${Math.random() * .24}s`;
    els.particles.appendChild(heart);
    setTimeout(() => heart.remove(), 1900);
  }
}

function buildBubbles(messages, count, group) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('span');
    bubble.className = 'shout';
    bubble.textContent = messages[(group * count + i) % messages.length];
    fragment.appendChild(bubble);
  }
  return fragment;
}

function renderShouts(group) {
  const mobile = window.innerWidth <= 620;
  els.cheerShoutLayer.classList.remove('counter-active');
  els.quitShoutLayer.replaceChildren(buildBubbles(YAME_SHOUTS, mobile ? 2 : 4, group));
  els.cheerShoutLayer.replaceChildren(buildBubbles(DONMAI_SHOUTS, mobile ? 2 : 3, group));
}

function renderDonmaiCounterShouts() {
  const count = window.innerWidth <= 620 ? 2 : 3;
  els.cheerShoutLayer.classList.add('counter-active');
  els.cheerShoutLayer.replaceChildren(buildBubbles(DONMAI_SHOUTS, count, 0));
}

function setPhaseVisual(side) {
  els.app.classList.toggle('cue-quit', side === 'quit');
  els.app.classList.toggle('cue-cheer', side === 'cheer');
  els.pushLabel.textContent = side === 'quit' ? 'やめちまえ！' : 'どんまい！';
}

function onBeat(index) {
  const dots = $$('.beat-track i');
  dots.forEach((dot, i) => dot.className = i === index % 8 ? (i === 0 ? 'active downbeat' : 'active') : '');
}

function showCountCue(currentTime) {
  while (state.cueIndex < COUNT_CUES.length && currentTime >= COUNT_CUES[state.cueIndex][0]) {
    showCallout(COUNT_CUES[state.cueIndex][1], state.cueIndex === COUNT_CUES.length - 1 ? 'perfect' : 'good');
    state.cueIndex++;
  }
}

function triggerDonmaiCounter() {
  els.app.classList.add('donmai-counter');
  els.roundLabel.textContent = 'HEARTFUL COUNTER';
  showCallout('どんまい！', 'perfect');
  renderDonmaiCounterShouts();
  spawnHeartWave(); spawnParticles('cheer', 30);
  if (navigator.vibrate) navigator.vibrate([60, 35, 120]);
  setTimeout(() => {
    els.app.classList.remove('donmai-counter');
    if (state.playing) renderShouts(Math.floor(state.beat / 8) + 1);
  }, 2100);
}

function triggerChantCue(cue, index) {
  const firstCueForSide = state.lastChantSide !== cue.side;
  state.lastChantSide = cue.side;
  setPhaseVisual(cue.side);
  renderShouts(index);

  els.crowdScene.classList.remove('lunge-quit', 'lunge-cheer');
  void els.crowdScene.offsetWidth;
  els.crowdScene.classList.add(cue.side === 'quit' ? 'lunge-quit' : 'lunge-cheer');

  if (cue.side === 'quit') {
    const push = firstCueForSide ? 30 : 5.2;
    state.targetBalance = Math.min(84, state.targetBalance + push);
    showCallout('やめちまえ！', firstCueForSide ? 'perfect' : 'good');
    spawnParticles('quit', firstCueForSide ? 30 : 12);
    if (firstCueForSide && navigator.vibrate) navigator.vibrate([80, 30, 110]);
  } else {
    const push = firstCueForSide ? 30 : 4.2;
    state.targetBalance = Math.max(16, state.targetBalance - push);
    if (firstCueForSide) triggerDonmaiCounter();
    else {
      showCallout('どんまい！', 'perfect');
      spawnHeartWave(7); spawnParticles('cheer', 12);
    }
  }
}

function processChantCues(currentTime) {
  while (state.chantCueIndex < CHANT_CUES.length && currentTime >= CHANT_CUES[state.chantCueIndex].time) {
    const cue = CHANT_CUES[state.chantCueIndex];
    // A backgrounded tab may jump ahead; do not burst every missed cue at once.
    if (currentTime - cue.time < .24) triggerChantCue(cue, state.chantCueIndex);
    state.chantCueIndex++;
  }
}

function decorativePush() {
  if (!state.playing || track.paused || track.currentTime < ACTIVE_START) return;
  const side = phaseSide();
  showCallout(side === 'quit' ? 'やめちまえ！' : 'どんまい！', side === 'quit' ? 'good' : 'perfect');
  spawnParticles(side, 14);
  if (side === 'cheer') spawnHeartWave(6);
  els.pushButton.classList.add('pressed');
  setTimeout(() => els.pushButton.classList.remove('pressed'), 90);
}

function gameLoop() {
  if (!state.playing) return;
  const elapsed = track.currentTime;
  const beatIndex = Math.floor((elapsed * 1000) / BEAT_MS);
  while (state.beat < beatIndex) { state.beat++; onBeat(state.beat); }

  showCountCue(elapsed);
  processChantCues(elapsed);
  setBalance(state.balance + (state.targetBalance - state.balance) * .14);
  state.remaining = Math.max(0, TRACK_DURATION - elapsed);
  els.timer.textContent = formatTime(state.remaining);

  if (elapsed < 4.2) {
    els.roundLabel.textContent = 'INTRO';
  } else if (elapsed < ACTIVE_START) {
    els.roundLabel.textContent = 'COUNT IN';
  } else {
    const phase = getPhaseIndex(elapsed);
    if (phase !== state.phaseIndex) {
      state.phaseIndex = phase;
      const side = phaseSide(elapsed);
      setPhaseVisual(side);
      renderShouts(phase * 2);
    }
    const side = phaseSide(elapsed);
    if (!els.app.classList.contains('donmai-counter')) {
      const repetition = ['I', 'II', 'III'][Math.floor(phase / 2)];
      els.roundLabel.textContent = side === 'quit'
        ? `YAMECHIMAE ${repetition}`
        : `DONMAI ${repetition}`;
    }
    els.hint.textContent = '';
    els.pushButton.disabled = false;
  }

  if (track.ended || state.remaining <= 0) finishExperience();
  else state.animationId = requestAnimationFrame(gameLoop);
}

async function startExperience() {
  state.playing = true; state.balance = 50; state.remaining = TRACK_DURATION;
  state.targetBalance = 50; state.beat = -1; state.cueIndex = 0;
  state.chantCueIndex = 0; state.lastChantSide = null; state.phaseIndex = -1;
  setBalance(50); renderShouts(0);
  els.startPanel.classList.add('modal--hidden'); els.resultPanel.classList.add('modal--hidden');
  els.app.classList.add('playing', 'cue-quit');
  els.app.classList.remove('cue-cheer', 'donmai-counter');
  els.pushButton.disabled = true; els.pushLabel.textContent = 'PUSH!';
  els.roundLabel.textContent = 'INTRO'; els.hint.textContent = 'まずは冒頭のカウントを聴こう';
  track.pause(); track.currentTime = 0; track.muted = state.muted;
  try {
    await track.play();
  } catch {
    state.playing = false; els.startPanel.classList.remove('modal--hidden');
    els.hint.textContent = '音源を再生できませんでした。もう一度お試しください。';
    return;
  }
  cancelAnimationFrame(state.animationId);
  state.animationId = requestAnimationFrame(gameLoop);
}

function finishExperience() {
  if (!state.playing) return;
  state.playing = false; cancelAnimationFrame(state.animationId); track.pause();
  els.app.classList.remove('playing', 'cue-quit', 'cue-cheer', 'donmai-counter');
  els.pushButton.disabled = true; els.roundLabel.textContent = 'FINISH';
  els.resultStamp.textContent = 'どんまい'; els.resultStamp.style.color = '#7cfcff';
  els.resultTitle.textContent = 'はい、ありがとうございました。';
  els.resultCopy.textContent = 'やめちまえも、どんまいも、どちらも必要な言葉です。';
  setTimeout(() => els.resultPanel.classList.remove('modal--hidden'), 480);
}

$('#startButton').addEventListener('click', startExperience);
els.pushButton.addEventListener('pointerdown', (event) => { event.preventDefault(); decorativePush(); });
window.addEventListener('keydown', (event) => {
  if ((event.code === 'Space' || event.code === 'Enter') && state.playing) { event.preventDefault(); decorativePush(); }
});
$('#retryButton').addEventListener('click', startExperience);
els.soundButton.addEventListener('click', () => {
  state.muted = !state.muted; track.muted = state.muted;
  els.soundButton.setAttribute('aria-pressed', String(state.muted));
  els.soundButton.setAttribute('aria-label', state.muted ? '音をオン' : '音をミュート');
});
track.addEventListener('ended', finishExperience);

document.addEventListener('visibilitychange', () => {
  if (!state.playing) return;
  if (document.hidden && !track.paused) {
    state.pausedByVisibility = true; track.pause(); els.roundLabel.textContent = 'PAUSED';
  } else if (!document.hidden && state.pausedByVisibility) {
    state.pausedByVisibility = false; track.play().catch(() => {});
  }
});
