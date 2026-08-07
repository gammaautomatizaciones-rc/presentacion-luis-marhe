/* GAMMA — Propuesta Megatienda Luis Marhe
   Lo único que hace: que las secciones aparezcan al scrollear.
   Sin librerías: se muestra desde una notebook, tiene que abrir aunque no haya internet. */

(function () {
  'use strict';

  var bloques = document.querySelectorAll('.card, .case, .price, .reco, .clientes');

  // Si el navegador no lo soporta, se ve todo de una: nunca queda contenido invisible.
  if (!('IntersectionObserver' in window)) return;

  Array.prototype.forEach.call(bloques, function (el) {
    el.classList.add('reveal');
  });

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      obs.unobserve(e.target);          // una sola vez por bloque
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(bloques, function (el) { obs.observe(el); });

  // Red de seguridad: si algo falla, a los 3 segundos se muestra todo igual.
  setTimeout(function () {
    Array.prototype.forEach.call(bloques, function (el) { el.classList.add('on'); });
  }, 3000);
})();
