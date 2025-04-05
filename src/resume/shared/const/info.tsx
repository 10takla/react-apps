interface Speciality {
    name: string,
    number: `${number}.${number}.${number}`
}

const specialities: Record<string, Speciality> = {
    PI: {
        name: "Программная инженерия",
        number: "09.03.04"
    }
}

interface Univercity {
    name: string,
    link: string
    specialities: Record<string, Speciality>
    departments: Record<string, Record<"name" | "link", string>>
}

const univercities: Record<string, Univercity> = {
    DGTU: {
        name: "Дагестанский государственный технический университет",
        link: "https://dstu.ru/",
        specialities: Object.entries(specialities)
            .filter(([key]) => ["PI"].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        departments: {
            POVTIAS: {
                name: "программного обеспечения вычислительной техники и автоматизированных систем",
                link: "https://dstu.ru/sveden/kafedra-programmnogo-obespechenija-vychislitelnoi-tekhniki-i-avtomatizirovannykh-sistem1"
            }
        }
    }
}

export interface Ed<S = Univercity["specialities"]> {
    univercity: Univercity
    degree: "Бакалавр" | "Магистр"
    department: {
        name: string
        link: string
    }
    speciality: S[keyof S]
    time: {
        start: Date,
        end?: Date,
    }
}

export const educs: Ed[] = [
    {
        univercity: univercities.DGTU,
        degree: "Бакалавр",
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
        time: {
            start: new Date("01 September 2019 14:48 UTC"),
            end: new Date("06 June 2023 14:48 UTC")
        }
    },
    {
        univercity: univercities.DGTU,
        degree: "Магистр",
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
        time: {
            start: new Date("01 September 2023 14:48 UTC"),
        }
    },
];

interface Skill {
    name: string,
    stars?: number,
    level?: string,
    link?: string
}

export const glossary = {
    rustc: {
        link: "https://github.com/rust-lang/rust",
    },
    axum: {
        link: "https://docs.rs/axum/latest/axum/"
    },
    actix: {
        link: "https://docs.rs/actix-web/latest/actix_web/"
    },
    tokio: {
        link: "https://docs.rs/tokio/latest/tokio/"
    },
    diesel: {
        link: "https://docs.rs/diesel/latest/diesel/"
    },
    sqlx: {
        link: "https://docs.rs/sqlx/latest/sqlx/"
    },
    "wasm-bindgen": {
        link: "https://docs.rs/wasm-bindgen/latest/wasm_bindgen/"
    },
    serde: {
        link: "https://docs.rs/serde/latest/serde/"
    },
    clap: {
        link: "https://docs.rs/clap/latest/clap/"
    },
    utopia: {
        link: "https://docs.rs/utoipa/latest/utoipa/"
    },
    "#[marker]": {
        link: "https://github.com/rust-lang/rust/issues/29864"
    }
}
const allSkills = {
    Axum: { stars: 5, link: glossary.axum.link },
    Actix: { stars: 5, link: "https://docs.rs/actix/latest/actix/" },
    Tokio: { stars: 4, link: glossary.tokio.link },
    Serde: { stars: 5, link: "https://docs.rs/serde/latest/serde/" },
    "Rust ffi": { stars: 4, link: "https://doc.rust-lang.org/nomicon/ffi.html" },
    Diesel: { stars: 5, link: "https://docs.rs/diesel/latest/diesel/" },
    Wasm: { stars: 5 },
    rustc: { stars: 5, link: "https://github.com/rust-lang/rust" },
    CLI: { stars: 4 },
    Asynchrony: { stars: 5 },
    "Concurrency&Parallelism": { stars: 5 }
}
const langSkills = {
    Rust: { stars: 5 },
    Python: { stars: 3 },
    TypeScript: { stars: 5 },
    HTML: { stars: 4 },
    CSS: { stars: 4 }
}
const backend = {
    MySQL: { stars: 4 },
    Django: { stars: 3 },
    Axum: allSkills.Axum,
    Actix: allSkills.Actix,
    "REST API": { stars: 4 },
};
const frontend = {
    React: { stars: 5 },
    "Redux Toolkit": { stars: 5 },
    Wasm: allSkills.Wasm,
    "RTK Query": { stars: 4 },
    "Vite": { stars: 4 },
    "Webpack": { stars: 3 },
    "Storybook": { stars: 3 }
}
const other = {
    Linux: { stars: 4 },
    Docker: { stars: 5 },
    Bash: { stars: 4 },
    Git: { stars: 5 },
    GitHub: { stars: 5, link: "https://github.com/10takla" },
    "Github CI/CD": { stars: 3 },
    GitLab: { stars: 3 },
    Английский: { level: "A2" }
}

export const skills: Record<string, Skill[]> = Object.entries({
    Rust: allSkills,
    "Языки программирования": langSkills,
    Backend: backend,
    Frontend: frontend,
    Прочее: other
}).reduce((acc, [key, skills]) => (
    {
        ...acc, [key]: Object.entries(skills).map((([name, other]) => ({ name, ...other })))
    }
), {});

import CleanCode from 'resume/shared/assets/imgs/Чистый код.webp';
import RustAtomics from 'resume/shared/assets/imgs/Rust Atomics and Locks.jpg';
import { Lang } from '../ui/ToggleLanguage/ToggleLanguage'


export type Book = [string, string, string] | [string, string] | [Record<Lang, [string, string]>, string]
export const books: Array<Book> = [
    [
        {
            en: [
                "Introduction to Algorithms",
                "https://m.media-amazon.com/images/I/61ZYxrQEpCL._SL1400_.jpg",
            ],
            ru: [
                "Алгоритмы. Построение и анализ",
                "https://ir.ozone.ru/s3/multimedia-u/wc1000/6315006402.jpg"
            ]
        },
        "https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844"
    ],
    [
        "Rust Atomics and Locks. Low-Level Concurrency in Practice",
        "https://marabos.nl/atomics/",
        RustAtomics
    ],
    [
        {
            en: [
                "Clean Code: A Handbook of Agile Software Craftsmanship",
                "https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg",
            ],
            ru: [
                "Чистый код. Создание, анализ и рефакторинг",
                "https://ir.ozone.ru/s3/multimedia-c/wc1000/6189288048.jpg"
            ],

        },
        "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
    ],
    [
        {
            en: [
                "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
                "https://m.media-amazon.com/images/I/71stxGw9JgL._SL1500_.jpg",
            ],
            ru: [
                "Чистая архитектура: Искусство разработки программного обеспечения",
                "https://cdn1.ozone.ru/s3/multimedia-1/6892791841.jpg"
            ],

        },
        "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164",
    ],
    [
        "The rust Programming Language",
        "https://doc.rust-lang.org/book/"
    ],
    [
        "The rust Reference",
        "https://doc.rust-lang.org/reference/"
    ],

    [
        "Asynchronous Programming in rust",
        "https://rust-lang.github.io/async-book/"
    ],
    [
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/",
    ],
    [
        "The Little Book of rust Macros",
        "https://veykril.github.io/tlborm/"
    ],
    [
        "Rust 🦀 and WebAssembly 🕸",
        "https://rustwasm.github.io/book/"
    ],
    [
        "Rust By Example",
        "https://doc.rust-lang.org/rust-by-example/"
    ],
    [
        "The rustdoc book",
        "https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html"
    ],
    [
        "Rust Compiler Development Guide",
        "https://rustc-dev-guide.rust-lang.org/"
    ],
    [
        "The `wasm-bindgen` Guide",
        "https://rustwasm.github.io/wasm-bindgen/"
    ],
    [
        "The Rust Performance Book",
        "https://nnethercote.github.io/perf-book/inlining.html"
    ],
    [
        "Learning Rust",
        "https://quinedot.github.io/rust-learning/index.html"
    ],
    [
        "The rustup book",
        "https://rust-lang.github.io/rustup/cross-compilation.html"
    ],
    [
        "The rustc book",
        "https://doc.rust-lang.org/rustc/what-is-rustc.html"
    ],
    [
        "The Rustonomicon",
        "https://doc.rust-lang.org/nomicon/arc-mutex/arc-layout.html"
    ]
];
