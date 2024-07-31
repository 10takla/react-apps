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
        name: "Дагестанский государственный университет",
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
            start: new Date("2019-September"),
            end: new Date("2023-June")
        }
    },
    {
        univercity: univercities.DGTU,
        degree: "Магистр",
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
        time: {
            start: new Date("2019-September"),
        }
    },
];

interface Skill {
    name: string,
    stars: number,
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
}
const allSkills = {
    Axum: { stars: 5, link: glossary.axum.link },
    Actix: { stars: 5, link: "https://docs.rs/actix/latest/actix/" },
    Tokio: { stars: 4, link: glossary.tokio.link },
    Diesel: { stars: 4, link: "https://docs.rs/diesel/latest/diesel/" },
    Wasm: { stars: 5 },
    Rustc: { stars: 5, link: "https://github.com/rust-lang/rust" },
    CLI: { stars: 3 },
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
    "RTK Query": { stars: 4 }
}
const other = {
    Linux: { stars: 4 },
    Git: { stars: 4 },
    GitHub: { stars: 4, link: "https://github.com/10takla" },
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


export type Book = [string, string, string] | [string, string]
export const books: Array<Book> = [
    ["The Rust Programming Language",
        "https://doc.rust-lang.org/book/"
    ],
    ["The Rust Reference",
        "https://doc.rust-lang.org/reference/"
    ],
    ["Rust Atomics and Locks. Low-Level Concurrency in Practice",
        "https://marabos.nl/atomics/",
        "https://marabos.nl/atomics/cover.jpg"
    ],
    ["Asynchronous Programming in Rust",
        "https://rust-lang.github.io/async-book/"
    ],
    ["The Cargo Book",
        "https://doc.rust-lang.org/cargo/",
    ],
    ["The Little Book of Rust Macros",
        "https://veykril.github.io/tlborm/"
    ],
    ["Rust 🦀 and WebAssembly 🕸",
        "https://rustwasm.github.io/book/"
    ],
    ["Rust By Example",
        "https://doc.rust-lang.org/rust-by-example/"
    ],
    ["The rustdoc book",
        "https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html"
    ],
    [
        "Чистый код. Создание, анализ и рефакторинг",
        "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
        "https://content.img-gorod.ru/pim/products/images/5a/d8/019078a6-1495-7d9c-b59d-99614d315ad8.jpg?width=0&height=1200&fit=bounds"
    ],
    [
        "Rust Compiler Development Guide",
        "https://rustc-dev-guide.rust-lang.org/"
    ],
    [
        "The `wasm-bindgen` Guide",
        "https://rustwasm.github.io/wasm-bindgen/"
    ]
];
