/* =============================================
   NEW SUPER STORE — script.js
   ============================================= */

// 1. NAVBAR — shadow on scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 2. MOBILE MENU — toggle open/close
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// 3. SCROLL REVEAL — animate elements into view
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

// 4. PRODUCTS DATA
const products = [
  { emoji: '🌾', name: 'Staple Groceries',      desc: 'Atta, rice, dal, cooking oils, salt, sugar, spices and all your kitchen essentials.',                         tag: 'Daily Staples', cat: 'food' },
  { emoji: '🍪', name: 'Biscuits & Cookies',     desc: 'Britannia, Parle-G, Hide & Seek, Sunfeast, Oreo, Digestive — every variety you love.',                       tag: 'Snacks',        cat: 'food' },
  { emoji: '🍜', name: 'Instant Noodles',         desc: 'Sunfeast YiPPee!, Maggi, Wai Wai and more. Multiple flavours and pack sizes available.',                     tag: 'Snacks',        cat: 'food' },
  { emoji: '🥣', name: 'Breakfast Cereals',       desc: "Kellogg's Corn Flakes, Special K, Bagrrys, Muesli, Oats and granola for healthy mornings.",                 tag: 'Breakfast',     cat: 'food' },
  { emoji: '🧆', name: 'Namkeen & Snacks',        desc: 'Local and branded namkeen, Lite Chiwda, roasted nuts, makhana, chana, and much more.',                      tag: 'Snacks',        cat: 'food' },
  { emoji: '🍫', name: 'Chocolates & Sweets',     desc: 'Cadbury, 5-Star, Dairy Milk, chikki, candy, and assorted confectionery for all ages.',                      tag: 'Confectionery', cat: 'food' },
  { emoji: '🍞', name: 'Bread & Bakery',          desc: 'Daily fresh stock of Modern, Harvest Gold and Britannia bread, pav, pizza bases and buns.',                 tag: 'Fresh Daily',   cat: 'food' },
  { emoji: '🥚', name: 'Eggs & Dairy',            desc: 'Cage-free eggs, packaged milk, butter, ghee, curd and cheese always in stock.',                             tag: 'Fresh Daily',   cat: 'food' },
  { emoji: '🧃', name: 'Packaged Juices',         desc: 'Real, Tropicana, B Natural in multiple flavours. Cold-pressed and fortified options too.',                   tag: 'Beverages',     cat: 'drinks' },
  { emoji: '💧', name: 'Water & Soft Drinks',     desc: 'Bisleri, Kinley, Pepsi, Coca-Cola, 7Up, Mountain Dew, Sprite — chilled and ready to go.',                   tag: 'Beverages',     cat: 'drinks' },
  { emoji: '⚡', name: 'Energy & Health Drinks',  desc: 'Red Bull, Sting, Complan, Horlicks, Boost, Bournvita — fuel for every age and need.',                       tag: 'Beverages',     cat: 'drinks' },
  { emoji: '☕', name: 'Tea, Coffee & More',      desc: 'Nescafé, BRU, Taj Mahal, Tata Tea, Darjeeling blends, and herbal infusions.',                               tag: 'Beverages',     cat: 'drinks' },
  { emoji: '🧹', name: 'Cleaning Supplies',       desc: 'Surf Excel, Ariel, Vim, Colin, Lizol, Scotch-Brite — everything for a clean home.',                         tag: 'Household',     cat: 'home' },
  { emoji: '🧻', name: 'Paper & Tissue',          desc: 'Daffodil, Paseo, branded tissue rolls, kitchen towels and paper products of all kinds.',                    tag: 'Household',     cat: 'home' },
  { emoji: '🪣', name: 'Storage & Kitchenware',   desc: 'Plastic cups, containers, bowls, cutlery and a variety of household utility items.',                         tag: 'Household',     cat: 'home' },
  { emoji: '🩹', name: 'Health & First Aid',      desc: 'Band-aids, antiseptics, basic OTC medicines, glucose, and wellness supplements.',                            tag: 'Health',        cat: 'home' },
  { emoji: '🪒', name: 'Shaving & Grooming',      desc: 'Gillette, Park Avenue, Old Spice — razors, shaving foam, aftershave and deodorants.',                       tag: 'Personal Care', cat: 'care' },
  { emoji: '🧴', name: 'Skincare & Haircare',     desc: 'Pantene, Head & Shoulders, Dove, Himalaya — shampoos, conditioners, lotions and creams.',                   tag: 'Personal Care', cat: 'care' },
  { emoji: '🦷', name: 'Dental Care',             desc: 'Colgate, Oral-B, Dabur Red, Pepsodent — toothpastes, brushes, mouthwash and floss.',                        tag: 'Personal Care', cat: 'care' },
  { emoji: '🔋', name: 'Electronics & Batteries', desc: 'Duracell, Panasonic batteries, mobile accessories, earphones and small electronics.',                        tag: 'Misc',          cat: 'home' },
];

// 5. BRANDS DATA
const brands = [
  'Parle-G', 'Britannia', 'Nestlé', "Kellogg's", 'ITC Sunfeast',
  'Dabur Real', 'Tropicana', 'Pepsi', 'Coca-Cola', 'Bisleri',
  'Red Bull', 'Surf Excel', 'Ariel', 'Gillette', 'Colgate',
  'Pantene', 'Dove', 'Himalaya', 'Cadbury', 'Bagrrys',
  'Duracell', 'Horlicks', 'Maggi', 'Paytm Accepted'
];

// 6. RENDER PRODUCTS
function renderProducts(category) {
  category = category || 'all';
  const grid = document.getElementById('productsGrid');
  const filtered = (category === 'all')
    ? products
    : products.filter(function (p) { return p.cat === category; });

  grid.innerHTML = filtered.map(function (p) {
    return (
      '<div class="product-card reveal">' +
        '<span class="product-emoji">' + p.emoji + '</span>' +
        '<h4>' + p.name + '</h4>' +
        '<p>' + p.desc + '</p>' +
        '<span class="product-tag">' + p.tag + '</span>' +
      '</div>'
    );
  }).join('');

  grid.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
}

// 7. FILTER PRODUCTS — called by filter buttons
function filterProducts(category, clickedBtn) {
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });
  clickedBtn.classList.add('active');
  renderProducts(category);
}

// 8. RENDER BRANDS
function renderBrands() {
  document.getElementById('brandsRow').innerHTML = brands.map(function (brand) {
    return '<span class="brand-chip">' + brand + '</span>';
  }).join('');
}

// 9. CONTACT FORM — handle submission
function submitForm() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();

  if (!name || !phone) {
    alert('Please fill in your name and phone number before sending.');
    return;
  }

  document.getElementById('successMsg').style.display = 'block';
  document.getElementById('fname').value  = '';
  document.getElementById('fphone').value = '';
  document.getElementById('fmsg').value   = '';
  document.getElementById('ftype').selectedIndex = 0;
}

// 10. INITIALISE on page load
document.addEventListener('DOMContentLoaded', function () {
  renderProducts('all');
  renderBrands();
});
