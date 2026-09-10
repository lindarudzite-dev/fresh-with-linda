/* ============================================
   FRESH WITH LINDA - SCRIPT
   ============================================ */

// Progress Bar
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progressBar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Product toggle details
document.querySelectorAll('.product-toggle').forEach(button => {
  button.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    
    const details = this.nextElementSibling;
    if (details && details.classList.contains('product-details')) {
      if (isExpanded) {
        details.hidden = true;
      } else {
        details.hidden = false;
      }
    }
  });
});

// FAQ accordion (details elements handle this natively, but we can enhance)
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('summary');
  if (summary) {
    summary.addEventListener('click', function(e) {
      // Close other open details
      document.querySelectorAll('.faq-item[open]').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.removeAttribute('open');
        }
      });
    });
  }
});

// Fade in elements on scroll (for story chapters)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.story-chapter').forEach(chapter => {
  observer.observe(chapter);
});

// Keyboard accessibility for buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

// Mobile menu accessibility (if needed)
document.addEventListener('keydown', function(e) {
  // Escape key to close any open details
  if (e.key === 'Escape') {
    document.querySelectorAll('.faq-item[open]').forEach(item => {
      item.removeAttribute('open');
    });
  }
});

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
}
