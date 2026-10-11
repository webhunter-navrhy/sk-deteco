// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám prosím e-mailom.'; });
    });
  });
})();
(function () {
  var b = document.querySelector('.burger'), m = document.getElementById('menu');
  if (!b || !m) return;
  b.addEventListener('click', function () { var o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!o)); document.body.classList.toggle('menu-otvorene', !o); });
  m.addEventListener('click', function (e) { if (e.target.tagName === 'A') { b.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-otvorene'); } });
  var it = document.querySelectorAll('.spis, .chronologia li, .clanky li');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vidno'); io.unobserve(e.target); } }); }, { threshold: 0.15 });
  document.documentElement.classList.add('js');
  it.forEach(function (x) { io.observe(x); });
})();
