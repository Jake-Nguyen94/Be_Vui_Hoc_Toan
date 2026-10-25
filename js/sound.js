/**
 * Native Vietnamese Audio & Sound Effects Manager
 * Sử dụng file âm thanh MP3 Tiếng Việt bản ngữ 100%, không phụ thuộc vào cài đặt giọng đọc của Windows
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.currentAudio = null;

    // Bộ file âm thanh Tiếng Việt chuẩn
    this.audioFiles = {
      praise: [
        { file: 'audio/praise_1.mp3', text: 'Đúng rồi! Bé giỏi quá!' },
        { file: 'audio/praise_2.mp3', text: 'Hoan hô bé! Bé rất thông minh!' },
        { file: 'audio/praise_3.mp3', text: 'Chính xác! Bé làm tốt lắm!' },
        { file: 'audio/praise_4.mp3', text: 'Tuyệt vời quá bé ơi!' },
        { file: 'audio/praise_5.mp3', text: 'Xuất sắc! Bé giỏi lắm!' }
      ],
      wrong: [
        { file: 'audio/wrong_1.mp3', text: 'Chưa đúng rồi, bé thử lại nhé!' },
        { file: 'audio/wrong_2.mp3', text: 'Bé đếm kỹ lại xem nào!' }
      ],
      refresh: { file: 'audio/refresh.mp3', text: 'Đã đổi bài tập mới cho bé rồi nhé!' },
      victory: { file: 'audio/victory.mp3', text: 'Hoan hô bé! Bé đã hoàn thành xuất sắc bài tập này!' }
    };
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Phát file âm thanh Tiếng Việt
  playVoiceFile(filePath, text = '') {
    if (!this.enabled) return;
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
      const audio = new Audio(filePath);
      this.currentAudio = audio;
      audio.play().catch(e => {
        console.warn('Audio play error, falling back:', e);
      });
      if (text) {
        this.showPraiseBubble(text);
      }
    } catch (err) {
      console.warn('Voice play exception:', err);
    }
  }

  // Lời khen ngẫu nhiên khi bé chọn ĐÚNG kết quả (100% Giọng tiếng Việt chuẩn)
  speakRandomPraise() {
    const list = this.audioFiles.praise;
    const item = list[Math.floor(Math.random() * list.length)];
    this.playVoiceFile(item.file, item.text);
  }

  // Lời nhắc nhở nhẹ nhàng khi bé chọn SAI
  speakWrong() {
    const list = this.audioFiles.wrong;
    const item = list[Math.floor(Math.random() * list.length)];
    this.playVoiceFile(item.file, item.text);
  }

  // Đọc số đếm 1 đến 10 bằng tiếng Việt
  speakNumber(num) {
    const n = parseInt(num, 10);
    if (n >= 1 && n <= 10) {
      this.playVoiceFile(`audio/num_${n}.mp3`, `${n}`);
    } else {
      this.showPraiseBubble(`${num}`);
    }
  }

  // Đổi đề mới
  speakRefresh() {
    this.playVoiceFile(this.audioFiles.refresh.file, this.audioFiles.refresh.text);
  }

  // Chiến thắng toàn bài
  speakVictory() {
    this.playVoiceFile(this.audioFiles.victory.file, this.audioFiles.victory.text);
  }

  // Hiển thị bong bóng thoại lời khen trên màn hình
  showPraiseBubble(text) {
    let bubble = document.getElementById('praise-speech-bubble');
    if (!bubble) {
      bubble = document.createElement('div');
      bubble.id = 'praise-speech-bubble';
      bubble.className = 'praise-speech-bubble';
      document.body.appendChild(bubble);
    }
    bubble.innerHTML = `<span>🗣️</span> "${text}"`;
    bubble.classList.add('show');
    clearTimeout(this.bubbleTimer);
    this.bubbleTimer = setTimeout(() => {
      bubble.classList.remove('show');
    }, 2400);
  }

  // Tiếng bấm bóng nổ / đếm số
  playPop() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Tiếng nhạc hợp âm chiến thắng
  playCorrect() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.23);
    });
  }

  playWrongSound() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(200, now + 0.18);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  playStar() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [880, 1174, 1396, 1760];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);
      gain.gain.setValueAtTime(0.2, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.26);
    });
  }

  playFanfare() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const melody = [
      { f: 523, t: 0 },
      { f: 523, t: 0.1 },
      { f: 523, t: 0.2 },
      { f: 659, t: 0.32 },
      { f: 783, t: 0.44 },
      { f: 1046, t: 0.65 }
    ];
    melody.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.25, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + n.t + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.32);
    });
  }
}

window.soundMgr = new SoundManager();
