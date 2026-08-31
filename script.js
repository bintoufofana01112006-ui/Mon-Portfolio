const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');
const menuLinks = document.querySelectorAll('.lien');
const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('#home, #about, #skills, #projects, #contact');
const revealElements = document.querySelectorAll('.reveal');
const closeModalButton = document.querySelector('.modal-close');

// Toggle menu
menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
});

menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        menu.classList.remove('active');
    });
});

// Change navbar color on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight current section
window.addEventListener('scroll', function() {

    let current = '';

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }

    });

    menuLinks.forEach(function(link) {

        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }

    });

});


// Reveal elements
function revealOnScroll() {

    revealElements.forEach(function(element) {

        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }

    });

}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();


const projects = {
    travel: {
        title: "Fofana-World Travel",
        description: "Un site web dédié au voyage, conçu pour présenter différentes destinations et offrir une expérience de navigation simple et agréable.",
        technologies: ["HTML", "CSS"],
        link: "https://bintoufofana01112006-ui.github.io/Fofana-World-Travel/"
    },

    connectx: {
        title: "ConnectX",
        description: "Un projet SaaS permettant aux utilisateurs de consulter et d'acheter des forfaits de connexion Internet en ligne.",
        technologies: ["HTML", "CSS"],
        link: "https://bintoufofana01112006-ui.github.io/DIGITAL-_ALLIANCE/"
    },

    todo: {
        title: "To-Do List",
        description: "Une application permettant de créer, gérer et suivre ses tâches quotidiennes avec une sauvegarde des données.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://bintoufofana01112006-ui.github.io/My-ToDo-List/"
    }
};
// Open modal
const openModalButtons = document.querySelectorAll('.open-modal');
const modal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalTechnologies = document.querySelector('#modalTechnologies');
const modalLink = document.querySelector('#modalLink');

openModalButtons.forEach(function(button) {

    button.addEventListener('click', function() {

        const projectName = button.dataset.project;
        const project = projects[projectName];

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modalTechnologies.innerHTML = "";

        project.technologies.forEach(function(technology) {

            const technologyElement = document.createElement('span');

            technologyElement.textContent = technology;

            modalTechnologies.appendChild(technologyElement);

        });

        modalLink.href = project.link;

        modal.classList.add('active');

    });

});

// Close modal
closeModalButton.addEventListener('click', function() {
    modal.classList.remove('active');
});
modal.addEventListener('click', function(event) {

    if (event.target === modal) {
        modal.classList.remove('active');
    }

});
document.addEventListener('keydown', function(event) {

    if (event.key === 'Escape') {
        modal.classList.remove('active');
    }

});

// ===============================
// MODE CLAIR / SOMBRE
// ===============================

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Changer le thème
themeToggle.addEventListener('click', function() {

    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {

        // Mode clair
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');

        localStorage.setItem('theme', 'light');

    } else {

        // Mode sombre
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');

        localStorage.setItem('theme', 'dark');
    }

});

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {

            alert("Votre message a bien été envoyé !");

            contactForm.reset();

        } else {

            alert("Une erreur est survenue. Veuillez réessayer.");

        }

    } catch (error) {

        alert("Impossible d'envoyer le message. Vérifiez votre connexion.");

    }

});