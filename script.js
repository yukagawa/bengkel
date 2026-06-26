document.addEventListener('DOMContentLoaded', () => {
    const calcForm = document.getElementById('calc-form');
    const estimasiHasil = document.getElementById('estimasi-hasil');
    const textEstimasi = document.getElementById('text-estimasi');
    const btnPesanWa = document.getElementById('btn-pesan-wa');
    const layananSelect = document.getElementById('layanan-select');

    // Harga standar per meter persegi (bisa diubah sesuai harga Ayah)
    const harga = {
        kanopi: 350000,
        pagar: 400000,
        terali: 250000
    };

    let currentOrder = null;

    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const layanan = layananSelect.value;
        const namaLayanan = layananSelect.options[layananSelect.selectedIndex].text.split('(')[0].trim();
        const panjang = parseFloat(document.getElementById('panjang').value) || 0;
        const lebar = parseFloat(document.getElementById('lebar').value) || 0;
        
        // Perhitungan: Luas x Harga per meter
        let luas = panjang * lebar;
        let total = luas * harga[layanan];
        
        // Tampilkan hasil di layar
        textEstimasi.innerHTML = `
            Estimasi biaya untuk <strong>${namaLayanan}</strong><br>
            <span class="text-sm text-gray-400">Ukuran: ${panjang}m x ${lebar}m (Total Luas: ${luas} m²)</span><br>
            <span class="text-3xl font-extrabold text-primary mt-3 mb-2 block">Rp ${total.toLocaleString('id-ID')}</span>
            <p class="text-xs text-gray-500 bg-dark/50 p-2 rounded inline-block">
                <i class="fa-solid fa-info-circle text-primary"></i> Harga ini adalah perkiraan kasar. Harga pasti dan akurat akan diberikan setelah Ayah melakukan survey lokasi dan memilih ketebalan material.
            </p>
        `;
        
        // Munculkan hasil dengan animasi
        estimasiHasil.classList.remove('hidden');
        estimasiHasil.classList.add('fade-in');
        
        // Simpan data untuk dikirim ke WA
        currentOrder = {
            namaLayanan,
            panjang,
            lebar,
            luas,
            total
        };
    });

    btnPesanWa.addEventListener('click', () => {
        if(!currentOrder) return;
        
        // TODO: Ganti dengan nomor WhatsApp Ayah (gunakan format 62 tanpa + atau 0)
        const waNumber = '6281234567890'; 
        
        const message = `Halo Bengkel Las Mandiri, saya melihat website Anda dan tertarik menjadwalkan *SURVEY LOKASI GRATIS*.

*Data Estimasi Awal dari Website:*
🛠️ Layanan: ${currentOrder.namaLayanan}
📐 Ukuran Kasar: ${currentOrder.panjang}m x ${currentOrder.lebar}m (${currentOrder.luas} m²)
💰 Estimasi Biaya: Rp ${currentOrder.total.toLocaleString('id-ID')}

Tolong beri tahu saya kapan Ayah/Teknisi bisa datang untuk mengukur pasti dan berdiskusi bahan. Terima kasih!`;

        const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`;
        
        // Buka WhatsApp di tab baru
        window.open(waUrl, '_blank');
    });
});
