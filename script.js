/* =========================================
   Vijayabhaskar V — Portfolio · script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Noise Canvas ── */
  const canvas = document.getElementById('noiseCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let frame = 0;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function drawNoise() {
      const w = canvas.width, h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i+1] = v; data[i+2] = v; data[i+3] = 18;
      }
      ctx.putImageData(imgData, 0, 0);
      frame++;
      if (frame % 3 === 0) requestAnimationFrame(drawNoise);
      else setTimeout(() => requestAnimationFrame(drawNoise), 80);
    }
    drawNoise();
  }

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    const hoverEls = document.querySelectorAll('a, button, .sk-card, .proj-card, .cert-card, .edu-card, .exp-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '16px'; cursor.style.height = '16px';
        ring.style.width = '52px'; ring.style.height = '52px';
        ring.style.borderColor = 'rgba(14,240,200,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px'; cursor.style.height = '8px';
        ring.style.width = '32px'; ring.style.height = '32px';
        ring.style.borderColor = 'rgba(14,240,200,0.35)';
      });
    });
  }

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── Hamburger ── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobMenu');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
  }));

  /* ── Scroll Reveal ── */
  const revEls = document.querySelectorAll('.reveal, .reveal-right');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revEls.forEach(el => revObs.observe(el));

  // Hero instant reveal
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal, .hero .reveal-right')
      .forEach(el => el.classList.add('visible'));
  }, 100);

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('.astat-n');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.t);
        let current = 0;
        const step = Math.max(1, target / 40);
        const id = setInterval(() => {
          current += step;
          if (current >= target) { e.target.textContent = target; clearInterval(id); }
          else e.target.textContent = Math.floor(current);
        }, 35);
        cntObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cntObs.observe(c));

  /* ── Active nav highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  const actObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + e.target.id)
            a.style.color = 'var(--text)';
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => actObs.observe(s));

});
