# GOG STUDIO Medya Klasörü

Bu klasör, kişisel fotoğraf ve video dosyalarınızı saklayabileceğiniz yerdir.

### Nasıl Kullanılır?
1. Kendi fotoğraflarınızı (örn: `benim-fotom.jpg`, `manzara.png`) ve videolarınızı (örn: `klip.mp4`, `reel.mp4`) bu klasöre kopyalayın.
2. `js/media-data.js` dosyasını açın.
3. `MEDIA_ITEMS` listesine dosyanızı ekleyin:

```javascript
{
  id: "ozel-klip",
  title: "Özel Video Kurgum",
  description: "Dağ yollarında gün batımı kurgusu.",
  category: "cinematic", // street | cinematic | portrait | nature | reels
  type: "video",         // "video" veya "photo"
  src: "assets/media/klip.mp4",
  thumbnail: "assets/media/klip-kapak.jpg", // veya bir fotoğraf karesi
  duration: "0:30",
  date: "2026-03",
  gear: "Sony FX3 / iPhone 15 Pro",
  resolution: "4K 60FPS",
  location: "Bursa, Uludağ",
  tags: ["Doğa", "Gün Batımı", "Sinematik"],
  featured: true
}
```

*Not: İsterseniz doğrudan internet üzerindeki görsel/video URL'lerini de (`https://...`) ekleyebilirsiniz.*
