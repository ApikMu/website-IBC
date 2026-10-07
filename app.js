if (document.getElementById('home-page')) {
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = btn.querySelector('i');

function closeMobileMenu() {
    menu.classList.add('hidden');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
    btn.setAttribute('aria-label', 'Buka menu');
    btn.setAttribute('aria-expanded', 'false');
}

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        closeMobileMenu();
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        btn.setAttribute('aria-label', 'Tutup menu');
        btn.setAttribute('aria-expanded', 'true');
    }
});

const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

const aboutMenus = document.querySelectorAll('nav details');

aboutMenus.forEach((aboutMenu) => {
    const summary = aboutMenu.querySelector('summary');
    summary.addEventListener('click', (event) => {
        event.preventDefault();
        aboutMenus.forEach((menuItem) => {
            if (menuItem !== aboutMenu) {
                menuItem.open = false;
            }
        });
        aboutMenu.open = !aboutMenu.open;
    });
});

document.querySelectorAll('nav details a').forEach((link) => {
    link.addEventListener('click', () => {
        link.closest('details').open = false;
        closeMobileMenu();
    });
});

document.querySelectorAll('#mobile-menu > div > a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target)) {
        aboutMenus.forEach((aboutMenu) => {
            aboutMenu.open = false;
        });
        closeMobileMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
        aboutMenus.forEach((aboutMenu) => {
            aboutMenu.open = false;
        });
    }
});

const registrationOpenPanel = document.getElementById('registration-open');
const registrationCountdown = document.getElementById('registration-countdown');
const registrationFormUrl = 'https://forms.gle/YDPu7SjbzVjGaeqj6';

function updateRegistrationState() {
    const now = new Date();
    const year = now.getFullYear();
    const openingDate = new Date(year, 9, 15);
    const closingDate = new Date(year, 11, 1);
    const isOpen = now >= openingDate && now < closingDate;
    const target = isOpen ? registrationFormUrl : 'pendaftaran/pendaftaran.html';

    registrationOpenPanel.classList.toggle('hidden', !isOpen);
    document.querySelectorAll('a[href="#pendaftaran"]').forEach((link) => {
        link.href = target;
        if (isOpen) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else {
            link.removeAttribute('target');
            link.removeAttribute('rel');
        }
    });

    if (isOpen) {
        const remaining = closingDate - now;
        const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        registrationCountdown.textContent = `${days} hari ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const nextStateChange = isOpen
        ? closingDate
        : now < openingDate
            ? openingDate
            : new Date(year + 1, 9, 15);
    const nextUpdate = isOpen
        ? 1000
        : Math.min(nextStateChange - now, 2147483647);
    window.setTimeout(updateRegistrationState, Math.max(1000, nextUpdate));
}

updateRegistrationState();
document.querySelectorAll('.current-year').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

const hero = document.getElementById('home');
const canUseHeroPointerEffect = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

if (canUseHeroPointerEffect.matches) {
    hero.addEventListener('pointermove', (event) => {
        const bounds = hero.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;
        const horizontalShift = (horizontalPosition - 0.5) * 12;
        const verticalShift = (verticalPosition - 0.5) * 8;

        hero.classList.add('is-pointer-active');
        hero.style.setProperty('--hero-pointer-x', `${horizontalPosition * 100}%`);
        hero.style.setProperty('--hero-pointer-y', `${verticalPosition * 100}%`);
        document.getElementById('hero-photo').style.translate = `${-horizontalShift}px ${-verticalShift}px`;
        document.getElementById('hero-left-photo').style.translate = `${horizontalShift}px ${verticalShift}px`;
    });

    hero.addEventListener('pointerleave', () => {
        hero.classList.remove('is-pointer-active');
        hero.style.removeProperty('--hero-pointer-x');
        hero.style.removeProperty('--hero-pointer-y');
        document.getElementById('hero-photo').style.removeProperty('translate');
        document.getElementById('hero-left-photo').style.removeProperty('translate');
    });
}
}

if (document.getElementById('detail-content')) {
    const pageRoot = '../';

    const contentMap = {
      profil: {
        title: 'Profil UKM IBC',
        subtitle: 'Dokumentasi singkat tentang visi, misi, dan ruang gerak organisasi dalam membangun semangat serta prestasi.',
        items: [
          {
            type: 'text',
            value: 'UKM IKOPIN BADMINTON CLUB adalah wadah bagi mahasiswa untuk menyalurkan minat dan bakat di bidang bulutangkis. Organisasi ini berperan sebagai ruang pengembangan skill, karakter, dan sportivitas dalam lingkungan kampus.'
          },
          {
            type: 'list',
            title: 'Visi',
            list: [
              'Menjadi unit kegiatan mahasiswa badminton yang unggul, aktif, dan berprestasi di lingkungan kampus maupun ajang eksternal.',
              'Menciptakan lingkungan yang mendukung tumbuhnya semangat belajar, disiplin, dan inovasi.'
            ]
          },
          {
            type: 'list',
            title: 'Misi',
            list: [
              'Mengembangkan kemampuan teknik dan strategi bermain badminton secara berkelanjutan.',
              'Membina sportivitas, kebersamaan, dan semangat kerja sama di antara anggota.',
              'Mendorong setiap anggota untuk aktif berprestasi dan menjaga nama baik organisasi.'
            ]
          },
          {
            type: 'gallery',
            title: 'Dokumentasi utama',
            images: [
              'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0069.webp',
              'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0087.webp',
              'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0093.webp'
            ]
          }
        ]
      },
      program: {
        title: 'Program Kerja UKM IBC',
        subtitle: 'Dokumentasi program organisasi yang menjadi fokus utama dalam menjaga keberlangsungan dan perkembangan UKM.',
        items: [
          {
            type: 'text',
            value: 'Program kerja UKM IBC disusun untuk menjaga kontinuitas aktivitas organisasi dan mendorong anggota aktif berkembang dalam pembinaan, kompetisi, dan kebersamaan.'
          },
          {
            type: 'list',
            title: 'Turnamen Eksternal',
            list: [
              'Mengadakan kompetisi dengan sasaran SMA/SMK/MAN sederajat dengan cakupan wilayah se-Jawa Barat.',
              'Membuka kolaborasi sekaligus branding kampus IKOPIN UNIVERSITY.',
              'Meningkatkan wawasan serta ide pengurus melalui pengelolaan teknis berskala regional.'
            ]
          },
          {
            type: 'list',
            title: 'Pengukuhan',
            list: [
              'Menjadi momen penting pembukaan pendaftaran anggota baru dan pemeriksaan komitmen organisasi.',
              'Membentuk Karakter dan jiwa kepemimpinan anggota serta menyatukan komitmen dalam satu semangat kebersamaan.',
              'Memperkenalkan UKM IBC kepada anggota demi keselarasan.'
            ]
          },
          {
            type: 'list',
            title: 'Musyawarah Anggota',
            list: [
              'Forum musyawarah sekaligus pemegang kedaulatan tertinggi di dalam UKM IBC.',
              'Forum menjadi ruang demokrasi di mana seluruh anggota memiliki hak suara untuk mengevaluasi kinerja organisasi, menyampaikan aspirasi, dan merumuskan kebijakan strategis untuk periode kepengurusan selanjutnya.',
              'Momen terlantiknya ketua umum baru, sekaligus menjadi ruang transparansi bagi seluruh anggota untuk meninjau proyeksi visi, gagasan, dan arah gerak kepemimpinan IBC ke depannya.'
            ]
          }
        ]
      },
      kegiatan: {
        title: 'Kegiatan UKM IBC',
        subtitle: 'Dokumentasi kegiatan yang membangun solidaritas, semangat berlatih, dan pengalaman bersama para anggota.',
        items: [
          {
            type: 'text',
            value: 'Kegiatan UKM IBC dirancang agar tidak hanya fokus pada latihan, tetapi juga membangun kebersamaan, hubungan sosial, dan pengalaman berharga yang memperkuat ikatan antaranggota.'
          },
          {
            type: 'list',
            title: 'Bukber',
            list: [
              'Menjadi momentum kebersamaan antar anggota dalam suasana santai.',
              'Mempererat hubungan dan membangun ikatan harmonis.'
            ]
          },
          {
            type: 'list',
            title: 'Gathering',
            list: [
              'Menjadi wadah persatuan kembali arah tujuan organisasi.',
              'Pendekatan individu anggota guna persatuan chemistry.'
            ]
          },
          {
            type: 'list',
            title: 'Latihan Rutin',
            list: [
              'Latihan terjadwal dengan fokus pada teknik, stamina, dan konsistensi performa.',
              'Membentuk anggota yang disiplin, kuat, dan siap menghadapi kompetisi.'
            ]
          },
          {
            type: 'list',
            title: 'Persahabatan',
            list: [
              'Memperluas jaringan sportivitas dan menjalin rasa solidaritas melalui kegiatan bersama.',
              'Menjadi sarana pembelajaran dan kolaborasi antar organisasi.'
            ]
          },
          {
            type: 'list',
            title: 'Sparing Ranking',
            list: [
              'Latihan tanding terstruktur untuk menilai perkembangan dan membangun kesiapan kompetisi.',
              'Mendorong semangat berkompetisi secara sehat dan profesional.',
              'Memantau perkembangan kemampuan anggota'
              
            ]
          }
        ]
      },
      struktur: {
        title: 'Struktur Kepengurusan 2025-2026\nIKOPIN BADMINTON CLUB',
        subtitle: 'Susunan Badan Pengurus Harian dan Divisi Periode 2025-2026 UKM IBC.',
        items: [
          {
            type: 'structure',
            groups: [
              {
                title: 'Badan Pengurus Harian',
                positions: ['Ketua Umum', 'Wakil Ketua Umum', 'Sekretaris Umum', 'Sekretaris 1', 'Bendahara Umum', 'Bendahara 1']
              },
              { title: 'Divisi SDM', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5', 'Anggota 6'] },
              { title: 'Divisi Humas', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5'] },
              { title: 'Divisi Media Kreatif & Design', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5'] },
              { title: 'Divisi Kepelatihan', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5'] },
              { title: 'Divisi Lapangan', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4'] },
              { title: 'Divisi RTO', positions: ['Koordinator', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4'] }
            ]
          }
        ]
      }
    };

    const documentationMap = {
      program: {
        turnamen: {
          title: 'Dokumentasi Turnamen Eksternal',
          images: [
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/WhatsApp Image 2026-09-27 at 20.09.20.jpeg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/1. IMG_3520.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/1. IMG_7953.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/2. IMG_3503.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/2. IMG_7735.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2028.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2050.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2066.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2073.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2104.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_2117.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7809.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7810.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7832.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7849.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7882.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7887.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7901.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/IMG_7957.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/4. IMG_4173.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/4. IMG_4180.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/4. IMG_4181.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/4. IMG_4182.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/5. IMG_2141.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Turnamen_Eksternal/5. IMG_7755.JPG'
          ]
        },
        pengukuhan: {
          title: 'Dokumentasi Pengukuhan',
          images: [
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/1. IMG_9633.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/1. IMG_9668.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/1. IMG_9817.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. AIMG_2634.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. AIMG_2654.jpg',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. IMG_0043.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. IMG_0108.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. KIMG_0246.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/2. KIMG_0321.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/3. IMG_0398.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/3. IMG_0439.JPG',
            'Image/Dokumentasi/PROGRAM_KERJA/Pengukuhan/3. IMG_20251101_183755.jpg'
          ]
        },
        musyawarah: {
          title: 'Dokumentasi Musyawarah Anggota',
          images: [
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/1. IMG_0563.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/1. IMG_0388.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/1. IMG_0742.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/2. IMG_0464.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/3. WhatsApp Image 2025-12-21.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/3. IMG_0942.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/3. IMG_0455.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/4. IMG_2690.webp',
            'Image/Dokumentasi/PROGRAM_KERJA/Musyawarah_Anggota/4. IMG_1675.webp'
          ]
        }
      },
      kegiatan: {
        bukber: {
          title: 'Dokumentasi Bukber',
          images: [
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_0555.webp',
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_0596.webp',
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_0610.webp',
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_0692.webp',
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_0699.webp',
            'Image/Dokumentasi/KEGIATAN/Bukber/IMG_9551.webp'
          ]
        },
        gathering: {
          title: 'Dokumentasi Gathering',
          images: [
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_2118.jpg',
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_2134.jpg',
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_2318.jpg',
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_3572.jpg',
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_3582.jpg',
            'Image/Dokumentasi/KEGIATAN/Gathering/IMG_5501.jpg'
          ]
        },
        latihan: {
          title: 'Dokumentasi Latihan Rutin',
          images: [
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20250530-WA0044.webp',
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0069.webp',
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0087.webp',
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0093.webp',
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG-20260425-WA0110.webp',
            'Image/Dokumentasi/KEGIATAN/Latihan_Rutin/IMG_1781.webp'
          ]
        },
        persahabatan: {
          galleries: [
            {
              title: 'Persahabatan UMB',
              images: [
                'Image/Dokumentasi/KEGIATAN/Persahabatan/UMB/a. IMG_4592.webp',
                'Image/Dokumentasi/KEGIATAN/Persahabatan/UMB/b. IMG-20260425-WA0214.webp',
                'Image/Dokumentasi/KEGIATAN/Persahabatan/UMB/c. IMG_4701.webp'
              ]
            },
            {
              title: 'Persahabatan UNLA',
              images: [
                'Image/Dokumentasi/KEGIATAN/Persahabatan/Unla/a. Unlaa.webp',
                'Image/Dokumentasi/KEGIATAN/Persahabatan/Unla/IMG-20260720-WA0103.webp',
                'Image/Dokumentasi/KEGIATAN/Persahabatan/Unla/Unlaaa.webp'
              ]
            },
            {
              title: 'Persahabatan UNINUS',
              images: []
            }
          ]
        },
        sparing: {
          title: 'Dokumentasi Sparing Ranking',
          images: [
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/a. IMG20260526174010.webp',
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/IMG_5790.webp',
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/IMG_5807.webp',
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/IMG_6040.webp',
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/IMG_6043.webp',
            'Image/Dokumentasi/KEGIATAN/Sparing_Rangking/IMG_6057.webp'
          ]
        },
        turnamen: {
          title: 'Dokumentasi Turnamen Internal',
          images: [
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/1. IMG_1495.webp',
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/1. IMG_2209.webp',
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/1. IMG_2648.webp',
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/1. IMG_2654.webp',
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/1. jIMG.webp',
            'Image/Dokumentasi/KEGIATAN/Turnamen_Internal/2. IMG_2730.webp'
          ]
        },
        demo: {
          title: 'Dokumentasi Demo UNC',
          images: [
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2020.jpg',
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2016.jpg',
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2022.jpg',
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2025.jpg',
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2066.jpg',
            'Image/Dokumentasi/KEGIATAN/Demo_UNC/IMG_2092.jpg'
          ]
        },
        anniversary: {
          title: 'Dokumentasi Anniversary IBC',
          images: [
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_1974.webp',
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_2414.webp',
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_2415.webp',
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_2429.webp',
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_2787.webp',
            'Image/Dokumentasi/KEGIATAN/Anniversary_IBC/IMG_3134.webp'
          ]
        },
        endgrading: {
          title: 'Dokumentasi Endgrading',
          images: [
            'Image/Dokumentasi/KEGIATAN/Endgrading/IMG_3158.webp?v=2',
            'Image/Dokumentasi/KEGIATAN/Endgrading/IMG_3161.webp?v=2',
            'Image/Dokumentasi/KEGIATAN/Endgrading/IMG_3162.webp?v=2'
          ]
        }
      }
    };

    const itemInformationMap = {
      program: {
        turnamen: {
          type: 'list',
          title: 'Turnamen Eksternal',
          list: ['Mengadakan kompetisi bergengsi dengan sasaran SMA/SMK/MAN sederajat dengan cakupan wilayah se-Jawa Barat.', 'Membuka kolaborasi sekaligus branding kampus IKOPIN UNIVERSITY.', 'Meningkatkan wawasan serta ide pengurus melalui pengelolaan teknis berskala regional.']
        },
        pengukuhan: {
          type: 'list',
          title: 'Pengukuhan',
          list: ['Menjadi momen resmi pembukaan pendaftaran anggota baru.', 'Membentuk Karakter dan jiwa kepemimpinan anggota serta menyatukan komitmen dalam satu semangat kebersamaan.', 'Memperkenalkan UKM IBC kepada anggota demi keselarasan.']
        },
        musyawarah: {
          type: 'list',
          title: 'Musyawarah Anggota',
          list: ['Forum musyawarah sekaligus pemegang kedaulatan tertinggi di dalam UKM IBC.', 'Forum menjadi ruang demokrasi di mana seluruh anggota memiliki hak suara untuk mengevaluasi kinerja organisasi, menyampaikan aspirasi, dan merumuskan kebijakan strategis', 'Momentum terlantiknya ketua umum baru, sekaligus menjadi ruang transparansi bagi seluruh anggota untuk meninjau proyeksi visi, gagasan, dan arah gerak kepemimpinan IBC ke depannya.']
        }
      },
      kegiatan: {
        bukber: {
          type: 'list',
          title: 'Bukber',
          list: ['Menjadi momentum kebersamaan antar anggota dalam suasana santai.', 'Mempererat hubungan dan membangun ikatan harmonis.']
        },
        gathering: {
          type: 'list',
          title: 'Gathering',
          list: ['Menjadi wadah persatuan kembali arah tujuan organisasi.', 'Pendekatan individu anggota guna persatuan chemistry.']
        },
        latihan: {
          type: 'list',
          title: 'Latihan Rutin',
          list: ['Melatih teknik, stamina, dan konsistensi performa secara terjadwal.', 'Membentuk anggota yang disiplin, kuat, dan siap menghadapi kompetisi.']
        },
        persahabatan: {
          type: 'list',
          title: 'Persahabatan',
          list: ['Memperluas jaringan sportivitas melalui kegiatan bersama komunitas lain.', 'Menjadi sarana pembelajaran dan kolaborasi antarorganisasi.']
        },
        sparing: {
          type: 'list',
          title: 'Sparing Ranking',
          list: ['Menilai perkembangan anggota melalui latihan tanding yang terstruktur.', 'Mendorong semangat berkompetisi secara sehat dan profesional.']
        },
        turnamen: {
          type: 'list',
          title: 'Turnamen Internal',
          list: ['Memberikan pengalaman bertanding dalam lingkungan internal Kampus.', 'Membangun mental kompetitif, sportivitas, dan kebersamaan antar anggota.']
        },
        demo: {
          type: 'list',
          title: 'Demo UNC',
          list: ['Memperkenalkan UKM IBC kepada mahasiswa Baru.', 'Menampilkan semangat, aktivitas, dan potensi UKM di lingkungan kampus.']
        },
        anniversary: {
          type: 'list',
          title: 'Anniversary IBC',
          list: [ 'Memperingati hari jadi UKM IBC.','Merayakan perjalanan dan pencapaian UKM IBC bersama Keluarga besar IKOPIN BADMINTON CLUB.', 'Memperkuat rasa memiliki serta hubungan']
        },
        endgrading: {
          type: 'list',
          title: 'Endgrading',
          list: ['moment mengenang kembali perjalanan serta polemik selama satu periode kebelakang','Menjadi agenda penutup untuk mengevaluasi proses kegiatan dan pembinaan.',]
        }
      }
    };

    const structureImageMap = {
      'Badan Pengurus Harian': {
        'Ketua Umum': 'Image/Struktur/00.Badan_Pengurus_Harian/Ketua_Umum.webp',
        'Wakil Ketua Umum': 'Image/Struktur/00.Badan_Pengurus_Harian/Wakil_Ketua_Umum.webp',
        'Sekretaris Umum': 'Image/Struktur/00.Badan_Pengurus_Harian/Sekretaris_Umum.webp',
        'Sekretaris 1': 'Image/Struktur/00.Badan_Pengurus_Harian/Sekretaris_1.webp',
        'Bendahara Umum': 'Image/Struktur/00.Badan_Pengurus_Harian/Bendahara_Umum.webp',
        'Bendahara 1': 'Image/Struktur/00.Badan_Pengurus_Harian/Bendahara_1.webp'
      },
      'Divisi SDM': {
        'Koordinator': 'Image/Struktur/01.Divisi_SDM/Koordinator_SDM.webp',
        'Anggota 1': 'Image/Struktur/01.Divisi_SDM/SDM1.webp',
        'Anggota 2': 'Image/Struktur/01.Divisi_SDM/SDM2.webp',
        'Anggota 3': 'Image/Struktur/01.Divisi_SDM/SDM3.webp',
        'Anggota 4': 'Image/Struktur/01.Divisi_SDM/SDM4.webp',
        'Anggota 5': 'Image/Struktur/01.Divisi_SDM/SDM5.webp',
        'Anggota 6': 'Image/Struktur/01.Divisi_SDM/SDM6.webp'
      },
      'Divisi Humas': {
        'Koordinator': 'Image/Struktur/02.Divisi_Humas/Koordinator_Humas.webp',
        'Anggota 1': 'Image/Struktur/02.Divisi_Humas/Anggota_1H.webp',
        'Anggota 2': 'Image/Struktur/02.Divisi_Humas/Anggota_2H.webp',
        'Anggota 3': 'Image/Struktur/02.Divisi_Humas/Anggota_3H.webp',
        'Anggota 4': 'Image/Struktur/02.Divisi_Humas/Anggota_4H.webp',
        'Anggota 5': 'Image/Struktur/02.Divisi_Humas/Anggota_5H.webp'
      },
      'Divisi Media Kreatif & Design': {
        'Koordinator': 'Image/Struktur/03.Divisi_MKD/Koordinator_MKD.webp',
        'Anggota 1': 'Image/Struktur/03.Divisi_MKD/Anggota_1M.webp',
        'Anggota 2': 'Image/Struktur/03.Divisi_MKD/Anggota_2M.webp',
        'Anggota 3': 'Image/Struktur/03.Divisi_MKD/Anggota_3M.webp',
        'Anggota 4': 'Image/Struktur/03.Divisi_MKD/Anggota_4M.webp',
        'Anggota 5': 'Image/Struktur/03.Divisi_MKD/Anggota_5M.webp'
      },
      'Divisi Kepelatihan': {
        'Koordinator': 'Image/Struktur/04.Divisi_Kepelatihan/Koordinator_Kepelatihan.webp',
        'Anggota 1': 'Image/Struktur/04.Divisi_Kepelatihan/Anggota_1K.webp',
        'Anggota 2': 'Image/Struktur/04.Divisi_Kepelatihan/Anggota_2K.webp',
        'Anggota 3': 'Image/Struktur/04.Divisi_Kepelatihan/Anggota_3K.webp',
        'Anggota 4': 'Image/Struktur/04.Divisi_Kepelatihan/Anggota_4K.webp',
        'Anggota 5': 'Image/Struktur/04.Divisi_Kepelatihan/Anggota_5K.webp'
      },
      'Divisi Lapangan': {
        'Koordinator': 'Image/Struktur/05.Divisi_Lapangan/Koordinator_Lapangan.webp',
        'Anggota 1': 'Image/Struktur/05.Divisi_Lapangan/Anggota_1L.webp',
        'Anggota 2': 'Image/Struktur/05.Divisi_Lapangan/Anggota_2L.webp',
        'Anggota 3': 'Image/Struktur/05.Divisi_Lapangan/Anggota_3L.webp',
        'Anggota 4': 'Image/Struktur/05.Divisi_Lapangan/Anggota_4L.webp'
      },
      'Divisi RTO': {
        'Koordinator': 'Image/Struktur/06.Divisi_RTO/Koordinator_RTO.webp',
        'Anggota 1': 'Image/Struktur/06.Divisi_RTO/Anggota_1R.webp',
        'Anggota 2': 'Image/Struktur/06.Divisi_RTO/Anggota_2R.webp',
        'Anggota 3': 'Image/Struktur/06.Divisi_RTO/Anggota_3R.webp',
        'Anggota 4': 'Image/Struktur/06.Divisi_RTO/Anggota_4R.webp'
      }
    };

    const structureMemberMap = {
      'Badan Pengurus Harian': {
        'Ketua Umum': { name: "Ahmad Muwafiqul 'Adli", cohort: '2023' },
        'Wakil Ketua Umum': { name: 'Hilman Munawar', cohort: '2023' },
        'Bendahara Umum': { name: 'Silviana', cohort: '2023' },
        'Bendahara 1': { name: 'Dylla Aditra', cohort: '2024' },
        'Sekretaris Umum': { name: 'Dina Oktavia Mussyam', cohort: '2024' },
        'Sekretaris 1': { name: 'Chealsea Eka Putri D', cohort: '2025' }
      },
      'Divisi SDM': {
        'Koordinator': { name: 'Yuli Zahra Aulia', cohort: '2023' },
        'Anggota 1': { name: 'Alika Zahra Tri Aulia', cohort: '2024' },
        'Anggota 2': { name: 'Amelia Nur Aisyah', cohort: '2023' },
        'Anggota 3': { name: 'Najla shakira', cohort: '2025' },
        'Anggota 4': { name: 'Axel Rafi Fahreza', cohort: '2023' },
        'Anggota 5': { name: 'Meisya Putri Lestari', cohort: '2025' },
        'Anggota 6': { name: 'Mugni Nursyifa', cohort: '2024' }
      },
      'Divisi Humas': {
        'Koordinator': { name: 'Aisya Zahwan', cohort: '2024' },
        'Anggota 1': { name: 'Aji Anggara', cohort: '2023' },
        'Anggota 2': { name: 'Salsya Dwi Kaila', cohort: '2023' },
        'Anggota 3': { name: 'Devi Mila Karmila', cohort: '2023' },
        'Anggota 4': { name: 'Alma Nayla Wijaya', cohort: '2025' },
        'Anggota 5': { name: 'jadidah Natalia S.Pandia', cohort: '2023' }
      },
      'Divisi Media Kreatif & Design': {
        'Koordinator': { name: 'Delia Fauziah', cohort: '2024' },
        'Anggota 1': { name: 'Marissa Shafira Aulia', cohort: '2025' },
        'Anggota 2': { name: 'Marshanda  Tri Utami', cohort: '2025' },
        'Anggota 3': { name: 'Salma Maulina', cohort: '2025' },
        'Anggota 4': { name: 'Sarah Aulia', cohort: '2023' },
        'Anggota 5': { name: 'Salma Alfiyatun Nuri', cohort: '2025' }
      },
      'Divisi Kepelatihan': {
        'Koordinator': { name: 'Bella Fransiska S', cohort: '2023' },
        'Anggota 1': { name: 'Hasby Aufa As Sidiq', cohort: '2024' },
        'Anggota 2': { name: 'Aksan Mulyana', cohort: '2023' },
        'Anggota 3': { name: 'Imelda Safira', cohort: '2025' },
        'Anggota 4': { name: 'M Fauzan Rizaldy', cohort: '2024' },
        'Anggota 5': { name: 'Muhammad Rofy', cohort: '2025' }
      },
      'Divisi Lapangan': {
        'Koordinator': { name: 'Parid Ahmad M', cohort: '2024' },
        'Anggota 1': { name: 'M Rizal Firdaus', cohort: '2023' },
        'Anggota 2': { name: 'Diani Nur Diawati', cohort: '2025' },
        'Anggota 3': { name: 'Marisa Aulia', cohort: '2023' },
        'Anggota 4': { name: 'Bunga Nuraini', cohort: '2025' }
      },
      'Divisi RTO': {
        'Koordinator': { name: 'Meliana Putri S', cohort: '2024' },
        'Anggota 1': { name: 'Kania Aprilian S', cohort: '2023' },
        'Anggota 2': { name: 'Rangga Fahlevi', cohort: '2023' },
        'Anggota 3': { name: 'Jelita Silvani', cohort: '2023' },
        'Anggota 4': { name: 'Listya Ayu Lestari', cohort: '2023' }
      }
    };

    function renderDetail(key, itemKey) {
      const data = contentMap[key] || contentMap.profil;
      document.getElementById('page-title').textContent = data.title;
      document.getElementById('page-subtitle').textContent = data.subtitle;
      document.getElementById('page-eyebrow').classList.toggle('hidden', key === 'struktur');

      const container = document.getElementById('detail-content');
      container.innerHTML = '';

      const selectedItem = itemInformationMap[key]?.[itemKey];
      const items = selectedItem ? [selectedItem] : data.items;
      document.title = `${selectedItem?.title || data.title.replace(/\n/g, ' ')} | UKM IBC`;

      items.forEach((item) => {
        if (item.type === 'text') {
          const p = document.createElement('p');
          p.className = 'text-lg leading-relaxed text-slate-700';
          p.textContent = item.value;
          container.appendChild(p);
        }

        if (item.type === 'list') {
          const wrap = document.createElement('div');
          wrap.className = 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6';

          const title = document.createElement('h3');
          title.className = 'text-xl font-bold text-slate-900 mb-4';
          title.textContent = item.title;

          const ul = document.createElement('ul');
          ul.className = 'space-y-3 text-slate-600';

          item.list.forEach((entry) => {
            const li = document.createElement('li');
            li.className = 'flex gap-3';
            li.innerHTML = '<span class="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 aspect-square rounded-full bg-blue-600"></span><span>' + entry + '</span>';
            ul.appendChild(li);
          });

          wrap.appendChild(title);
          wrap.appendChild(ul);
          container.appendChild(wrap);
        }

        if (item.type === 'gallery') {
          const wrap = document.createElement('div');
          wrap.className = 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6';

          const title = document.createElement('h3');
          title.className = 'text-xl font-bold text-slate-900 mb-4';
          title.textContent = item.title;

          const grid = document.createElement('div');
          grid.className = 'documentation-gallery-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4';

          item.images.forEach((src) => {
            const imgWrap = document.createElement('div');
            imgWrap.className = 'documentation-gallery-card group overflow-hidden rounded-2xl border border-slate-200';
            const img = document.createElement('img');
            img.src = `${pageRoot}${src}`;
            img.alt = 'Dokumentasi IBC';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.className = 'documentation-gallery-image w-full object-cover';
            imgWrap.appendChild(img);
            grid.appendChild(imgWrap);
          });

          wrap.appendChild(title);
          wrap.appendChild(grid);
          container.appendChild(wrap);
        }

        if (item.type === 'structure') {
            item.groups.forEach((group) => {
              const groupSlug = group.title
                .toLowerCase()
                .replace(/^divisi\s+/, '')
                .replace(/&/g, '-')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            const wrap = document.createElement('div');
              wrap.id = `group-${groupSlug}`;
              wrap.className = `scroll-mt-24 rounded-2xl border p-5 sm:p-6 ${group.title.startsWith('Pengurus Inti') ? 'border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-lg' : 'border-slate-200 bg-white'}`;

            const title = document.createElement('h3');
            title.className = 'text-xl font-bold text-slate-900 mb-5';
            title.textContent = group.title;

            const grid = document.createElement('div');
            grid.className = group.title.startsWith('Pengurus Inti')
              ? 'grid sm:grid-cols-2 lg:grid-cols-2 gap-4'
              : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4';

            group.positions.forEach((position) => {
              const positionSlug = position
                .toLowerCase()
                .replace(/&/g, 'dan')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              const card = document.createElement('article');
              card.id = `position-${positionSlug}`;
              card.className = 'group scroll-mt-24 overflow-hidden rounded-2xl border border-blue-100 bg-slate-50';
              const imageSrc = structureImageMap[group.title]?.[position] || 'Image/Logo/Organisasi/LOGO_IBC.webp';
              const member = structureMemberMap[group.title]?.[position] || { name: 'Nama Lengkap', cohort: '-' };
              const divisionName = group.title.replace(/^Divisi\s+/, '');
              const displayPosition = group.title.startsWith('Divisi ')
                ? (position === 'Koordinator' ? `Koordinator Divisi ${divisionName}` : `Anggota ${divisionName}`)
                : position;
              card.innerHTML = `
                <img src="${pageRoot}${imageSrc}" alt="Foto ${displayPosition} UKM IBC" loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover transition duration-700 ease-in-out will-change-transform group-hover:scale-105">
                <div class="p-4">
                  <h4 class="font-bold text-slate-900">${member.name}</h4>
                  <p class="mt-1 text-sm font-semibold text-blue-600">${displayPosition}</p>
                  <p class="mt-2 text-sm text-slate-500">Angkatan: ${member.cohort}</p>
                </div>
              `;
              grid.appendChild(card);
            });

            wrap.appendChild(title);
            wrap.appendChild(grid);
            container.appendChild(wrap);
          });
        }
      });

      const documentation = documentationMap[key]?.[itemKey];
      if (documentation) {
        const isTurnamenGallery = key === 'program' && itemKey === 'turnamen';
        const galleries = documentation.galleries || [documentation];

        galleries.forEach((gallery) => {
          const wrap = document.createElement('div');
          wrap.className = 'rounded-2xl border border-blue-100 bg-white p-5 sm:p-6';

          const title = document.createElement('h3');
          title.className = 'text-xl font-bold text-slate-900 mb-4';
          title.textContent = gallery.title;
          wrap.appendChild(title);

          if (gallery.images.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'text-slate-500';
            emptyMessage.textContent = 'Foto dokumentasi belum tersedia.';
            wrap.appendChild(emptyMessage);
          } else {
            const grid = document.createElement('div');
            grid.className = 'documentation-gallery-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4';

            gallery.images.forEach((src, index) => {
              const isTurnamenFeatured = isTurnamenGallery && src.endsWith('/WhatsApp Image 2026-09-27 at 20.09.20.jpeg');
              const imgWrap = document.createElement('div');
              imgWrap.className = `documentation-gallery-card group overflow-hidden rounded-2xl border border-slate-200${isTurnamenGallery ? ' turnamen-scroll-card' : ''}${isTurnamenFeatured ? ' turnamen-featured-image' : ''}`;
              const img = document.createElement('img');
              img.src = `${pageRoot}${src.replace(/\.(?:jpe?g)$/i, '.webp')}`;
              img.alt = `${gallery.title} ${index + 1}`;
              img.loading = 'lazy';
              img.decoding = 'async';
              const isTurnamenBanner = isTurnamenGallery && index === 0;
              img.className = `documentation-gallery-image w-full ${isTurnamenFeatured ? 'turnamen-featured-photo object-contain' : `object-cover ${isTurnamenBanner ? 'turnamen-banner-focus' : ''}`}`;
              if (key === 'kegiatan' && itemKey === 'sparing' && (index === 1 || index === 2)) {
                img.style.objectPosition = 'center 40%';
              }
              if (src.endsWith('/IMG-20260720-WA0103.jpg')) {
                img.style.objectPosition = 'center 70%';
              }
              imgWrap.appendChild(img);
              grid.appendChild(imgWrap);
            });

            wrap.appendChild(grid);
          }

          container.appendChild(wrap);
        });
      }
    }

    const params = new URLSearchParams(window.location.search);
    const section = document.body.dataset.section || 'profil';
    const item = document.body.dataset.item;
    const group = params.get('group');
    document.querySelectorAll('.current-year').forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
    const returnHash = params.get('return') || '#home';

    document.querySelectorAll('a[href="index.html"]').forEach((link) => {
      link.href = `${pageRoot}index.html${returnHash}`;
    });

    let key = section;
    if (section === 'program' && item) {
      key = 'program';
    }
    if (section === 'kegiatan' && item) {
      key = 'kegiatan';
    }

    renderDetail(key, item);

    if (key === 'program' && item === 'turnamen') {
      const cards = Array.from(document.querySelectorAll('.turnamen-scroll-card'));
      let highlightFrame = null;

      function highlightClosestTurnamenPhoto() {
        const focusX = window.innerWidth / 2;
        const focusY = window.innerHeight / 2;
        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach((card) => {
          const bounds = card.getBoundingClientRect();
          if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          const distance = Math.hypot(centerX - focusX, centerY - focusY);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        });

        cards.forEach((card) => {
          card.classList.toggle('is-scroll-highlighted', card === closestCard);
        });
      }

      function scheduleTurnamenPhotoHighlight() {
        if (highlightFrame !== null) return;
        highlightFrame = window.requestAnimationFrame(() => {
          highlightFrame = null;
          highlightClosestTurnamenPhoto();
        });
      }

      window.addEventListener('scroll', scheduleTurnamenPhotoHighlight, { passive: true });
      window.addEventListener('resize', scheduleTurnamenPhotoHighlight);
      highlightClosestTurnamenPhoto();
    }

    if (key === 'struktur' && group) {
      window.addEventListener('load', () => {
        const target = document.getElementById(`group-${group}`) || document.getElementById(`position-${group}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  
}
