// ==============================
// Smooth Active Navigation
// ==============================

const typingText = document.getElementById("typing-text");

if (typingText) {

    const roles = [
        "Formal Verification Engineer",
        "Assertion-Based Verification",
        "SystemVerilog Assertions",
        "FPV | ABV | Protocol Verification"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {

        const currentRole = roles[roleIndex];
        const visibleText = currentRole.substring(0, charIndex);

        typingText.textContent = visibleText;

        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
        }
        else if (isDeleting && charIndex > 0) {
            charIndex--;
        }
        else if (!isDeleting) {
            isDeleting = true;
            setTimeout(typeRole, 1200);
            return;
        }
        else {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        const speed = isDeleting ? 45 : 85;
        setTimeout(typeRole, speed);

    }

    typeRole();

}

const navLinks = document.querySelectorAll(".nav-menu a");
const sections = Array.from(document.querySelectorAll("section")).filter(section => {

    return document.querySelector(`.nav-menu a[href="#${section.id}"]`);

});

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==============================
// Navbar Shrink
// ==============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.style.height = "70px";
        navbar.style.background = "rgba(5,8,22,.92)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    }
    else{

        navbar.style.height = "82px";
        navbar.style.background = "rgba(10,20,40,.45)";
        navbar.style.boxShadow = "none";

    }

});

// ==============================
// Scroll To Top Button
// ==============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.onclick = () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

};

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.opacity="1";
        topBtn.style.pointerEvents="auto";

    }
    else{

        topBtn.style.opacity="0";
        topBtn.style.pointerEvents="none";

    }

});

// ==============================
// Dark / Light Mode
// ==============================

const moon = document.querySelector(".nav-icons");

moon.addEventListener("click",()=>{

    document.body.classList.toggle("light-mode");

});

// ==============================
// Professional Highlights Counter
// ==============================

const highlightsSection = document.querySelector(".highlights");
const highlightCards = document.querySelectorAll(".highlight-card");
const highlightValues = document.querySelectorAll(".highlight-value");

function animateHighlightValue(valueElement) {

    const target = Number(valueElement.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function updateValue(currentTime) {

        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(progress * target);

        valueElement.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
        else {
            valueElement.textContent = target;
        }

    }

    requestAnimationFrame(updateValue);

}

if (highlightsSection && "IntersectionObserver" in window) {

    const highlightsObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                highlightCards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 90}ms`;
                    card.classList.add("active");
                });

                highlightValues.forEach(animateHighlightValue);

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold:.35
    });

    highlightsObserver.observe(highlightsSection);

}
else {

    highlightCards.forEach(card => card.classList.add("active"));
    highlightValues.forEach(value => {
        value.textContent = value.dataset.target;
    });

}

// ==========================
// Scroll Reveal
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section=>{

        const windowHeight=window.innerHeight;

        const revealTop=section.getBoundingClientRect().top;

        const revealPoint=120;

        if(revealTop<windowHeight-revealPoint){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealSections);

revealSections();
