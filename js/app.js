/**
 * BÉ VUI HỌC TOÁN - MAIN APPLICATION LOGIC
 * Kho hình phong phú: Động vật, Hoa quả nhiệt đới, Phương tiện, Đồ ăn vặt, Hình khối
 * 100% âm thanh Tiếng Việt bản ngữ, đổi đề ngẫu nhiên
 */

// Helper lấy SVG cho bất kỳ vật thể nào
function getCuteItemSVG(type, size = 46) {
  if (window.SVGIcons && typeof window.SVGIcons[type] === 'function') {
    return window.SVGIcons[type](size);
  }
  // Mapping các hình đặc thù
  if (type === 'circle') return window.SVGIcons.shapeCircle(size, '#F59E0B');
  if (type === 'square') return window.SVGIcons.shapeSquare(size, '#3B82F6');
  if (type === 'triangle') return window.SVGIcons.shapeTriangle(size, '#10B981');
  if (type === 'star') return window.SVGIcons.shapeStar(size, '#FDE047');
  if (type === 'heart') return window.SVGIcons.shapeHeart(size, '#EC4899');
  if (type === 'birthdayCake') return window.SVGIcons.birthdayCake(size);
  if (type === 'milkCarton') return window.SVGIcons.milkCarton(size);
  if (type === 'cookie') return window.SVGIcons.cookie(size);
  if (type === 'lollipop') return window.SVGIcons.lollipop(size);
  if (type === 'soccerBall') return window.SVGIcons.soccerBall(size);
  if (type === 'house') return window.SVGIcons.house(size);
  if (type === 'watermelon') return window.SVGIcons.watermelon(size);
  if (type === 'banana') return window.SVGIcons.banana(size);
  if (type === 'mango') return window.SVGIcons.mango(size);
  if (type === 'pineapple') return window.SVGIcons.pineapple(size);
  if (type === 'orange') return window.SVGIcons.orange(size);
  if (type === 'dragonfruit') return window.SVGIcons.dragonfruit(size);
  if (type === 'car') return window.SVGIcons.car(size);
  if (type === 'airplane') return window.SVGIcons.airplane(size);
  if (type === 'balloon') return window.SVGIcons.balloon(size);
  if (type === 'frog') return window.SVGIcons.frog(size);
  if (type === 'duck') return window.SVGIcons.duck(size);
  if (type === 'puppy') return window.SVGIcons.puppy(size);
  if (type === 'kitten') return window.SVGIcons.kitten(size);

  return window.SVGIcons.sun(size);
}

class MathApp {
  constructor() {
    this.totalStars = parseInt(localStorage.getItem('be_stars') || '0', 10);
    this.currentView = 'home';
    this.currentDifficulty = 10;
    this.activeColor = '#F43F5E';
    this.isDrawing = false;
    this.canvasCtx = null;

    this.currentData = {
      nature: [],
      garden: [],
      dessert: [],
      hunt: [],
      targetHuntNum: 1,
      comparison: [],
      addition: [],
      train: [],
      shapes: []
    };

    this.init();
  }

  init() {
    this.updateStarDisplay();
    this.setupGlobalEvents();
    this.setupColoringCanvas();
    this.renderHome();
  }

  updateStarDisplay() {
    const el = document.getElementById('starCountText');
    if (el) el.textContent = this.totalStars;
    localStorage.setItem('be_stars', this.totalStars.toString());
  }

  addStars(count = 1) {
    this.totalStars += count;
    this.updateStarDisplay();
    window.soundMgr.playStar();
    const starEl = document.querySelector('.star-badge');
    if (starEl) {
      starEl.classList.add('pop-star');
      setTimeout(() => starEl.classList.remove('pop-star'), 500);
    }
  }

  setupGlobalEvents() {
    document.getElementById('brandLogo').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('home');
    });

    const soundToggle = document.getElementById('soundToggleBtn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        window.soundMgr.enabled = !window.soundMgr.enabled;
        soundToggle.textContent = window.soundMgr.enabled ? '🔊' : '🔇';
      });
    }

    document.getElementById('closeVictoryModalBtn').addEventListener('click', () => {
      document.getElementById('victoryModal').classList.remove('active');
    });

    document.querySelectorAll('.btn-refresh-sheet').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.sheetType;
        window.soundMgr.playPop();
        this.loadWorksheet(type, true);
        window.soundMgr.speakRefresh();
      });
    });

    document.querySelectorAll('.btn-print-sheet').forEach(btn => {
      btn.addEventListener('click', () => {
        window.print();
      });
    });

    document.querySelectorAll('.btn-back-home').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView('home');
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-screen').forEach(v => v.classList.remove('active'));

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'home') {
      document.getElementById('homeView').classList.add('active');
    } else {
      const target = document.getElementById(viewName + 'View');
      if (target) {
        target.classList.add('active');
        this.loadWorksheet(viewName, true);
      }
    }
  }

  loadWorksheet(type, forceRefresh = false) {
    if (type === 'nature') this.renderNatureGame(forceRefresh);
    else if (type === 'garden') this.renderGardenGame(forceRefresh);
    else if (type === 'dessert') this.renderDessertGame(forceRefresh);
    else if (type === 'hunt') this.renderHuntGame(forceRefresh);
    else if (type === 'compare') this.renderCompareGame(forceRefresh);
    else if (type === 'addition') this.renderAdditionGame(forceRefresh);
    else if (type === 'train') this.renderTrainGame(forceRefresh);
    else if (type === 'shapes') this.renderShapesGame(forceRefresh);
  }

  // =========================================================================
  // 1. DẠNG BÀI: ĐẾM SỐ LƯỢNG TRONG TRANH
  // =========================================================================
  renderNatureGame(refresh = true) {
    if (refresh || this.currentData.nature.length === 0) {
      this.currentData.nature = window.MathGenerators.generateCountNature(this.currentDifficulty);
    }
    const container = document.getElementById('natureCardsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.nature.map((q, idx) => {
      let itemsHtml = '';
      for (let i = 0; i < q.count; i++) {
        const svg = getCuteItemSVG(q.type, 46);
        itemsHtml += `<div class="countable-item" data-qindex="${idx}" data-itemnum="${i + 1}">${svg}</div>`;
      }

      const optsHtml = q.options.map(opt => `
        <button class="choice-circle-btn ${q.userAnswer === opt ? (opt === q.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-qindex="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="nature-card" id="nature_card_${idx}">
          <div class="nature-badge">${q.numberBadge}</div>
          <div class="nature-stage">${itemsHtml}</div>
          <div class="nature-question">${q.question}</div>
          <div class="nature-options">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.countable-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.add('counted');
        window.soundMgr.playPop();
        window.soundMgr.speakNumber(item.dataset.itemnum);
      });
    });

    container.querySelectorAll('.choice-circle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIndex = parseInt(btn.dataset.qindex, 10);
        const chosenVal = parseInt(btn.dataset.val, 10);
        const question = this.currentData.nature[qIndex];

        if (question.userAnswer === question.correct) return;

        question.userAnswer = chosenVal;
        if (chosenVal === question.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.checkCompletion('nature');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  // =========================================================================
  // 2. DẠNG BÀI: BÉ ĐẾM VÀ TÔ MÀU
  // =========================================================================
  renderGardenGame(refresh = true) {
    if (refresh || this.currentData.garden.length === 0) {
      this.currentData.garden = window.MathGenerators.generateGardenRows(this.currentDifficulty);
    }
    const container = document.getElementById('gardenRowsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.garden.map((row, idx) => {
      let itemsHtml = '';
      for (let i = 0; i < row.count; i++) {
        const svg = getCuteItemSVG(row.type, 42);
        itemsHtml += `<div class="countable-item" data-num="${i+1}">${svg}</div>`;
      }

      const optsHtml = row.options.map(opt => `
        <button class="choice-circle-btn ${row.userAnswer === opt ? (opt === row.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-rowidx="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="garden-row-item">
          <div class="garden-row-stage">${itemsHtml}</div>
          <div class="garden-row-options">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.countable-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.add('counted');
        window.soundMgr.playPop();
        window.soundMgr.speakNumber(item.dataset.num);
      });
    });

    container.querySelectorAll('.choice-circle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rowIdx = parseInt(btn.dataset.rowidx, 10);
        const val = parseInt(btn.dataset.val, 10);
        const row = this.currentData.garden[rowIdx];

        if (row.userAnswer === row.correct) return;

        row.userAnswer = val;
        if (val === row.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.checkCompletion('garden');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  // =========================================================================
  // 3. DẠNG BÀI: TIỆM BÁNH & ĐỒ ĂN VẶT
  // =========================================================================
  renderDessertGame(refresh = true) {
    if (refresh || this.currentData.dessert.length === 0) {
      this.currentData.dessert = window.MathGenerators.generateDesserts(this.currentDifficulty);
    }
    const container = document.getElementById('dessertCardsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.dessert.map((d, idx) => {
      let itemsHtml = '';
      for (let i = 0; i < d.count; i++) {
        let svg = '';
        if (d.type === 'icecream') svg = window.SVGIcons.icecream(38, d.flavor || '#F472B6');
        else if (d.type === 'donut') svg = window.SVGIcons.donut(38, d.glaze || '#86EFAC');
        else svg = getCuteItemSVG(d.type, 38);

        itemsHtml += `<div class="countable-item">${svg}</div>`;
      }

      const optsHtml = d.options.map(opt => `
        <button class="dessert-opt-cell ${d.userAnswer === opt ? (opt === d.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-didx="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="dessert-card">
          <div class="dessert-stage">${itemsHtml}</div>
          <div class="dessert-options-row">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.countable-item').forEach(item => {
      item.addEventListener('click', () => {
        window.soundMgr.playPop();
      });
    });

    container.querySelectorAll('.dessert-opt-cell').forEach(btn => {
      btn.addEventListener('click', () => {
        const dIdx = parseInt(btn.dataset.didx, 10);
        const val = parseInt(btn.dataset.val, 10);
        const dessert = this.currentData.dessert[dIdx];

        if (dessert.userAnswer === dessert.correct) return;

        dessert.userAnswer = val;
        if (val === dessert.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.checkCompletion('dessert');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  // =========================================================================
  // 4. DẠNG BÀI: TÌM SỐ ẨN TRONG KHU VƯỜN
  // =========================================================================
  renderHuntGame(refresh = true) {
    if (refresh || this.currentData.hunt.length === 0) {
      this.currentData.hunt = window.MathGenerators.generateHiddenNumbers(this.currentData.targetHuntNum);
    }
    const board = document.getElementById('huntGardenBoard');
    const badge = document.getElementById('huntTargetBadge');
    const titleText = document.getElementById('huntTargetText');
    if (!board) return;

    badge.textContent = this.currentData.targetHuntNum;
    titleText.textContent = `Bé hãy tìm và bấm vào tất cả số ${this.currentData.targetHuntNum} nhé! 🌸`;

    board.innerHTML = this.currentData.hunt.map((item, idx) => {
      const iconSvg = getCuteItemSVG(item.type, 38);

      return `
        <div class="hunt-item-node ${item.found ? 'found-target' : ''}" data-hidx="${idx}">
          <div style="display:flex; justify-content:center;">${iconSvg}</div>
          <div class="hunt-number-circle">${item.number}</div>
        </div>
      `;
    }).join('');

    board.querySelectorAll('.hunt-item-node').forEach(node => {
      node.addEventListener('click', () => {
        const hIdx = parseInt(node.dataset.hidx, 10);
        const item = this.currentData.hunt[hIdx];

        if (item.found) return;

        if (item.isTarget) {
          item.found = true;
          node.classList.add('found-target');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);

          const remaining = this.currentData.hunt.filter(i => i.isTarget && !i.found);
          if (remaining.length === 0) {
            this.showVictoryModal("Xuất sắc!", `Bé đã tìm thấy tất cả số ${this.currentData.targetHuntNum}! Giờ bé hãy tập tô màu số ${this.currentData.targetHuntNum} nhé!`);
          }
        } else {
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          node.style.transform = 'translateX(5px)';
          setTimeout(() => node.style.transform = '', 200);
        }
      });
    });

    this.drawNumberOutline(this.currentData.targetHuntNum);
  }

  drawNumberOutline(num) {
    const canvas = document.getElementById('coloringCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 150px "Baloo 2", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#1E3A8A';
    ctx.strokeText(num.toString(), canvas.width / 2, canvas.height / 2 + 10);
  }

  setupColoringCanvas() {
    const canvas = document.getElementById('coloringCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.canvasCtx = ctx;

    const startDraw = (e) => {
      this.isDrawing = true;
      draw(e);
    };

    const stopDraw = () => {
      this.isDrawing = false;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.activeColor;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.activeColor = dot.dataset.color;
      });
    });

    const clearBtn = document.getElementById('clearCanvasBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.drawNumberOutline(this.currentData.targetHuntNum);
      });
    }
  }

  // =========================================================================
  // 5. DẠNG BÀI: PHIẾU SO SÁNH >, <, =
  // =========================================================================
  renderCompareGame(refresh = true) {
    if (refresh || this.currentData.comparison.length === 0) {
      this.currentData.comparison = window.MathGenerators.generateComparison(5, 14, this.currentDifficulty);
    }
    const container = document.getElementById('compareTableGrid');
    if (!container) return;

    container.innerHTML = this.currentData.comparison.map(col => {
      const rowsHtml = col.items.map(item => `
        <div class="comp-row">
          <span class="comp-number">${item.a}</span>
          <button class="comp-slot-btn ${item.userAnswer ? 'filled' : ''}" id="${item.id}" data-id="${item.id}">
            ${item.userAnswer || '.....'}
          </button>
          <span class="comp-number">${item.b}</span>
        </div>
      `).join('');

      return `
        <div class="comparison-column">
          <div class="col-header-badge">${col.colNumber}</div>
          ${rowsHtml}
        </div>
      `;
    }).join('');

    container.querySelectorAll('.comp-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        let foundItem = null;
        for (const col of this.currentData.comparison) {
          foundItem = col.items.find(i => i.id === id);
          if (foundItem) break;
        }
        if (!foundItem) return;

        const cycle = ['>', '<', '='];
        const currentIdx = cycle.indexOf(foundItem.userAnswer);
        const nextVal = cycle[(currentIdx + 1) % cycle.length];

        foundItem.userAnswer = nextVal;
        btn.textContent = nextVal;
        btn.classList.add('filled');
        window.soundMgr.playPop();

        if (nextVal === foundItem.correct) {
          btn.classList.add('correct');
          btn.classList.remove('wrong');
        } else {
          btn.classList.add('wrong');
          btn.classList.remove('correct');
        }
      });
    });

    const checkBtn = document.getElementById('checkCompareBtn');
    if (checkBtn) {
      checkBtn.onclick = () => {
        let correctCount = 0;
        let totalCount = 0;
        this.currentData.comparison.forEach(col => {
          col.items.forEach(i => {
            totalCount++;
            if (i.userAnswer === i.correct) correctCount++;
          });
        });

        if (correctCount === totalCount) {
          this.showVictoryModal("Xuất sắc 10/10!", `Bé đã làm đúng tất cả các phép so sánh!`);
          this.addStars(10);
        } else {
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
        }
      };
    }
  }

  // =========================================================================
  // 6. DẠNG BÀI: PHÉP CỘNG HÌNH ẢNH TRỰC QUAN
  // =========================================================================
  renderAdditionGame(refresh = true) {
    if (refresh || this.currentData.addition.length === 0) {
      this.currentData.addition = window.MathGenerators.generateAddition(this.currentDifficulty);
    }
    const container = document.getElementById('additionCardsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.addition.map((item, idx) => {
      let groupAHtml = '';
      for (let i = 0; i < item.numA; i++) groupAHtml += `<div class="countable-item">${getCuteItemSVG(item.type, 40)}</div>`;

      let groupBHtml = '';
      for (let i = 0; i < item.numB; i++) groupBHtml += `<div class="countable-item">${getCuteItemSVG(item.type, 40)}</div>`;

      const optsHtml = item.options.map(opt => `
        <button class="choice-circle-btn ${item.userAnswer === opt ? (opt === item.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-addidx="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="addition-card">
          <div class="addition-equation-row">
            <div class="add-group-box">${groupAHtml}</div>
            <div class="math-symbol-badge">+</div>
            <div class="add-group-box">${groupBHtml}</div>
            <div class="math-symbol-badge">=</div>
            <div class="math-question-mark">${item.userAnswer !== null ? item.userAnswer : '?'}</div>
          </div>
          <div class="addition-text-prompt">${item.numA} ${item.name} cộng ${item.numB} ${item.name} bằng mấy?</div>
          <div class="nature-options">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.countable-item').forEach(item => {
      item.addEventListener('click', () => window.soundMgr.playPop());
    });

    container.querySelectorAll('.choice-circle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.addidx, 10);
        const val = parseInt(btn.dataset.val, 10);
        const card = this.currentData.addition[idx];

        if (card.userAnswer === card.correct) return;

        card.userAnswer = val;
        if (val === card.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.renderAdditionGame(false);
          this.checkCompletion('addition');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  // =========================================================================
  // 7. DẠNG BÀI: ĐOÀN TÀU TÌM SỐ CÒN THIẾU
  // =========================================================================
  renderTrainGame(refresh = true) {
    if (refresh || this.currentData.train.length === 0) {
      this.currentData.train = window.MathGenerators.generateTrainSequence(this.currentDifficulty);
    }
    const container = document.getElementById('trainCardsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.train.map((train, idx) => {
      let wagonsHtml = `<div class="train-wagon-box">${window.SVGIcons.trainEngine(60)}</div>`;

      train.sequence.forEach((num, wIdx) => {
        const isMissing = (wIdx === train.missingIndex);
        const displayVal = isMissing ? (train.userAnswer !== null ? train.userAnswer : '?') : num;
        const cargoIcon = getCuteItemSVG(train.icon, 28);

        wagonsHtml += `
          <div class="train-wagon-box">
            <div style="position: absolute; top: -14px;">${cargoIcon}</div>
            ${window.SVGIcons.trainWagon(54)}
            <div class="wagon-num-label ${isMissing ? 'missing-qmark' : ''}">${displayVal}</div>
          </div>
        `;
      });

      const optsHtml = train.options.map(opt => `
        <button class="choice-circle-btn ${train.userAnswer === opt ? (opt === train.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-tidx="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="train-card">
          <div style="font-size: 17px; font-weight: 800; color: #1E40AF; margin-bottom: 8px; text-align: center;">
            ${train.title}
          </div>
          <div class="train-track-view">${wagonsHtml}</div>
          <div class="addition-text-prompt" style="text-align: center;">Bé hãy tìm số còn thiếu điền vào toa tàu có dấu hỏi chấm:</div>
          <div class="train-options-row">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.choice-circle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.tidx, 10);
        const val = parseInt(btn.dataset.val, 10);
        const item = this.currentData.train[idx];

        if (item.userAnswer === item.correct) return;

        item.userAnswer = val;
        if (val === item.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.renderTrainGame(false);
          this.checkCompletion('train');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  // =========================================================================
  // 8. DẠNG BÀI: BÉ ĐẾM HÌNH KHỐI MÀU SẮC
  // =========================================================================
  renderShapesGame(refresh = true) {
    if (refresh || this.currentData.shapes.length === 0) {
      this.currentData.shapes = window.MathGenerators.generateShapesCount(this.currentDifficulty);
    }
    const container = document.getElementById('shapesCardsContainer');
    if (!container) return;

    container.innerHTML = this.currentData.shapes.map((sh, idx) => {
      let itemsHtml = '';
      for (let i = 0; i < sh.count; i++) {
        const svg = getCuteItemSVG(sh.type, 44);
        itemsHtml += `<div class="countable-item">${svg}</div>`;
      }

      const optsHtml = sh.options.map(opt => `
        <button class="choice-circle-btn ${sh.userAnswer === opt ? (opt === sh.correct ? 'selected-correct' : 'selected-wrong') : ''}"
                data-sidx="${idx}" data-val="${opt}">
          ${opt}
        </button>
      `).join('');

      return `
        <div class="shapes-card">
          <div class="shapes-stage">${itemsHtml}</div>
          <div class="addition-text-prompt" style="text-align: center;">${sh.question}</div>
          <div class="nature-options">${optsHtml}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.countable-item').forEach(item => {
      item.addEventListener('click', () => window.soundMgr.playPop());
    });

    container.querySelectorAll('.choice-circle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.sidx, 10);
        const val = parseInt(btn.dataset.val, 10);
        const shape = this.currentData.shapes[idx];

        if (shape.userAnswer === shape.correct) return;

        shape.userAnswer = val;
        if (val === shape.correct) {
          btn.classList.add('selected-correct');
          window.soundMgr.playCorrect();
          window.soundMgr.speakRandomPraise();
          this.addStars(1);
          this.checkCompletion('shapes');
        } else {
          btn.classList.add('selected-wrong');
          window.soundMgr.playWrongSound();
          window.soundMgr.speakWrong();
          setTimeout(() => btn.classList.remove('selected-wrong'), 1000);
        }
      });
    });
  }

  checkCompletion(gameType) {
    let completed = false;
    if (gameType === 'nature') {
      completed = this.currentData.nature.every(q => q.userAnswer === q.correct);
    } else if (gameType === 'garden') {
      completed = this.currentData.garden.every(r => r.userAnswer === r.correct);
    } else if (gameType === 'dessert') {
      completed = this.currentData.dessert.every(d => d.userAnswer === d.correct);
    } else if (gameType === 'addition') {
      completed = this.currentData.addition.every(a => a.userAnswer === a.correct);
    } else if (gameType === 'train') {
      completed = this.currentData.train.every(t => t.userAnswer === t.correct);
    } else if (gameType === 'shapes') {
      completed = this.currentData.shapes.every(s => s.userAnswer === s.correct);
    }

    if (completed) {
      setTimeout(() => {
        this.showVictoryModal("Bé giỏi quá! 🌟", "Bé đã hoàn thành xuất sắc toàn bộ bài tập này!");
        this.addStars(5);
      }, 400);
    }
  }

  showVictoryModal(title, desc) {
    const modal = document.getElementById('victoryModal');
    document.getElementById('victoryModalTitle').textContent = title;
    document.getElementById('victoryModalDesc').textContent = desc;
    modal.classList.add('active');

    if (window.confetti) window.confetti.fire(3000);
    window.soundMgr.playFanfare();
    window.soundMgr.speakVictory();
  }

  renderHome() {
    document.querySelectorAll('.game-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const view = card.dataset.targetView;
        this.switchView(view);
      });
    });

    const targetSelect = document.getElementById('huntTargetSelect');
    if (targetSelect) {
      targetSelect.addEventListener('change', (e) => {
        this.currentData.targetHuntNum = parseInt(e.target.value, 10);
        this.renderHuntGame(true);
      });
    }

    const sunBox = document.getElementById('homeDecorSun');
    if (sunBox) sunBox.innerHTML = window.SVGIcons.sun(70);

    const butterBox = document.getElementById('homeDecorButterfly');
    if (butterBox) butterBox.innerHTML = window.SVGIcons.butterfly(60, '#EC4899', '#38BDF8');

    const boyBox = document.getElementById('chibiBoy');
    if (boyBox) boyBox.innerHTML = window.SVGIcons.boy(90);

    const girlBox = document.getElementById('chibiGirl');
    if (girlBox) girlBox.innerHTML = window.SVGIcons.girl(90);
  }
}

function initMathApp() {
  if (!window.app) {
    window.app = new MathApp();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initMathApp);
} else {
  initMathApp();
}
