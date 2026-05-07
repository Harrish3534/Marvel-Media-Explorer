document.addEventListener("DOMContentLoaded", function () {

    // ===== SEARCH FUNCTION (STABLE + SMOOTH) =====
    const searchInput = document.getElementById("search");
    const cards = document.querySelectorAll(".card");

    let timeoutMap = new Map();

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {

            let searchValue = searchInput.value.toLowerCase().trim();
            const noResults = document.getElementById("noResults");
            const searchTerm = document.getElementById("searchTerm");

            // ✅ IF EMPTY → RESET ALL
            if (searchValue === "") {
                cards.forEach((card) => {
                    if (timeoutMap.has(card)) {
                        clearTimeout(timeoutMap.get(card));
                        timeoutMap.delete(card);
                    }
                    card.style.display = "block";
                    card.classList.remove("hide");
                });
                if (noResults) noResults.style.display = "none";
                return;
            }

            let visibleCount = 0;

            cards.forEach((card) => {

                const titleElement = card.querySelector(".title");
                if (!titleElement) return;

                const title = titleElement.innerText.toLowerCase();

                // 🔥 CLEAR OLD TIMEOUT
                if (timeoutMap.has(card)) {
                    clearTimeout(timeoutMap.get(card));
                    timeoutMap.delete(card);
                }

                if (title.includes(searchValue)) {

                    // SHOW
                    visibleCount++;
                    card.style.display = "block";

                    requestAnimationFrame(() => {
                        card.classList.remove("hide");
                    });

                } else {

                    // HIDE
                    card.classList.add("hide");

                    const timeout = setTimeout(() => {
                        card.style.display = "none";
                    }, 400);

                    timeoutMap.set(card, timeout);
                }

            });

            // Show / hide "No Results" message
            if (noResults) {
                if (visibleCount === 0) {
                    if (searchTerm) searchTerm.textContent = `"${searchValue}"`;
                    noResults.style.display = "flex";
                } else {
                    noResults.style.display = "none";
                }
            }

        });
    }


 const castList = document.getElementById("castList");
const rightArrow = document.querySelector(".arrow.right");
const leftArrow = document.querySelector(".arrow.left");

if (castList) {

    const scrollAmount = () => {
        const card = castList.querySelector(".cast-card");
        return card ? card.offsetWidth + 20 : 300;
    };

    if (rightArrow) {
        rightArrow.onclick = () => {
            castList.scrollBy({
                left: scrollAmount() * 2,
                behavior: "smooth"
            });
        };
    }

    if (leftArrow) {
        leftArrow.onclick = () => {
            castList.scrollBy({
                left: -(scrollAmount() * 2),
                behavior: "smooth"
            });
        };
    }
}
});