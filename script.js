function showMenu() {
  const menuMobile = document.getElementById("menu-mobile");
  menuMobile.classList.toggle("div-hided");
  menuMobile.style.animationName = "animation";
  menuMobile.style.animationDuration = "400ms";
  menuMobile.style.animationFillMode = "forwards";
}

document.addEventListener("DOMContentLoaded", () => {
  const stickyWrapper = document.querySelector(".sticky-wrapper");
  const fullImage = document.querySelector(".layer-full-image");
  const mainTitle = document.querySelector(".main-title");
  const earthImage = document.querySelector(".layer-earth-sequence");

  // CONFIGURAÇÃO DOS FRAMES
  const frameCount = 30;
  const images = [];

  // --- 1. PRÉ-CARREGAMENTO COM ZERO À ESQUERDA ---
  function preloadImages() {
    for (let i = 1; i <= frameCount; i++) {
      // Começa em 1 e vai até 30
      const img = new Image();

      // Essa linha formata o número:
      // Se i for 1, vira "01". Se for 10, vira "10".
      const formattedIndex = i.toString().padStart(2, "0");

      // Caminho atualizado
      img.src = `images/globe-animation/${formattedIndex}.png`;

      images.push(img);
    }
  }
  preloadImages();

  function updateAnimation() {
    if (!stickyWrapper || !earthImage) return;

    const maxScroll = stickyWrapper.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY;

    let progress = scrollY / maxScroll;

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    if (window.innerWidth > 768) {
      // 1. Opacidade da Capa
      let imageOpacity = 1 - progress * 3.5;
      if (imageOpacity < 0) imageOpacity = 0;
      fullImage.style.opacity = imageOpacity;

      // 2. Opacidade do Título
      let titleOpacity = (progress - 0.3) * 2;
      if (titleOpacity < 0) titleOpacity = 0;
      if (titleOpacity > 1) titleOpacity = 1;
      mainTitle.style.opacity = titleOpacity;

      // --- 3. TERRA GIRANDO ---

      // Como seu array tem 30 imagens (índices 0 a 29), mapeamos o progress para isso
      const frameIndex = Math.floor(progress * (frameCount - 1));

      if (images[frameIndex]) {
        earthImage.src = images[frameIndex].src;
      }
    }
  }

  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateAnimation);
  });

  updateAnimation();
});
