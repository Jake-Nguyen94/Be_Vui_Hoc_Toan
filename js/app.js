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

    // Chủ đề 1, 2, 3 mặc định kích hoạt chế độ NỐI KẾT QUẢ ĐÚNG
    this.matchingModes = { nature: 'match', garden: 'match', dessert: 'match' };
    this.matchingData = { nature: null, garden: null, dessert: null };
    this.selectedMatchPin = null;

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

    window.app = this;
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
        if (this.matchingModes[type] === 'match') {
          this.renderMatchingGame(type, true);
        } else {
          this.loadWorksheet(type, true);
        }
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

    // Chơi thử tính năng Nối kết quả từ trang chủ
    const btnDemo = document.getElementById('btnTryMatchingDemo');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => {
        this.switchView('nature');
        this.setWorksheetMode('nature', 'match');
      });
    }

    // Chuyển đổi giữa chế độ Chọn số & Nối kết quả
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sheet = btn.dataset.sheet;
        const mode = btn.dataset.mode;
        this.setWorksheetMode(sheet, mode);
      });
    });

    // Vẽ lại đường nối SVG khi xoay ngang/thay đổi kích thước màn hình
    window.addEventListener('resize', () => {
      if (['nature', 'garden', 'dessert'].includes(this.currentView)) {
        if (this.matchingModes[this.currentView] === 'match') {
          this.redrawMatchingLines(this.currentView);
        }
      }
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

  openSheetMode(sheet, mode = 'match') {
    this.matchingModes[sheet] = mode;
    this.switchView(sheet);
    this.setWorksheetMode(sheet, mode);
  }

  setWorksheetMode(sheet, mode, forceRefresh = false) {
    this.matchingModes[sheet] = mode;

    // Cập nhật tab active
    document.querySelectorAll(`.mode-tab-btn[data-sheet="${sheet}"]`).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const isMatch = (mode === 'match');

    if (sheet === 'nature') {
      const selectBox = document.getElementById('natureCardsContainer');
      const matchBox = document.getElementById('natureMatchContainer');
      if (selectBox) selectBox.style.display = isMatch ? 'none' : 'grid';
      if (matchBox) matchBox.style.display = isMatch ? 'block' : 'none';
    } else if (sheet === 'garden') {
      const selectBox = document.getElementById('gardenRowsContainer');
      const sampleBox = document.getElementById('gardenSampleBox');
      const matchBox = document.getElementById('gardenMatchContainer');
      if (selectBox) selectBox.style.display = isMatch ? 'none' : 'flex';
      if (sampleBox) sampleBox.style.display = isMatch ? 'none' : 'flex';
      if (matchBox) matchBox.style.display = isMatch ? 'block' : 'none';
    } else if (sheet === 'dessert') {
      const selectBox = document.getElementById('dessertCardsContainer');
      const matchBox = document.getElementById('dessertMatchContainer');
      if (selectBox) selectBox.style.display = isMatch ? 'none' : 'grid';
      if (matchBox) matchBox.style.display = isMatch ? 'block' : 'none';
    }

    if (window.soundMgr) window.soundMgr.playPop();

    if (isMatch) {
      this.renderMatchingGame(sheet, forceRefresh || !this.matchingData[sheet]);
    } else {
      if (forceRefresh || !this.currentData[sheet] || this.currentData[sheet].length === 0) {
        if (sheet === 'nature') this.renderNatureGame(true);
        else if (sheet === 'garden') this.renderGardenGame(true);
        else if (sheet === 'dessert') this.renderDessertGame(true);
      }
    }
  }

  loadWorksheet(type, forceRefresh = false) {
    if (['nature', 'garden', 'dessert'].includes(type)) {
      const mode = this.matchingModes[type] || 'match';
      this.setWorksheetMode(type, mode, forceRefresh);
      return;
    }
    if (type === 'hunt') this.renderHuntGame(forceRefresh);
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

  // =========================================================================
  // CHẾ ĐỘ NỐI KẾT QUẢ ĐÚNG (MATCHING BOARD) CHO CHỦ ĐỀ 1, 2, 3
  // =========================================================================
  renderMatchingGame(theme, force = false) {
    if (force || !this.matchingData[theme]) {
      this.matchingData[theme] = window.MathGenerators.generateMatchingGame(theme, 5);
      this.matchingData[theme].matchedPairs = [];
    }

    const container = document.getElementById(`${theme}MatchContainer`);
    if (!container) return;
    container.style.display = 'block';

    this.selectedMatchPin = null;
    const game = this.matchingData[theme];
    const totalPairs = game.leftCards.length;
    const currentMatched = game.matchedPairs.length;

    // Render thẻ bên trái (chứa hình ảnh và số lượng)
    const leftHtml = game.leftCards.map(c => {
      let svgs = '';
      for (let i = 0; i < c.count; i++) {
        svgs += `<span class="match-item-icon" title="${c.name}">${getCuteItemSVG(c.type, 38)}</span>`;
      }
      const isMatched = game.matchedPairs.some(p => p.leftId === c.id);
      return `
        <div class="match-card-left ${isMatched ? 'matched' : ''}" id="${c.id}_card" data-id="${c.id}" data-side="left" data-count="${c.count}" data-color="${c.color}">
          <div class="match-card-left-content">
            <span class="match-card-title-hint">${c.name}:</span>
            ${svgs}
          </div>
          <div class="matching-pin pin-right ${isMatched ? 'matched' : ''}" id="${c.id}_pin" data-id="${c.id}" data-side="left" title="Chấm nối"></div>
        </div>
      `;
    }).join('');

    // Render thẻ bên phải (chứa con số kết quả)
    const rightHtml = game.rightCards.map(c => {
      const isMatched = game.matchedPairs.some(p => p.rightId === c.id);
      return `
        <div class="match-card-right ${isMatched ? 'matched' : ''}" id="${c.id}_card" data-id="${c.id}" data-side="right" data-val="${c.val}">
          <div class="matching-pin pin-left ${isMatched ? 'matched' : ''}" id="${c.id}_pin" data-id="${c.id}" data-side="right" title="Chấm nối"></div>
          <div class="match-number-badge">${c.val}</div>
          <div class="match-card-title-hint" style="font-size:16px; width:auto;">Số ${c.val}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="matching-guide-banner">
        <span>👉 <b>Hướng dẫn cho bé:</b> Bé hãy chạm vào ô bên trái, rồi chạm vào ô số đúng bên phải để nối nhé! 🌟</span>
        <span class="matching-star-count" id="${theme}_match_counter">⭐ Đã nối: ${currentMatched}/${totalPairs}</span>
      </div>
      <div class="matching-board-grid" id="${theme}_matching_board">
        <svg class="matching-svg-overlay" id="${theme}_match_svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="${theme}_shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.25" />
            </filter>
          </defs>
          <g class="matched-lines-layer" id="${theme}_matched_lines"></g>
          <path class="preview-drag-line" id="${theme}_temp_line" d="" style="display:none;"></path>
        </svg>

        <div class="matching-col-left">
          ${leftHtml}
        </div>
        <div class="matching-col-right">
          ${rightHtml}
        </div>
      </div>
    `;

    // Vẽ lại đường nối nếu đã có cặp nối từ trước
    requestAnimationFrame(() => {
      this.redrawMatchingLines(theme);
    });

    // Bắt sự kiện chạm / click vào các thẻ
    const board = document.getElementById(`${theme}_matching_board`);
    if (!board) return;

    const allCards = board.querySelectorAll('.match-card-left, .match-card-right');
    allCards.forEach(card => {
      card.addEventListener('click', () => {
        const side = card.dataset.side;
        const id = card.dataset.id;
        this.handleMatchItemClick(theme, side, id);
      });
    });
  }

  handleMatchItemClick(theme, side, id) {
    const game = this.matchingData[theme];
    if (!game) return;

    // Bỏ qua nếu thẻ này đã được nối chính xác
    if (side === 'left' && game.matchedPairs.some(p => p.leftId === id)) return;
    if (side === 'right' && game.matchedPairs.some(p => p.rightId === id)) return;

    const cardEl = document.getElementById(`${id}_card`);
    const pinEl = document.getElementById(`${id}_pin`);
    if (!cardEl || !pinEl) return;

    // Chưa có thẻ nào được chọn trước đó
    if (!this.selectedMatchPin) {
      this.selectedMatchPin = { theme, side, id, cardEl, pinEl };
      cardEl.classList.add('active-selection');
      pinEl.classList.add('pin-active');
      window.soundMgr.playPop();

      // Đọc số hoặc đếm số lượng bằng giọng Tiếng Việt
      if (side === 'left') {
        const leftItem = game.leftCards.find(c => c.id === id);
        if (leftItem) window.soundMgr.speakNumber(leftItem.count);
      } else {
        const rightItem = game.rightCards.find(c => c.id === id);
        if (rightItem) window.soundMgr.speakNumber(rightItem.val);
      }
      return;
    }

    // Bé bấm vào cùng một bên (đổi lựa chọn)
    if (this.selectedMatchPin.side === side) {
      this.selectedMatchPin.cardEl.classList.remove('active-selection');
      this.selectedMatchPin.pinEl.classList.remove('pin-active');

      if (this.selectedMatchPin.id === id) {
        // Hủy chọn nếu bấm lại chính nó
        this.selectedMatchPin = null;
        window.soundMgr.playPop();
        return;
      }

      this.selectedMatchPin = { theme, side, id, cardEl, pinEl };
      cardEl.classList.add('active-selection');
      pinEl.classList.add('pin-active');
      window.soundMgr.playPop();
      if (side === 'left') {
        const leftItem = game.leftCards.find(c => c.id === id);
        if (leftItem) window.soundMgr.speakNumber(leftItem.count);
      } else {
        const rightItem = game.rightCards.find(c => c.id === id);
        if (rightItem) window.soundMgr.speakNumber(rightItem.val);
      }
      return;
    }

    // Bé bấm vào 2 bên khác nhau -> Kiểm tra nối đáp án!
    const leftId = side === 'left' ? id : this.selectedMatchPin.id;
    const rightId = side === 'right' ? id : this.selectedMatchPin.id;
    const leftItem = game.leftCards.find(c => c.id === leftId);
    const rightItem = game.rightCards.find(c => c.id === rightId);
    const leftCard = document.getElementById(`${leftId}_card`);
    const rightCard = document.getElementById(`${rightId}_card`);
    const leftPin = document.getElementById(`${leftId}_pin`);
    const rightPin = document.getElementById(`${rightId}_pin`);

    // Xóa hiệu ứng đang chọn
    this.selectedMatchPin.cardEl.classList.remove('active-selection');
    this.selectedMatchPin.pinEl.classList.remove('pin-active');
    this.selectedMatchPin = null;

    if (leftItem.count === rightItem.val) {
      // NỐI ĐÚNG!
      game.matchedPairs.push({
        leftId: leftId,
        rightId: rightId,
        color: leftItem.color || '#3B82F6',
        count: leftItem.count
      });

      leftCard.classList.add('matched');
      rightCard.classList.add('matched');
      leftPin.classList.add('matched');
      rightPin.classList.add('matched');

      // Vẽ đường dây ribbon màu sắc nối 2 điểm
      this.drawConnectedLine(theme, leftId, rightId, leftItem.color || '#3B82F6');

      // Cập nhật số sao và tiến độ
      const counterEl = document.getElementById(`${theme}_match_counter`);
      if (counterEl) {
        counterEl.textContent = `⭐ Đã nối: ${game.matchedPairs.length}/${game.leftCards.length}`;
      }

      window.soundMgr.playCorrect();
      window.soundMgr.speakRandomPraise();
      this.addStars(1);

      // Kiểm tra hoàn thành tất cả các cặp nối
      if (game.matchedPairs.length === game.leftCards.length) {
        setTimeout(() => {
          this.showVictoryModal(
            "Bé Nối Chuẩn Xác Quá! 🎉",
            "Bé thật thông minh, đã nối đúng tất cả các tranh với chữ số tương ứng!"
          );
          this.addStars(5);
        }, 500);
      }
    } else {
      // NỐI SAI!
      leftCard.classList.add('card-shake-wrong');
      rightCard.classList.add('card-shake-wrong');

      // Vẽ đường gạch tạm màu đỏ báo sai
      this.drawTemporaryErrorLine(theme, leftPin, rightPin);

      window.soundMgr.playWrongSound();
      window.soundMgr.speakWrong();

      setTimeout(() => {
        leftCard.classList.remove('card-shake-wrong');
        rightCard.classList.remove('card-shake-wrong');
      }, 700);
    }
  }

  getPinCenter(pinEl, boardEl) {
    const pinRect = pinEl.getBoundingClientRect();
    const boardRect = boardEl.getBoundingClientRect();
    return {
      x: pinRect.left + pinRect.width / 2 - boardRect.left,
      y: pinRect.top + pinRect.height / 2 - boardRect.top
    };
  }

  drawConnectedLine(theme, leftId, rightId, color) {
    const board = document.getElementById(`${theme}_matching_board`);
    const layer = document.getElementById(`${theme}_matched_lines`);
    const leftPin = document.getElementById(`${leftId}_pin`);
    const rightPin = document.getElementById(`${rightId}_pin`);
    if (!board || !layer || !leftPin || !rightPin) return;

    const p1 = this.getPinCenter(leftPin, board);
    const p2 = this.getPinCenter(rightPin, board);

    const dx = Math.max(50, Math.abs(p2.x - p1.x) * 0.45);
    const pathD = `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;

    // Tọa độ điểm chính giữa để đặt huy hiệu ngôi sao
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = `line_${leftId}_${rightId}`;

    g.innerHTML = `
      <path d="${pathD}" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round" class="matched-line" filter="url(#${theme}_shadow)"/>
      <g class="star-badge-group" transform="translate(${midX}, ${midY})">
        <circle r="14" fill="#FFFFFF" stroke="${color}" stroke-width="3" />
        <text text-anchor="middle" dominant-baseline="central" font-size="14" y="1">⭐</text>
      </g>
    `;
    layer.appendChild(g);
  }

  drawTemporaryErrorLine(theme, leftPin, rightPin) {
    const board = document.getElementById(`${theme}_matching_board`);
    const tempLine = document.getElementById(`${theme}_temp_line`);
    if (!board || !tempLine || !leftPin || !rightPin) return;

    const p1 = this.getPinCenter(leftPin, board);
    const p2 = this.getPinCenter(rightPin, board);
    const dx = Math.max(50, Math.abs(p2.x - p1.x) * 0.45);
    const pathD = `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;

    tempLine.setAttribute('d', pathD);
    tempLine.setAttribute('stroke', '#EF4444');
    tempLine.setAttribute('stroke-width', '5');
    tempLine.setAttribute('fill', 'none');
    tempLine.style.display = 'block';

    setTimeout(() => {
      tempLine.style.display = 'none';
    }, 600);
  }

  redrawMatchingLines(theme) {
    const game = this.matchingData[theme];
    if (!game || !game.matchedPairs || game.matchedPairs.length === 0) return;
    const layer = document.getElementById(`${theme}_matched_lines`);
    if (!layer) return;

    layer.innerHTML = '';
    game.matchedPairs.forEach(pair => {
      this.drawConnectedLine(theme, pair.leftId, pair.rightId, pair.color);
    });
  }

  renderHome() {
    document.querySelectorAll('.game-select-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-mode-pills')) return;
        const view = card.dataset.targetView;
        if (['nature', 'garden', 'dessert'].includes(view)) {
          this.openSheetMode(view, 'match');
        } else {
          this.switchView(view);
        }
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
