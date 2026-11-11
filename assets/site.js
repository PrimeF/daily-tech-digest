// Tech Digest: section index, keyboard paging, archive filter.
(function () {
  var prose = document.querySelector('.prose');

  if (prose) {
    var headings = Array.prototype.slice.call(prose.querySelectorAll('h2[id]'));

    // Drop template labels such as "(NEW SECTION)" from headings.
    headings.forEach(function (h) {
      h.textContent = h.textContent.replace(/\s*\(new section\)\s*$/i, '');
    });

    // Group the Top Stories section into a highlighted panel.
    var top = headings.find(function (h) { return /^top stories/i.test(h.textContent.trim()); });
    if (top) {
      var panel = document.createElement('div');
      panel.className = 'top-stories';
      var node = top.nextElementSibling;
      while (node && node.tagName !== 'H2') {
        var next = node.nextElementSibling;
        panel.appendChild(node);
        node = next;
      }
      top.after(panel);
    }

    // Scrollable wrapper for wide tables.
    prose.querySelectorAll('table').forEach(function (t) {
      var w = document.createElement('div');
      w.className = 'table-scroll';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });

    // External links open in a new tab.
    prose.querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (a.host !== location.host) { a.target = '_blank'; a.rel = 'noopener'; }
    });

    // Section index with the active section highlighted.
    var toc = document.getElementById('toc');
    if (toc && headings.length) {
      var links = {};
      headings.forEach(function (h) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/\s*\(.*\)\s*$/, '').trim();
        li.appendChild(a);
        toc.appendChild(li);
        links[h.id] = a;
      });

      var setActive = function (id) {
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === id); });
        var a = links[id];
        if (a && toc.scrollWidth > toc.clientWidth) {
          toc.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
        }
      };

      var onScroll = function () {
        var current = headings[0].id;
        var offset = window.innerHeight * 0.25;
        headings.forEach(function (h) { if (h.getBoundingClientRect().top < offset) current = h.id; });
        setActive(current);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else if (toc) {
      toc.closest('.toc').hidden = true;
    }
  }

  // Left / right arrow keys move between days.
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    var rel = e.key === 'ArrowLeft' ? 'prev' : e.key === 'ArrowRight' ? 'next' : null;
    var link = rel && document.querySelector('.day-nav a[rel="' + rel + '"]');
    if (link) location.href = link.href;
  });

  // Archive keyword filter.
  var filter = document.getElementById('filter');
  if (filter) {
    var days = Array.prototype.slice.call(document.querySelectorAll('.day'));
    var months = Array.prototype.slice.call(document.querySelectorAll('.month'));
    var none = document.getElementById('no-results');
    filter.addEventListener('input', function () {
      var terms = filter.value.toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      days.forEach(function (d) {
        var text = d.dataset.text + ' ' + d.textContent.toLowerCase();
        var match = terms.every(function (t) { return text.indexOf(t) !== -1; });
        d.hidden = !match;
        if (match) shown++;
      });
      months.forEach(function (m) { m.hidden = !m.querySelector('.day:not([hidden])'); });
      none.hidden = shown > 0 || !days.length;
    });
  }
})();
