const fotoProfil = document.querySelector('.foto-profil');
fotoProfil.style.opacity = 0;
fotoProfil.addEventListener('mouseover', () => {
	fotoProfil.style.transform = 'scale(1.05)';
});

fotoProfil.addEventListener('mouseout', () => {
	fotoProfil.style.transform = 'scale(1)';
});

const judulUtama = document.querySelector('.judul-main');
judulUtama.style.opacity = 0;
judulUtama.style.transform = 'translateX(20px)';
window.addEventListener('load', () => {
	fotoProfil.style.transition = 'opacity 0.5s ease, transform 0.2s ease';
	judulUtama.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

	setTimeout(() => {
		fotoProfil.style.opacity = 1;
		judulUtama.style.opacity = 1;
		judulUtama.style.transform = 'translateY(0)';
	}, 500);
});

const daftarPendidikan = document.querySelectorAll('ul li');
daftarPendidikan.forEach((item, index) => {
	item.style.opacity = 0;
	item.style.transform = 'translateX(20px)';
	item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

	setTimeout(() => {
		item.style.opacity = 1;
		item.style.transform = 'translateX(0)';
	}, 500 + index * 200);
});