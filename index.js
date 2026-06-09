// =========================================================================
// DATA STRUCTURES (Campaign Focused)
// =========================================================================

// Centralized asset mapping for the 5 campaign products
const CAMPAIGN_PRODUCTS = [
    {
        id: 'almohadon-matero',
        highlight: '🇦🇷 El regalo perfecto para alentar a la Selección',
        name: 'Almohadón Matero Selección Argentina',
        description: 'Ideal para compartir mates durante cada partido. Diseñado con los colores de la bandera argentina y espacio dedicado para termo y mate, combina comodidad, identidad y pasión futbolera.',
        benefits: [
            'Confeccionado en cordura impermeable de alta resistencia',
            'Espacio rígido optimizado para termo, mate y bombilla',
            'Correa regulable reforzada para llevar al hombro cómodamente'
        ],
        price: 24000,
        portada: 'assets/Almohadón Matero Portada.png',
        waMsg: "Hola Achalay! Quisiera comprar el 'Almohadón Matero Selección Argentina' ($24.000) para el Día del Padre."
    },
    {
        id: 'set-matero',
        highlight: '🧉 Para el papá matero de todos los días',
        name: 'Set Matero Premium Selección Argentina',
        description: 'Matera acolchada, termo, mate, bombilla y yerbera en un conjunto elegante y funcional. El compañero ideal para cada mañana, viaje o encuentro familiar.',
        benefits: [
            'Matera bolso acolchada semi-rígida de cuero ecológico',
            'Termo de acero inoxidable de 1 litro con forro combinado',
            'Yerbera, azucarera y mate de alta calidad a juego'
        ],
        price: 65000,
        portada: 'assets/Set Matero Portada.png',
        waMsg: "Hola Achalay! Quisiera comprar el 'Set Matero Premium Selección Argentina' ($65.000) para el Día del Padre."
    },
    {
        id: 'set-asado',
        highlight: '🥩 El aliado infaltable del asador',
        name: 'Set Parrillero Premium',
        description: 'Diseñado para quienes disfrutan del ritual del asado argentino. Incluye cuchillo, tenedor y accesorios presentados en un exclusivo estuche artesanal.',
        benefits: [
            'Cuchillo y tenedor de acero forjado con mango de madera noble',
            'Estuche de cuero legítimo con costuras artesanales de alta durabilidad',
            'Accesorios ideales para asados de campo y familiares'
        ],
        price: 35000,
        portada: 'assets/Set de Asado Portada.png',
        waMsg: "Hola Achalay! Quisiera comprar el 'Set Parrillero Premium' ($35.000) para el Día del Padre."
    },
    {
        id: 'tabla-estrellas',
        highlight: '⭐ La tabla campeona del mundo',
        name: 'Tabla Argentina con 3 Estrellas',
        description: 'Una pieza única inspirada en las tres Copas del Mundo de la Selección. Perfecta para picadas, reuniones y momentos especiales entre amigos y familia.',
        benefits: [
            'Madera maciza de algarrobo pulida y curada',
            'Grabado de relieve de las 3 estrellas de la Selección',
            'Canaleta perimetral profunda para jugos y picadas'
        ],
        price: 35000,
        portada: 'assets/Tabla Portada.png',
        waMsg: "Hola Achalay! Quisiera comprar la 'Tabla Argentina con 3 Estrellas' ($35.000) para el Día del Padre."
    },
    {
        id: 'planchas-hierro',
        highlight: '🍔 Hamburguesas gourmet como un profesional',
        name: 'Tabla con Mini Planchas de Hierro',
        description: 'Ideal para hamburguesas, carnes y presentaciones gourmet. Una propuesta original para sorprender a cualquier amante de la cocina y el asado.',
        benefits: [
            'Mini planchas de hierro fundido de gran retención de calor',
            'Base protectora de madera dura tallada para llevar a la mesa',
            'Apto para hornallas, asadores y hornos directos'
        ],
        price: 39000,
        portada: 'assets/Planchas de Hierro Portada.png',
        waMsg: "Hola Achalay! Quisiera comprar la 'Tabla con Mini Planchas de Hierro' ($39.000) para el Día del Padre."
    }
];

// Contact Info
const WHATSAPP_PHONE = '+543492583841';

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

// Format prices with dots for thousands
function formatCurrency(value) {
    if (!value) return '';
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Generate WhatsApp API Link with custom message
function getWhatsAppLink(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

// Set up event listeners for WhatsApp clicks
function setupWhatsAppLinks() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-wa-msg]');
        if (target) {
            e.preventDefault();
            const rawMsg = target.getAttribute('data-wa-msg');
            const link = getWhatsAppLink(rawMsg);
            window.open(link, '_blank');
        }
    });
}

// =========================================================================
// RENDER CAMPAIGN PRODUCTS (Centered Stack Layout)
// =========================================================================
function renderCampaignProducts() {
    const container = document.getElementById('campaign-products-container');
    if (!container) return;

    container.innerHTML = '';

    CAMPAIGN_PRODUCTS.forEach((product) => {
        let highlightClass = 'product-highlight';
        if (product.highlight.includes('🇦🇷') || product.highlight.includes('Selección') || product.name.includes('Selección')) {
            highlightClass += ' highlight-patria';
        } else if (product.highlight.includes('⭐') || product.highlight.includes('campeona')) {
            highlightClass += ' highlight-stars';
        }
        
        // Build benefits list
        const benefitsHtml = product.benefits.map(benefit => `
            <li>
                <svg class="benefit-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${benefit}</span>
            </li>
        `).join('');

        const blockHtml = `
            <div class="product-card" data-reveal id="${product.id}">
                <!-- Product Image (Aspect-Ratio Consistent) -->
                <div class="product-image-container">
                    <img src="${product.portada}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
                
                <!-- Product Info (Centered Design) -->
                <div class="product-content">
                    <span class="${highlightClass}">${product.highlight}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    
                    <!-- Product-Specific Benefits List -->
                    <ul class="product-specific-benefits">
                        ${benefitsHtml}
                    </ul>
                    
                    <div class="product-price-row">
                        <span class="price-label">Precio Especial:</span>
                        <span class="product-price">${formatCurrency(product.price)}</span>
                    </div>
                    
                    <button class="btn btn-whatsapp btn-large" data-wa-msg="${product.waMsg}">
                        <svg class="icon" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.994 9.994 0 0 0 4.779 1.21h.005c5.505 0 9.988-4.479 9.989-9.985A9.998 9.998 0 0 0 12.012 2zm5.748 13.917c-.244.688-1.22 1.259-1.684 1.309-.452.05-.889.261-2.915-.544-2.438-.967-3.992-3.444-4.113-3.606-.122-.162-.993-1.32-.993-2.518s.629-1.788.853-2.032c.224-.244.488-.305.65-.305s.325.002.467.008c.147.006.345-.056.541.424.203.497.694 1.694.755 1.816.061.122.102.264.02.427-.081.162-.122.264-.244.406-.122.142-.256.317-.366.427-.122.122-.25.254-.108.497.142.244.63 1.036 1.35 1.674.928.824 1.711 1.077 1.955 1.199.244.122.386.102.467.008.081-.094.345-.406.467-.609.122-.203.244-.162.406-.102.162.061 1.036.488 1.22.579.183.091.305.142.345.224.041.081.041.467-.203 1.155z" fill="currentColor"/></svg>
                        Comprar por WhatsApp
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', blockHtml);
    });
}

// =========================================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// =========================================================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// =========================================================================
// HERO PARALLAX
// =========================================================================
function initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg-media img');
    const heroContent = document.querySelector('.hero-content');
    
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollOffset = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrollOffset * 0.4}px) scale(${1 + scrollOffset * 0.0005})`;
        if (heroContent) {
            heroContent.style.opacity = 1 - (scrollOffset / 750);
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// =========================================================================
// INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderCampaignProducts();
    setupWhatsAppLinks();
    initMobileMenu();
    initScrollAnimations();
    initHeroParallax();
});
