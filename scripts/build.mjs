import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, 'dist');

const publicFiles = [
  'index.html',
  'Image/Logo/favicon.png',
  'assets/css/site.css',
  'style.css',
  'app.js',
  'Image/Background/Kiri.webp',
  'Image/Background/pagess.webp',
  'Image/Background/UMB.webp',
  'Image/Background/Unla.webp',
  'Image/Logo/Kampus/LOGO_IKOPIN.webp',
  'Image/Logo/Organisasi/LOGO_IBC.webp',
  'Image/Tampilan/PENGURUS.webp',
  'Image/Tampilan/RAKER.webp',
];

const pageDirectories = [
  'pengurus',
  'pendaftaran',
  'turnamen_eksternal',
  'pengukuhan',
  'musyawarah_Anggota',
  'bukber',
  'gathering',
  'latihan_rutin',
  'persahabatan',
  'sparing_rangking',
  'turnamen_internal',
  'demo_unc',
  'anniversarry',
  'endgrading',
];

const publicDirectories = [
  'Image/Dokumentasi',
  'Image/Struktur',
  'styles',
  ...pageDirectories,
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of publicFiles) {
  const destination = join(outputDirectory, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(projectRoot, file), destination);
}

for (const directory of publicDirectories) {
  await cp(
    join(projectRoot, directory),
    join(outputDirectory, directory),
    { recursive: true },
  );
}

console.log(`Static site ready in ${outputDirectory}`);
