/**
 * GOG STUDIO - Medya Kataloğu Veritabanı
 * Sinematik Fotoğraf & Video Prodüksiyon Arşivi
 */

const CATALOG_CATEGORIES = [
  { id: "all", name: "Tüm Arşiv", icon: "grid", description: "Fotoğraf ve video kataloglarının tamamı" },
  { id: "street", name: "Sokak & Şehir", icon: "building", description: "Şehir hayatı, gölgeler, neon ışıklar ve mimari" },
  { id: "cinematic", name: "Sinematik & Video", icon: "film", description: "Kısa kurgular, renk derecelendirme ve video denemeleri" },
  { id: "portrait", name: "Portre & Stüdyo", icon: "user", description: "Doğal ışık ve stüdyo ışıklandırma portre çalışmaları" },
  { id: "nature", name: "Doğa & Manzara", icon: "mountain", description: "Sisli dağlar, orman dokuları ve açık hava kadrajları" },
  { id: "reels", name: "Reels & Klipler", icon: "play", description: "Dikey formatlı kısa video ritimleri ve anlar" }
];

const MEDIA_ITEMS = [
  // 1. Street / Night Neon Photo
  {
    id: "gog-01",
    title: "Karanlık Şehir & Neon Yansımalar",
    description: "Gece yağmuru sonrası ıslak asfalttan yansıyan kırmızı neon ışıklar ve sokak silüeti.",
    category: "street",
    type: "photo",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80",
    date: "2026-03",
    gear: "Sony A7 IV · 35mm f/1.4 GM",
    resolution: "7008 × 4672 · RAW",
    location: "Tokyo / Shibuya",
    tags: ["Neon", "Gece", "Yağmur", "Sinematik"],
    featured: true
  },

  // 2. Cinematic Video (High Speed & Red Tone Sequence)
  {
    id: "gog-02",
    title: "Red Motion: Hız ve Işık Denemesi",
    description: "4K 60fps yüksek kare hızı ile çekilmiş, kırmızı tonların vurgulandığı sinematik ışık ve hareket sekansı.",
    category: "cinematic",
    type: "video",
    src: "https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    date: "2026-02",
    gear: "Sony FX3 · 24-70mm f/2.8 GM",
    duration: "0:10",
    resolution: "4K 60FPS · 10-Bit 4:2:2",
    location: "GOG Stüdyo / Gece Kurgusu",
    tags: ["Sinematik", "4K", "Kırmızı", "Kurgu"],
    featured: true
  },

  // 3. Studio Portrait (Red light aesthetic)
  {
    id: "gog-03",
    title: "Kızıl Gölge: Stüdyo Portresi",
    description: "Çift ışık kurulumunda kırmızı jel filtre ve derin gölge kontrastı ile çekilmiş monokrom portre.",
    category: "portrait",
    type: "photo",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    date: "2026-03",
    gear: "Canon R6 Mark II · 85mm f/1.2 L",
    resolution: "6000 × 4000 · 35mm",
    location: "GOG Stüdyo A",
    tags: ["Portre", "Stüdyo", "Kızıl Işık", "Gölge"],
    featured: true
  },

  // 4. Nature & Mist Landscape (Verified 200 OK URL)
  {
    id: "gog-04",
    title: "Sisli Zirveler & Çam Ormanı",
    description: "Sabahın erken saatlerinde vadiden yükselen yoğun sis tabakası ve monokrom çam ağaçları.",
    category: "nature",
    type: "photo",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
    date: "2026-01",
    gear: "Fujifilm X-T5 · 16-55mm f/2.8",
    resolution: "7728 × 5152 · B&W High Contrast",
    location: "Karadeniz / Yayla Vadisi",
    tags: ["Doğa", "Sis", "Siyah Beyaz", "Manzara"],
    featured: true
  },

  // 5. Short Cinematic Video Clip (Verified Fast Stream)
  {
    id: "gog-05",
    title: "Okyanus Dalgası & Kıyı Ritimleri",
    description: "Kıyıya vuran dalgaların köpük detayları ve akıcı su dinamiği üzerine kurgulanmış sinematik kurgu.",
    category: "cinematic",
    type: "video",
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    date: "2026-02",
    gear: "DJI Mini 4 Pro · D-Log M",
    duration: "0:46",
    resolution: "4K 60FPS HDR",
    location: "Ege Kıyıları / Drone",
    tags: ["Drone", "Video", "Kıyı", "4K"],
    featured: false
  },

  // 6. Street Architecture Minimalist
  {
    id: "gog-06",
    title: "Brütalist Geometri & Sert Gölgeler",
    description: "Modern beton mimarisinin keskin hatları, monokrom gölgeler ve tek bir kırmızı vurgu detayı.",
    category: "street",
    type: "photo",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
    date: "2026-01",
    gear: "Leica Q2 · 28mm f/1.7 Summilux",
    resolution: "8368 × 5584 · Monochrome DNG",
    location: "Frankfurt / Finans Merkezi",
    tags: ["Mimari", "Minimalizm", "Geometri", "Sokak"],
    featured: false
  },

  // 7. Video Reel (Verified Fast Stream)
  {
    id: "gog-07",
    title: "Reel: Gece Şehir Akışı (Timelapse)",
    description: "Şehir trafiğinin ışık izleri ve bulutların gökdelenler arasındaki hızlı geçişi.",
    category: "reels",
    type: "video",
    src: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    date: "2026-03",
    gear: "iPhone 15 Pro Max · Apple ProRes 4K",
    duration: "0:15",
    resolution: "Vertical 4K / 60FPS",
    location: "İstanbul Boğazı",
    tags: ["Reel", "Timelapse", "Gece", "Trafik"],
    featured: true
  },

  // 8. Studio Product / Vintage Gear
  {
    id: "gog-08",
    title: "Analog Kamera & Mekanik Detay",
    description: "Klasik 35mm filmli gövdenin kırmızı logosu, pirinç kadranları ve mekanik deklanşör dokusu.",
    category: "portrait",
    type: "photo",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
    date: "2025-12",
    gear: "Sony A7 IV · 90mm Macro f/2.8 G OSS",
    resolution: "7008 × 4672 · Macro",
    location: "GOG Atölye",
    tags: ["Analog", "Kamera", "Retro", "Makro"],
    featured: false
  },

  // 9. Nature Volcanic / Red Tone
  {
    id: "gog-09",
    title: "Obsidiyen Çöl & Kızıl Ufuk",
    description: "Volkanik siyah kumullar ve batan güneşin gökyüzüne bıraktığı kızıl-mor renk geçişi.",
    category: "nature",
    type: "photo",
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
    date: "2025-11",
    gear: "Canon EOS R5 · 24-105mm f/4 L",
    resolution: "8192 × 5464 · CR3",
    location: "İzlanda / Siyah Sahil",
    tags: ["Volkanik", "Kızıl", "Çöl", "Manzara"],
    featured: true
  },

  // 10. Cinematic Nature Reel (Verified High-Res 1080p stream)
  {
    id: "gog-10",
    title: "Işık Dansı & Derinlik Kurgusu",
    description: "Derinlik ve renk derecelendirmesi üzerinde çalışılmış sinematik sualtı ışık kırılmaları sekansı.",
    category: "cinematic",
    type: "video",
    src: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    date: "2025-10",
    gear: "Sony FX3 · Cine Line 4K",
    duration: "0:10",
    resolution: "1080p 60FPS · 10-Bit",
    location: "GOG Stüdyo / Su Kurgusu",
    tags: ["Işık", "Derinlik", "Sinematik", "4K"],
    featured: false
  },

  // 11. Street Red Umbrella (Verified Working URL)
  {
    id: "gog-11",
    title: "Yağmurlu Metropol & Kırmızı Şemsiye",
    description: "Siyah beyaz gri tonlu şehir fonunda tek kırmızı öge: kalabalığı yaran kırmızı şemsiye ve yağmur yansımaları.",
    category: "street",
    type: "photo",
    src: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=700&q=80",
    date: "2025-09",
    gear: "Ricoh GR IIIx · 40mm f/2.8",
    resolution: "6000 × 4000 · Street Snap",
    location: "Londra / Soho",
    tags: ["Sokak", "Kırmızı Vurgu", "Yağmur", "Monokrom"],
    featured: false
  },

  // 12. Studio Silhouette Portrait
  {
    id: "gog-12",
    title: "Kızıl Halo & Profil Silüeti",
    description: "Arka aydınlatmada kırmızı dairesel neon tüp ile yaratılan keskin yüz hattı silüeti.",
    category: "portrait",
    type: "photo",
    src: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85",
    thumbnail: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80",
    date: "2025-08",
    gear: "Sony A7 IV · 50mm f/1.2 GM",
    resolution: "7008 × 4672 · Low Key",
    location: "GOG Stüdyo B",
    tags: ["Silüet", "Neon", "Portre", "Kontrast"],
    featured: true
  }
];

// Featured Curated Albums / Series
const CURATED_ALBUMS = [
  {
    id: "album-red",
    title: "Red Spectrum // Kırmızı Spektrum",
    subtitle: "Kırmızı, siyah ve derin kontrastın görsel hikayesi",
    cover: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=85",
    count: "12 Eser",
    tag: "Özel Seri",
    categoryFilter: "all"
  },
  {
    id: "album-street",
    title: "Karanlık Şehir & Asfalt",
    subtitle: "Gece sokakları, ıslak yansımalar ve brütalist hatlar",
    cover: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    count: "8 Eser",
    tag: "Sokak",
    categoryFilter: "street"
  },
  {
    id: "album-motion",
    title: "Sinematik Kurgu & Reels",
    subtitle: "Dinamik hareket, renk geçişleri ve kısa video klipleri",
    cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    count: "4 Video",
    tag: "4K Video",
    categoryFilter: "cinematic"
  },
  {
    id: "album-nature",
    title: "Monokrom Doğa Dokusu",
    subtitle: "Sisli dağ zirveleri, çam ormanları ve siyah sahiller",
    cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    count: "6 Eser",
    tag: "Manzara",
    categoryFilter: "nature"
  }
];

// Studio Equipment & Specs
const STUDIO_GEAR = [
  { category: "Kameralar", items: ["Sony A7 IV (33MP Full-Frame)", "Sony FX3 Cinema Line (4K 120p)", "Fujifilm X-T5"] },
  { category: "Lens Seti", items: ["Sony FE 35mm f/1.4 GM", "Sony FE 50mm f/1.2 GM", "Sony FE 24-70mm f/2.8 GM II", "Sony FE 90mm Macro f/2.8"] },
  { category: "Hava & Hareket", items: ["DJI Mini 4 Pro (4K HDR Drone)", "DJI RS 3 Pro Gimbal", "Tilta Mirage Matte Box & ND"] },
  { category: "Kurgu & Renk", items: ["DaVinci Resolve Studio (Color Grading)", "Adobe Lightroom Classic", "Apple Final Cut Pro"] }
];
