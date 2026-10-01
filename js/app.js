/**
 * GOG STUDIO - Ana Uygulama & Motion Motoru
 * (Lenis Smooth Scroll + GSAP ScrollTrigger + Lightbox + Dokunmatik Hareketler)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Admin Mode (Gizli Butonlar Ä°Ã§in)
  if (window.location.search.includes("admin=1")) {
    localStorage.setItem("gog_admin", "true");
  } else if (window.location.search.includes("admin=0")) {
    localStorage.removeItem("gog_admin");
  }
  if (localStorage.getItem("gog_admin") === "true") {
    document.body.classList.add("admin-mode");
  }

  // State
  let currentCategory = "all";
  let currentType = "all"; // 'all' | 'photo' | 'video'
  let searchQuery = "";
  let currentLightboxIndex = -1;
  let filteredItems = [...MEDIA_ITEMS];
  let likedItems = JSON.parse(localStorage.getItem("gog_likes") || "[]");
  let currentViewMode = localStorage.getItem("gog_view_mode") || "feed"; // 'feed' | 'grid'

  // DOM Elements
  const mediaGrid = document.getElementById("mediaGrid");
  const categoryChipsContainer = document.getElementById("categoryChips");
  const typeToggleBtns = document.querySelectorAll(".type-toggle-btn");
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const resultCountEl = document.getElementById("resultCount");
  const seriesGrid = document.getElementById("seriesGrid");
  const gearGrid = document.getElementById("gearGrid");
  const viewModeBtns = document.querySelectorAll(".view-btn");

  // Mobile Drawer Elements
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const mobileDrawerOverlay = document.getElementById("mobileDrawerOverlay");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const mobileDrawerAddBtn = document.getElementById("mobileDrawerAddBtn");

  // Mobile Bottom Bar Elements
  const bNavHome = document.getElementById("bNavHome");
  const bNavCatalog = document.getElementById("bNavCatalog");
  const bNavAdd = document.getElementById("bNavAdd");
  const bNavVideos = document.getElementById("bNavVideos");
  const bNavAbout = document.getElementById("bNavAbout");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxContent = document.getElementById("lightboxContent");
  const lightboxMediaViewer = document.getElementById("lightboxMediaViewer");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxGear = document.getElementById("lightboxGear");
  const lightboxRes = document.getElementById("lightboxRes");
  const lightboxLocation = document.getElementById("lightboxLocation");
  const lightboxDate = document.getElementById("lightboxDate");
  const lightboxTags = document.getElementById("lightboxTags");
  const lightboxShareBtn = document.getElementById("lightboxShareBtn");

  // Quick Add Modal Elements
  const quickAddModal = document.getElementById("quickAddModal");
  const openQuickAddBtn = document.getElementById("openQuickAddBtn");
  const heroAddBtn = document.getElementById("heroAddBtn");
  const closeQuickAddBtn = document.getElementById("closeQuickAddBtn");
  const quickAddForm = document.getElementById("quickAddForm");
  const codeSnippetOutput = document.getElementById("codeSnippetOutput");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  // ==========================================================================
  // 1. Lenis Smooth Scroll & GSAP Integration
  // ==========================================================================
  // 1. Lenis Smooth Scroll (Desktop Only - Mobile uses 120Hz native touch scroll)
  // ==========================================================================
  let lenis = null;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);

  if (typeof Lenis !== "undefined" && !isTouchDevice) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: false
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Header Scroll Effect & Bottom Bar update
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateBottomNavActiveState();
  }, { passive: true });

  // ==========================================================================
  // 2. GSAP Cinematic Entrance & Micro-Interactions (Safe & Reliable)
  // ==========================================================================
  function initMotionSequences() {
    if (typeof gsap === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // A. Hero Section Cinematic Sequence
    const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTL
      .from(".site-header", { y: -25, opacity: 0, duration: 0.8 })
      .from(".hero-tagline", { opacity: 0, x: -20, duration: 0.6 }, "-=0.4")
      .from(".hero-title", { opacity: 0, y: 35, duration: 0.9 }, "-=0.4")
      .from(".hero-desc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
      .from(".hero-cta .btn", { opacity: 0, y: 20, stagger: 0.12, duration: 0.6 }, "-=0.4")
      .from(".hero-stats .stat-item", { opacity: 0, y: 18, stagger: 0.08, duration: 0.6 }, "-=0.4")
      .from(".hero-card", { opacity: 0, scale: 0.94, duration: 1.0, ease: "power2.out" }, "-=0.8");

    // B. Desktop Scroll Reveals (Never hide cards on mobile touch devices)
    if (typeof ScrollTrigger !== "undefined" && !isTouchDevice) {
      gsap.fromTo(
        ".series-card",
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: ".series-section",
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out"
        }
      );

      gsap.fromTo(
        ".gear-card",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        }
      );
    }

    // C. Interactive Button Ripple Waves
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        circle.classList.add("ripple-wave");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left - size / 2}px`;
        circle.style.top = `${e.clientY - rect.top - size / 2}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      });
    });
  }

  // ==========================================================================
  // 3. Mobile Drawer Navigation Logic
  // ==========================================================================
  function openDrawer() {
    navMenu.classList.add("open");
    mobileDrawerOverlay.classList.add("active");
    mobileToggle.classList.add("active");
    mobileToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
  }

  function closeDrawer() {
    navMenu.classList.remove("open");
    mobileDrawerOverlay.classList.remove("active");
    mobileToggle.classList.remove("active");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", closeDrawer);

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  if (mobileDrawerAddBtn) {
    mobileDrawerAddBtn.addEventListener("click", () => {
      closeDrawer();
      openQuickAdd();
    });
  }

  // ==========================================================================
  // 4. View Mode Toggle (Feed / Large Cards vs Grid / Compact)
  // ==========================================================================
  function applyViewMode(mode) {
    currentViewMode = mode;
    localStorage.setItem("gog_view_mode", mode);
    mediaGrid.classList.remove("view-feed", "view-grid");
    mediaGrid.classList.add(`view-${mode}`);

    viewModeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === mode);
    });
  }

  viewModeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyViewMode(btn.dataset.view);
    });
  });
  applyViewMode(currentViewMode);

  // ==========================================================================
  // 5. Render Category Filter Chips
  // ==========================================================================
  function renderCategoryChips() {
    if (!categoryChipsContainer) return;
    categoryChipsContainer.innerHTML = CATALOG_CATEGORIES.map(
      (cat) => `
      <button class="chip-btn ${cat.id === currentCategory ? "active" : ""}" data-category="${cat.id}">
        <span>${cat.name}</span>
      </button>
    `
    ).join("");

    categoryChipsContainer.querySelectorAll(".chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        renderCategoryChips();
        filterAndRenderMedia();
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });
  }

  // ==========================================================================
  // 6. Render Curated Series / Albums
  // ==========================================================================
  function renderCuratedSeries() {
    if (!seriesGrid) return;
    seriesGrid.innerHTML = CURATED_ALBUMS.map(
      (album) => `
      <div class="series-card" data-category="${album.categoryFilter}">
        <div class="series-cover">
          <img src="${album.cover}" alt="${album.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=85';">
          <span class="series-badge">${album.tag}</span>
        </div>
        <div class="series-info">
          <h4>${album.title}</h4>
          <p>${album.subtitle}</p>
          <div class="series-footer">
            <span>${album.count}</span>
            <span class="series-link">Kataloğu Aç &rarr;</span>
          </div>
        </div>
      </div>
    `
    ).join("");

    seriesGrid.querySelectorAll(".series-card").forEach((card) => {
      card.addEventListener("click", () => {
        const cat = card.dataset.category;
        currentCategory = cat || "all";
        renderCategoryChips();
        filterAndRenderMedia();
        const catalogSec = document.getElementById("kataloglar");
        if (catalogSec) {
          if (lenis) {
            lenis.scrollTo(catalogSec);
          } else {
            catalogSec.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  // ==========================================================================
  // 7. Render Studio Gear Specs
  // ==========================================================================
  function renderStudioGear() {
    if (!gearGrid) return;
    gearGrid.innerHTML = STUDIO_GEAR.map(
      (sec) => `
      <div class="gear-card">
        <div class="gear-card-title">
          <span>${sec.category}</span>
        </div>
        <ul class="gear-list">
          ${sec.items.map((it) => `<li>${it}</li>`).join("")}
        </ul>
      </div>
    `
    ).join("");
  }

  // ==========================================================================
  // 8. Filter & Render Media Grid with GSAP Stagger Animation
  // ==========================================================================
  function filterAndRenderMedia() {
    filteredItems = MEDIA_ITEMS.filter((item) => {
      const matchesCategory =
        currentCategory === "all" || item.category === currentCategory;

      const matchesType =
        currentType === "all" || item.type === currentType;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.gear && item.gear.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesType && matchesSearch;
    });

    if (resultCountEl) {
      resultCountEl.innerHTML = `Toplam <strong>${filteredItems.length}</strong> eser gösteriliyor`;
    }

    if (filteredItems.length === 0) {
      mediaGrid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">&#9888;</div>
          <h3>Aradığınız kriterde medya bulunamadı</h3>
          <p style="color: var(--color-gray-400); margin-top: 8px;">
            Farklı bir kategori seçebilir veya arama teriminizi temizleyebilirsiniz.
          </p>
          <button class="btn btn-outline btn-sm" id="resetFilterBtn" style="margin-top: 20px;">
            Filtreleri Sıfırla
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("resetFilterBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentType = "all";
          searchQuery = "";
          if (searchInput) searchInput.value = "";
          if (searchClearBtn) searchClearBtn.style.display = "none";
          typeToggleBtns.forEach((b) =>
            b.classList.toggle("active", b.dataset.type === "all")
          );
          renderCategoryChips();
          filterAndRenderMedia();
        });
      }
      return;
    }

    mediaGrid.innerHTML = filteredItems
      .map((item, index) => {
        const isLiked = likedItems.includes(item.id);
        const categoryObj = CATALOG_CATEGORIES.find((c) => c.id === item.category);
        const categoryName = categoryObj ? categoryObj.name : item.category;

        return `
        <article class="media-card ${item.type === "video" ? "video-card" : ""}" data-id="${item.id}" data-index="${index}">
          <div class="media-preview-wrap">
            <img src="${item.thumbnail || item.src}" alt="${item.title}" class="media-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80';" />
            
            <div class="card-badge-top-left">
              <span class="category-tag">${categoryName}</span>
              <span class="type-indicator ${item.type}">
                ${item.type === "video" ? `&#9658; ${item.duration || "Video"}` : "Foto"}
              </span>
            </div>

            <button class="card-like-btn ${isLiked ? "liked" : ""}" data-id="${item.id}" title="Favorilere Ekle" aria-label="Favori">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            ${
              item.type === "video"
                ? `
              <div class="video-play-overlay">
                <div class="play-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            `
                : ""
            }
          </div>

          <div class="media-card-body">
            <h3 class="media-card-title">${item.title}</h3>
            <p class="media-card-desc">${item.description || ""}</p>
            <div class="media-card-meta">
              <span class="media-gear" title="${item.gear || ""}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                ${item.gear || item.resolution || "GOG Studio"}
              </span>
              <span>${item.date || "2026"}</span>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // GSAP Stagger Entrance for Cards
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".media-card",
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: {
            amount: 0.35,
            grid: "auto",
            from: "start"
          },
          ease: "power2.out"
        }
      );
    }

    // Card click events
    mediaGrid.querySelectorAll(".media-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-like-btn")) return;
        const index = parseInt(card.dataset.index, 10);
        openLightbox(index);
      });
    });

    // Like buttons
    mediaGrid.querySelectorAll(".card-like-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        toggleLike(id);
        const isNowLiked = likedItems.includes(id);
        btn.classList.toggle("liked", isNowLiked);
        const svg = btn.querySelector("svg");
        if (svg) svg.setAttribute("fill", isNowLiked ? "currentColor" : "none");

        // Micro-bounce with GSAP
        if (typeof gsap !== "undefined") {
          gsap.fromTo(btn, { scale: 1.3 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
        }
      });
    });
  }

  function toggleLike(id) {
    if (likedItems.includes(id)) {
      likedItems = likedItems.filter((i) => i !== id);
    } else {
      likedItems.push(id);
    }
    localStorage.setItem("gog_likes", JSON.stringify(likedItems));
  }

  // ==========================================================================
  // 9. Lightbox Modal Functionality (with Mobile Swipe & Smooth Open)
  // ==========================================================================
  function openLightbox(index) {
    if (index < 0 || index >= filteredItems.length) return;
    currentLightboxIndex = index;
    const item = filteredItems[index];

    // Counter
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${filteredItems.length}`;
    }

    // Media Viewer (Native Aspect Ratio & Fallback)
    if (item.type === "video") {
      lightboxMediaViewer.innerHTML = `
        <video controls autoplay loop playsinline webkit-playsinline preload="metadata" poster="${item.thumbnail || ''}" class="lightbox-video-elem">
          <source src="${item.src}" type="video/mp4">
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      `;

      const vid = lightboxMediaViewer.querySelector("video");
      if (vid) {
        vid.addEventListener("error", () => {
          lightboxMediaViewer.innerHTML = `
            <div class="media-load-error">
              <div class="load-error-icon">&#9658;</div>
              <p style="color: var(--color-white); font-weight: 600; margin-bottom: 6px;">Video Akışı Hazırlanıyor</p>
              <p style="color: var(--color-gray-400); font-size: 0.85rem; margin-bottom: 16px;">Videonun yüksek çözünürlüklü kopyasını doğrudan tarayıcıda açabilirsiniz.</p>
              <a href="${item.src}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Videoyu Yeni Sekmede Aç</a>
            </div>
          `;
        });
      }
    } else {
      lightboxMediaViewer.innerHTML = `
        <img src="${item.src}" alt="${item.title}" class="lightbox-img-elem" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85';" />
      `;
    }

    // Populate Sidebar Details
    const catObj = CATALOG_CATEGORIES.find((c) => c.id === item.category);
    lightboxCategory.textContent = catObj ? catObj.name : item.category;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description || "GOG Studio özel katalog çalışması.";
    lightboxGear.textContent = item.gear || "Belirtilmemiş";
    lightboxRes.textContent = item.resolution || (item.type === "video" ? "4K 60FPS Video" : "Yüksek Çözünürlük");
    lightboxLocation.textContent = item.location || "İstanbul / Studio";
    lightboxDate.textContent = item.date || "2026";

    // Tags
    if (item.tags && item.tags.length > 0) {
      lightboxTags.innerHTML = item.tags
        .map((t) => `<span class="tag-badge">#${t}</span>`)
        .join("");
    } else {
      lightboxTags.innerHTML = `<span class="tag-badge">#GOGStudio</span>`;
    }

    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();

    // GSAP Modal Pop
    if (typeof gsap !== "undefined" && lightboxContent) {
      gsap.fromTo(
        lightboxContent,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.2)" }
      );
    }
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxMediaViewer.innerHTML = "";
    document.body.style.overflow = "";
    if (lenis) lenis.start();
    currentLightboxIndex = -1;
  }

  function showNextLightbox() {
    if (currentLightboxIndex < filteredItems.length - 1) {
      openLightbox(currentLightboxIndex + 1);
    } else {
      openLightbox(0);
    }
  }

  function showPrevLightbox() {
    if (currentLightboxIndex > 0) {
      openLightbox(currentLightboxIndex - 1);
    } else {
      openLightbox(filteredItems.length - 1);
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", showNextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", showPrevLightbox);

  // Close when clicking modal backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextLightbox();
    if (e.key === "ArrowLeft") showPrevLightbox();
  });

  // Share button in lightbox
  if (lightboxShareBtn) {
    lightboxShareBtn.addEventListener("click", () => {
      const shareUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: "GOG STUDIO",
          text: "GOG STUDIO Fotoğraf & Video Kataloğunu İnceleyin",
          url: shareUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          const originalText = lightboxShareBtn.innerHTML;
          lightboxShareBtn.innerHTML = `<span>✓ Bağlantı Kopyalandı!</span>`;
          setTimeout(() => {
            lightboxShareBtn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  }

  // Touch Gestures on Lightbox (Swipe Left / Right / Down)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxModal.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }, { passive: true });
  }

  function handleLightboxSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > 45 && absX > absY) {
      if (deltaX < 0) {
        showNextLightbox(); // Swiped left
      } else {
        showPrevLightbox(); // Swiped right
      }
    } else if (deltaY > 80 && absY > absX) {
      closeLightbox(); // Swiped down
    }
  }

  // ==========================================================================
  // 10. Filter Bar Listeners
  // ==========================================================================
  typeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeToggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.dataset.type;
      filterAndRenderMedia();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery.length > 0 ? "block" : "none";
      }
      filterAndRenderMedia();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      searchClearBtn.style.display = "none";
      searchInput.focus();
      filterAndRenderMedia();
    });
  }

  // ==========================================================================
  // 11. Quick Add Modal & Code Generator
  // ==========================================================================
  function openQuickAdd() {
    if (quickAddModal) {
      quickAddModal.classList.add("active");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      updateCodeSnippet();
    }
  }

  function closeQuickAdd() {
    if (quickAddModal) {
      quickAddModal.classList.remove("active");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
  }

  if (openQuickAddBtn) openQuickAddBtn.addEventListener("click", openQuickAdd);
  if (heroAddBtn) heroAddBtn.addEventListener("click", openQuickAdd);
  if (closeQuickAddBtn) closeQuickAddBtn.addEventListener("click", closeQuickAdd);

  if (quickAddModal) {
    quickAddModal.addEventListener("click", (e) => {
      if (e.target === quickAddModal) closeQuickAdd();
    });
  }

  function updateCodeSnippet() {
    if (!quickAddForm || !codeSnippetOutput) return;
    const title = document.getElementById("addTitle").value || "Yeni Eser";
    const type = document.getElementById("addType").value || "photo";
    const category = document.getElementById("addCategory").value || "street";
    const src = document.getElementById("addSrc").value || "assets/media/ornek.jpg";
    const gear = document.getElementById("addGear").value || "Sony A7 IV";
    const desc = document.getElementById("addDesc").value || "Çekim açıklaması...";

    const sampleObj = {
      id: "gog-" + Date.now().toString().slice(-4),
      title: title,
      description: desc,
      category: category,
      type: type,
      src: src,
      thumbnail: src,
      date: new Date().toISOString().slice(0, 7),
      gear: gear,
      resolution: type === "video" ? "4K 60FPS" : "33MP RAW",
      location: "İstanbul, TR",
      tags: [category, type],
      featured: true
    };

    codeSnippetOutput.textContent = JSON.stringify(sampleObj, null, 2) + ",";
  }

  if (quickAddForm) {
    quickAddForm.addEventListener("input", updateCodeSnippet);

    const localFileInput = document.getElementById("addLocalFile");
    if (localFileInput) {
      localFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          document.getElementById("addSrc").value = blobUrl;
          document.getElementById("addTitle").value = file.name.replace(/\.[^/.]+$/, "");
          if (file.type.startsWith("video")) {
            document.getElementById("addType").value = "video";
          } else {
            document.getElementById("addType").value = "photo";
          }
          updateCodeSnippet();
        }
      });
    }

    quickAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("addTitle").value || "Yeni Eser";
      const type = document.getElementById("addType").value;
      const category = document.getElementById("addCategory").value;
      const src = document.getElementById("addSrc").value || "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80";
      const gear = document.getElementById("addGear").value || "Özel Kamera";
      const desc = document.getElementById("addDesc").value || "Yeni eklenen medya.";

      const newItem = {
        id: "user-" + Date.now(),
        title: title,
        description: desc,
        category: category,
        type: type,
        src: src,
        thumbnail: src,
        date: new Date().toISOString().slice(0, 7),
        gear: gear,
        resolution: "Custom",
        location: "Kişisel Arşiv",
        tags: ["Yeni", category],
        featured: true
      };

      MEDIA_ITEMS.unshift(newItem);
      filterAndRenderMedia();
      closeQuickAdd();
      alert("✅ Medya geçici olarak galeriye eklendi! Kalıcı olması için üretilen JSON kodunu 'js/media-data.js' dosyasına ekleyebilirsiniz.");
    });
  }

  if (copyCodeBtn && codeSnippetOutput) {
    copyCodeBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(codeSnippetOutput.textContent).then(() => {
        const origText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = "✓ Kopyalandı!";
        setTimeout(() => (copyCodeBtn.textContent = origText), 2000);
      });
    });
  }

  // ==========================================================================
  // 12. Mobile Bottom Bar Interactions with Lenis Scroll
  // ==========================================================================
  if (bNavHome) {
    bNavHome.addEventListener("click", (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  if (bNavCatalog) {
    bNavCatalog.addEventListener("click", (e) => {
      e.preventDefault();
      const catSec = document.getElementById("kataloglar");
      if (catSec) {
        if (lenis) {
          lenis.scrollTo(catSec);
        } else {
          catSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  if (bNavAdd) {
    bNavAdd.addEventListener("click", openQuickAdd);
  }

  if (bNavVideos) {
    bNavVideos.addEventListener("click", (e) => {
      e.preventDefault();
      currentType = "video";
      typeToggleBtns.forEach((b) => b.classList.toggle("active", b.dataset.type === "video"));
      filterAndRenderMedia();
      const catSec = document.getElementById("kataloglar");
      if (catSec) {
        if (lenis) {
          lenis.scrollTo(catSec);
        } else {
          catSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  if (bNavAbout) {
    bNavAbout.addEventListener("click", (e) => {
      e.preventDefault();
      const aboutSec = document.getElementById("ekipman");
      if (aboutSec) {
        if (lenis) {
          lenis.scrollTo(aboutSec);
        } else {
          aboutSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  function updateBottomNavActiveState() {
    const scrollPos = window.scrollY + 200;
    const catSec = document.getElementById("kataloglar");
    const aboutSec = document.getElementById("ekipman");

    const bottomItems = document.querySelectorAll(".bottom-nav-item");
    bottomItems.forEach((it) => it.classList.remove("active"));

    if (aboutSec && scrollPos >= aboutSec.offsetTop) {
      if (bNavAbout) bNavAbout.classList.add("active");
    } else if (catSec && scrollPos >= catSec.offsetTop) {
      if (currentType === "video" && bNavVideos) {
        bNavVideos.classList.add("active");
      } else if (bNavCatalog) {
        bNavCatalog.classList.add("active");
      }
    } else {
      if (bNavHome) bNavHome.classList.add("active");
    }
  }

  // ==========================================================================
  // Initial Boot
  // ==========================================================================
  renderCategoryChips();
  renderCuratedSeries();
  renderStudioGear();
  filterAndRenderMedia();
  initMotionSequences();
});

