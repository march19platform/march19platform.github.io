---
layout: layouts/base.njk
title: 500th Day
permalink: /500th-day/
---

<style>
  .pdf-viewer-wide { max-width: min(1500px, 95vw); margin-left: auto; margin-right: auto; }
  .pdf-viewer-wide .pdf-canvas-container { max-height: none; }
  .pdf-viewer-wide .pdf-canvas { max-height: none; }
</style>
<div class="container">
<section class="section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    500th Day
  </h2>
  <div class="pdf-viewer pdf-viewer-wide" id="pdf-container" data-pdf-url="/assets/500th-day.pdf">
    <div class="pdf-canvas-container">
      <canvas class="pdf-canvas"></canvas>
    </div>
    <div class="pdf-controls">
      <button class="pdf-nav-btn" id="pdf-prev" disabled>&larr; Prev</button>
      <span class="pdf-page-info">Page <span id="pdf-page-num">1</span> of <span id="pdf-page-count">-</span></span>
      <button class="pdf-nav-btn" id="pdf-next">Next &rarr;</button>
    </div>
  </div>
  <a href="/assets/500th-day.pdf" class="ada-download-link" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
    Download PDF
  </a>
</section>
</div>
