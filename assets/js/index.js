// ^ Write your JavaScript code here
var rootHTMLTag = document.documentElement;
var mainContent = document.getElementById('main-content');
var navHeader = document.getElementById('header');

/**/
/*========================================DOM Elements======================================================*/
/*1- Light & Dark Model */
var htmlElement = document.querySelector('html');
var themeToggleButton = document.getElementById('theme-toggle-button');

//=========
/*2- Nav Links */
var navLinksSection = document.querySelector('.nav-links');
var mobileMenuBtn = document.querySelector(".mobile-menu-btn");
//=========
/*3- All Sections Scroll Spy */
var sections = document.querySelectorAll('section');
var navLinksAnchorTage = document.querySelectorAll('.nav-links a');

var portfolioFilterButtons = document.querySelectorAll('.portfolio-filter');
var portfolioItems = document.querySelectorAll('.portfolio-item');

//=========
//4- carousel
var testimonialsCarousel = document.getElementById('testimonials-carousel');
var nextTestimonial = document.getElementById('next-testimonial');
var prevTestimonial = document.getElementById('prev-testimonial');
var carouselIndicators = document.querySelectorAll('.carousel-indicator');
var testimonialCards = document.querySelectorAll('.testimonial-card');
var translateValue = 0;
var carouselCurrentIndex = 0;

//=========
//5- Customize Your Website
var settingsToggle = document.getElementById('settings-toggle');
var closeSettings = document.getElementById('close-settings');
var settingsSidebar = document.getElementById('settings-sidebar');
//5- Fonts
var fontOptions = document.querySelectorAll('.font-option')
var colorThemesBtns = document.querySelectorAll('.color-theme');

var resetSettingsBtn = document.getElementById('reset-settings');


//=========
//6-scroll-to-top
var scrollTopBtn = document.getElementById('scroll-to-top');

/* Run scroll spy once on page load
=> to highlight the correct section (hero section by default) */
updateScrollSpy();




/*========================================Functions======================================================*/
//1. ScrollSpy
function updateScrollSpy() {
    /**
 * - Detects which section is currently visible in the viewport
 * - Adds "active" class to the corresponding navigation link
 * - Removes "active" class from all other links
 */

    var currentSection = '';
    sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 88; // Offset for fixed navbar height
        var sectionHeight = section.offsetHeight;

        // Check if the current scroll position is within this section
        if (pageYOffset >= sectionTop && pageYOffset <= sectionTop + sectionHeight) {
            //    if (pageYOffset >= sectionTop - sectionHeight / 3) {

            currentSection = section.getAttribute('id');

            /* 6- Scroll to top*/
            if (currentSection != 'header' && currentSection != 'hero-section') {
                scrollTopBtn.classList.remove('opacity-0', 'invisible');
                scrollTopBtn.classList.add('opacity-100', 'visible');
            }
            else {
                scrollTopBtn.classList.remove('opacity-100', 'visible');
                scrollTopBtn.classList.add('opacity-0', 'invisible');
            }
        }
    });

    // Loop through all nav links
    // Activate the link that matches the current section
    navLinksAnchorTage.forEach(function (navTag) {
        navTag.classList.remove('active');
        if (navTag.getAttribute('href') === '#' + currentSection) {
            navTag.classList.add('active');
        }
    });
}

/*3. Portfolio*/
function UpdatePortfolioSection() {
    for (var i = 0; i < portfolioFilterButtons.length; i++) {
        portfolioFilterButtons[i].addEventListener('click', function (e) {
            //set all buttons-> Default style
            for (var k = 0; k < portfolioFilterButtons.length; k++) {
                portfolioFilterButtons[k].className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700`;
            }
            //Clicked button-> Active
            e.target.className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 active bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50`;
            var clickedBtn = e.target.getAttribute('data-filter');
            //hida all portfolio-items
            portfolioItems.forEach(item => {
                item.classList.remove('portfolio-show');
                item.classList.add('portfolio-hide');
            }); //b3ml el animation : opacity: 0 , scale 0.8 bs homa lsa wa5den mkan fy el page
            // b3d 0.3s h3ml display:none
            // w ashof el 3nasr el tanya azhrha
            setTimeout(function () {
                portfolioItems.forEach(item => {
                    if (clickedBtn === 'all' || clickedBtn === item.getAttribute('data-category')) {
                        item.style.display = 'block' //add it to tha page -- bs lsa mo5tfy bsbb opacity: 0 , scale 0.8
                        item.classList.add('portfolio-show');
                        item.classList.remove('portfolio-hide');
                    }
                    else {
                        item.style.display = 'none';
                    }
                })
            }, 350)

        });//end of ecent Listener

    }
}

// function UpdatePortfolioSection() {
//     portfolioFilterButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // إزالة active من كل الأزرار
//             portfolioFilterButtons.forEach(btn => btn.className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700`);
//             button.className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 active bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50`;

//             const filter = button.getAttribute('data-filter');

//             // إظهار أو إخفاء العناصر
//             portfolioItems.forEach(item => {
//                 if (filter === 'all' || item.getAttribute('data-category') === filter) {
//                     item.style.cssText = `display: block;`;
//                 } else {
//                     item.style = `display: none;`;
//                 }
//             });
//         });
//     });
// }
//-------------------------------------
/*testimonialsCarousel*/
//4.changeCarousel
function changeCarousel() {
    if (window.innerWidth >= 1024) {
        translateValue = 100 / 3; // lg
    } else if (window.innerWidth >= 640) {
        translateValue = 100 / 2; // sm
    } else {
        translateValue = 100 / 1; // mobile
    }
    if (carouselCurrentIndex >= carouselIndicators.length) {
        carouselCurrentIndex = 0;
    }
    if (carouselCurrentIndex < 0) {
        carouselCurrentIndex = 3;
    }
    testimonialsCarousel.style.transform = `translateX(${translateValue * carouselCurrentIndex}%)`
    carouselIndicators.forEach(btn => {
        btn.classList.remove('bg-accent', 'scale-125');
        btn.classList.add('bg-slate-400', 'dark:bg-slate-600');
    }
    );
    carouselIndicators[carouselCurrentIndex].classList.add('bg-accent', 'scale-125');
    carouselIndicators[carouselCurrentIndex].classList.remove('bg-slate-400', 'dark:bg-slate-600');
}

//5.Customize Your Website
function closeSidebar() {
    settingsToggle.classList.add('right-0');
    settingsToggle.style.right = '0rem';
    settingsSidebar.classList.add('translate-x-full');
    // setTimeout(function () {
    //     settingsSidebar.setAttribute('aria-hidden', 'true');
    // }, 100)

}
function changeFont(selectedFont) {
    document.body.classList.remove(
        'font-alexandria',
        'font-tajawal',
        'font-cairo'
    );
    document.body.classList.add(`font-${selectedFont}`);
}

function changeColorTheme(colorTheme) {
    if (colorTheme === 'default') {
        rootHTMLTag.style.setProperty('--color-primary', '#6366f1');
        rootHTMLTag.style.setProperty('--color-secondary', '#8b5cf6');
        rootHTMLTag.style.setProperty('--color-accent', '#a855f7')
    }
    //  document.documentElement.style.cssText = `--color-primary: #6366f1; --color-secondary: #8b5cf6; --color-accent: #a855f7;`;

    else {
        rootHTMLTag.style.setProperty('--color-primary', colorTheme.getAttribute('data-primary'));
        rootHTMLTag.style.setProperty('--color-secondary', colorTheme.getAttribute('data-secondary'));
        rootHTMLTag.style.setProperty('--color-accent', colorTheme.getAttribute('data-accent'));

        // rootHTMLTag.style.setProperty('--color-primary', '#10b981');
        // rootHTMLTag.style.setProperty('--color-secondary', '#059669');
        // rootHTMLTag.style.setProperty('--color-accent', '#34d399');
    }
}

function setActiveThemeBtn(selectedThemeBtn) {
    //remove border from unselected buttons
    colorThemesBtns.forEach(b =>
        b.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900'));

    //add border to selected button
    selectedThemeBtn.classList.add(
        'ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900'
    );

}

/*Call */
UpdatePortfolioSection();


/*========================================EVENTS======================================================*/

/* 1. Scroll Spy Event
=> Updates active nav link while scrolling */
window.addEventListener('scroll', updateScrollSpy);
//--------------------------------------------------------
/* 2. Light & Dark Model */
themeToggleButton.addEventListener('click', function () {
    htmlElement.classList.toggle('dark');
});

/* Mobile Menu Toggle */
mobileMenuBtn.addEventListener("click", () => {
    navLinksSection.classList.toggle("active");
});

//--------------------------------------------------------
//4.Carousel

carouselIndicators[0].classList.add('bg-accent', 'scale-125');
carouselIndicators[0].classList.remove('bg-slate-400', 'dark:bg-slate-600');
carouselIndicators.forEach(indicator => {
    indicator.addEventListener('click', function (e) {
        carouselIndicators.forEach(btn => {
            btn.classList.remove('bg-accent', 'scale-125');
            btn.classList.add('bg-slate-400', 'dark:bg-slate-600');
        }
        );
        e.target.classList.add('bg-accent', 'scale-125');
        e.target.classList.remove('bg-slate-400', 'dark:bg-slate-600');
        carouselCurrentIndex = Number(e.target.getAttribute('data-index'));
        changeCarousel();
    });
});

nextTestimonial.addEventListener('click', function () {
    carouselCurrentIndex++;
    changeCarousel();
});
prevTestimonial.addEventListener('click', function () {
    carouselCurrentIndex--;
    changeCarousel();
});
//// On screen resize, recalculate cards per view and fix translateX to prevent half-visible cards
window.addEventListener('resize', changeCarousel);
//--------------------------------------------------------

//5. settingsToggle
settingsToggle.addEventListener('click', function () {
    settingsToggle.classList.remove('right-0');
    settingsToggle.style.right = '20rem';
    settingsSidebar.classList.remove('translate-x-full');
    settingsSidebar.setAttribute('aria-hidden', 'false');
});
closeSettings.addEventListener('click', function () {
    closeSidebar();
});
//5. Fonts Options
for (var i = 0; i < fontOptions.length; i++) {
    fontOptions[i].addEventListener('click', function (e) {
        var selectedFont = e.currentTarget.getAttribute('data-font');
        changeFont(selectedFont);
    })
}

for (var i = 0; i < colorThemesBtns.length; i++) {
    colorThemesBtns[i].addEventListener('click', function (e) {
        var selectedColorTheme = e.currentTarget;
        setActiveThemeBtn(selectedColorTheme);
        changeColorTheme(selectedColorTheme);
    })
}
//Theme Color Option
//Reset
resetSettingsBtn.addEventListener('click', function (e) {
    changeFont('tajawal');
    changeColorTheme('default');
    closeSidebar();
});

mainContent.addEventListener('click', function (e) {
    closeSidebar();
});
navHeader.addEventListener('click', function (e) {
    closeSidebar();
});
//--------------------------------------------------------

//6. Scroll To the top
scrollTopBtn.addEventListener('click', function (e) {
    window.scrollTo({ top: 0 });
    //or
    //  document.getElementById('hero-section').scrollIntoView();
})
