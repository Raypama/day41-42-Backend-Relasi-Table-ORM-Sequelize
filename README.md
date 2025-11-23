----------------------------
FLOW CART
-----------------------------
1 USER  =  1 CART
1 CART  =  BANYAK CART ITEMS
1 CART ITEM = 1 PRODUCT + QUANTITY


🟣 7. Jadi Flow Data Kamu Sekarang:
🟩 Saat user add/update/remove item → yang berubah cuma cart_items
🟦 Saat ingin lihat data cart user → ambil 1 cart berdasarkan user_id
🟧 Saat ingin lihat semua cart (dev saja) → ambil semua carts

🛒 FLOW CART = 1 USER → 1 CART/ 1 cart - many cart items(qty,products_id)

🟢 Kenapa 1 user = 1 cart?
Karena:
Agar user punya “keranjang belanja” sendiri
Tidak bercampur dengan user lain
Bisa persist (tersimpan) walaupun logout
Semua operasi (add, update qty, delete item) fokus ke cart milik user itu sendiri
🔵 Yg berubah itu CART ITEMS, bukan CART

Ini sangat penting:
❌ Cart tidak berubah isinya, cuma identitas owner-nya (user_id)
✔ Cart Items yang berubah (nambah produk, kurangin qty, hapus produk)
Makanya ketika:
Tambah product → insert into cart_items
Update quantity → update cart_items
Hapus item → delete cart_items
Lihat cart → ambil dari cart lalu include cart_items