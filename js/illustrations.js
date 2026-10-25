/**
 * Illustrations Library - Kawaii Children's Book SVG Vector Art
 * Bộ sưu tập phong phú: Động vật, Hoa quả nhiệt đới, Phương tiện, Đồ ăn vặt, Hình khối
 */
const SVGIcons = {
  // Mặt trời cười
  sun: (size = 64) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon svg-sun">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF37A"/>
          <stop offset="85%" stop-color="#FFBE1A"/>
          <stop offset="100%" stop-color="#F59E0B"/>
        </radialGradient>
      </defs>
      <g stroke="#F59E0B" stroke-width="4" stroke-linecap="round">
        <line x1="50" y1="8" x2="50" y2="18"/>
        <line x1="50" y1="82" x2="50" y2="92"/>
        <line x1="8" y1="50" x2="18" y2="50"/>
        <line x1="82" y1="50" x2="92" y2="50"/>
        <line x1="20" y1="20" x2="27" y2="27"/>
        <line x1="73" y1="73" x2="80" y2="80"/>
        <line x1="20" y1="80" x2="27" y2="73"/>
        <line x1="73" y1="27" x2="80" y2="20"/>
      </g>
      <circle cx="50" cy="50" r="30" fill="url(#sunGrad)" stroke="#E07A00" stroke-width="2.5"/>
      <circle cx="42" cy="46" r="3" fill="#2C1A04"/>
      <circle cx="58" cy="46" r="3" fill="#2C1A04"/>
      <circle cx="43" cy="45" r="1" fill="#FFF"/>
      <circle cx="59" cy="45" r="1" fill="#FFF"/>
      <ellipse cx="37" cy="52" rx="4" ry="2.5" fill="#FF7B92" opacity="0.75"/>
      <ellipse cx="63" cy="52" rx="4" ry="2.5" fill="#FF7B92" opacity="0.75"/>
      <path d="M 44 54 Q 50 61 56 54" fill="none" stroke="#2C1A04" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  // Chú ong vàng
  bee: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <g opacity="0.85">
        <ellipse cx="44" cy="30" rx="14" ry="22" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" transform="rotate(-25 44 30)"/>
        <ellipse cx="62" cy="28" rx="13" ry="20" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" transform="rotate(20 62 28)"/>
      </g>
      <ellipse cx="50" cy="58" rx="28" ry="22" fill="#FDE047" stroke="#1E293B" stroke-width="3"/>
      <path d="M 43 37 Q 44 58 43 79" stroke="#1E293B" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 57 37 Q 58 58 57 79" stroke="#1E293B" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 22 58 L 14 55 L 22 61 Z" fill="#1E293B"/>
      <circle cx="68" cy="53" r="4.5" fill="#1E293B"/>
      <circle cx="69.5" cy="51.5" r="1.5" fill="#FFF"/>
      <circle cx="65" cy="62" r="3.5" fill="#F43F5E" opacity="0.7"/>
      <path d="M 72 59 Q 74 64 77 60" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 68 40 Q 72 32 78 30" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="79" cy="29" r="2.5" fill="#1E293B"/>
    </svg>
  `,

  // Chú bướm xinh
  butterfly: (size = 54, wingColor = '#F472B6', subColor = '#C084FC') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <ellipse cx="32" cy="40" rx="20" ry="22" fill="${wingColor}" stroke="#1E293B" stroke-width="2.5" transform="rotate(-15 32 40)"/>
      <circle cx="30" cy="40" r="7" fill="#FEF08A" stroke="#1E293B" stroke-width="1.5"/>
      <ellipse cx="35" cy="68" rx="14" ry="16" fill="${subColor}" stroke="#1E293B" stroke-width="2.5" transform="rotate(10 35 68)"/>
      <ellipse cx="68" cy="40" rx="20" ry="22" fill="${wingColor}" stroke="#1E293B" stroke-width="2.5" transform="rotate(15 68 40)"/>
      <circle cx="70" cy="40" r="7" fill="#FEF08A" stroke="#1E293B" stroke-width="1.5"/>
      <ellipse cx="65" cy="68" rx="14" ry="16" fill="${subColor}" stroke="#1E293B" stroke-width="2.5" transform="rotate(-10 65 68)"/>
      <rect x="46" y="32" width="8" height="38" rx="4" fill="#FDE047" stroke="#1E293B" stroke-width="2.5"/>
      <circle cx="50" cy="28" r="8" fill="#FDE047" stroke="#1E293B" stroke-width="2.5"/>
      <circle cx="48" cy="27" r="1.5" fill="#1E293B"/>
      <circle cx="52" cy="27" r="1.5" fill="#1E293B"/>
      <ellipse cx="46" cy="30" rx="1.5" ry="1" fill="#F43F5E"/>
      <ellipse cx="54" cy="30" rx="1.5" ry="1" fill="#F43F5E"/>
      <path d="M 47 21 Q 42 12 36 15" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <path d="M 53 21 Q 58 12 64 15" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <circle cx="35" cy="15" r="2" fill="#1E293B"/>
      <circle cx="65" cy="15" r="2" fill="#1E293B"/>
    </svg>
  `,

  // Chú bọ rùa
  ladybug: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 32 45 C 32 30, 68 30, 68 45 Z" fill="#1E293B"/>
      <circle cx="42" cy="37" r="4.5" fill="#FFF"/>
      <circle cx="43" cy="37" r="2.5" fill="#1E293B"/>
      <circle cx="58" cy="37" r="4.5" fill="#FFF"/>
      <circle cx="57" cy="37" r="2.5" fill="#1E293B"/>
      <circle cx="50" cy="62" r="28" fill="#EF4444" stroke="#1E293B" stroke-width="3"/>
      <line x1="50" y1="36" x2="50" y2="90" stroke="#1E293B" stroke-width="3.5"/>
      <circle cx="36" cy="55" r="4.5" fill="#1E293B"/>
      <circle cx="40" cy="74" r="5" fill="#1E293B"/>
      <circle cx="64" cy="55" r="4.5" fill="#1E293B"/>
      <circle cx="60" cy="74" r="5" fill="#1E293B"/>
    </svg>
  `,

  // Chú ốc sên
  snail: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 15 76 Q 30 76 50 76 C 75 76 86 72 88 56 C 89 48 83 45 78 50 C 72 56 68 65 52 70 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2.5"/>
      <circle cx="44" cy="52" r="24" fill="#D97706" stroke="#78350F" stroke-width="3"/>
      <path d="M 44 34 A 18 18 0 1 1 28 58 A 12 12 0 1 1 42 64 A 6 6 0 1 1 45 53" fill="none" stroke="#FDE68A" stroke-width="3" stroke-linecap="round"/>
      <path d="M 84 50 Q 86 38 90 32" stroke="#B45309" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="91" cy="30" r="3.5" fill="#FFF" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="91.5" cy="30" r="1.5" fill="#1E293B"/>
    </svg>
  `,

  // Chim xanh
  bird: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <ellipse cx="50" cy="58" rx="26" ry="22" fill="#60A5FA" stroke="#1D4ED8" stroke-width="2.5"/>
      <ellipse cx="58" cy="64" rx="16" ry="12" fill="#EFF6FF"/>
      <circle cx="68" cy="50" r="4.5" fill="#1E293B"/>
      <circle cx="69.5" cy="48.5" r="1.5" fill="#FFF"/>
      <polygon points="76,52 88,55 76,60" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>
    </svg>
  `,

  // =================== ĐỘNG VẬT MỚI BỔ SUNG ===================

  // Chú ếch xanh vui vẻ
  frog: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- 2 mắt to lồi -->
      <circle cx="34" cy="30" r="16" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
      <circle cx="34" cy="30" r="8" fill="#FFF"/>
      <circle cx="35" cy="30" r="4.5" fill="#1E293B"/>
      <circle cx="66" cy="30" r="16" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
      <circle cx="66" cy="30" r="8" fill="#FFF"/>
      <circle cx="65" cy="30" r="4.5" fill="#1E293B"/>
      <!-- Thân tròn xanh mướt -->
      <ellipse cx="50" cy="60" rx="36" ry="28" fill="#4ADE80" stroke="#15803D" stroke-width="3"/>
      <ellipse cx="50" cy="68" rx="22" ry="16" fill="#BBF7D0"/>
      <!-- Miệng cười rộng & má hồng -->
      <path d="M 32 58 Q 50 72 68 58" fill="none" stroke="#15803D" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="28" cy="54" rx="4" ry="2.5" fill="#F43F5E" opacity="0.7"/>
      <ellipse cx="72" cy="54" rx="4" ry="2.5" fill="#F43F5E" opacity="0.7"/>
    </svg>
  `,

  // Chú vịt con đáng yêu
  duck: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Thân vịt -->
      <path d="M 20 65 Q 12 55 24 50 C 45 50 55 58 68 55 C 75 55 84 62 76 75 C 65 85 30 85 20 65 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
      <!-- Đầu vịt -->
      <circle cx="65" cy="38" r="18" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
      <circle cx="70" cy="34" r="3.5" fill="#1E293B"/>
      <circle cx="71" cy="33" r="1.2" fill="#FFF"/>
      <!-- Mỏ vịt cam -->
      <ellipse cx="84" cy="42" rx="9" ry="5" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>
      <!-- Cánh vịt vẫy -->
      <path d="M 38 60 Q 48 50 56 62 Q 44 72 38 60 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
    </svg>
  `,

  // Chú cún con thân thiện
  puppy: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Tai cún cụp -->
      <ellipse cx="24" cy="40" rx="10" ry="18" fill="#B45309" stroke="#78350F" stroke-width="2" transform="rotate(-15 24 40)"/>
      <ellipse cx="76" cy="40" rx="10" ry="18" fill="#B45309" stroke="#78350F" stroke-width="2" transform="rotate(15 76 40)"/>
      <!-- Mặt tròn trắng kem -->
      <circle cx="50" cy="52" r="28" fill="#FEF3C7" stroke="#B45309" stroke-width="2.5"/>
      <circle cx="40" cy="48" r="3.5" fill="#1E293B"/>
      <circle cx="60" cy="48" r="3.5" fill="#1E293B"/>
      <!-- Mũi cún & miệng -->
      <polygon points="46,56 54,56 50,60" fill="#1E293B"/>
      <path d="M 45 64 Q 50 68 55 64" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="32" cy="56" rx="3.5" ry="2" fill="#FDA4AF"/>
      <ellipse cx="68" cy="56" rx="3.5" ry="2" fill="#FDA4AF"/>
    </svg>
  `,

  // Chú mèo con xinh xắn
  kitten: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- 2 tai nhọn -->
      <polygon points="26,45 32,20 48,34" fill="#FDBA74" stroke="#C2410C" stroke-width="2"/>
      <polygon points="74,45 68,20 52,34" fill="#FDBA74" stroke="#C2410C" stroke-width="2"/>
      <!-- Mặt mèo cam -->
      <circle cx="50" cy="54" r="28" fill="#FED7AA" stroke="#C2410C" stroke-width="2.5"/>
      <circle cx="40" cy="50" r="3.5" fill="#1E293B"/>
      <circle cx="60" cy="50" r="3.5" fill="#1E293B"/>
      <!-- Mũi hồng và râu -->
      <polygon points="48,58 52,58 50,61" fill="#F43F5E"/>
      <line x1="26" y1="56" x2="16" y2="54" stroke="#C2410C" stroke-width="1.5"/>
      <line x1="26" y1="60" x2="16" y2="62" stroke="#C2410C" stroke-width="1.5"/>
      <line x1="74" y1="56" x2="84" y2="54" stroke="#C2410C" stroke-width="1.5"/>
      <line x1="74" y1="60" x2="84" y2="62" stroke="#C2410C" stroke-width="1.5"/>
    </svg>
  `,

  // =================== HOA QUẢ NHIỆT ĐỚI PHONG PHÚ ===================

  // Quả dưa hấu mát lạnh
  watermelon: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Miếng dưa hấu hình bán nguyệt -->
      <path d="M 14 45 C 14 85 86 85 86 45 Z" fill="#15803D" stroke="#166534" stroke-width="2.5"/>
      <path d="M 18 45 C 18 80 82 80 82 45 Z" fill="#86EFAC"/>
      <path d="M 22 45 C 22 76 78 76 78 45 Z" fill="#EF4444"/>
      <!-- Hạt dưa đen -->
      <ellipse cx="36" cy="56" rx="2" ry="3.5" fill="#1E293B"/>
      <ellipse cx="50" cy="62" rx="2" ry="3.5" fill="#1E293B"/>
      <ellipse cx="64" cy="56" rx="2" ry="3.5" fill="#1E293B"/>
      <ellipse cx="50" cy="50" rx="2" ry="3" fill="#1E293B"/>
      <!-- Mặt cười dễ thương -->
      <circle cx="43" cy="52" r="1.5" fill="#FFF"/>
      <circle cx="57" cy="52" r="1.5" fill="#FFF"/>
    </svg>
  `,

  // Nải chuối vàng
  banana: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Quả chuối cong tròn -->
      <path d="M 24 28 C 30 55 58 78 82 68 C 65 80 32 68 20 40 C 16 32 20 26 24 28 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
      <path d="M 28 20 C 35 48 65 72 90 58 C 72 72 40 60 25 32 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>
      <circle cx="28" cy="18" r="3.5" fill="#65A30D"/>
      <ellipse cx="52" cy="46" rx="2" ry="2" fill="#1E293B"/>
      <ellipse cx="64" cy="52" rx="2" ry="2" fill="#1E293B"/>
    </svg>
  `,

  // Quả xoài vàng
  mango: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Cuống lá -->
      <ellipse cx="50" cy="18" rx="10" ry="5" fill="#22C55E" transform="rotate(-30 50 18)"/>
      <line x1="50" y1="20" x2="50" y2="28" stroke="#78350F" stroke-width="3"/>
      <!-- Quả xoài căng mọng -->
      <path d="M 48 28 C 70 28 85 55 75 78 C 65 92 40 92 28 78 C 18 64 26 28 48 28 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2.5"/>
      <circle cx="44" cy="52" r="2.5" fill="#1E293B"/>
      <circle cx="58" cy="52" r="2.5" fill="#1E293B"/>
      <path d="M 48 60 Q 51 64 54 60" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="38" cy="58" rx="3" ry="1.5" fill="#FDA4AF"/>
      <ellipse cx="64" cy="58" rx="3" ry="1.5" fill="#FDA4AF"/>
    </svg>
  `,

  // Quả dứa (thơm)
  pineapple: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Búp lá vương miện trên đầu -->
      <polygon points="50,6 40,25 60,25" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
      <polygon points="35,12 36,30 46,28" fill="#16A34A" stroke="#15803D" stroke-width="1.5"/>
      <polygon points="65,12 64,30 54,28" fill="#16A34A" stroke="#15803D" stroke-width="1.5"/>
      <!-- Thân dứa mắt lưới -->
      <ellipse cx="50" cy="58" rx="26" ry="32" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
      <line x1="32" y1="42" x2="68" y2="74" stroke="#B45309" stroke-width="1.5"/>
      <line x1="32" y1="74" x2="68" y2="42" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="44" cy="54" r="2.5" fill="#1E293B"/>
      <circle cx="56" cy="54" r="2.5" fill="#1E293B"/>
      <ellipse cx="38" cy="60" rx="3" ry="1.5" fill="#FCA5A5"/>
      <ellipse cx="62" cy="60" rx="3" ry="1.5" fill="#FCA5A5"/>
    </svg>
  `,

  // Quả cam tròn xoe
  orange: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <ellipse cx="54" cy="20" rx="8" ry="4" fill="#22C55E" transform="rotate(-20 54 20)"/>
      <circle cx="50" cy="54" r="32" fill="#FB923C" stroke="#C2410C" stroke-width="2.5"/>
      <circle cx="42" cy="50" r="3" fill="#1E293B"/>
      <circle cx="58" cy="50" r="3" fill="#1E293B"/>
      <path d="M 46 58 Q 50 62 54 58" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="36" cy="56" rx="3.5" ry="2" fill="#FDBA74"/>
      <ellipse cx="64" cy="56" rx="3.5" ry="2" fill="#FDBA74"/>
    </svg>
  `,

  // Quả thanh long
  dragonfruit: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Vỏ thanh long hồng gai xanh -->
      <path d="M 50 18 C 72 25 80 55 75 75 C 65 92 35 92 25 75 C 20 55 28 25 50 18 Z" fill="#F43F5E" stroke="#9F1239" stroke-width="2.5"/>
      <!-- Tai xanh thanh long -->
      <polygon points="50,14 44,28 56,28" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
      <polygon points="22,48 34,45 28,60" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
      <polygon points="78,48 66,45 72,60" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
      <!-- Ruột trắng hở chấm mè -->
      <ellipse cx="50" cy="62" rx="18" ry="18" fill="#FFF"/>
      <circle cx="45" cy="58" r="1.5" fill="#1E293B"/>
      <circle cx="55" cy="58" r="1.5" fill="#1E293B"/>
      <circle cx="50" cy="68" r="1.5" fill="#1E293B"/>
    </svg>
  `,

  // =================== PHƯƠNG TIỆN & ĐỒ VẬT ===================

  // Xe ô tô con
  car: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Mui xe -->
      <path d="M 30 45 L 42 26 L 68 26 L 78 45 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
      <rect x="44" y="30" width="22" height="13" fill="#E0F2FE" rx="2"/>
      <!-- Thân xe đỏ -->
      <rect x="16" y="44" width="72" height="24" rx="8" fill="#EF4444" stroke="#991B1B" stroke-width="2.5"/>
      <!-- Đèn xe -->
      <circle cx="82" cy="52" r="3.5" fill="#FDE047"/>
      <!-- Bánh xe -->
      <circle cx="32" cy="70" r="10" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
      <circle cx="32" cy="70" r="4" fill="#FFF"/>
      <circle cx="72" cy="70" r="10" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
      <circle cx="72" cy="70" r="4" fill="#FFF"/>
    </svg>
  `,

  // Máy bay nhỏ
  airplane: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Cánh ngang -->
      <polygon points="46,16 58,16 48,84 38,84" fill="#60A5FA" stroke="#1D4ED8" stroke-width="2"/>
      <!-- Thân máy bay trắng -->
      <path d="M 12 50 C 30 42 80 44 88 50 C 80 56 30 58 12 50 Z" fill="#EFF6FF" stroke="#1E40AF" stroke-width="2.5"/>
      <!-- Đuôi máy bay -->
      <polygon points="12,50 18,34 26,45" fill="#EF4444"/>
      <!-- Cửa sổ tròn -->
      <circle cx="55" cy="50" r="3" fill="#0284C7"/>
      <circle cx="67" cy="50" r="3" fill="#0284C7"/>
      <circle cx="78" cy="50" r="3" fill="#0284C7"/>
    </svg>
  `,

  // Khinh khí cầu
  balloon: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Quả cầu sọc màu -->
      <path d="M 28 42 C 28 20 72 20 72 42 C 72 58 58 68 50 72 C 42 68 28 58 28 42 Z" fill="#F43F5E" stroke="#9F1239" stroke-width="2"/>
      <path d="M 38 42 C 38 20 62 20 62 42 C 62 58 54 68 50 72 C 46 68 38 58 38 42 Z" fill="#FDE047"/>
      <path d="M 45 42 C 45 20 55 20 55 42 C 55 58 52 68 50 72 C 48 68 45 58 45 42 Z" fill="#38BDF8"/>
      <!-- Dây nối giỏ -->
      <line x1="44" y1="72" x2="44" y2="80" stroke="#78350F" stroke-width="1.5"/>
      <line x1="56" y1="72" x2="56" y2="80" stroke="#78350F" stroke-width="1.5"/>
      <!-- Giỏ đan nâu -->
      <rect x="42" y="80" width="16" height="12" rx="2" fill="#D97706" stroke="#78350F" stroke-width="1.5"/>
    </svg>
  `,

  // Quả bóng đá
  soccerBall: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="50" r="36" fill="#FFFFFF" stroke="#1E293B" stroke-width="3"/>
      <polygon points="50,38 60,46 56,58 44,58 40,46" fill="#1E293B"/>
      <line x1="50" y1="38" x2="50" y2="20" stroke="#1E293B" stroke-width="2"/>
      <line x1="60" y1="46" x2="76" y2="40" stroke="#1E293B" stroke-width="2"/>
      <line x1="56" y1="58" x2="68" y2="74" stroke="#1E293B" stroke-width="2"/>
      <line x1="44" y1="58" x2="32" y2="74" stroke="#1E293B" stroke-width="2"/>
      <line x1="40" y1="46" x2="24" y2="40" stroke="#1E293B" stroke-width="2"/>
    </svg>
  `,

  // Ngôi nhà mái đỏ
  house: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Ống khói -->
      <rect x="66" y="22" width="8" height="14" fill="#B45309"/>
      <!-- Mái ngói đỏ -->
      <polygon points="50,16 16,46 84,46" fill="#EF4444" stroke="#991B1B" stroke-width="2.5"/>
      <!-- Tường nhà vàng -->
      <rect x="24" y="46" width="52" height="42" fill="#FEF3C7" stroke="#B45309" stroke-width="2"/>
      <!-- Cửa ra vào -->
      <rect x="42" y="60" width="16" height="28" fill="#3B82F6" rx="2"/>
      <!-- Cửa sổ tròn -->
      <circle cx="50" cy="34" r="5" fill="#FFF" stroke="#991B1B" stroke-width="1.5"/>
    </svg>
  `,

  // =================== ĐỒ ĂN VẶT MỚI CHO CHỦ ĐỀ 3 ===================

  // Kẹo mút cầu vồng
  lollipop: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Que kẹo -->
      <line x1="50" y1="56" x2="50" y2="92" stroke="#E2E8F0" stroke-width="5" stroke-linecap="round"/>
      <!-- Viên kẹo xoắn ốc -->
      <circle cx="50" cy="40" r="26" fill="#F43F5E" stroke="#BE123C" stroke-width="2.5"/>
      <path d="M 50 18 A 22 22 0 0 1 72 40 A 16 16 0 0 1 56 56 A 10 10 0 0 1 42 46" fill="none" stroke="#FDE047" stroke-width="4" stroke-linecap="round"/>
      <!-- Nơ hồng trang trí -->
      <circle cx="50" cy="62" r="3.5" fill="#EC4899"/>
    </svg>
  `,

  // Bánh quy sô-cô-la
  cookie: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="50" r="34" fill="#FDE68A" stroke="#B45309" stroke-width="2.5"/>
      <circle cx="36" cy="38" r="4" fill="#78350F"/>
      <circle cx="62" cy="36" r="3.5" fill="#78350F"/>
      <circle cx="48" cy="54" r="4" fill="#78350F"/>
      <circle cx="64" cy="62" r="3.5" fill="#78350F"/>
      <circle cx="34" cy="64" r="3.5" fill="#78350F"/>
      <!-- Mặt cười bánh quy -->
      <ellipse cx="44" cy="46" rx="2" ry="1.5" fill="#B45309"/>
      <ellipse cx="56" cy="46" rx="2" ry="1.5" fill="#B45309"/>
    </svg>
  `,

  // Hộp sữa tươi
  milkCarton: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="36,18 64,18 60,30 40,30" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
      <rect x="34" y="30" width="32" height="56" rx="4" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5"/>
      <rect x="34" y="52" width="32" height="14" fill="#38BDF8"/>
      <circle cx="50" cy="42" r="4" fill="#F43F5E"/>
    </svg>
  `,

  // Bánh kem sinh nhật
  birthdayCake: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <!-- Cây nến sinh nhật -->
      <line x1="50" y1="20" x2="50" y2="38" stroke="#FDE047" stroke-width="3"/>
      <ellipse cx="50" cy="14" rx="4" ry="7" fill="#F97316"/>
      <!-- Tầng bánh trên -->
      <rect x="32" y="38" width="36" height="22" rx="4" fill="#F472B6" stroke="#BE185D" stroke-width="2"/>
      <!-- Tầng bánh dưới -->
      <rect x="22" y="60" width="56" height="26" rx="6" fill="#FBCFE8" stroke="#BE185D" stroke-width="2"/>
      <circle cx="30" cy="72" r="2.5" fill="#EF4444"/>
      <circle cx="50" cy="72" r="2.5" fill="#3B82F6"/>
      <circle cx="70" cy="72" r="2.5" fill="#10B981"/>
    </svg>
  `,

  // =================== CÁC MẪU CŨ ĐÃ CÓ (GIỮ NGUYÊN) ===================
  apple: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <ellipse cx="66" cy="14" rx="8" ry="4" fill="#22C55E" transform="rotate(-30 66 14)"/>
      <path d="M 50 34 C 36 24 16 34 18 64 C 20 86 42 92 50 88 C 58 92 80 86 82 64 C 84 34 64 24 50 34 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2.5"/>
      <circle cx="42" cy="55" r="2.5" fill="#1E293B"/>
      <circle cx="58" cy="55" r="2.5" fill="#1E293B"/>
    </svg>
  `,

  strawberry: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="50,15 40,25 30,20 42,28 50,30 58,28 70,20 60,25" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
      <path d="M 28 32 C 16 48 24 80 50 90 C 76 80 84 48 72 32 C 60 26 40 26 28 32 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="2.5"/>
      <circle cx="42" cy="58" r="1.5" fill="#FEF08A"/>
      <circle cx="58" cy="58" r="1.5" fill="#FEF08A"/>
    </svg>
  `,

  carrot: (size = 50) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="34,26 66,26 50,92" fill="#F97316" stroke="#C2410C" stroke-width="2.5"/>
      <line x1="40" y1="40" x2="52" y2="40" stroke="#C2410C" stroke-width="2"/>
      <line x1="46" y1="55" x2="60" y2="55" stroke="#C2410C" stroke-width="2"/>
    </svg>
  `,

  fish: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="20,35 10,50 20,65" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
      <ellipse cx="55" cy="50" rx="32" ry="22" fill="#60A5FA" stroke="#1D4ED8" stroke-width="2.5"/>
      <circle cx="74" cy="44" r="4.5" fill="#FFF"/>
      <circle cx="75" cy="44" r="2.5" fill="#1E293B"/>
    </svg>
  `,

  sunflower: (size = 54) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="46" r="18" fill="#78350F" stroke="#451A03" stroke-width="2"/>
      <circle cx="44" cy="43" r="2.5" fill="#FFF"/>
      <circle cx="56" cy="43" r="2.5" fill="#FFF"/>
      <path d="M 46 51 Q 50 56 54 51" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  daisy: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="44" r="14" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
      <circle cx="45" cy="41" r="2" fill="#1E293B"/>
      <circle cx="55" cy="41" r="2" fill="#1E293B"/>
    </svg>
  `,

  tulip: (size = 52, color = '#F43F5E') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 28 35 C 28 58 40 64 50 64 C 60 64 72 58 72 35 C 65 44 55 35 50 48 C 45 35 35 44 28 35 Z" fill="${color}" stroke="#BE123C" stroke-width="2.5"/>
      <circle cx="44" cy="48" r="2" fill="#1E293B"/>
      <circle cx="56" cy="48" r="2" fill="#1E293B"/>
    </svg>
  `,

  dragonfly: (size = 54, color = '#06B6D4') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <rect x="47" y="38" width="6" height="48" rx="3" fill="${color}" stroke="#0E7490" stroke-width="2"/>
      <circle cx="50" cy="32" r="9" fill="${color}" stroke="#0E7490" stroke-width="2"/>
    </svg>
  `,

  mushroom: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 14 55 C 14 22, 86 22, 86 55 C 86 58, 14 58, 14 55 Z" fill="#EF4444" stroke="#991B1B" stroke-width="3"/>
      <circle cx="32" cy="42" r="6" fill="#FFF"/>
      <circle cx="50" cy="34" r="7.5" fill="#FFF"/>
      <circle cx="68" cy="42" r="6" fill="#FFF"/>
    </svg>
  `,

  icecream: (size = 52, flavor = '#F472B6') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="34,48 66,48 50,92" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
      <circle cx="50" cy="38" r="22" fill="${flavor}" stroke="#BE185D" stroke-width="2.5"/>
      <circle cx="44" cy="35" r="2" fill="#1E293B"/>
      <circle cx="56" cy="35" r="2" fill="#1E293B"/>
    </svg>
  `,

  donut: (size = 52, glaze = '#86EFAC') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="50" r="38" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
      <circle cx="50" cy="50" r="33" fill="${glaze}"/>
      <circle cx="50" cy="50" r="14" fill="#FFFFFF" stroke="#D97706" stroke-width="2.5"/>
    </svg>
  `,

  cupcake: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="26,54 74,54 66,90 34,90" fill="#BBF7D0" stroke="#16A34A" stroke-width="2.5"/>
      <ellipse cx="50" cy="50" rx="26" ry="14" fill="#F472B6" stroke="#BE185D" stroke-width="2"/>
      <ellipse cx="50" cy="38" rx="20" ry="12" fill="#FBCFE8" stroke="#BE185D" stroke-width="2"/>
    </svg>
  `,

  parfait: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 28 20 L 72 20 L 64 68 C 64 78, 36 78, 36 68 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" opacity="0.95"/>
      <polygon points="50,10 44,22 56,22" fill="#EF4444" stroke="#991B1B" stroke-width="1.5"/>
    </svg>
  `,

  milkshake: (size = 52) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="30,35 70,35 64,88 36,88" fill="#FDE68A" stroke="#B45309" stroke-width="2.5"/>
      <circle cx="50" cy="60" r="5" fill="#D97706"/>
    </svg>
  `,

  trainEngine: (size = 64) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <rect x="24" y="24" width="10" height="18" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <circle cx="28" cy="14" r="5" fill="#E2E8F0" opacity="0.8"/>
      <rect x="16" y="42" width="68" height="34" rx="8" fill="#3B82F6" stroke="#1E40AF" stroke-width="2.5"/>
      <rect x="52" y="26" width="32" height="30" rx="6" fill="#60A5FA" stroke="#1E40AF" stroke-width="2.5"/>
      <circle cx="30" cy="78" r="10" fill="#1E293B"/>
      <circle cx="68" cy="78" r="10" fill="#1E293B"/>
    </svg>
  `,

  trainWagon: (size = 60, passengerIcon = '') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <rect x="14" y="36" width="72" height="40" rx="10" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
      <rect x="24" y="44" width="52" height="24" rx="6" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
      <circle cx="30" cy="80" r="9" fill="#1E293B"/>
      <circle cx="70" cy="80" r="9" fill="#1E293B"/>
    </svg>
  `,

  shapeCircle: (size = 50, color = '#F59E0B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="50" r="38" fill="${color}" stroke="#B45309" stroke-width="3"/>
      <circle cx="42" cy="45" r="3.5" fill="#1E293B"/>
      <circle cx="58" cy="45" r="3.5" fill="#1E293B"/>
    </svg>
  `,

  shapeSquare: (size = 50, color = '#3B82F6') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <rect x="14" y="14" width="72" height="72" rx="12" fill="${color}" stroke="#1E40AF" stroke-width="3"/>
      <circle cx="42" cy="45" r="3.5" fill="#FFF"/>
      <circle cx="58" cy="45" r="3.5" fill="#FFF"/>
    </svg>
  `,

  shapeTriangle: (size = 50, color = '#10B981') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="50,14 88,84 12,84" fill="${color}" stroke="#047857" stroke-width="3"/>
      <circle cx="44" cy="55" r="3" fill="#1E293B"/>
      <circle cx="56" cy="55" r="3" fill="#1E293B"/>
    </svg>
  `,

  shapeStar: (size = 50, color = '#FDE047') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <polygon points="50,10 61,38 91,38 66,56 76,86 50,68 24,86 34,56 9,38 39,38" fill="${color}" stroke="#D97706" stroke-width="3"/>
      <circle cx="44" cy="48" r="2.5" fill="#1E293B"/>
      <circle cx="56" cy="48" r="2.5" fill="#1E293B"/>
    </svg>
  `,

  shapeHeart: (size = 50, color = '#EC4899') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <path d="M 50 82 C 16 58 10 32 30 18 C 42 10 50 20 50 24 C 50 20 58 10 70 18 C 90 32 84 58 50 82 Z" fill="${color}" stroke="#9D174D" stroke-width="3"/>
      <circle cx="40" cy="38" r="2.5" fill="#FFF"/>
      <circle cx="60" cy="38" r="2.5" fill="#FFF"/>
    </svg>
  `,

  boy: (size = 80) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="46" r="22" fill="#FFE0B2" stroke="#5A3825" stroke-width="2"/>
      <path d="M 32 68 C 32 62, 68 62, 68 68 L 74 94 L 26 94 Z" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
    </svg>
  `,

  girl: (size = 80) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="44" r="22" fill="#FFE0B2" stroke="#451A03" stroke-width="2"/>
      <path d="M 28 76 Q 50 72 50 82 Q 50 72 72 76 L 70 94 Q 50 88 50 96 Q 50 88 30 94 Z" fill="#60A5FA" stroke="#1E40AF" stroke-width="2"/>
    </svg>
  `
};

window.SVGIcons = SVGIcons;
