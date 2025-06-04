// JavaScript Otimizado - Portfolio Kauê
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que tudo carregou
    setTimeout(() => {
        try {
            // Inicializar todas as funcionalidades com tratamento de erro
            initNavigation();
            initAnimations();
            initSkillsAnimation();
            initContactForm();
            initShowMoreFAQ();
            initFAQToggle();
            initFAQFilters();
            initParticles();
            initScrollEffects();
            initCounters();
            initLazyLoading();
            initCountdown();
            addUrgentAnimations();
            initHeroAnimations();
            initHeroButtonsNotifications();
            initFAQ();
            initContact();
            initCharCounter();
            
            console.log('✅ Todas as funcionalidades foram inicializadas com sucesso!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
        }
    }, 100);
});

// Navegação suave
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu mobile - usando as classes corretas do HTML
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos animáveis
    const animatedElements = document.querySelectorAll('.skill-card, .service-card, .faq-item, .contact-method');
    animatedElements.forEach(el => observer.observe(el));
}

// Animação das barras de habilidades
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-fill');
                const percentage = progressBar.getAttribute('data-percentage');
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Inicialização do formulário de contato
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capturar dados do formulário
        const formData = new FormData(form);
        const nome = formData.get('nome') || '[Nome não informado]';
        const email = formData.get('email') || '';
        const indicacao = formData.get('indicacao') || '';
        const empresa = formData.get('empresa') || '';
        const referencias = formData.get('referencias') || '';
        const servico = getServiceText(formData.get('servico'));
        const orcamento = getBudgetText(formData.get('orcamento'));
        const prazo = getDeadlineText(formData.get('prazo'));
        const prioridade = getPriorityText(formData.get('prioridade'));
        const descricao = formData.get('descricao') || '[Descrição não informada]';
        
        // Montar mensagem personalizada no formato solicitado
        let mensagemWhatsApp = `Oii Kauê!

Me chamo ${nome} e estou entrando em contato para discutir um projeto de ${servico}.

Para este projeto, meu orçamento estimado é de ${orcamento}. Gostaria que a entrega fosse realizada em até ${prazo}.

A prioridade para a conclusão deste projeto é ${prioridade}.

A seguir, apresento uma breve descrição do que preciso: ${descricao}



Informações adicionais:`;

        // Adicionar informações adicionais apenas se preenchidas
        if (referencias) {
            mensagemWhatsApp += `\n\n[Referências ou Links]: ${referencias}`;
        }

        if (empresa) {
            mensagemWhatsApp += `\n\n[Empresa/Organização]: ${empresa}`;
        }

        if (indicacao) {
            mensagemWhatsApp += `\n\n[Indicação]: ${indicacao}`;
        }

        if (email) {
            mensagemWhatsApp += `\n\n[E-mail para contato]: ${email}`;
        }

        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
        
        // Número do WhatsApp
        const numeroWhatsApp = '5511963755370';
        
        // Criar URL do WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
        
        // Mostrar loading no botão
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando para WhatsApp...';
        submitBtn.disabled = true;
        
        // Redirecionar para WhatsApp após delay
        setTimeout(() => {
            window.open(urlWhatsApp, '_blank');
            
            // Mostrar mensagem de sucesso
            showSuccessMessage();
            
            // Limpar formulário
            form.reset();
            
            // Resetar contador de caracteres
            const charCounter = document.getElementById('char-count');
            if (charCounter) {
                charCounter.textContent = '0';
                const charCounterContainer = charCounter.parentElement;
                if (charCounterContainer) {
                    charCounterContainer.classList.remove('warning', 'danger');
                }
            }
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log da mensagem para debug
            console.log('Mensagem enviada para WhatsApp:', mensagemWhatsApp);
            console.log('URL gerada:', urlWhatsApp);
        }, 1500);
    });
}

// Função para converter código do serviço em texto legível
function getServiceText(serviceCode) {
    const services = {
        'landing-page': 'Landing Page',
        'ecommerce': 'E-commerce',
        'redesign': 'Redesign de Site',
        'manutencao': 'Manutenção/Suporte',
        'website-completo': 'Website Completo',
        'design-grafico': 'Design Gráfico',
        'edicao-videos': 'Edição de Vídeos'
    };
    return services[serviceCode] || serviceCode || '[Tipo de serviço não informado]';
}

// Função para converter código do orçamento em texto legível
function getBudgetText(budgetCode) {
    const budgets = {
        'ate-1000': 'Até R$ 1.000',
        '1000-3000': 'R$ 1.000 - R$ 3.000',
        '3000-5000': 'R$ 3.000 - R$ 5.000',
        '5000-10000': 'R$ 5.000 - R$ 10.000',
        'acima-10000': 'Acima de R$ 10.000',
        'a-definir': 'A definir'
    };
    return budgets[budgetCode] || budgetCode || '[Orçamento não informado]';
}

// Função para converter código do prazo em texto legível
function getDeadlineText(deadlineCode) {
    const deadlines = {
        'urgente': 'Urgente (até 1 semana)',
        'rapido': 'Rápido (1-2 semanas)',
        'normal': 'Normal (2-4 semanas)',
        'flexivel': 'Flexível (1-2 meses)',
        'sem-pressa': 'Sem pressa (acima de 2 meses)'
    };
    return deadlines[deadlineCode] || deadlineCode || '[Prazo não informado]';
}

// Função para converter código da prioridade em texto legível
function getPriorityText(priorityCode) {
    const priorities = {
        'baixa': 'Baixa - Posso aguardar',
        'media': 'Média - Importante mas não urgente',
        'alta': 'Alta - Preciso em breve',
        'critica': 'Crítica - Extremamente urgente'
    };
    return priorities[priorityCode] || priorityCode || '[Prioridade não informada]';
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Redirecionando para WhatsApp...</span>
        </div>
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// FAQ - Ver mais perguntas
function initShowMoreFAQ() {
    const showMoreBtn = document.getElementById('show-more-faq');
    const additionalSection = document.getElementById('additional-questions');
    const btnText = showMoreBtn?.querySelector('.btn-text');
    const btnIcon = showMoreBtn?.querySelector('i');
    
    if (!showMoreBtn || !additionalSection) {
        console.log('Elementos FAQ não encontrados');
        return;
    }
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Mostrar perguntas adicionais
            additionalSection.style.display = 'contents';
            
            // Animar entrada das perguntas
            const additionalItems = additionalSection.querySelectorAll('.additional-item');
            additionalItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
            
            // Atualizar botão
            if (btnText) btnText.textContent = 'Ver menos perguntas';
            if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
            showMoreBtn.classList.add('expanded');
            
        } else {
            // Esconder perguntas adicionais
            const additionalItems = additionalSection.querySelectorAll('.additional-item');
            additionalItems.forEach(item => {
                item.classList.remove('show');
            });
            
            setTimeout(() => {
                additionalSection.style.display = 'none';
            }, 300);
            
            // Restaurar botão
            if (btnText) btnText.textContent = 'Ver mais perguntas';
            if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
            showMoreBtn.classList.remove('expanded');
        }
    });
    
    // Inicializar funcionalidade de toggle das perguntas FAQ
    initFAQToggle();
    
    // Inicializar filtros do FAQ
    initFAQFilters();
    
    console.log('FAQ "Ver mais perguntas" inicializado com sucesso');
}

// Funcionalidade de toggle das perguntas FAQ
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fechar todas as outras perguntas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle da pergunta atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Funcionalidade de filtros do FAQ
function initFAQFilters() {
    const filterButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    const additionalItems = document.querySelectorAll('.additional-item');
    const showMoreBtn = document.getElementById('show-more-faq');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Atualizar botões ativos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar perguntas principais
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Filtrar perguntas adicionais
            let hasVisibleAdditionalItems = false;
            additionalItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    hasVisibleAdditionalItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Mostrar/esconder botão "Ver mais" baseado no filtro
            if (showMoreBtn) {
                if (category === 'all' || hasVisibleAdditionalItems) {
                    showMoreBtn.style.display = 'flex';
                } else {
                    showMoreBtn.style.display = 'none';
                    // Se o botão estava expandido, recolher
                    if (showMoreBtn.classList.contains('expanded')) {
                        showMoreBtn.click();
                    }
                }
            }
            
            // Atualizar contador de perguntas no botão "Ver mais"
            updateShowMoreCounter(category);
        });
    });
    
    console.log('Filtros FAQ inicializados com sucesso');
}

// Atualizar contador de perguntas no botão "Ver mais"
function updateShowMoreCounter(category) {
    const showMoreInfo = document.querySelector('.show-more-info span');
    const additionalItems = document.querySelectorAll('.additional-item');
    
    if (!showMoreInfo) return;
    
    let visibleCount = 0;
    additionalItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            visibleCount++;
        }
    });
    
    if (visibleCount > 0) {
        showMoreInfo.textContent = `Mais ${visibleCount} pergunta${visibleCount > 1 ? 's' : ''} disponível${visibleCount > 1 ? 'eis' : ''}`;
    } else {
        showMoreInfo.textContent = 'Nenhuma pergunta adicional';
    }
}

// Sistema de partículas
function initParticles() {
    try {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) {
            console.log('⚠️ Container de partículas não encontrado');
            return;
        }

        const particles = particleContainer.querySelectorAll('.particle');
        
        if (particles.length === 0) {
            console.log('⚠️ Nenhuma partícula encontrada');
            return;
        }

        // Animar partículas com CSS em vez de JavaScript para melhor performance
        particles.forEach((particle, index) => {
            try {
                const delay = index * 0.5;
                const duration = 15 + Math.random() * 10;
                
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                particle.classList.add('particle-animated');
            } catch (error) {
                console.error('❌ Erro na animação da partícula:', error);
            }
        });
        
        console.log('✅ Partículas inicializadas!');
    } catch (error) {
        console.error('❌ Erro na inicialização das partículas:', error);
    }
}

// Efeitos de scroll
function initScrollEffects() {
    try {
        const debouncedScrollHandler = debounce(() => {
            try {
                updateScrollEffects();
            } catch (error) {
                console.error('❌ Erro nos efeitos de scroll:', error);
            }
        }, 10);

        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax para elementos específicos
            const parallaxElements = document.querySelectorAll('.parallax-element');
            parallaxElements.forEach(element => {
                try {
                    element.style.transform = `translateY(${rate}px)`;
                } catch (error) {
                    console.error('❌ Erro no parallax:', error);
                }
            });
            
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrolled > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }

        // Usar requestAnimationFrame para melhor performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    try {
                        updateScrollEffects();
                    } catch (error) {
                        console.error('❌ Erro no requestTick:', error);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
        
        console.log('✅ Efeitos de scroll inicializados!');
    } catch (error) {
        console.error('❌ Erro na inicialização dos efeitos de scroll:', error);
    }
}

// Funções utilitárias
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos inline para garantir funcionamento
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Cores baseadas no tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2196F3, #0b7dda)';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Função para animar contadores - Versão Compatível
function animateCounter(element, target, duration = 2000) {
    try {
        if (!element) return;
        
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter() {
            try {
                const currentTime = performance.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(start + (target - start) * progress);
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            } catch (error) {
                console.error('❌ Erro na animação do contador:', error);
                // Fallback: mostrar valor final
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    } catch (error) {
        console.error('❌ Erro na inicialização do contador:', error);
        // Fallback: mostrar valor final
        if (element) element.textContent = target;
    }
}

// Inicializar contadores - Versão Compatível
function initCounters() {
    try {
        const counters = document.querySelectorAll('[data-target]');
        
        if (counters.length === 0) {
            console.log('⚠️ Nenhum contador encontrado');
            return;
        }

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        console.log('✅ Contadores inicializados com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização dos contadores:', error);
        // Fallback: mostrar valores finais
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            counter.textContent = target;
        });
    }
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy Loading - Versão Compatível
function initLazyLoading() {
    try {
        // Verificar se IntersectionObserver está disponível
        if (!('IntersectionObserver' in window)) {
            console.log('⚠️ IntersectionObserver não suportado, carregando todas as imagens');
            // Fallback: carregar todas as imagens imediatamente
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
            return;
        }

        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length === 0) {
            console.log('⚠️ Nenhuma imagem lazy encontrada');
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
        
        console.log('✅ Lazy loading inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro no lazy loading:', error);
        // Fallback: carregar todas as imagens
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Função debounce - Versão Compatível
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            try {
                func(...args);
            } catch (error) {
                console.error('❌ Erro na função debounced:', error);
            }
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cronômetro da Super Promoção - Versão Compatível
function initCountdown() {
    try {
        // Verificar se os elementos existem
        const hoursElement = document.querySelector('.hours .time-value');
        const minutesElement = document.querySelector('.minutes .time-value');
        const secondsElement = document.querySelector('.seconds .time-value');
        
        if (!hoursElement || !minutesElement || !secondsElement) {
            console.log('⚠️ Elementos do cronômetro não encontrados');
            return;
        }

        // Verificar se localStorage está disponível
        let savedTime;
        let endTime;
        
        try {
            savedTime = localStorage.getItem('promoCountdown');
        } catch (e) {
            console.log('⚠️ localStorage não disponível, usando sessão temporária');
            savedTime = null;
        }
        
        if (savedTime) {
            endTime = parseInt(savedTime);
        } else {
            // Define 1 hora e 30 minutos (90 minutos) a partir de agora
            endTime = Date.now() + (90 * 60 * 1000);
            try {
                localStorage.setItem('promoCountdown', endTime.toString());
            } catch (e) {
                console.log('⚠️ Não foi possível salvar no localStorage');
            }
        }
        
        function updateCountdown() {
            try {
                const now = Date.now();
                const timeLeft = endTime - now;
                
                if (timeLeft <= 0) {
                    // Tempo esgotado - reinicia o cronômetro
                    endTime = Date.now() + (90 * 60 * 1000);
                    try {
                        localStorage.setItem('promoCountdown', endTime.toString());
                    } catch (e) {
                        // Ignorar erro do localStorage
                    }
                    return updateCountdown();
                }
                
                // Calcula horas, minutos e segundos
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                // Atualiza os elementos do DOM com verificação
                if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
                if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
                if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
                
                // Adiciona efeito visual quando o tempo está acabando (últimos 10 minutos)
                if (timeLeft <= 10 * 60 * 1000) {
                    const countdownContainer = document.querySelector('.countdown-container');
                    if (countdownContainer) {
                        countdownContainer.classList.add('countdown-urgent');
                    }
                }
                
                // Adiciona efeito de piscar nos últimos 60 segundos
                if (timeLeft <= 60 * 1000) {
                    const timeUnits = document.querySelectorAll('.time-unit');
                    timeUnits.forEach(unit => {
                        unit.classList.add('countdown-critical');
                    });
                }
            } catch (error) {
                console.error('❌ Erro no updateCountdown:', error);
            }
        }
        
        // Atualiza imediatamente
        updateCountdown();
        
        // Atualiza a cada segundo
        setInterval(updateCountdown, 1000);
        
        console.log('✅ Cronômetro inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização do cronômetro:', error);
    }
}

// Adiciona as animações CSS para urgência - Versão Compatível
function addUrgentAnimations() {
    try {
        // Verificar se já existe o estilo
        if (document.getElementById('urgent-animations')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'urgent-animations';
        style.textContent = `
            /* Animações de urgência do cronômetro */
            .countdown-urgent {
                animation: urgentPulse 1s ease-in-out infinite !important;
                border: 2px solid rgba(255, 107, 107, 0.5) !important;
            }
            
            .countdown-critical {
                animation: urgentBlink 0.5s ease-in-out infinite !important;
                background: rgba(255, 107, 107, 0.2) !important;
            }
            
            @keyframes urgentPulse {
                0%, 100% { 
                    transform: scale(1);
                    box-shadow: 0 25px 50px rgba(255, 107, 107, 0.3);
                }
                50% { 
                    transform: scale(1.02);
                    box-shadow: 0 30px 60px rgba(255, 107, 107, 0.5);
                }
            }
            
            @keyframes urgentBlink {
                0%, 50% { 
                    background: rgba(255, 107, 107, 0.3) !important;
                    border-color: rgba(255, 107, 107, 0.5) !important;
                }
                51%, 100% { 
                    background: rgba(255, 255, 255, 0.2) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                }
            }
            
            /* Fallback para navegadores mais antigos */
            @media (prefers-reduced-motion: reduce) {
                .countdown-urgent,
                .countdown-critical {
                    animation: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Animações de urgência adicionadas com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao adicionar animações de urgência:', error);
    }
}

// ===== NOVAS ANIMAÇÕES DO HERO - Versão Compatível =====
function initHeroAnimations() {
    try {
        initRoleRotation();
        initTypingEffect();
        console.log('✅ Animações do hero inicializadas!');
    } catch (error) {
        console.error('❌ Erro nas animações do hero:', error);
    }
}

// Animação de rotação dos roles - Versão Compatível
function initRoleRotation() {
    try {
        const roleTexts = document.querySelectorAll('.role-text');
        if (roleTexts.length === 0) {
            console.log('⚠️ Elementos .role-text não encontrados');
            return;
        }
        
        let currentIndex = 0;
        
        function rotateRoles() {
            try {
                // Remove active de todos
                roleTexts.forEach((role) => {
                    role.classList.remove('active');
                });
                
                // Próximo índice
                currentIndex = (currentIndex + 1) % roleTexts.length;
                
                // Adiciona active ao próximo após um delay
                setTimeout(() => {
                    if (roleTexts[currentIndex]) {
                        roleTexts[currentIndex].classList.add('active');
                    }
                }, 300);
            } catch (error) {
                console.error('❌ Erro na rotação de roles:', error);
            }
        }
        
        // Garantir que o primeiro está ativo
        if (roleTexts[0]) {
            roleTexts[0].classList.add('active');
        }
        
        // Iniciar rotação após 3 segundos
        setInterval(rotateRoles, 3000);
        
        console.log('✅ Rotação de roles inicializada!');
    } catch (error) {
        console.error('❌ Erro na inicialização da rotação de roles:', error);
    }
}

// Efeito de digitação para o nome - Versão Compatível
function initTypingEffect() {
    try {
        const nameText = document.querySelector('.name-text');
        if (!nameText) {
            console.log('⚠️ Elemento .name-text não encontrado');
            return;
        }
        
        const originalText = nameText.textContent;
        nameText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            try {
                if (i < originalText.length) {
                    nameText.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 150);
                }
            } catch (error) {
                console.error('❌ Erro no efeito de digitação:', error);
                // Fallback: mostrar texto completo
                nameText.textContent = originalText;
            }
        }
        
        // Iniciar após um pequeno delay
        setTimeout(typeWriter, 1000);
        
        console.log('✅ Efeito de digitação inicializado!');
    } catch (error) {
        console.error('❌ Erro na inicialização do efeito de digitação:', error);
    }
}

// Função para inicializar notificações dos botões do hero
function initHeroButtonsNotifications() {
    // Seleciona todos os botões da seção hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const socialLinks = document.querySelectorAll('.social-links .social-link');
    
    // Adiciona evento de clique para os botões principais
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            showNotification('🔧 Botão em manutenção! Em breve estará disponível.', 'warning');
        });
    });
    
    // Adiciona evento de clique para os links sociais
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform') || 'social';
            
            // Permite que Instagram e WhatsApp funcionem normalmente
            if (platform === 'instagram' || platform === 'whatsapp') {
                // Não previne o comportamento padrão - deixa o link funcionar
                return;
            }
            
            // Para outros links sociais, mostra notificação de manutenção
            e.preventDefault();
            showNotification(`🔧 Link ${platform} em manutenção! Em breve estará disponível.`, 'warning');
        });
    });
}

console.log('🚀 Portfolio Kauê - JavaScript otimizado carregado com sucesso!');

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');
    const showMoreBtn = document.getElementById('show-more-faq');
    const additionalQuestions = document.getElementById('additional-questions');

    // FAQ Item Toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.question-toggle i');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.question-toggle i');
                    otherAnswer.style.maxHeight = '0';
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Category Filter
    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.dataset.category;
            
            // Update active category
            faqCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');

            // Filter FAQ items
            faqItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    item.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Close all open answers when filtering
            faqItems.forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const toggle = item.querySelector('.question-toggle i');
                answer.style.maxHeight = '0';
                toggle.style.transform = 'rotate(0deg)';
            });
        });
    });

    // Show More Button
    if (showMoreBtn && additionalQuestions) {
        showMoreBtn.addEventListener('click', () => {
            const isShowing = additionalQuestions.classList.contains('show');
            const btnText = showMoreBtn.querySelector('.btn-text');
            const btnIcon = showMoreBtn.querySelector('i');
            
            if (isShowing) {
                // Hide additional questions
                additionalQuestions.classList.remove('show');
                additionalQuestions.style.display = 'none';
                btnText.textContent = 'Ver mais perguntas';
                btnIcon.style.transform = 'rotate(0deg)';
                
                // Scroll to FAQ section
                document.querySelector('.faq').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Show additional questions
                additionalQuestions.style.display = 'grid';
                setTimeout(() => {
                    additionalQuestions.classList.add('show');
                }, 50);
                btnText.textContent = 'Ver menos perguntas';
                btnIcon.style.transform = 'rotate(180deg)';
                
                // Animate additional items
                const additionalItems = additionalQuestions.querySelectorAll('.additional-item');
                additionalItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }

    // FAQ Stats Animation on Scroll
    const faqStats = document.querySelectorAll('.faq-stat');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const number = stat.querySelector('h4');
                const finalNumber = number.textContent;
                
                // Animate number counting
                animateNumber(number, finalNumber);
                
                // Add animation class
                stat.classList.add('animate');
            }
        });
    }, observerOptions);

    faqStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('h4').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Animate numbers in stats
function animateNumber(element, finalNumber) {
    const isPercentage = finalNumber.includes('%');
    const isPlus = finalNumber.includes('+');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 30);
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = currentNumber.toString();
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        if (finalNumber.includes('h')) displayValue += 'h';
        
        element.textContent = displayValue;
    }, 50);
}

// FAQ Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close all open FAQ items
        const openItems = document.querySelectorAll('.faq-item.active');
        openItems.forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.question-toggle i');
            answer.style.maxHeight = '0';
            toggle.style.transform = 'rotate(0deg)';
        });
    }
});

// FAQ Analytics (optional - for tracking popular questions)
function trackFAQInteraction(questionText, action) {
    // This can be integrated with Google Analytics or other tracking services
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', {
            'event_category': 'FAQ',
            'event_label': questionText,
            'value': action === 'open' ? 1 : 0
        });
    }
}

// Add smooth scrolling for FAQ links
document.querySelectorAll('a[href="#faq"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#faq').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// FAQ Print Functionality
function printFAQ() {
    const faqContent = document.querySelector('.faq').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>FAQ - Perguntas Frequentes</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .faq-item { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                .faq-question h4 { color: #333; margin-bottom: 10px; }
                .faq-answer { color: #666; line-height: 1.6; }
                .faq-stats, .faq-categories, .question-toggle, .faq-cta { display: none; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <h1>Perguntas Frequentes</h1>
            ${faqContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ===== FUNCIONALIDADES DA SEÇÃO DE CONTATO =====

// Inicializar seção de contato
function initContact() {
    initContactCounters();
    initContactAnimations();
    initContactValidation();
    initCharCounter();
}

// Animação dos contadores de estatísticas
function initContactCounters() {
    const contactStats = document.querySelectorAll('.contact-stat h4[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateContactCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    contactStats.forEach(stat => observer.observe(stat));
}

// Animar contador individual
function animateContactCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const isPercentage = element.parentElement.textContent.includes('%');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(current);
        element.textContent = isPercentage ? `${displayValue}%` : displayValue;
    }, 16);
}

// Validação de campo individual
function validateContactField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    
    clearContactFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showContactFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showContactFieldError(field, 'Digite um e-mail válido');
            return false;
        }
    }
    
    if (field.id === 'descricao' && value.length < 20) {
        showContactFieldError(field, 'Descreva seu projeto com pelo menos 20 caracteres');
        return false;
    }
    
    fieldGroup.classList.add('valid');
    return true;
}

// Mostrar erro no campo
function showContactFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.add('error');
    fieldGroup.classList.remove('valid');
    
    const existingError = fieldGroup.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    fieldGroup.appendChild(errorElement);
    
    field.style.borderColor = '#ff4757';
    field.style.boxShadow = '0 0 10px rgba(255, 71, 87, 0.3)';
}

// Limpar erro do campo
function clearContactFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.remove('error');
    
    const errorElement = fieldGroup.querySelector('.field-error');
    if (errorElement) errorElement.remove();
    
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

// Formatação automática do telefone
function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
        } else if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    event.target.value = value;
}

// Auto-resize do textarea
function autoResizeTextarea(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    
    // Atualizar contador de caracteres se existir
    if (textarea.id === 'descricao') {
        updateCharCounter(textarea);
    }
}

// Atualizar contador de caracteres
function updateCharCounter(textarea) {
    const charCounter = document.getElementById('char-count');
    if (!charCounter) return;
    
    const currentLength = textarea.value.length;
    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
    
    // Apenas atualizar o número atual, não o formato completo
    charCounter.textContent = currentLength;
    
    // Remover classes anteriores
    const charCounterContainer = charCounter.parentElement;
    if (charCounterContainer) {
        charCounterContainer.classList.remove('warning', 'danger');
        
        // Adicionar classes baseadas no limite
        if (currentLength > maxLength * 0.9) {
            charCounterContainer.classList.add('danger');
        } else if (currentLength > maxLength * 0.7) {
            charCounterContainer.classList.add('warning');
        }
    }
}

// Inicializar contador de caracteres
function initCharCounter() {
    const textarea = document.getElementById('descricao');
    if (!textarea) return;
    
    // Adicionar evento de input para atualizar contador em tempo real
    textarea.addEventListener('input', function() {
        updateCharCounter(this);
    });
    
    // Inicializar contador
    updateCharCounter(textarea);
}

// Animações da seção de contato
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in-up');
    });
    
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    const statusDots = document.querySelectorAll('.status-dot, .availability-dot');
    statusDots.forEach(dot => {
        setInterval(() => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    });
}

// Validação avançada do formulário
function initContactValidation() {
    const validationStyles = `
        <style>
        .form-group.valid input,
        .form-group.valid select,
        .form-group.valid textarea {
            border-color: #2ed573;
            box-shadow: 0 0 10px rgba(46, 213, 115, 0.3);
        }
        
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #ff4757;
            box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
        }
        
        .field-error {
            color: #ff4757;
            font-size: 0.85rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .field-error::before {
            content: '⚠️';
            font-size: 0.8rem;
        }
        
        .contact-success-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .success-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            animation: slideInUp 0.4s ease;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #2ed573;
            margin-bottom: 20px;
        }
        
        .success-content h3 {
            color: #ffffff;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .success-content p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .success-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .contact-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 15px 20px;
            color: white;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
        }
        
        .contact-notification.show {
            transform: translateX(0);
        }
        
        .contact-notification.error {
            border-color: rgba(255, 71, 87, 0.5);
            background: rgba(255, 71, 87, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', validationStyles);
} 