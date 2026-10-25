/**
 * Generators for Math Exercises and Worksheets
 * Bổ sung kho hình ảnh phong phú: Động vật, Hoa quả, Xe cộ, Đồ vật thân quen
 */

const MathGenerators = {
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  createThreeOptions(correct, minVal = 1, maxVal = 10) {
    const opts = new Set([correct]);
    while (opts.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * this.randInt(1, 2);
      let cand = correct + offset;
      if (cand < minVal) cand = correct + opts.size;
      if (cand > maxVal) cand = correct - opts.size;
      opts.add(cand);
    }
    return this.shuffle(Array.from(opts));
  },

  createFourOptions(correct, minVal = 1, maxVal = 10) {
    const opts = new Set([correct]);
    while (opts.size < 4) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * this.randInt(1, 3);
      let cand = correct + offset;
      if (cand < minVal) cand = correct + opts.size;
      if (cand > maxVal) cand = correct - opts.size;
      opts.add(cand);
    }
    return this.shuffle(Array.from(opts));
  },

  // =========================================================================
  // 1. DẠNG BÀI: ĐẾM SỐ LƯỢNG TRONG TRANH (Kho hình siêu phong phú)
  // =========================================================================
  generateCountNature(difficulty = 10) {
    const maxVal = difficulty === 5 ? 5 : 8;
    const minVal = 1;

    const allItems = [
      // Động vật
      { type: 'frog', name: 'chú ếch xanh', question: 'Có mấy chú ếch xanh?' },
      { type: 'duck', name: 'chú vịt con', question: 'Có mấy chú vịt con?' },
      { type: 'puppy', name: 'chú cún con', question: 'Có mấy chú cún con?' },
      { type: 'kitten', name: 'chú mèo con', question: 'Có mấy chú mèo con?' },
      { type: 'bee', name: 'chú ong vàng', question: 'Có mấy chú ong vàng?' },
      { type: 'butterfly', name: 'cánh bướm xinh', question: 'Có mấy cánh bướm xinh?' },
      { type: 'ladybug', name: 'chú bọ rùa', question: 'Có mấy chú bọ rùa đỏ?' },
      { type: 'fish', name: 'chú cá nhỏ', question: 'Có mấy chú cá nhỏ?' },
      { type: 'bird', name: 'chú chim xanh', question: 'Có mấy chú chim xanh?' },

      // Hoa quả nhiệt đới
      { type: 'watermelon', name: 'miếng dưa hấu', question: 'Có mấy miếng dưa hấu?' },
      { type: 'banana', name: 'quả chuối vàng', question: 'Có mấy quả chuối vàng?' },
      { type: 'mango', name: 'quả xoài chín', question: 'Có mấy quả xoài chín?' },
      { type: 'pineapple', name: 'quả dứa (thơm)', question: 'Có mấy quả dứa thơm?' },
      { type: 'orange', name: 'quả cam tươi', question: 'Có mấy quả cam tươi?' },
      { type: 'dragonfruit', name: 'quả thanh long', question: 'Có mấy quả thanh long?' },
      { type: 'strawberry', name: 'quả dâu tây', question: 'Có mấy quả dâu tây đỏ?' },

      // Phương tiện & Đồ chơi
      { type: 'car', name: 'chiếc xe ô tô', question: 'Có mấy chiếc xe ô tô?' },
      { type: 'airplane', name: 'chiếc máy bay', question: 'Có mấy chiếc máy bay?' },
      { type: 'balloon', name: 'khinh khí cầu', question: 'Có mấy khinh khí cầu?' },
      { type: 'soccerBall', name: 'quả bóng đá', question: 'Có mấy quả bóng đá?' },

      // Hoa lá
      { type: 'sunflower', name: 'hoa hướng dương', question: 'Có mấy hoa hướng dương?' },
      { type: 'tulip', name: 'bông hoa tulip', question: 'Có mấy bông hoa tulip?' },
      { type: 'mushroom', name: 'cây nấm đỏ', question: 'Có mấy cây nấm đỏ?' }
    ];

    const selected = this.shuffle(allItems).slice(0, 6);
    const usedCounts = new Set();

    return selected.map((item, index) => {
      let count = this.randInt(minVal, maxVal);
      while (usedCounts.has(count) && usedCounts.size < (maxVal - minVal + 1)) {
        count = this.randInt(minVal, maxVal);
      }
      usedCounts.add(count);

      return {
        id: `nature_${Date.now()}_${index}`,
        numberBadge: index + 1,
        type: item.type,
        count: count,
        question: item.question,
        options: this.createThreeOptions(count, minVal, maxVal + 2),
        correct: count,
        userAnswer: null
      };
    });
  },

  // =========================================================================
  // 2. DẠNG BÀI: BÉ ĐẾM VÀ TÔ MÀU (Nhiều con vật, hoa quả, xe cộ)
  // =========================================================================
  generateGardenRows(difficulty = 10) {
    const maxVal = difficulty === 5 ? 5 : 6;
    const allPool = [
      { type: 'watermelon', name: 'Dưa hấu đỏ' },
      { type: 'frog', name: 'Ếch xanh' },
      { type: 'duck', name: 'Vịt con' },
      { type: 'car', name: 'Xe ô tô' },
      { type: 'banana', name: 'Chuối vàng' },
      { type: 'kitten', name: 'Mèo con' },
      { type: 'puppy', name: 'Cún con' },
      { type: 'balloon', name: 'Khinh khí cầu' },
      { type: 'orange', name: 'Quả cam' },
      { type: 'dragonfruit', name: 'Thanh long' },
      { type: 'butterfly', name: 'Bướm hồng' },
      { type: 'bee', name: 'Ong vàng' },
      { type: 'ladybug', name: 'Bọ rùa' },
      { type: 'pineapple', name: 'Quả dứa' },
      { type: 'strawberry', name: 'Dâu tây' }
    ];

    const selected = this.shuffle(allPool).slice(0, 7);

    return selected.map((item, i) => {
      const count = this.randInt(2, maxVal);
      return {
        id: `row_${Date.now()}_${i}`,
        type: item.type,
        name: item.name,
        count: count,
        options: this.createThreeOptions(count, 1, maxVal + 2),
        correct: count,
        userAnswer: null
      };
    });
  },

  // =========================================================================
  // 3. DẠNG BÀI: TIỆM BÁNH & ĐỒ ĂN VẶT VUI NHỘN (Lollipop, Cookie, Cake, Donut...)
  // =========================================================================
  generateDesserts(difficulty = 10) {
    const maxVal = difficulty === 5 ? 5 : 10;
    const types = [
      'lollipop', 'cookie', 'birthdayCake', 'milkCarton',
      'icecream', 'donut', 'cupcake', 'parfait', 'milkshake'
    ];
    const flavors = ['#F472B6', '#38BDF8', '#A78BFA', '#FDE047', '#FB7185'];
    const glazes = ['#86EFAC', '#60A5FA', '#F472B6', '#FBBF24', '#C084FC'];

    const items = [];
    for (let i = 0; i < 12; i++) {
      const type = types[this.randInt(0, types.length - 1)];
      const count = this.randInt(1, maxVal);
      const flavor = flavors[this.randInt(0, flavors.length - 1)];
      const glaze = glazes[this.randInt(0, glazes.length - 1)];

      items.push({
        id: `dessert_${Date.now()}_${i}`,
        type: type,
        count: count,
        flavor: flavor,
        glaze: glaze,
        options: this.createFourOptions(count, 1, maxVal + 3),
        correct: count,
        userAnswer: null
      });
    }

    return items;
  },

  // =========================================================================
  // 4. DẠNG BÀI: TÌM SỐ ẨN TRONG VƯỜN (Rải đều động vật, hoa quả, đồ chơi)
  // =========================================================================
  generateHiddenNumbers(targetNumber = 1) {
    const itemsConfig = [
      { type: 'frog', label: 'Chú ếch' },
      { type: 'watermelon', label: 'Dưa hấu' },
      { type: 'puppy', label: 'Cún con' },
      { type: 'car', label: 'Xe ô tô' },
      { type: 'balloon', label: 'Khinh khí cầu' },
      { type: 'duck', label: 'Vịt con' },
      { type: 'banana', label: 'Chuối vàng' },
      { type: 'kitten', label: 'Mèo con' },
      { type: 'soccerBall', label: 'Quả bóng' },
      { type: 'sunflower', label: 'Hoa hướng dương' },
      { type: 'strawberry', label: 'Dâu tây' },
      { type: 'pineapple', label: 'Quả dứa' },
      { type: 'airplane', label: 'Máy bay' },
      { type: 'mushroom', label: 'Cây nấm' },
      { type: 'house', label: 'Ngôi nhà' },
      { type: 'orange', label: 'Quả cam' },
      { type: 'dragonfruit', label: 'Thanh long' },
      { type: 'ladybug', label: 'Bọ rùa' },
      { type: 'fish', label: 'Chú cá' },
      { type: 'lollipop', label: 'Kẹo mút' },
      { type: 'butterfly', label: 'Cánh bướm' },
      { type: 'daisy', label: 'Hoa cúc' },
      { type: 'tulip', label: 'Hoa tulip' },
      { type: 'cookie', label: 'Bánh quy' },
      { type: 'bee', label: 'Chú ong' }
    ];

    const allIndices = Array.from({ length: itemsConfig.length }, (_, i) => i);
    const targetCount = this.randInt(6, 8);
    const targetIndices = new Set(this.shuffle(allIndices).slice(0, targetCount));

    return itemsConfig.map((item, idx) => {
      const isTarget = targetIndices.has(idx);
      let number = targetNumber;
      if (!isTarget) {
        do {
          number = this.randInt(1, 10);
        } while (number === targetNumber);
      }
      return {
        id: `hidden_${Date.now()}_${idx}`,
        type: item.type,
        label: item.label,
        number: number,
        isTarget: isTarget,
        found: false
      };
    });
  },

  // =========================================================================
  // 5. DẠNG BÀI: PHIẾU SO SÁNH >, <, =
  // =========================================================================
  generateComparison(columns = 5, rowsPerCol = 14, difficulty = 10) {
    const sheet = [];
    const maxVal = difficulty === 5 ? 5 : 10;

    for (let c = 0; c < columns; c++) {
      const colItems = [];
      for (let r = 0; r < rowsPerCol; r++) {
        let a = this.randInt(0, maxVal);
        let b = this.randInt(0, maxVal);

        if (Math.random() < 0.28) b = a;

        let symbol = '=';
        if (a > b) symbol = '>';
        else if (a < b) symbol = '<';

        colItems.push({
          id: `comp_${Date.now()}_${c}_${r}`,
          a: a,
          b: b,
          correct: symbol,
          userAnswer: null
        });
      }
      sheet.push({
        colNumber: c + 1,
        items: colItems
      });
    }

    return sheet;
  },

  // =========================================================================
  // 6. DẠNG BÀI: PHÉP CỘNG HÌNH ẢNH
  // =========================================================================
  generateAddition(difficulty = 10) {
    const maxTotal = difficulty === 5 ? 5 : 10;
    const itemsPool = [
      { type: 'apple', name: 'quả táo' },
      { type: 'watermelon', name: 'miếng dưa hấu' },
      { type: 'strawberry', name: 'quả dâu tây' },
      { type: 'banana', name: 'quả chuối' },
      { type: 'orange', name: 'quả cam' },
      { type: 'duck', name: 'chú vịt' },
      { type: 'frog', name: 'chú ếch' },
      { type: 'car', name: 'chiếc xe' }
    ];

    const cards = [];
    for (let i = 0; i < 6; i++) {
      const poolItem = itemsPool[i % itemsPool.length];
      const a = this.randInt(1, Math.floor(maxTotal / 2));
      const b = this.randInt(1, maxTotal - a);
      const total = a + b;

      cards.push({
        id: `add_${Date.now()}_${i}`,
        type: poolItem.type,
        name: poolItem.name,
        numA: a,
        numB: b,
        correct: total,
        options: this.createThreeOptions(total, 2, maxTotal + 2),
        userAnswer: null
      });
    }
    return cards;
  },

  // =========================================================================
  // 7. DẠNG BÀI: ĐOÀN TÀU TÌM SỐ CÒN THIẾU (Chở thú cưng, hoa quả, đồ chơi)
  // =========================================================================
  generateTrainSequence(difficulty = 10) {
    const trains = [];
    const maxVal = difficulty === 5 ? 7 : 10;
    const themes = [
      { name: 'Đoàn tàu chở thú cưng 🐶🐱🦆', icon: 'puppy' },
      { name: 'Đoàn tàu chở dưa hấu & hoa quả 🍉🍌🍓', icon: 'watermelon' },
      { name: 'Đoàn tàu chở đồ chơi 🚗🎈⚽', icon: 'car' },
      { name: 'Đoàn tàu khu vườn kỳ diệu 🌻🐞🐸', icon: 'frog' }
    ];

    for (let t = 0; t < 4; t++) {
      const theme = themes[t % themes.length];
      const startNum = this.randInt(1, Math.max(1, maxVal - 5));
      const sequence = [startNum, startNum + 1, startNum + 2, startNum + 3, startNum + 4];
      const missingIndex = this.randInt(1, 3);
      const missingVal = sequence[missingIndex];

      trains.push({
        id: `train_${Date.now()}_${t}`,
        title: theme.name,
        icon: theme.icon,
        sequence: sequence,
        missingIndex: missingIndex,
        correct: missingVal,
        options: this.createThreeOptions(missingVal, 1, maxVal + 1),
        userAnswer: null
      });
    }
    return trains;
  },

  // =========================================================================
  // 8. DẠNG BÀI: BÉ ĐẾM HÌNH KHỐI & ĐỒ VẬT TƯƠNG ỨNG
  // =========================================================================
  generateShapesCount(difficulty = 10) {
    const maxVal = difficulty === 5 ? 5 : 8;
    const shapes = [
      { type: 'circle', name: 'Hình Tròn', question: 'Có mấy hình tròn màu vàng?' },
      { type: 'square', name: 'Hình Vuông', question: 'Có mấy hình vuông màu xanh?' },
      { type: 'triangle', name: 'Hình Tam Giác', question: 'Có mấy hình tam giác màu lục?' },
      { type: 'star', name: 'Hình Ngôi Sao', question: 'Có mấy ngôi sao lấp lánh?' },
      { type: 'heart', name: 'Hình Trái Tim', question: 'Có mấy hình trái tim màu hồng?' },
      { type: 'soccerBall', name: 'Quả Bóng Tròn', question: 'Có mấy quả bóng tròn xoe?' },
      { type: 'house', name: 'Ngôi Nhà', question: 'Có mấy ngôi nhà ấm áp?' },
      { type: 'watermelon', name: 'Dưa Hấu Tam Giác', question: 'Có mấy miếng dưa hấu ngọt lịm?' }
    ];

    const selected = this.shuffle(shapes).slice(0, 5);

    return selected.map((sh, idx) => {
      const count = this.randInt(2, maxVal);
      return {
        id: `shape_${Date.now()}_${idx}`,
        type: sh.type,
        name: sh.name,
        question: sh.question,
        count: count,
        correct: count,
        options: this.createThreeOptions(count, 1, maxVal + 2),
        userAnswer: null
      };
    });
  },

  // =========================================================================
  // 9. DẠNG BÀI MỚI: BÉ NỐI KẾT QUẢ ĐÚNG (Matching Line Pairs)
  // =========================================================================
  generateMatchingGame(theme = 'nature', pairCount = 5) {
    let pool = [];
    if (theme === 'dessert') {
      pool = [
        { type: 'icecream', name: 'Kem ốc quế' },
        { type: 'donut', name: 'Bánh donut' },
        { type: 'cupcake', name: 'Bánh cupcake' },
        { type: 'lollipop', name: 'Kẹo mút que' },
        { type: 'cookie', name: 'Bánh quy bơ' },
        { type: 'birthdayCake', name: 'Bánh sinh nhật' },
        { type: 'milkCarton', name: 'Hộp sữa tươi' }
      ];
    } else if (theme === 'garden') {
      pool = [
        { type: 'ladybug', name: 'Bọ rùa đỏ' },
        { type: 'bee', name: 'Chú ong vàng' },
        { type: 'butterfly', name: 'Bướm xinh' },
        { type: 'frog', name: 'Chú ếch xanh' },
        { type: 'sunflower', name: 'Hoa hướng dương' },
        { type: 'mushroom', name: 'Cây nấm đỏ' },
        { type: 'strawberry', name: 'Quả dâu tây' }
      ];
    } else {
      // nature: động vật, hoa quả, đồ vật
      pool = [
        { type: 'duck', name: 'Chú vịt con' },
        { type: 'frog', name: 'Chú ếch xanh' },
        { type: 'puppy', name: 'Chú cún con' },
        { type: 'kitten', name: 'Mèo con đáng yêu' },
        { type: 'watermelon', name: 'Miếng dưa hấu' },
        { type: 'banana', name: 'Quả chuối vàng' },
        { type: 'mango', name: 'Quả xoài chín' },
        { type: 'car', name: 'Chiếc ô tô' },
        { type: 'airplane', name: 'Máy bay nhỏ' },
        { type: 'balloon', name: 'Khinh khí cầu' }
      ];
    }

    const selectedItems = this.shuffle(pool).slice(0, pairCount);
    const possibleCounts = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, pairCount);
    const lineColors = ['#0284C7', '#059669', '#DB2777', '#D97706', '#7C3AED', '#EA580C'];

    const leftCards = selectedItems.map((item, idx) => ({
      id: `m_left_${idx}`,
      type: item.type,
      name: item.name,
      count: possibleCounts[idx],
      color: lineColors[idx % lineColors.length]
    }));

    const rightCards = this.shuffle(possibleCounts).map((num, idx) => ({
      id: `m_right_${idx}`,
      val: num
    }));

    return {
      theme: theme,
      leftCards: leftCards,
      rightCards: rightCards
    };
  }
};

window.MathGenerators = MathGenerators;
