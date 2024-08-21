document.addEventListener('DOMContentLoaded', () => {
    const siswaForm = document.getElementById('siswaForm');
    const namaInput = document.getElementById('nama');
    const kelasInput = document.getElementById('kelas');
    const tanggalMulaiInput = document.getElementById('tanggalMulai');
    const tanggalBerakhirInput = document.getElementById('tanggalBerakhir');
    const siswaContainer = document.getElementById('siswaContainer');
    const editIndexInput = document.getElementById('editIndex');

    function renderList() {
        siswaContainer.innerHTML = '';
        let siswa = JSON.parse(localStorage.getItem('siswa')) || [];
        
        // Validasi data siswa
        if (!Array.isArray(siswa)) {
            siswa = [];
        }
        
        siswa.forEach((item, index) => {
            // Validasi item
            if (item && typeof item === 'object' && 'nama' in item && 'kelas' in item && 'tanggalMulai' in item && 'tanggalBerakhir' in item) {
                const card = document.createElement('div');
                card.className = 'card';
                
                const nama = document.createElement('h3');
                nama.textContent = `Nama: ${item.nama}`;
                card.appendChild(nama);
                
                const kelas = document.createElement('p');
                kelas.textContent = `Kelas: ${item.kelas}`;
                card.appendChild(kelas);
                
                const tanggalMulai = document.createElement('p');
                tanggalMulai.textContent = `Tanggal Mulai: ${item.tanggalMulai}`;
                card.appendChild(tanggalMulai);

                const tanggalBerakhir = document.createElement('p');
                tanggalBerakhir.textContent = `Tanggal Berakhir: ${item.tanggalBerakhir}`;
                card.appendChild(tanggalBerakhir);

                const actions = document.createElement('div');
                actions.className = 'actions';
                
                const editLink = document.createElement('a');
                editLink.href = '#';
                editLink.textContent = 'Edit ';
                editLink.onclick = () => {
                    editSiswa(index);
                    return false; // Prevent default link behavior
                };

                actions.appendChild(editLink);
                
                const deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = ' Hapus';
                deleteLink.onclick = () => {
                    deleteSiswa(index);
                    return false; // Prevent default link behavior
                };
                actions.appendChild(deleteLink);
                
                card.appendChild(actions);
                siswaContainer.appendChild(card);
            }
        });
    }

    function addSiswa(nama, kelas, tanggalMulai, tanggalBerakhir) {
        let siswa = JSON.parse(localStorage.getItem('siswa')) || [];
        siswa.push({ nama, kelas, tanggalMulai, tanggalBerakhir });
        localStorage.setItem('siswa', JSON.stringify(siswa));
        renderList();
    }

    function deleteSiswa(index) {
        let siswa = JSON.parse(localStorage.getItem('siswa')) || [];
        siswa.splice(index, 1);
        localStorage.setItem('siswa', JSON.stringify(siswa));
        renderList();
    }

    function editSiswa(index) {
        let siswa = JSON.parse(localStorage.getItem('siswa')) || [];
        const item = siswa[index];
        if (item) {
            namaInput.value = item.nama;
            kelasInput.value = item.kelas;
            tanggalMulaiInput.value = item.tanggalMulai;
            tanggalBerakhirInput.value = item.tanggalBerakhir;
            editIndexInput.value = index;
        }
    }

    siswaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nama = namaInput.value;
        const kelas = kelasInput.value;
        const tanggalMulai = tanggalMulaiInput.value;
        const tanggalBerakhir = tanggalBerakhirInput.value;
        const editIndex = editIndexInput.value;

        if (editIndex !== '') {
            let siswa = JSON.parse(localStorage.getItem('siswa')) || [];
            if (siswa[editIndex]) {
                siswa[editIndex] = { nama, kelas, tanggalMulai, tanggalBerakhir };
                localStorage.setItem('siswa', JSON.stringify(siswa));
                editIndexInput.value = '';
            }
        } else {
            addSiswa(nama, kelas, tanggalMulai, tanggalBerakhir);
        }

        namaInput.value = '';
        kelasInput.value = '';
        tanggalMulaiInput.value = '';
        tanggalBerakhirInput.value = '';
        renderList();
    });

    renderList();
});
