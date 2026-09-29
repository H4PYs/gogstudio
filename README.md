# 🔴 GOG STUDIO — Fotoğraf & Video Kataloğu

**GOG STUDIO**, hobi amaçlı fotoğrafçılık, sinematik video kurguları, reels ve görsel serilerinizi sergilemek için hazırlanmış, **Kırmızı, Siyah, Beyaz ve Gri** renk paletine sahip, modern ve ultra hızlı bir web sitesidir.

---

## ✨ Özellikler

- 🎨 **Kırmızı / Siyah / Beyaz / Gri Teması**: Sinematik, keskin ve modern stüdyo estetiği.
- 📸 **Fotoğraf & Video Kataloğu**: Hem yüksek çözünürlüklü fotoğrafları hem de akıcı MP4/4K videoları bir arada sergileme.
- 🗂️ **Kategori & Filtreleme**: Sokak & Şehir, Sinematik & Video, Portre & Stüdyo, Doğa & Manzara, Reels & Klipler.
- 🔍 **Canlı Arama & Tür Filtresi**: Fotoğraf / Video ayrımı ve anlık metin araması.
- 🖥️ **Tam Ekran Lightbox**: Fotoğraflar için yüksek kaliteli görüntüleme, videolar için dahili medya oynatıcı, kamera/lens bilgileri ve klavye kısayolları (ESC, Sol/Sağ Ok).
- ⚡ **Kolay Medya Yönetimi**:
  - `js/media-data.js` üzerinden birkaç satırla yeni medya ekleme.
  - Sitedeki **"+ Medya Ekle"** butonuyla doğrudan tarayıcı üzerinden dosya yükleyip önizleme ve anında JSON kodu üretme.
- 🚀 **GitHub & Vercel Uyumlu**: Sıfır konfigürasyonla anında Vercel'e deploy edilebilir.

---

## 📁 Proje Yapısı

```
GOGSTUDIO WEBSITE/
│
├── index.html              # Ana web sayfası
├── vercel.json             # Vercel dağıtım ve önbellek yapılandırması
├── .gitignore              # Git filtreleme dosyası
│
├── css/
│   └── style.css           # Kırmızı-Siyah modern tema stilleri ve responsive düzen
│
├── js/
│   ├── media-data.js       # Fotoğraf ve video kataloğunun veritabanı (Burayı düzenleyeceksiniz)
│   └── app.js              # Filtreler, arama, lightbox ve video oynatıcı fonksiyonları
│
└── assets/
    ├── logo.svg            # GOG STUDIO kırmızı-beyaz özel SVG logosu
    ├── favicon.svg         # Tarayıcı sekmesi için SVG simgesi
    └── media/              # Kendi fotoğraf ve videolarınızı atabileceğiniz klasör
```

---

## 🛠️ Nasıl Çalıştırılır ve Test Edilir?

1. Masaüstünüzdeki `GOGSTUDIO WEBSITE` klasörünü açın.
2. `index.html` dosyasına çift tıklayın; varsayılan tarayıcınızda (Chrome, Edge vb.) hemen açılacaktır!
3. İstediğiniz bir medyaya tıklayarak tam ekran video oynatmayı veya fotoğraf detaylarını inceleyin.
4. Sağ üstteki **"+ Medya Ekle"** butonunu deneyerek bilgisayarınızdan bir fotoğraf/video seçip canlı önizlemesini görün.

---

## 🖼️ Kendi Fotoğraf ve Videolarınızı Ekleme

### Yöntem 1: Dosya Üzerinden (Önerilen)
1. Fotoğraflarınızı ve videolarınızı `assets/media/` klasörüne kopyalayın (örn: `benim-video.mp4` ve `benim-foto.jpg`).
2. `js/media-data.js` dosyasını Not Defteri veya VS Code ile açın.
3. `MEDIA_ITEMS` listesinin içine yeni objenizi ekleyin:

```javascript
{
  id: "gog-yeni-1",
  title: "Kadıköy Yağmur Çekimi",
  description: "Akşam saatlerinde uzun pozlama sokak fotoğrafı.",
  category: "street", // street | cinematic | portrait | nature | reels
  type: "photo",      // "photo" veya "video"
  src: "assets/media/benim-foto.jpg",
  thumbnail: "assets/media/benim-foto.jpg",
  date: "2026-03",
  gear: "Sony A7 IV · 35mm f/1.4",
  resolution: "33MP RAW",
  location: "İstanbul, Kadıköy",
  tags: ["Sokak", "Gece", "Yağmur"],
  featured: true
},
```

### Yöntem 2: Sitedeki Arayüz ile
1. Sitede sağ üstteki **"+ Medya Ekle"** butonuna tıklayın.
2. Bilgisayarınızdan dosya seçin veya internet linki girin.
3. Başlık ve kategoriyi yazın.
4. **"JSON Kodunu Kopyala"** butonuna basarak üretilen kodu kopyalayıp `media-data.js` dosyasına yapıştırın.

---

## 🚀 GitHub ve Vercel ile Yayına Alma (Deploy Rehberi)

### Adım 1: GitHub'a Yükleme

Eğer bilgisayarınızda Git kuruluysa:
```bash
git init
git add .
git commit -m "Initial commit - GOG STUDIO"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/gogstudio.git
git push -u origin main
```

**Git komut satırı kullanmak istemiyorsanız (Daha Kolay Yol):**
1. [github.com](https://github.com) adresine gidin ve oturum açın.
2. Sağ üstten **"New repository"** butonuna tıklayın.
3. Depo adına `gogstudio` yazın ve **"Create repository"** butonuna basın.
4. Karşınıza çıkan ekranda **"uploading an existing file"** linkine tıklayın.
5. `GOGSTUDIO WEBSITE` klasörünün içindeki tüm dosyaları (index.html, css, js, assets, vercel.json) sürükleyip GitHub'a bırakın ve **Commit changes** butonuna basın.

---

### Adım 2: Vercel'e Bağlama (1 Dakikada Canlıda!)

1. [vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın (Login with GitHub).
2. Açılan panelde sağ üstteki **"Add New..."** -> **"Project"** butonuna tıklayın.
3. Az önce oluşturduğunuz `gogstudio` GitHub reposunun yanındaki **"Import"** butonuna tıklayın.
4. **Framework Preset** alanını olduğu gibi bırakın (Other / Static HTML olarak otomatik tanır).
5. **"Deploy"** butonuna tıklayın!
6. Yaklaşık 10-15 saniye içinde siteniz `https://gogstudio.vercel.app` (veya benzeri bir adreste) tüm dünyaya ücretsiz olarak açılacaktır.
7. İleride sitenize yeni fotoğraflar ekleyip GitHub'a gönderdiğiniz anda Vercel otomatik olarak sitenizi günceller!
