const panel = document.querySelector('.cart-panel');
const trigger = document.querySelector('.cart-trigger');
const backdrop = document.querySelector('.cart-backdrop');
const list = document.querySelector('.cart-items');
let cart = [];
try { cart = JSON.parse(localStorage.getItem('delos90-demo-cart') || '[]'); if (!Array.isArray(cart)) cart = []; } catch { cart = []; }
const money = n => '$' + n.toLocaleString('es-CL');
function render() {
  list.replaceChildren();
  if (!cart.length) { const empty = document.createElement('p'); empty.className = 'cart-empty'; empty.textContent = 'Tu carrito está vacío. Encuentra algo que te guste en el archivo.'; list.append(empty); }
  cart.forEach((item, index) => {
    const row = document.createElement('div'); row.className = 'cart-row';
    const img = document.createElement('img'); img.src = item.image; img.alt = '';
    const details = document.createElement('div'); const name = document.createElement('strong'); name.textContent = item.name;
    const info = document.createElement('p'); info.textContent = `Cantidad: ${item.quantity} · Precio de ejemplo`;
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-item'; remove.textContent = 'Quitar'; remove.setAttribute('aria-label', `Quitar ${item.name}`); remove.addEventListener('click', () => { cart.splice(index, 1); save(); });
    details.append(name, info, remove); const price = document.createElement('strong'); price.textContent = money(item.price * item.quantity); row.append(img, details, price); list.append(row);
  });
  document.querySelector('.cart-count').textContent = cart.reduce((n, item) => n + item.quantity, 0);
  document.querySelector('.cart-total strong').textContent = money(cart.reduce((n, item) => n + item.price * item.quantity, 0));
}
function save() { try { localStorage.setItem('delos90-demo-cart', JSON.stringify(cart)); } catch {} render(); }
function setOpen(open) { panel.classList.toggle('open', open); panel.inert = !open; panel.setAttribute('aria-hidden', String(!open)); trigger.setAttribute('aria-expanded', String(open)); backdrop.hidden = !open; document.body.classList.toggle('cart-open', open); if (open) document.querySelector('.cart-close').focus(); else trigger.focus(); }
trigger.addEventListener('click', () => setOpen(true)); document.querySelector('.cart-close').addEventListener('click', () => setOpen(false)); backdrop.addEventListener('click', () => setOpen(false)); document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
document.querySelectorAll('.add-cart').forEach(button => button.addEventListener('click', () => { const {name, price, image} = button.dataset; const item = cart.find(p => p.name === name); if (item) item.quantity++; else cart.push({name, price: Number(price), image, quantity: 1}); save(); setOpen(true); })); render();
