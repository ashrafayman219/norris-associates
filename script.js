// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===========================
// Sticky Navigation
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Animated Counter
// ===========================
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats-section') && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    
    observer.observe(card);
});

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceCards.forEach(card => cardObserver.observe(card));

// Observe service area items
const serviceAreaItemsForAnimation = document.querySelectorAll('.service-area-item');
serviceAreaItemsForAnimation.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.5s ease ${index * 0.03}s`;
    
    const serviceAreaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    
    serviceAreaObserver.observe(item);
});

// Observe digital service items (legacy)
const digitalServiceItems = document.querySelectorAll('.digital-service-item');
digitalServiceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    
    const digitalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    digitalObserver.observe(item);
});

// Observe affiliation logos
const affiliationLogos = document.querySelectorAll('.affiliation-logo');
affiliationLogos.forEach((logo, index) => {
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    logo.style.transition = `all 0.5s ease ${index * 0.05}s`;
    
    const affiliationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    affiliationObserver.observe(logo);
});

// Observe feature items
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    featureObserver.observe(item);
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you within 24 hours.');
    
    // Reset form
    contactForm.reset();
});

// ===========================
// Parallax Effect for Hero
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Active Navigation Link
// ===========================
const observeSections = () => {
    const sections = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
};

observeSections();

// ===========================
// Lazy Loading Images
// ===========================
const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// Testimonial Card Hover Effect
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Page Load Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Scroll to Top on Page Reload
// ===========================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ===========================
// Dynamic Year in Footer
// ===========================
const updateFooterYear = () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Norris Associates Technologies, LLC. All rights reserved.`;
    }
};

updateFooterYear();

console.log('Norris Associates Technologies - Website Loaded Successfully');


// ===========================
// Service Area Modal
// ===========================
const serviceModal = document.getElementById('serviceModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalBackdrop = document.querySelector('.modal-backdrop');

// Service descriptions
const serviceData = {
    'Cell Phone': {
        image: './assets/81SSw14XZHL._AC_SL1500_-151x300.jpg',
        description: `<p>Cell phones store stunning amounts of evidence. If you don't take advantage of that evidence, you may rest assured your Opposing Counsel will. But like traditional mystery stories, they do not "give up their secrets" easily.</p>
            <p>Our firm uses multiple software tools to extract and analyze available data, often combining it with data from cell phone provider records and Internet Service Provider records as well.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'GPS': {
        image: './assets/GPS-300x200.png',
        description: `<p>GPS records are often vital to critical evidence. While a primary source of GPS data is cell phones, such data is also stored in computers, automotive Event Data Recorders and independent GPS systems, telephone company records, and digital photos, as well as many others.</p>
            <p>Our firm is equipped to examine, analyze, and interpret GPS data of value to a case from many sources, and we have assisted numerous clients in this way.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Email': {
        image: './assets/Gmail-157x300.png',
        description: `<p>Email records are often key evidence in court cases. Email evidence requires retrieval, including retrieval of deleted emails, authentication, and analysis. Often, analysis requires coordination with both the email provider and also the phone company or Internet Service Provider. It may be necessary to retrieve emails from mobile devices or computers as well.</p>
            <p>We've been working with email cases for many years. Yes, we can help!</p>
            <p>Don't hesitate – <a href="tel:+1-805-962-7703">the call is free!</a></p>`
    },
    'Text Messages': {
        image: './assets/TextMessages-182x300.png',
        description: `<p>Text messages have been a part of the communications landscape for a long time… since 1992. They often contain crucial evidence. But retrieving them can be difficult, since retention policies vary from provider to provider. As with so many other digital evidence channels, the use of text message evidence may require retrieving them from a mobile device or a computer and may required coordination with both the phone service provider and the internet Service Provider.</p>
            <p>We've been working with email cases for many years. Yes, we can help!</p>
            <p>Don't hesitate – <a href="tel:+1-805-962-7703">the call is free!</a></p>`
    },
    'Social Media': {
        image: './assets/Facebook-logo-300x300.png',
        description: `<p>Social media started off as a way to chat with friends.</p>
            <p>Who knew it would be used as a tool for human trafficking, money laundering, extortion, warfare, and disinformation?</p>
            <p>We share your concern. Every single one of these cases is unique. If you have one of these cases on your desk, let's talk.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Computers and Drives, Including Damaged Drives': {
        image: './assets/DriveCopy.png',
        description: `<p>A dear friend of ours, a 15-year veteran homicide investigator, once observed "You know, when I was a rookie cop, it was all about expended shell casings and fingerprints. Now, it's all about storage media!"</p>
            <p>Computers, devices, and storage media are the dominant force on the evidence landscape today. And they require loving care as much as any evidence in history.</p>
            <p>DO NOT EVEN THINK of looking at an evidence drive yourself. That would be like carrying DNA evidence around in your lunchbox! By the same token, if a drive reports dead, don't be alarmed. That's normally due to a bad stepper motor on the internal arm, not a genuine loss of data… we can generally recover the data. And just because a file isn't there anymore, that doesn't necessarily mean it's lost.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Fraud and Data Hacks': {
        image: './assets/ecommerce-fraud-arm-out-of-screen-feature.jpg',
        description: `<p>Every new technology is a new place to contribute to the USA's ONE TRILLION DOLLAR FRAUD INDUSTRY. From backdated files to counterfeit PDFs to faked invoices to more other items than either of us can count, fraud goes with computers like Bonnie went with Clyde.</p>
            <p>We've worked with our share of fraud, from inflated lawnmower wholesale invoices to church salary fraud to counterfeit DVDs</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Auto and Truck Accidents and Forensics': {
        image: './assets/IMG_0768-scaled.jpg',
        description: `<p>Both of our principals rebuilt engines as teenagers. Back then, there were manual chokes, you could tune your car with two screwdrivers, and you got about 12 MPG.</p>
            <p>One of us, Robert, spent the next 43 years operating a 14-person auto repair firm, served on California state automotive boards and commissions, and has virtually every diagnostic license there is.</p>
            <p>Many people are not aware that a modern car has MULTIPLE computers inside, including specialized ones for the seat belts and air bags, for a total of more compute power in a single car than the first moon landings. Reading those records is a bit like decoding the Rosetta Stone. But the results of doing so – and integrating the results with maintenance records, vehicle inspections, and, yes, possibly cell phone records, can make the difference in court.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Security Camera Systems Including Data Recovery From Damaged Devices': {
        image: './assets/SecurityCamera-300x300.jpg',
        description: `<p>If you thought all there was to a security camera was pushing a few buttons and exporting data to a thumb drive, think again.</p>
            <p>Those files you can't find? They might actually still be there. What if the system is damaged? We can probably still get the data. Is your statement good enough to withstand withering questions from Opposing Counsel? Hmmm.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Forensic Analysis of Video and Audio Data': {
        image: './assets/Example1SelectionwithTime.png',
        description: `<p>Who REALLY was that on the video? Was that the actual person you think it was, or was it an imposter? Can we make this voice recording more clear?</p>
            <p>We do spectral, image analysis, and AI analysis of video and audio records!</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Analysis of Photographs and Metadata': {
        image: './assets/MIT-Metadata-Encryption-01_0.jpg',
        description: `<p>Many people are surprised to discover that – buried within a photo itself – is a host of valuable information ranging from the GPS coordinates at the time the snap was taken to the lens type and focal length. Or, it might be fake. If that's important to your case…</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Photogrammetry – Measurements Made from Photos and Videos': {
        image: './assets/Photogrammetry.jpg',
        description: `<p>Little things mean a lot. For example, if the elevator car came to rest MORE than 1/2 inch from the floor when the woman tripped and fell and sustained life altering injuries, the award would be MUCH larger. But how do you compute that from a surveillance video when physical access to the elevator is denied? Ask us… we'd love to tell you. Or ask about the construction site accident resulting from improper berms where the photo evidence was, to put it mildly, amateurish. Or – was that vehicle in the accident REALLY part of a large firm's national fleet, or was it just a close look-alike?</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Forensic Animation Videos: Re-Creating Critical Events Based on Forensic Data': {
        image: './assets/InjuryVideo.png',
        description: `<p>In any case involving complex movement [a "kinetic" case], where any part of the movement is in question, there is no finer method to fully explain to a jury what happened than to create an animation of the event. Known as "Forensic Videos", these typically 10-second videos depict such things as injury details, automobile trajectories, gunshot wounds, public transit accidents, slip-and-fall dynamics, and related items. They are done to the highest standards of accuracy and impartiality. And the costs are surprisingly reasonable.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'LiDAR': {
        image: './assets/LiDAR.png',
        description: `<p>An acronym for Light Detection And Ranging, LiDAR is a technology for creating a "point cloud" of 3 dimensional measurements that can capture a 3D image of a scene, ranging from an accident to a building, with typically 1 millimeter accuracy and billions of points. It's widely and successfully used in the process of evidence collection and display. We'd love to discuss it with you!</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'General Aviation': {
        image: './assets/AircraftCrash.png',
        description: `<p>Flying can make you feel as free as a bird, but, hey, stuff happens to birds and people alike. In his salad years, our Principal Scientist, Wayne, was the owner of a Cessna Aircraft dealership, an aircraft Fixed Base Operation ["FBO"], and the Chief Pilot of a charter airline operating under Federal Aviation Regulation Part 135. An airline transport rated pilot and former flight instructor, he graduated 35 students for a range of licenses. He's contributed to cases involving aircraft appraisals, pilot error, and aircraft operations.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Business Analysis and Valuations': {
        image: './assets/BusinessAnalysis.png',
        description: `<p>Both Wayne and Robert have owned businesses for a collective total of more than 80 years.</p>
            <p>Robert owned an automotive repair firm for 43 years prior to selling it to a Fortune 500 company.</p>
            <p>Wayne is a serial entrepreneur who has owned a small airline, a restaurant, and a consulting firm. A trained accountant, he served as the President and CFO of a Ukrainian-American software firm he took public before the US SEC in 2005. He also served as the Vice President of an aircraft flight simulator company and as the Chief Scientist of a nuclear counterterrorism research laboratory that won several million-dollar contracts from the US House Armed Services Committee and the Joint Improvised Explosive Device Defeat Organization. [JIEDDO]. He is also a former contract Project Management instructor for several customers, including the US Navy.</p>
            <p>In a word, we've got you covered for business analysis and valuations.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Patents': {
        image: './assets/Patents-300x180.png',
        description: `<p>We can help you!</p>
            <p>Wayne holds seven granted patents, six provisionals, and has authored two others, in the areas of neutron and gamma ray physics, less-than-lethal pistol ammunition, financial technology, real estate office processes, and remote identification of mobile lottery purchasers. He has also advised inventors on jam-resistant CAN bus architecture for military vehicles.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Software Copyrights': {
        image: './assets/Copyright-Protection-for-Software.png',
        description: `<p>We can help you!</p>
            <p>Wayne has performed both validation and valuation analyses for 8 related software patent cases in the courts of several states and also US Federal District Court in Denver, as one of the first two experts to testify in a long running case with 400 defendants. He cited as authorities IRS publications, AICPA SOPs, and AVA procedures, using both comparable sales, cost-to-construct, and related costing algorithms.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    },
    'Human Terrain Mapping': {
        image: './assets/maxresdefault.jpg',
        description: `<p>We can help you!</p>
            <p>Human Terrain Mapping ["HTM"] is a Directed-Graph based presentation modality for creating network images of complex human situations, typically involved in areas such as criminal and civil securities and insurance fraud, money laundering, human trafficking, the narcotics trade, weapons sales, and terrorism.</p>
            <p>Wayne was one of the first software developers of an early system, CNA ["Criminal Network Analysis"], which was used by the National Counterterrorism Center to track the movements of mastermind Timothy McVeigh, and by the FBI to solve what at the time was the US's largest insurance fraud case and also the US's largest stolen car ring. Wayne acted as the support engineer for the FBI. He later used the current best of breed HTM software, IBM's i2 Analysts' Notebook, in a complex murder conspiracy case in California.</p>
            <p><a href="tel:+1-805-962-7703">Don't hesitate – the call is free!</a></p>`
    }
};

// Add click listeners to all service area items
const serviceAreaItems = document.querySelectorAll('.service-area-item');
serviceAreaItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
        const serviceName = this.querySelector('.service-area-name').textContent;
        const serviceInfo = serviceData[serviceName];
        
        if (serviceInfo) {
            modalImage.src = serviceInfo.image;
            modalImage.alt = serviceName;
            modalTitle.textContent = serviceName;
            modalDescription.innerHTML = serviceInfo.description;
            
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal handlers
const closeModal = () => {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        closeModal();
    }
});

console.log('Service Area Modal - Loaded Successfully');

// ===========================
// FAQs Accordion
// ===========================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        accordionItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

console.log('FAQs Accordion - Loaded Successfully');

// ===========================
// Team Member Read More Modal
// ===========================
const teamModal = document.getElementById('teamModal');
const teamModalClose = document.getElementById('teamModalClose');
const teamModalTitle = document.getElementById('teamModalTitle');
const teamModalDescription = document.getElementById('teamModalDescription');
const teamModalBackdrop = teamModal.querySelector('.modal-backdrop');
const readMoreButtons = document.querySelectorAll('.read-more-btn');

// Team member extended bios
const teamBios = {
    'wayne': {
        name: 'Wayne B. Norris - Principal Scientist',
        bio: `<p>Wayne has a broad range of experience in numerous technical and non-technical disciplines.</p>
            <p>Wayne has served as an expert witness in more than 110 cases since 1986 in State and Federal courts, including the $1.7 billion Microsoft et al vs Commissioner of Internal Revenue from 1997-99, where he served as the US Government's chief expert witness in software development.</p>
            <p>Prior to spending full time on his expert witness practice, he served as the CEO of Precision Simulations, a forensic video firm, in 2017. He previously served as a cybersecurity manager and project management instructor for the US Navy at Port Hueneme.</p>
            <p>From 2005 to 2010 he served as the Chief Scientist for SEDS, LLC, a nuclear research firm developing thermal neutron and gamma ray technologies for detecting hidden non-nuclear and nuclear weapons in theater. During this time he delivered more than 50 invited talks, primarily in the Washington, DC area, to industry, defense, national security, and Congressional and Senate groups and was interviewed regarding counterterrorism on Anderson Cooper 360.</p>
            <p>From 2003 to 2005, he served as President and CFO of a 130-person Ukrainian American software company, which he took public before the US Securities and Exchange Commission in 2005.</p>
            <p>Wayne holds a BA degree from the University of California in Santa Barbara and is also university trained as an accountant to the standards required for CPA designation, though he has not completed the certification. He holds certifications as a Project Management Professional, as a US Government Security Manager, and as a Hazardous Materials Operator, from the University of Texas at Austin. He holds an Airline Transport Pilot Certificate from the FAA and is a former Certificated Flight Instructor.</p>`
    },
    'robert': {
        name: 'Robert Ayers - Senior Analyst',
        bio: `<p>Robert Ayers, prior to becoming an Expert Witness and joining Norris-Technologies and Associates, was President and CEO of Golden Reflections, Ayers Automotive Repairs, a premiere automotive services business in Santa Barbara, California for 43 years.</p>
            <p>The company had several locations and performed a broad spectrum of automotive services, primarily high-end diagnostic service on European and domestic vehicles. Mr. Ayers also maintains California State Certifications as a Licensed Smog Inspector and Repair Technician, as well as a Licensed Brake and Lamp Inspection and Repair Technician. He is an ASE multiple Master Certified Technician, a licensed VSP technician, certified in handicapped vehicle lift operations.</p>
            <p>As an Expert Witness, Mr. Ayers has completed and is certified as a Magnet DVR Examiner, Magnet Certified Video Examiner. He is also well versed in the use of Magnet Axiom Cyber, Exterro FTK and FTK Imager, Autopsy from the Sleuth Kit, Video Cleaner, and uses Logic Cube – Falcon Neo and Talon Ultimate for forensic imaging, as well as using Cellebrite, plus a multitude of other tools. He continues to keep his technical and business skills current by attending classes at Santa Barbara City College, Coursera, and industry seminars.</p>
            <p>Mr. Ayers holds a pilot's license and the newest in Coast Guard Safe Boaters Certifications for California, Nevada, and Arizona. He has been an avid photographer since his youth. Over the years he has been extremely involved in the training of youth in the community through the Santa Barbara School District Partners in Education Programs. He has also been in active in promoting a positive public image of the independent automotive aftermarket through positions with the Automotive Service Councils of California, Independent Professionals Association, Automotive Service Association, and other community groups.</p>
            <p>For additional credentials please see Mr. Ayers' CV Report.</p>`
    },
    'nikki': {
        name: 'Nikki Ayers - Senior Analyst',
        bio: `<p>Nikki Ayers, prior to joining Norris-Technologies and Associates, was the CFO of Golden Reflections, Ayers Automotive Repairs, a premier automotive services company in Santa Barbara, California for 43 years.</p>
            <p>Mrs. Ayers managed the operations and HR aspects of the business, bringing extensive experience in financial management, business operations, and organizational administration.</p>
            <p>In addition to her work and studies, Nikki is committed to helping develop youth in the independent automotive aftermarket find not only jobs, but also developing great skills in the process. She has worked many years with programs like the Partners in Education, especially encouraging young woman to become part of the industry as technicians and service writers. She sits on many community boards including the oldest woman's organization in Santa Barbara, the Santa Barbara Associates, as Past President. She is a founder, and Executive Director of the Independent Automotive Professionals Assn. of CA, she is a current board member of California Automotive Business Coalition (Cal ABC) – who helped stop the Trevor Law Group from abusing small businesses with wrongful lawsuits, past Board Member of Small Business Coalition of California, founder and past board member of Coalition of Labor, Agriculture and Business (COLAB) of Santa Barbara County. Mrs. Ayers currently holds a seat on the California Bureau of Automotive Repair's Advisory Group and the Employment Development Department's Small Business Advisory Committee.</p>`
    }
};

// Add click listeners to Read More buttons
readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        const memberKey = this.getAttribute('data-member');
        const memberData = teamBios[memberKey];
        
        if (memberData) {
            teamModalTitle.textContent = memberData.name;
            teamModalDescription.innerHTML = memberData.bio;
            
            teamModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close team modal handlers
const closeTeamModal = () => {
    teamModal.classList.remove('active');
    document.body.style.overflow = '';
};

teamModalClose.addEventListener('click', closeTeamModal);
teamModalBackdrop.addEventListener('click', closeTeamModal);

// Close on Escape key for team modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && teamModal.classList.contains('active')) {
        closeTeamModal();
    }
});

console.log('Team Member Modal - Loaded Successfully');

// ===========================
// Service Coverage Map
// ===========================
// Declare map as global variable for zoom controls
let coverageMapInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists
    const mapContainer = document.getElementById('coverageMap');
    if (!mapContainer) return;
    
    // Initialize map centered on USA
    coverageMapInstance = L.map('coverageMap', {
        center: [39.8283, -98.5795],
        zoom: 4,
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true
    });
    
    // Add clean tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(coverageMapInstance);
    
    // Custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="marker-pin">
            <span class="marker-star">★</span>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });
    
    // Case stories data
    const caseStories = {
        'microsoft': {
            title: 'Microsoft et al vs Commissioner of Internal Revenue',
            location: 'Washington, DC',
            badge: 'Federal Court',
            subtitle: '$1.7 Billion Landmark Victory',
            challenge: 'Complex software development valuation dispute requiring expert testimony on software engineering practices and development methodologies.',
            solution: 'Provided comprehensive expert analysis of software development processes, code valuation, and industry standards.',
            outcome: 'Served as Chief Expert Witness for the US Government, contributing to successful resolution of the case.',
            technologies: ['Software Valuation', 'Code Analysis', 'Development Practices', 'Industry Standards'],
            duration: '1997-1999',
            stats: [
                { number: '$1.7B', label: 'Case Value' },
                { number: '2+', label: 'Years' }
            ]
        },
        'forensics': {
            title: 'Major Digital Forensics Investigation',
            location: 'Los Angeles, CA',
            badge: 'State & Federal Courts',
            subtitle: 'Complex Multi-Device Analysis',
            challenge: 'Critical case requiring analysis of multiple mobile devices, computers, and storage media with strict chain of custody requirements.',
            solution: 'Conducted comprehensive forensic imaging and analysis using industry-standard tools. Recovered deleted data and provided detailed timeline reconstruction.',
            outcome: 'Expert testimony accepted by court. Evidence analysis contributed to successful case resolution.',
            technologies: ['Mobile Forensics', 'Data Recovery', 'Timeline Analysis', 'Chain of Custody'],
            duration: 'Recent',
            stats: [
                { number: '15+', label: 'Devices Analyzed' },
                { number: '1TB+', label: 'Data Processed' }
            ]
        }
    };
    
    // Major case locations
    const caseLocations = [
        {
            coords: [37.7749, -122.4194],
            title: 'San Francisco, CA',
            description: 'Federal District Court - Major software litigation',
            type: 'Federal Court',
            storyId: null
        },
        {
            coords: [34.4208, -119.6982],
            title: 'Santa Barbara, CA',
            description: 'Headquarters - Multiple state court testimonies',
            type: 'Headquarters',
            storyId: null
        },
        {
            coords: [34.0522, -118.2437],
            title: 'Los Angeles, CA',
            description: 'State & Federal Courts - Major case victories',
            type: 'Federal Court',
            storyId: 'forensics',
            hasStory: true
        },
        {
            coords: [39.7392, -104.9903],
            title: 'Denver, CO',
            description: 'Federal District Court - Software patent case',
            type: 'Federal Court',
            storyId: null
        },
        {
            coords: [40.7128, -74.0060],
            title: 'New York, NY',
            description: 'Federal & State Courts - Expert testimony',
            type: 'Federal Court',
            storyId: null
        },
        {
            coords: [38.9072, -77.0369],
            title: 'Washington, DC',
            description: 'US Government - Chief expert witness testimony',
            type: 'Federal Court',
            storyId: 'microsoft',
            hasStory: true
        },
        {
            coords: [41.8781, -87.6298],
            title: 'Chicago, IL',
            description: 'Federal District Court - Technology litigation',
            type: 'Federal Court',
            storyId: null
        },
        {
            coords: [29.7604, -95.3698],
            title: 'Houston, TX',
            description: 'State Court - Automotive forensics',
            type: 'State Court',
            storyId: null
        },
        {
            coords: [33.4484, -112.0740],
            title: 'Phoenix, AZ',
            description: 'State Court - Digital forensics',
            type: 'State Court',
            storyId: null
        }
    ];
    
    // Create custom tooltip div
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-map-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    
    let currentMarker = null;
    let tooltipTimeout = null;
    
    // Case story panel
    const storyPanel = document.getElementById('caseStoryPanel');
    const storyContent = document.getElementById('storyContent');
    const storyClose = document.getElementById('storyClose');
    
    function showCaseStory(storyId) {
        const story = caseStories[storyId];
        if (!story) return;
        
        storyContent.innerHTML = `
            <div class="story-hero">
                <span class="story-badge">${story.badge}</span>
                <h2 class="story-title">${story.title}</h2>
                <p class="story-subtitle">${story.subtitle}</p>
            </div>
            
            <div class="story-section">
                <h3 class="story-section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    The Challenge
                </h3>
                <div class="story-section-content">
                    <p>${story.challenge}</p>
                </div>
            </div>
            
            <div class="story-section">
                <h3 class="story-section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Our Solution
                </h3>
                <div class="story-section-content">
                    <p>${story.solution}</p>
                </div>
            </div>
            
            <div class="story-section">
                <h3 class="story-section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Outcome
                </h3>
                <div class="story-section-content">
                    <p>${story.outcome}</p>
                </div>
            </div>
            
            ${story.stats ? `
                <div class="story-stats">
                    ${story.stats.map(stat => `
                        <div class="story-stat">
                            <div class="story-stat-number">${stat.number}</div>
                            <div class="story-stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="story-section">
                <h3 class="story-section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    Technologies & Expertise
                </h3>
                <ul class="story-list">
                    ${story.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            
            <div class="story-cta">
                <a href="#contact" class="btn btn-primary">Discuss Your Case</a>
            </div>
        `;
        
        storyPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCaseStory() {
        storyPanel.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    storyClose.addEventListener('click', closeCaseStory);
    storyPanel.addEventListener('click', function(e) {
        if (e.target === storyPanel) {
            closeCaseStory();
        }
    });
    
    // Add markers with improved hover handling
    caseLocations.forEach(location => {
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(coverageMapInstance);
        const markerElement = marker.getElement();
        
        // Improved hover handling
        markerElement.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
            currentMarker = marker;
            markerElement.classList.add('marker-active');
            
            const point = coverageMapInstance.latLngToContainerPoint(location.coords);
            const mapRect = mapContainer.getBoundingClientRect();
            
            const viewStoryBadge = location.hasStory ? `
                <div class="tooltip-story-badge" onclick="event.stopPropagation();" style="cursor: pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    <span>Click to view case story</span>
                </div>
            ` : '';
            
            tooltip.innerHTML = `
                <div class="tooltip-type">${location.type}</div>
                <div class="tooltip-title">${location.title}</div>
                <div class="tooltip-description">${location.description}</div>
                ${viewStoryBadge}
            `;
            
            tooltip.style.left = (mapRect.left + point.x) + 'px';
            tooltip.style.top = (mapRect.top + point.y - 20) + 'px';
            tooltip.style.display = 'block';
            
            requestAnimationFrame(() => {
                tooltip.classList.add('show');
                
                // Add click handler to story badge
                if (location.hasStory) {
                    const storyBadge = tooltip.querySelector('.tooltip-story-badge');
                    if (storyBadge) {
                        storyBadge.onclick = function(e) {
                            e.stopPropagation();
                            showCaseStory(location.storyId);
                            tooltip.classList.remove('show');
                            setTimeout(() => {
                                tooltip.style.display = 'none';
                            }, 300);
                        };
                    }
                }
            });
        });
        
        markerElement.addEventListener('mouseleave', function() {
            markerElement.classList.remove('marker-active');
            currentMarker = null;
            
            tooltipTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (!currentMarker && !tooltip.matches(':hover')) {
                        tooltip.style.display = 'none';
                    }
                }, 300);
            }, 100);
        });
        
        // Keep tooltip visible when hovering over it
        tooltip.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 300);
        });
        
        // Click handler
        marker.on('click', function() {
            if (location.hasStory && location.storyId) {
                showCaseStory(location.storyId);
            } else {
                coverageMapInstance.flyTo(location.coords, 8, {
                    duration: 1.5,
                    easeLinearity: 0.25
                });
            }
        });
    });
    
    // Animate map stats when in viewport
    const mapStatNumbers = document.querySelectorAll('.map-stat-number[data-map-target]');
    
    const animateMapStats = () => {
        mapStatNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-map-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateStat();
        });
    };
    
    // Observer for map section
    const mapSection = document.querySelector('.map-section');
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !mapSection.classList.contains('animated')) {
                mapSection.classList.add('animated');
                animateMapStats();
                
                setTimeout(() => {
                    coverageMapInstance.invalidateSize();
                }, 300);
            }
        });
    }, { threshold: 0.2 });
    
    if (mapSection) {
        mapObserver.observe(mapSection);
    }
    
    console.log('Service Coverage Map with Case Stories - Loaded Successfully');
});


// ===========================
// Map Zoom Controls
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const mapZoomIn = document.getElementById('mapZoomIn');
    const mapZoomOut = document.getElementById('mapZoomOut');
    const mapReset = document.getElementById('mapReset');
    
    // Wait for map to be initialized
    const waitForMap = setInterval(() => {
        if (typeof coverageMapInstance !== 'undefined' && coverageMapInstance) {
            clearInterval(waitForMap);
            
            // Store initial view for reset
            const initialView = {
                center: [39.8283, -98.5795],
                zoom: 4
            };
            
            // Zoom In
            if (mapZoomIn) {
                mapZoomIn.addEventListener('click', () => {
                    coverageMapInstance.zoomIn(1, { animate: true, duration: 0.3 });
                });
            }
            
            // Zoom Out
            if (mapZoomOut) {
                mapZoomOut.addEventListener('click', () => {
                    coverageMapInstance.zoomOut(1, { animate: true, duration: 0.3 });
                });
            }
            
            // Reset View
            if (mapReset) {
                mapReset.addEventListener('click', () => {
                    coverageMapInstance.flyTo(initialView.center, initialView.zoom, {
                        duration: 1.5,
                        easeLinearity: 0.25
                    });
                });
            }
            
            // Enable scroll wheel zoom
            coverageMapInstance.scrollWheelZoom.enable();
            
            console.log('Map Zoom Controls - Loaded Successfully');
        }
    }, 100);
});

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('Back to Top Button - Loaded Successfully');
}
