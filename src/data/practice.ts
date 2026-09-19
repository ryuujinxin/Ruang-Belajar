export type PracticeQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type PracticeSet = {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  duration: number;
  questions: PracticeQuestion[];
};

export const practiceSets: PracticeSet[] = [
  {
    id: "persamaan-kuadrat",
    title: "Persamaan Kuadrat",
    subject: "Matematika",
    difficulty: "Sedang",
    duration: 10,
    questions: [
      {
        id: "pk-1",
        question: "Akar-akar dari x² - 5x + 6 = 0 adalah...",
        options: [
          "1 dan 6",
          "2 dan 3",
          "-2 dan -3",
          "3 dan 4",
        ],
        answer: 1,
        explanation:
          "x² - 5x + 6 dapat difaktorkan menjadi (x - 2)(x - 3) = 0.",
      },
      {
        id: "pk-2",
        question: "Nilai diskriminan dari x² + 4x + 4 = 0 adalah...",
        options: ["0", "4", "8", "16"],
        answer: 0,
        explanation: "D = b² - 4ac = 4² - 4(1)(4) = 0.",
      },
      {
        id: "pk-3",
        question: "Persamaan kuadrat memiliki dua akar real berbeda jika...",
        options: [
          "D < 0",
          "D = 0",
          "D > 0",
          "D = 1",
        ],
        answer: 2,
        explanation:
          "Jika diskriminan lebih besar dari nol, persamaan mempunyai dua akar real berbeda.",
      },
      {
        id: "pk-4",
        question: "Hasil dari (x + 2)(x - 3) adalah...",
        options: [
          "x² - x - 6",
          "x² + x - 6",
          "x² - 5x + 6",
          "x² + 5x - 6",
        ],
        answer: 0,
        explanation: "x² - 3x + 2x - 6 = x² - x - 6.",
      },
      {
        id: "pk-5",
        question: "Jumlah akar persamaan x² - 7x + 10 = 0 adalah...",
        options: ["5", "7", "10", "-7"],
        answer: 1,
        explanation: "Jumlah akar = -b/a = 7.",
      },
      {
        id: "pk-6",
        question: "Hasil kali akar persamaan 2x² - 8x + 6 = 0 adalah...",
        options: ["2", "3", "4", "6"],
        answer: 1,
        explanation: "Hasil kali akar = c/a = 6/2 = 3.",
      },
      {
        id: "pk-7",
        question: "Akar kembar terjadi ketika nilai diskriminan...",
        options: [
          "negatif",
          "nol",
          "positif",
          "tidak terdefinisi",
        ],
        answer: 1,
        explanation: "D = 0 menghasilkan akar kembar.",
      },
      {
        id: "pk-8",
        question:
          "Jika salah satu akar x² - 6x + k = 0 adalah 2, maka k = ...",
        options: ["4", "6", "8", "12"],
        answer: 2,
        explanation: "4 - 12 + k = 0 sehingga k = 8.",
      },
      {
        id: "pk-9",
        question: "Faktorisasi x² + 7x + 12 adalah...",
        options: [
          "(x + 2)(x + 6)",
          "(x + 3)(x + 4)",
          "(x - 3)(x - 4)",
          "(x + 1)(x + 12)",
        ],
        answer: 1,
        explanation: "3 + 4 = 7 dan 3 × 4 = 12.",
      },
      {
        id: "pk-10",
        question: "Persamaan x² - 9 = 0 mempunyai akar...",
        options: [
          "3 dan -3",
          "9 dan -9",
          "0 dan 9",
          "3 dan 9",
        ],
        answer: 0,
        explanation: "x² = 9 sehingga x = ±3.",
      },
    ],
  },

  {
    id: "gerak-lurus",
    title: "Gerak Lurus",
    subject: "Fisika",
    difficulty: "Mudah",
    duration: 15,
    questions: [
      {
        id: "gl-1",
        question: "Satuan SI untuk kecepatan adalah...",
        options: ["km", "m/s", "m²", "N"],
        answer: 1,
        explanation: "Satuan SI kecepatan adalah meter per sekon.",
      },
      {
        id: "gl-2",
        question:
          "Sebuah benda bergerak 100 m dalam 20 s. Kecepatannya adalah...",
        options: ["2 m/s", "5 m/s", "20 m/s", "50 m/s"],
        answer: 1,
        explanation: "v = s/t = 100/20 = 5 m/s.",
      },
      {
        id: "gl-3",
        question: "Gerak lurus beraturan memiliki...",
        options: [
          "kecepatan tetap",
          "percepatan tetap",
          "arah selalu berubah",
          "jarak selalu nol",
        ],
        answer: 0,
        explanation: "GLB memiliki kecepatan konstan.",
      },
      {
        id: "gl-4",
        question: "Percepatan merupakan perubahan...",
        options: [
          "massa",
          "waktu",
          "kecepatan",
          "jarak",
        ],
        answer: 2,
        explanation:
          "Percepatan adalah perubahan kecepatan tiap satuan waktu.",
      },
      {
        id: "gl-5",
        question: "Satuan SI percepatan adalah...",
        options: ["m/s", "m/s²", "N/m", "kg/m³"],
        answer: 1,
        explanation: "Satuan percepatan adalah m/s².",
      },
      {
        id: "gl-6",
        question:
          "Benda mula-mula diam memiliki kecepatan awal...",
        options: ["0 m/s", "1 m/s", "9,8 m/s", "10 m/s"],
        answer: 0,
        explanation:
          "Benda diam memiliki kecepatan awal 0 m/s.",
      },
      {
        id: "gl-7",
        question:
          "Jika kecepatan benda bertambah setiap detik, benda mengalami...",
        options: [
          "perlambatan",
          "percepatan",
          "diam",
          "GLB",
        ],
        answer: 1,
        explanation:
          "Pertambahan kecepatan menunjukkan adanya percepatan.",
      },
      {
        id: "gl-8",
        question: "Rumus GLB yang benar adalah...",
        options: [
          "s = vt",
          "s = at²",
          "v = at²",
          "a = st",
        ],
        answer: 0,
        explanation:
          "Jarak pada GLB adalah kecepatan dikali waktu.",
      },
      {
        id: "gl-9",
        question:
          "Sebuah mobil bergerak 20 m/s selama 5 s. Jaraknya...",
        options: ["25 m", "50 m", "100 m", "200 m"],
        answer: 2,
        explanation: "s = vt = 20 × 5 = 100 m.",
      },
      {
        id: "gl-10",
        question:
          "Jika kecepatan benda konstan, percepatannya...",
        options: ["0", "1", "9,8", "tak terhingga"],
        answer: 0,
        explanation:
          "Tidak ada perubahan kecepatan sehingga percepatannya nol.",
      },
      {
        id: "gl-11",
        question:
          "Grafik posisi terhadap waktu pada GLB berbentuk...",
        options: [
          "garis lurus",
          "parabola",
          "lingkaran",
          "gelombang",
        ],
        answer: 0,
        explanation:
          "Posisi berubah secara linear terhadap waktu.",
      },
      {
        id: "gl-12",
        question:
          "Jika jarak 60 m ditempuh dalam 10 s, kecepatannya...",
        options: ["3 m/s", "6 m/s", "10 m/s", "60 m/s"],
        answer: 1,
        explanation: "v = 60/10 = 6 m/s.",
      },
      {
        id: "gl-13",
        question: "Perlambatan menyebabkan...",
        options: [
          "kecepatan bertambah",
          "kecepatan berkurang",
          "massa bertambah",
          "jarak menjadi nol",
        ],
        answer: 1,
        explanation:
          "Perlambatan menyebabkan besar kecepatan berkurang.",
      },
      {
        id: "gl-14",
        question: "Kecepatan 72 km/jam sama dengan...",
        options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        answer: 2,
        explanation: "72 ÷ 3,6 = 20 m/s.",
      },
      {
        id: "gl-15",
        question:
          "Besaran yang memiliki besar dan arah disebut...",
        options: [
          "skalar",
          "vektor",
          "massa",
          "suhu",
        ],
        answer: 1,
        explanation:
          "Besaran vektor memiliki besar dan arah.",
      },
    ],
  },

  {
    id: "struktur-atom",
    title: "Struktur Atom",
    subject: "Kimia",
    difficulty: "Sedang",
    duration: 12,
    questions: [
      {
        id: "sa-1",
        question:
          "Partikel atom yang bermuatan negatif adalah...",
        options: [
          "proton",
          "neutron",
          "elektron",
          "nukleon",
        ],
        answer: 2,
        explanation: "Elektron bermuatan negatif.",
      },
      {
        id: "sa-2",
        question:
          "Partikel atom yang bermuatan positif adalah...",
        options: [
          "elektron",
          "proton",
          "neutron",
          "atom",
        ],
        answer: 1,
        explanation: "Proton bermuatan positif.",
      },
      {
        id: "sa-3",
        question:
          "Partikel yang tidak bermuatan disebut...",
        options: [
          "proton",
          "elektron",
          "neutron",
          "ion",
        ],
        answer: 2,
        explanation:
          "Neutron tidak memiliki muatan listrik.",
      },
      {
        id: "sa-4",
        question: "Inti atom tersusun atas...",
        options: [
          "elektron dan proton",
          "proton dan neutron",
          "elektron dan neutron",
          "elektron saja",
        ],
        answer: 1,
        explanation:
          "Inti atom terdiri dari proton dan neutron.",
      },
      {
        id: "sa-5",
        question:
          "Nomor atom menunjukkan jumlah...",
        options: [
          "neutron",
          "proton",
          "nukleon",
          "kulit",
        ],
        answer: 1,
        explanation:
          "Nomor atom menunjukkan jumlah proton.",
      },
      {
        id: "sa-6",
        question:
          "Atom netral memiliki jumlah proton dan elektron yang...",
        options: [
          "berbeda",
          "sama",
          "selalu nol",
          "tidak berhubungan",
        ],
        answer: 1,
        explanation:
          "Pada atom netral jumlah proton dan elektron sama.",
      },
      {
        id: "sa-7",
        question: "Nomor massa adalah jumlah...",
        options: [
          "proton + neutron",
          "proton + elektron",
          "neutron + elektron",
          "elektron saja",
        ],
        answer: 0,
        explanation:
          "Nomor massa = proton + neutron.",
      },
      {
        id: "sa-8",
        question:
          "Elektron menempati bagian atom yang disebut...",
        options: [
          "inti",
          "kulit elektron",
          "proton",
          "nukleon",
        ],
        answer: 1,
        explanation:
          "Elektron berada pada kulit atau tingkat energi.",
      },
      {
        id: "sa-9",
        question:
          "Atom yang kehilangan elektron akan menjadi...",
        options: [
          "anion",
          "kation",
          "neutron",
          "isotop",
        ],
        answer: 1,
        explanation:
          "Kehilangan elektron menghasilkan ion positif atau kation.",
      },
      {
        id: "sa-10",
        question:
          "Atom yang menerima elektron akan menjadi...",
        options: [
          "kation",
          "anion",
          "proton",
          "nukleon",
        ],
        answer: 1,
        explanation:
          "Menerima elektron menghasilkan ion negatif atau anion.",
      },
      {
        id: "sa-11",
        question:
          "Isotop adalah atom dengan...",
        options: [
          "proton berbeda, neutron sama",
          "proton sama, neutron berbeda",
          "elektron sama, proton berbeda",
          "semua partikel berbeda",
        ],
        answer: 1,
        explanation:
          "Isotop memiliki jumlah proton sama dan neutron berbeda.",
      },
      {
        id: "sa-12",
        question:
          "Partikel paling ringan di antara proton, neutron, dan elektron adalah...",
        options: [
          "proton",
          "neutron",
          "elektron",
          "semuanya sama",
        ],
        answer: 2,
        explanation:
          "Elektron memiliki massa jauh lebih kecil.",
      },
    ],
  },

  {
    id: "daily-conversation",
    title: "Daily Conversation",
    subject: "Bahasa Inggris",
    difficulty: "Mudah",
    duration: 10,
    questions: [
      {
        id: "dc-1",
        question: 'What is the best response to "How are you?"',
        options: [
          "I'm fine, thank you.",
          "My name is John.",
          "See you yesterday.",
          "I'm twelve o'clock.",
        ],
        answer: 0,
        explanation:
          `"I'm fine, thank you." is a natural response to "How are you?".`,
      },
      {
        id: "dc-2",
        question: 'What does "Good morning" mean?',
        options: [
          "Selamat malam",
          "Selamat pagi",
          "Selamat tinggal",
          "Sampai jumpa",
        ],
        answer: 1,
        explanation:
          `"Good morning" is used as a morning greeting.`,
      },
      {
        id: "dc-3",
        question:
          'The correct response to "Thank you" is...',
        options: [
          "Goodbye",
          "You're welcome",
          "Good morning",
          "Excuse me",
        ],
        answer: 1,
        explanation:
          `"You're welcome" is commonly used in response to thanks.`,
      },
      {
        id: "dc-4",
        question:
          'What does "Where do you live?" ask about?',
        options: [
          "age",
          "name",
          "location",
          "hobby",
        ],
        answer: 2,
        explanation:
          "It asks about someone's location or place of residence.",
      },
      {
        id: "dc-5",
        question: "Choose the correct sentence.",
        options: [
          "I am student.",
          "I am a student.",
          "I a student.",
          "I student am.",
        ],
        answer: 1,
        explanation:
          "The correct sentence is 'I am a student.'",
      },
      {
        id: "dc-6",
        question: 'What is the opposite of "hot"?',
        options: [
          "warm",
          "cold",
          "big",
          "fast",
        ],
        answer: 1,
        explanation:
          "The opposite of hot is cold.",
      },
      {
        id: "dc-7",
        question:
          'What does "See you later" mean?',
        options: [
          "Sampai jumpa nanti",
          "Selamat pagi",
          "Terima kasih",
          "Permisi",
        ],
        answer: 0,
        explanation:
          `"See you later" is used when saying goodbye.`,
      },
      {
        id: "dc-8",
        question:
          'Complete: "Nice to ___ you."',
        options: [
          "meet",
          "meets",
          "meeting",
          "met",
        ],
        answer: 0,
        explanation:
          "The correct expression is 'Nice to meet you.'",
      },
      {
        id: "dc-9",
        question:
          "What is the correct question for asking someone's name?",
        options: [
          "How old are you?",
          "Where are you?",
          "What is your name?",
          "How are you?",
        ],
        answer: 2,
        explanation:
          `"What is your name?" asks someone's name.`,
      },
      {
        id: "dc-10",
        question:
          'Choose the correct response: "Excuse me."',
        options: [
          "Yes, can I help you?",
          "Good night yesterday.",
          "I am twelve.",
          "Thank you tomorrow.",
        ],
        answer: 0,
        explanation:
          `"Yes, can I help you?" is a natural response.`,
      },
    ],
  },
];

export function getPracticeSet(
  id: string,
): PracticeSet | undefined {
  return practiceSets.find((set) => set.id === id);
}