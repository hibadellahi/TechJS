interface Book {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: string;
    format: string;
    price: number;
    suggestedBy: string;
    finished: boolean;
}

const form = document.getElementById("bookForm") as HTMLFormElement;
const booksList = document.getElementById("booksList") as HTMLDivElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const book: Book = {
        title: (document.getElementById("title") as HTMLInputElement).value,
        author: (document.getElementById("author") as HTMLInputElement).value,
        pages: Number((document.getElementById("pages") as HTMLInputElement).value),
        pagesRead: Number((document.getElementById("pagesRead") as HTMLInputElement).value),
        status: (document.getElementById("status") as HTMLSelectElement).value,
        format: (document.getElementById("format") as HTMLSelectElement).value,
        price: Number((document.getElementById("price") as HTMLInputElement).value),
        suggestedBy: (document.getElementById("suggestedBy") as HTMLInputElement).value,
        finished: false
    };

    const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(book)
    });

    const savedBook = await res.json();
    displayBooks();
});

async function displayBooks() {
    const res = await fetch("http://localhost:3000/api/books");
    const books: Book[] = await res.json();

    booksList.innerHTML = books.map(book => `
        <div class="bg-white p-4 rounded shadow mb-4">
            <h2 class="font-bold text-xl">${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages} | Pages Read: ${book.pagesRead}</p>
            <p>Status: ${book.status} | Format: ${book.format}</p>
            <p>Suggested By: ${book.suggestedBy} | Finished: ${book.finished}</p>
            <p>Progress: ${((book.pagesRead / book.pages) * 100).toFixed(2)}%</p>
        </div>
    `).join('');
}

displayBooks();
