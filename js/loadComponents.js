document.addEventListener("DOMContentLoaded", () => {

    loadComponent(
        "components/navbar.html",
        "#navbar-container"
    );

    loadComponent(
        "components/footer.html",
        "#footer-container"
    );

});

async function loadComponent(file, element) {

    try {

        const response = await fetch(file);

        const data = await response.text();

        document.querySelector(element).innerHTML = data;

    } catch (error) {

        console.error(
            `Error cargando componente: ${file}`,
            error
        );

    }

}