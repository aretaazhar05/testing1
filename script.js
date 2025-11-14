const nomorWA = "6282146212007";

const produkList = [
      {
        nama: "Firetric Kotak Bungkus Rokok Elegan Aluminium Cigarette Case - YH006",
        harga: 14600,
        gambar: "../gambar/gambar produk/firetric-kotak-bungkus-rokok-elegan-aluminium-cigarette-case-yh006.jpg",
        deskripsi: "Warna: Hitam"
      },
      {
        nama: "TNS Asbak Rokok Cigar Ashtray Ash Stainless Steel - T9224",
        harga: 10000,
        gambar: "../gambar/gambar produk/asbak.jpg",
        deskripsi: "Warna: Hitam"
      },
      {
        nama: "Firetric FOCUS Kotak Rokok 20 Slot dengan Korek Elektrik Plasma - JD-YH093",
        harga: 25200,
        gambar: "../gambar/gambar produk/firetric-kotak-rokok-20-slot-dengan-korek-elektrik-pyrotechnic-yh093.jpg",
        deskripsi: "Material: Aluminium dan Plastik"
      },
      {
        nama: "TNS Asbak Rokok Cigar Ashtray Ash Stainless Steel - T9224",
        harga: 8800,
        gambar: "../gambar/gambar produk/tns-asbak-rokok-cigar-ashtray-ash-stainless-steel-t9224.jpg",
        deskripsi: "Material: Stainless Steel"
      },
      {
        nama: "Firetric Korek Api Elektrik Pulse Plasma Cross Double Arc Lighter - JL613-FD",
        harga: 50300,
        gambar: "../gambar/gambar produk/TNS Asbak Rokok Cigar Ashtray Ash Stainless Steel - T9224.jpg",
        deskripsi: "Material: Stainless Steel"
      }
    ];

const container = document.getElementById("product-list");
let cart = [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(nama, harga) {
  const exist = cart.find(p => p.nama === nama);
  if (exist) exist.qty++;
  else cart.push({ nama, harga, qty: 1 });

  updateCartCount();
}

function renderProduk() {
  container.innerHTML = "";

  produkList.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.gambar}" alt="${p.nama}">
        <div class="product-info">
          <h3>${p.nama}</h3>
          <p class="desc">${p.deskripsi}</p>
          <p class="price">Rp${p.harga.toLocaleString()}</p>

          <button class="add-cart-btn" onclick="addToCart('${p.nama}', ${p.harga})">+ Keranjang</button>

          <a class="order-btn"
            href="https://wa.me/${nomorWA}?text=Halo,%20saya%20ingin%20pesan%20${encodeURIComponent(p.nama)}"
            target="_blank">Pesan via WhatsApp</a>
        </div>
      </div>`;
  });
}

renderProduk();


// ========== POPUP KERANJANG ==========
document.getElementById("cart-float").onclick = () => {
  document.getElementById("cart-panel").style.display = "flex";
  renderCart();
};

document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-panel").style.display = "none";
};

function renderCart() {
  const panel = document.getElementById("cart-items");
  panel.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.harga * item.qty;

    panel.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.nama}</b><br>
          Rp${item.harga.toLocaleString()}
        </div>

        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${i})">✖</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = total.toLocaleString();
}

function changeQty(i, val) {
  cart[i].qty += val;
  if (cart[i].qty <= 0) cart.splice(i, 1);

  updateCartCount();
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCartCount();
  renderCart();
}

document.getElementById("checkout").onclick = () => {
  let text = "Halo, saya ingin memesan:%0A";

  cart.forEach((item, i) => {
    text += `${i+1}. ${item.nama} (${item.qty}x) - Rp${(item.harga * item.qty).toLocaleString()}%0A`;
  });

  window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
};
