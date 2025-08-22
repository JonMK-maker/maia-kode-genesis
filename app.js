// ============== INICIO: Contenido completo para: app.js (Prompts MAPAX+) ==============

document.addEventListener('DOMContentLoaded', async () => {

    let influencers = [];
    let currentLanguage = 'es'; // Track current language

    // Translation system for influencer profiles
    const profileTranslations = {
        es: {
            mainPlatforms: "Plataformas Principales:",
            personality: "Personalidad:",
            aesthetics: "Estética:",
            contentType: "Tipo de Contenido:",
            topLevelReason: "Razón \"Top-Level\":",
            suggestStrategies: "✨ Sugerir Estrategias",
            generateQuestions: "✨ Generar Preguntas",
            analyzeAesthetics: "✨ Analizar Estética",
            audioSummaryTitle: "Generar resumen clave",
            audioSummaryLabel: "Generar resumen de audio para",
            loadingSummary: "Cargando resumen",
            clickForSummary: "Clic 🔊 para resumen."
        },
        en: {
            mainPlatforms: "Main Platforms:",
            personality: "Personality:",
            aesthetics: "Aesthetics:",
            contentType: "Content Type:",
            topLevelReason: "Top-Level Reason:",
            suggestStrategies: "✨ Suggest Strategies",
            generateQuestions: "✨ Generate Questions",
            analyzeAesthetics: "✨ Analyze Aesthetics",
            audioSummaryTitle: "Generate key summary",
            audioSummaryLabel: "Generate audio summary for",
            loadingSummary: "Loading summary",
            clickForSummary: "Click 🔊 for summary."
        }
    };

    // English translations for influencer profile content
    const influencerContentTranslations = {
        emily_calandrelli: {
            personality: "Engineer (MIT), science communicator and TV presenter (Emily's Wonder Lab on Netflix). Enthusiastic, charismatic and excellent at explaining STEM concepts to children and adults. Empathetic and very accessible.",
            esthetics: "Professional, colorful and friendly. Her 'geek-chic' is vibrant and educational, ideal for young audiences and families. Not sexualized.",
            contentType: "Educational TV shows about science, science demonstrations, children's books, talks and social media content that makes science fun and accessible, especially space and engineering.",
            topLevelReason: "Great reach and recognition, especially among families and educators. Her ability to inspire curiosity about STEM in young people is exceptional. Very good communicator."
        },
        cleo_abram: {
            personality: "Technology journalist and video producer. Curious, analytical and excellent communicator. Empathetic when addressing the impact of technology on society. Clear and didactic.",
            esthetics: "Very high quality video production, with a modern, clean and attractive visual style. Sophisticated and professional geek-chic.",
            contentType: "Deep and accessible explanations about complex technologies like AI, nuclear energy, and the future of technology. Expert interviews. Very visual and well-researched format.",
            topLevelReason: "Stands out for the cinematic quality of her explanations and her ability to make very technical topics understandable. Promotes a nuanced understanding of technology."
        },
        kathy_pham: {
            personality: "Software engineer and educator. Friendly and accessible approach to teaching programming concepts.",
            esthetics: "Friendly and accessible style. Clean, educational presentation focused on learning.",
            contentType: "Programming tutorials (Python, JavaScript, etc.). Educational content focused on beginners and skill development.",
            topLevelReason: "Excellent for programming beginners. Clear, methodical teaching approach that makes coding accessible."
        },
        simone_giertz: {
            personality: "The 'Queen of Useless Robots'. Creative, humorous, and innovative approach to engineering projects.",
            esthetics: "Her aesthetic is 'geek-chic' in a very personal and functional way. Workshop-focused, maker aesthetic.",
            contentType: "Educational content about invention, engineering and problem solving through creative, often humorous projects.",
            topLevelReason: "Unique in her niche. Inspires creativity and shows that engineering can be fun and experimental."
        },
        mayuko_inoue: {
            personality: "Software engineer (ex-Netflix, ex-Patreon) who shares her experience. Honest, relatable, and professional.",
            esthetics: "Her style is minimalist and professional 'geek-chic'. Clean, modern presentation.",
            contentType: "Educational content about software development, tech careers, and industry insights.",
            topLevelReason: "Offers an internal and honest view of the tech industry. Great for those pursuing tech careers."
        },
        estefannie_explains_it_all: {
            personality: "Software engineer and maker. Energetic, creative, and passionate about technology and DIY projects.",
            esthetics: "Her aesthetic is colorful, fun and definitely 'geek-chic'. Vibrant, creative presentation style.",
            contentType: "Educational content about electronics, programming, 3D printing, and maker projects.",
            topLevelReason: "Her energy and creativity are very contagious. Makes complex tech topics fun and accessible."
        },
        dianna_cowern: {
            personality: "Science communicator (physics). Professional and accessible approach to science education.",
            esthetics: "Professional and accessible. Clean, educational presentation focused on scientific accuracy.",
            contentType: "High-quality educational content about physics concepts and scientific phenomena.",
            topLevelReason: "One of the most recognized science communicators on YouTube. Excellent at making physics accessible."
        },
        xyla_foxlin: {
            personality: "Mechatronics engineer, entrepreneur and maker. Ambitious, innovative, and inspiring.",
            esthetics: "Her aesthetic is functional and adventurous 'geek-chic'. Workshop and engineering focused.",
            contentType: "Educational content about engineering, manufacturing, entrepreneurship, and large-scale projects.",
            topLevelReason: "Her ambition and the scale of her projects are incredibly inspiring. Shows engineering at its most innovative."
        }
    };

    const platformSVGIcons = {
        "YouTube": `<svg class="w-5 h-5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g><g><path style="fill:#FF0000;" d="M480,180v130c0,55.195-44.805,100-100,100H110c-55.195,0-100-44.805-100-100V180 c0-55.199,44.805-100,100-100h270C435.195,80,480,124.801,480,180z"/></g><g><polygon style="fill:#FFFFFF;" points="320,245 200,295 200,195"/></g></g></svg>`,
        "X (Twitter)": `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512"><g><rect fill="#000000" width="512" height="512" x="0" y="0" ry="105.09948" rx="105.16711" /><path d="m 339.20866,125.98402 h 44.11006 l -96.36741,110.14194 113.36867,149.87853 h -88.76683 l -69.52535,-90.90068 -79.55277,90.90068 h -44.1367 L 221.41293,268.19503 112.65788,125.98402 h 91.02037 l 62.8448,83.08653 z m -15.4812,233.61817 h 24.4419 L 190.39724,150.99939 H 164.1685 Z" fill="#ffffff" /></g></svg>`,
        "Instagram": `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.6-8.299 3.079-1.519 1.499-2.88 3.919-3.08 8.299-.058 1.281-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.2 4.358 1.6 6.78 3.079 8.299 1.499 1.519 3.919 2.88 8.299 3.08 1.28.058 1.688.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.6 8.299-3.08 1.519-1.499 2.88-3.919 3.08-8.299.058-1.28.072-1.688.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.356-1.6-6.78-3.08-8.299-1.499-1.519-3.919-2.88-8.299-3.08C15.668 0 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>`,
        "TikTok": `<svg class="w-5 h-5" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h800v800H0z" fill="#000000"/><path d="M196 498.3l1.6 4.6c-.2-.5-.8-2.1-1.6-4.6zm64.9-104.9c2.9-24.9 12.7-38.8 31.1-53.1 26.4-19.3 59.3-8.4 59.3-8.4V267c8-.2 16 .3 23.9 1.5V352s-32.9-10.9-59.3 8.4c-18.4 14.3-28.2 28.2-31.1 53.1-.1 13.5 2.3 31.2 13.5 46.4-2.8-1.5-5.6-3.2-8.5-5.1-24.5-17.2-29-43.1-28.9-61.4zM511.3 147c-18.1-20.7-25-41.7-27.5-56.4h22.8s-4.5 38.6 28.6 76.5l.5.5c-9-5.8-17.2-12.8-24.4-20.6zm109.9 58.8v81.8s-29.1-1.2-50.7-6.9c-30.1-8-49.4-20.3-49.4-20.3s-13.4-8.8-14.4-9.4v169c0 9.4-2.5 32.9-10 52.5-9.8 25.6-25 42.5-27.8 45.9 0 0-18.5 22.8-51 38.1-29.3 13.8-55.1 13.5-62.8 13.8 0 0-44.5 1.8-84.6-25.3-8.7-6-16.8-12.8-24.2-20.3l.2.2c40.1 27.2 84.6 25.3 84.6 25.3 7.7-.3 33.5 0 62.8-13.8 32.5-15.3 51-38.1 51-38.1 2.8-3.4 18-20.3 27.8-45.9 7.5-19.6 10-43.1 10-52.5V231c1.1.6 14.4 9.4 14.4 9.4s19.3 12.3 49.4 20.3c21.6 5.7 50.7 6.9 50.7 6.9v-64.1c10 2.3 18.5 2.9 24 2.3z" fill="#ee1d52"/><path d="M597.2 203.4v64.1s-29.1-1.2-50.7-6.9c-30.1-8-49.4-20.3-49.4-20.3s-13.4-8.8-14.4-9.4v169c0 9.4-2.5 32.9-10 52.5-9.8 25.6-25 42.5-27.8 45.9 0 0-18.5 22.8-51 38.1-29.3 13.8-55.1 13.5-62.8 13.8 0 0-44.5 1.8-84.6-25.3l-.2-.2c-4.2-4.3-8.2-8.8-11.9-13.5-12.8-16.3-20.6-35.5-22.6-41v-.1c-3.2-9.5-9.8-32.5-8.9-54.6 1.6-39.1 14.8-63.2 18.3-69.2 9.2-16.4 21.3-31.1 35.5-43.4 12.6-10.6 26.9-19.1 42.2-25 16.6-7 34.4-10.7 52.4-11v64.9s-32.9-10.9-59.3 8.4c-18.4 14.3-28.2 28.2-31.1 53.1-.1 18.3 4.4 44.2 29 61.5 2.9 1.9 5.7 3.6 8.5 5.1 4.3 5.8 9.5 10.9 15.5 15.1 24.1 15.9 44.2 17 70 6.7 17.2-6.9 30.1-22.4 36.1-39.7 3.8-10.8 3.7-21.6 3.7-32.8V90.6h60c2.5 14.7 9.3 35.7 27.5 56.4 7.3 7.8 15.5 14.8 24.4 20.6 2.6 2.9 16.1 16.9 33.5 25.6 8.9 4.5 18.4 7.9 28.1 10.2z" fill="#fff"/><g fill="#69c9d0"><path d="M187.9 450.4l1.5 4.3c-.2-.5-.8-2-1.5-4.3z"/><path d="M298.9 278c-15.4 5.9-29.6 14.4-42.2 25-14.3 12.3-26.3 27.1-35.5 43.5-3.5 6-16.7 30-18.3 69.2-.9 22.2 5.8 45.1 8.9 54.6v.1c2 5.4 9.8 24.7 22.6 41 3.7 4.7 7.7 9.2 11.9 13.5-13.6-9.4-25.6-20.7-35.9-33.6-12.7-16.1-20.5-35.2-22.5-40.8v-.2c-3.2-9.5-9.9-32.5-8.9-54.7 1.6-39.1 14.8-63.2 18.3-69.2 9.2-16.4 21.2-31.2 35.5-43.5 12.6-10.6 26.9-19.1 42.2-25 9.6-4 19.6-6.9 29.8-8.8 15.4-2.7 31.1-2.9 46.6-.7V267c-18.1.3-35.9 4-52.5 11z"/><path d="M483.8 90.6h-60v318.6c0 11.2 0 22-3.7 32.8-6.1 17.2-19 32.8-36.1 39.7-25.8 10.4-46 9.2-70-6.7-6-4.1-11.2-9.2-15.5-15 20.5 10.9 38.8 10.7 61.5 1.6 17.2-6.9 30.1-22.5 36.1-39.7 3.8-10.8 3.7-21.6 3.7-32.8V70.5h82.9c-.1 0-1 7.9 1.1 20.1zm113.4 95.1v17.7c-9.7-2.3-19.2-5.7-28.1-10.2-17.3-8.6-30.8-22.7-33.5-25.6 3.1 2 6.2 3.8 9.5 5.5 21.2 10.5 41.9 13.7 52.1 12.6z"/></g></svg>`,
        "LinkedIn": `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="-11.493675 -16.3118 99.61185 97.8708"><path fill="currentColor" d="M72.865 61.1094a1.2 1.2 0 001.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025 1.291 2.029h.724l-1.389-2.1zm-.783-.472h-.785v-1.593h.995c.514 0 1.1.084 1.1.757 0 .774-.593.836-1.314.836m-16.873-5.433h-9.6v-15.034c0-3.585-.064-8.2-4.993-8.2-5 0-5.765 3.906-5.765 7.939v15.294h-9.6v-30.916h9.216v4.225h.129a10.1 10.1 0 019.093-4.994c9.73 0 11.524 6.4 11.524 14.726zm-40.79-35.143a5.571 5.571 0 115.57-5.572 5.571 5.571 0 01-5.57 5.572m4.8 35.143h-9.61v-30.917h9.61zm40.776-55.2H4.781A4.728 4.728 0 000 4.6744v55.439a4.731 4.731 0 004.781 4.675h55.21a4.741 4.741 0 004.8-4.675V4.6704a4.738 4.738 0 00-4.8-4.67"/><path fill="currentColor" d="M72.164 56.4114a4.418 4.418 0 10.085 0h-.085m0 8.33a3.874 3.874 0 113.809-3.938v.065a3.791 3.791 0 01-3.708 3.871h-.1"/></svg>`,
        "Blog personal": '📝',
        "Sitio Web": '🌐',
        "Buscar en Google": '🔍',
        "Blog (Workday)": '📝',
        "Default": '🔗'
    };

    const platformStyles = {
        "Default": "bg-gray-700 text-secondary-text hover:bg-tertiary-dark",
        "YouTube": "bg-red-600 text-white hover:bg-red-700",
        "Instagram": "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90",
        "TikTok": "bg-black text-white hover:bg-gray-800",
        "X (Twitter)": "bg-black text-white hover:bg-gray-800",
        "LinkedIn": "bg-sky-700 text-white hover:bg-sky-800",
        "Sitio Web": "bg-accent-blue text-primary-dark hover:bg-accent-blue-hover",
        "Blog personal": "bg-accent-blue text-primary-dark hover:bg-accent-blue-hover",
        "Blog (Workday)": "bg-sky-700 text-white hover:bg-sky-800",
        "Buscar en Google": "bg-gray-500 text-white hover:bg-gray-600"
    };

    async function loadInfluencerData() {
        try {
            const response = await fetch('influencers_data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("No se pudieron cargar los datos de influencers:", error);
            return [];
        }
    }

    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    const influencerSelectorHispanas = document.getElementById('influencerSelectorHispanas');
    const influencerDetailHispanas = document.getElementById('influencerDetailHispanas');
    const influencerSelectorInglesas = document.getElementById('influencerSelectorInglesas');
    const influencerDetailInglesas = document.getElementById('influencerDetailInglesas');

    const comparisonTableBody = document.getElementById('comparisonTableBody');
    const platformGrid = document.getElementById('platformGrid');
    let platformGridRendered = false;

    const summarizePatternsButton = document.getElementById('summarizePatternsButton');
    const generateIdealAIProfileButton = document.getElementById('generateIdealAIProfileButton');
    const generateTitleSloganButton = document.getElementById('generateTitleSloganButton');

    const apiUrl = '/.netlify/functions/openai';

    async function callGenerativeAPI(prompt, buttonElement, loadingDiv, outputDiv) {
        if (buttonElement) buttonElement.disabled = true;
        if (loadingDiv) loadingDiv.style.display = 'inline-block';
        if (outputDiv) outputDiv.innerHTML = '';

        const payload = {
            prompt: prompt
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    error: {
                        message: "Respuesta de error no es JSON o está vacía."
                    }
                }));
                console.error("API Error desde el backend:", response.status, errorData);
                if (outputDiv) outputDiv.innerHTML = `<p class='text-red-700'>Error de API: ${response.statusText}. ${errorData.error?.message || 'Error desconocido del backend.'}</p>`;
                return;
            }

            const result = await response.json();

            if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {

                const aiResponseText = result.choices[0].message.content;

                if (typeof showdown !== 'undefined') {
                    const converter = new showdown.Converter({
                        simplifiedAutoLink: true,
                        simpleLineBreaks: true,
                        strikethrough: true,
                        tables: true
                    });
                    const htmlOutput = converter.makeHtml(aiResponseText);
                    // Sanitize HTML to prevent XSS attacks
                    const sanitizedHTML = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(htmlOutput) : htmlOutput;
                    if (outputDiv) outputDiv.innerHTML = sanitizedHTML;
                } else {
                    console.error("Showdown no está definido.");
                    if (outputDiv) outputDiv.textContent = aiResponseText;
                }

            } else {
                console.error("Estructura de respuesta de API inesperada:", result);
                if (outputDiv) outputDiv.innerHTML = "<p class='text-red-700'>No se pudo obtener una respuesta válida de la IA.</p>";
            }

        } catch (error) {
            console.error("Error en el Fetch:", error);
            if (outputDiv) outputDiv.innerHTML = "<p class='text-red-700'>Error al contactar el servicio de IA. Revisa la consola y el estado de tu backend.</p>";
        } finally {
            if (buttonElement) buttonElement.disabled = false;
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (outputDiv) outputDiv.style.display = 'block';
        }
    }

    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        const activeButton = document.querySelector(`.nav-button[data-target="${targetId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        if (targetId === 'recursos' && !platformGridRendered && influencers.length > 0) {
            renderPlatformGrid();
            platformGridRendered = true;
        }
    }

    navButtons.forEach(button => button.addEventListener('click', () => showSection(button.dataset.target)));

    async function playAudioSummary(influencerId, summaryText, audioPlayerId) {
        const audioPlayer = document.getElementById(audioPlayerId);
        const audioTextContainer = document.getElementById(`audioSummaryTextContainer_${influencerId}`);
        const audioLoading = document.getElementById(`audioSummaryLoading_${influencerId}`);

        if (!audioPlayer || !audioTextContainer || !audioLoading) return;

        audioLoading.style.display = 'inline-block';
        audioPlayer.style.display = 'none';
        audioPlayer.src = '';

        try {
            const payload = {
                text: summaryText,
                lang: 'es'
            };
            const backendUrl = `/.netlify/functions/generate-audio`;

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    error: {
                        message: "Error desconocido del backend al generar audio."
                    }
                }));
                audioTextContainer.innerHTML += `<p class='text-red-600 mt-2'>Error audio: ${errorData.error?.message || response.statusText}</p>`;
                audioLoading.style.display = 'none';
                return;
            }
            const audioBlob = await response.blob();
            audioPlayer.src = URL.createObjectURL(audioBlob);
            audioPlayer.style.display = 'block';
            audioPlayer.oncanplaythrough = () => audioPlayer.play().catch(e => {
                console.error("Error al reproducir audio:", e);
                audioPlayer.style.display = 'none';
                audioTextContainer.innerHTML += "<p class='text-red-600 mt-2'>Error de reproducción.</p>";
            });
            audioPlayer.onerror = () => {
                audioPlayer.style.display = 'none';
                audioTextContainer.innerHTML += "<p class='text-red-600 mt-2'>Error al cargar audio.</p>";
            };
        } catch (error) {
            audioPlayer.style.display = 'none';
            audioTextContainer.innerHTML += "<p class='text-red-600 mt-2'>No se conectó al servicio de audio.</p>";
        } finally {
            audioLoading.style.display = 'none';
        }
    }

    function displayInfluencerDetail(influencer, detailElement) {
        const t = profileTranslations[currentLanguage]; // Get translations for current language
        
        // Get translated content if available and language is English
        const getTranslatedContent = (field) => {
            if (currentLanguage === 'en' && influencerContentTranslations[influencer.id]) {
                return influencerContentTranslations[influencer.id][field] || influencer.description[field] || influencer[field];
            }
            return influencer.description[field] || influencer[field];
        };
        
        const platformHTML = influencer.platforms.map(platformObj => {
            let finalUrl = platformObj.url;
            const isActualLink = finalUrl && finalUrl !== "#" && (finalUrl.startsWith('http://') || finalUrl.startsWith('https://'));
            const linkHref = isActualLink ? finalUrl : '#';
            const linkRel = isActualLink ? 'noopener noreferrer' : '';
            const linkTarget = isActualLink ? '_blank' : '';
            const tagType = isActualLink ? 'a' : 'span';

            const iconLookupKey = platformObj.iconName || platformObj.name;
            const svgIcon = platformSVGIcons[iconLookupKey] || platformSVGIcons["Default"];
            const styleClasses = platformStyles[iconLookupKey] || platformStyles["Default"];
            const cursorClass = isActualLink ? '' : 'cursor-default opacity-70';

            return `
                <${tagType} href="${linkHref}" target="${linkTarget}" rel="${linkRel}"
                                class="platform-link-button px-3 py-1.5 text-xs font-medium rounded-md shadow-sm mr-2 mb-2 inline-flex items-center transition-opacity ${styleClasses} ${cursorClass}">
                    <span class="mr-1.5 flex-shrink-0">${svgIcon}</span>
                    <span class="truncate">${platformObj.name}</span>
                </${tagType}>`;
        }).join('');

        detailElement.innerHTML = `
            <div class="w-40 h-40 rounded-full mx-auto mb-3 border-2 border-accent-gold bg-tertiary-dark flex items-center justify-center overflow-hidden">
                <img src="${influencer.image || 'https://placehold.co/100x100/37374A/FFC777?text=N/A'}" alt="Imagen de ${influencer.name.split('(')[0].trim()}" class="w-full h-full object-cover" loading="lazy">
            </div>
            <div class="flex items-center justify-center mb-1">
                <h3 class="text-xl font-bold text-accent-gold">${influencer.name}</h3>
                <button id="audioSummaryTrigger_${influencer.id}" class="audio-summary-trigger text-accent-blue hover:text-accent-blue-hover ml-2 p-1 rounded" title="${t.audioSummaryTitle}" aria-expanded="false" aria-controls="audioSummaryTextContainer_${influencer.id}" aria-label="${t.audioSummaryLabel} ${influencer.name}">🔊<div id="audioSummaryLoading_${influencer.id}" class="loading-spinner" style="display: none; width:16px; height:16px; border-width:2px;" role="status" aria-label="${t.loadingSummary}"></div></button>
            </div>
              <div id="audioSummaryTextContainer_${influencer.id}" class="audio-summary-text-container bg-tertiary-dark border-border-color text-secondary-text" style="display:none;" aria-live="polite">${t.clickForSummary}</div>
            <div class="audio-player-container"><audio id="audioPlayer_${influencer.id}" controls style="display:none;"></audio></div>
            <div class="space-y-3 text-secondary-text mb-6 mt-4">
                  <div><strong class="text-accent-gold block mb-1">${t.mainPlatforms}</strong> <div class="flex flex-wrap items-center">${platformHTML}</div></div>
                <div><strong class="text-accent-gold block mb-1">${t.personality}</strong> <p class="leading-relaxed">${getTranslatedContent('personality')}</p></div>
                <div><strong class="text-accent-gold block mb-1">${t.aesthetics}</strong> <p class="leading-relaxed">${getTranslatedContent('esthetics')}</p></div>
                <div><strong class="text-accent-gold block mb-1">${t.contentType}</strong> <p class="leading-relaxed">${getTranslatedContent('contentType')}</p></div>
                <div><strong class="text-accent-gold block mb-1">${t.topLevelReason}</strong> <p class="leading-relaxed">${getTranslatedContent('topLevelReason')}</p></div>
            </div>
              <div class="mt-6 space-y-4">
                  <div>
                      <button id="contentStrategiesBtn_${influencer.id}" class="api-button bg-accent-blue hover:bg-accent-blue-hover text-primary-dark disabled:bg-disabled-bg w-full sm:w-auto">${t.suggestStrategies} <div id="contentStrategiesLoading_${influencer.id}" class="loading-spinner" style="display: none;"></div></button>
                      <div id="contentStrategiesOutput_${influencer.id}" class="api-output bg-tertiary-dark border-border-color" style="display: none;" aria-live="polite"></div>
                  </div>
                  <div>
                      <button id="communityQuestionsBtn_${influencer.id}" class="api-button bg-accent-blue hover:bg-accent-blue-hover text-primary-dark disabled:bg-disabled-bg w-full sm:w-auto">${t.generateQuestions} <div id="communityQuestionsLoading_${influencer.id}" class="loading-spinner" style="display: none;"></div></button>
                      <div id="communityQuestionsOutput_${influencer.id}" class="api-output bg-tertiary-dark border-border-color" style="display: none;" aria-live="polite"></div>
                  </div>
                  <div>
                      <button id="aestheticAnalysisBtn_${influencer.id}" class="api-button bg-accent-blue hover:bg-accent-blue-hover text-primary-dark disabled:bg-disabled-bg w-full sm:w-auto">${t.analyzeAesthetics} <div id="aestheticAnalysisLoading_${influencer.id}" class="loading-spinner" style="display: none;"></div></button>
                      <div id="aestheticAnalysisOutput_${influencer.id}" class="api-output bg-tertiary-dark border-border-color" style="display: none;" aria-live="polite"></div>
                  </div>
              </div>
        `;

        const audioTrigger = document.getElementById(`audioSummaryTrigger_${influencer.id}`);
        const audioTextContainer = document.getElementById(`audioSummaryTextContainer_${influencer.id}`);
        const audioLoading = document.getElementById(`audioSummaryLoading_${influencer.id}`);
        const audioPlayer = document.getElementById(`audioPlayer_${influencer.id}`);

        if (audioTrigger && audioTextContainer && audioLoading && audioPlayer) {
            let isAudioSummaryGenerated = false;
            audioTrigger.addEventListener('click', async () => {
                if (audioTextContainer.style.display === 'block' && isAudioSummaryGenerated) {
                    audioTextContainer.style.display = 'none';
                    audioPlayer.style.display = 'none';
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                    audioTrigger.setAttribute('aria-expanded', 'false');
                    return;
                }
                audioTrigger.setAttribute('aria-expanded', 'true');
                audioTextContainer.innerHTML = '';
                isAudioSummaryGenerated = false;
                audioPlayer.style.display = 'none';

                const influencerDataForAudio = `Nombre: ${influencer.name}. Personalidad: ${influencer.description.personality}. Razón "Top-Level": ${influencer.topLevelReason}.`;
                const prompt = `
### Metodología MAPAX+ ###

**M - Meta Clara:**
El objetivo es generar un guion de audio, muy breve y potente (máximo 45 palabras), que capture la esencia del influencer analizado. La respuesta será exitosa si es concisa, inspiradora y está lista para ser grabada, generando curiosidad sobre por qué esta persona inspira a la IA Maia Kode.

**A - Adaptación:**
- **Rol:** Actúa como un guionista experto en "píldoras de conocimiento" para podcasts de tecnología y educación.
- **Tono:** Profesional, inspirador y ligeramente "geek".
- **Estilo:** Impactante y directo.
- **Extensión:** Máximo 45 palabras.

**P - Pasos Estructurados:**
1.  **Analizar:** Lee los datos del influencer proporcionados a continuación.
    - **Datos:** ${influencerDataForAudio}
2.  **Sintetizar:** Crea un texto que cumpla con la meta y las adaptaciones. Empieza con una frase gancho y concluye con la idea clave que define al influencer.
3.  **Entregar:** Devuelve ÚNICAMENTE el texto final del guion, sin añadir encabezados, introducciones ni la palabra "Respuesta".
`;

                await callGenerativeAPI(prompt, null, audioLoading, audioTextContainer);

                if (audioTextContainer.innerHTML && !audioTextContainer.innerHTML.includes("Error")) {
                    isAudioSummaryGenerated = true;
                    playAudioSummary(influencer.id, audioTextContainer.textContent.trim(), `audioPlayer_${influencer.id}`);
                } else {
                    if (audioLoading) audioLoading.style.display = 'none';
                }
            });
        }

        const contentStrategiesPrompt = `
### Metodología MAPAX+ ###

**M - Meta Clara:**
El objetivo es generar 3 ideas de formatos de contenido originales y accionables para la IA educativa Maia Kode, inspiradas directamente en el éxito del influencer analizado. Una respuesta exitosa contendrá ideas específicas que se puedan planificar, no sugerencias genéricas.

**A - Adaptación:**
- **Rol:** Eres un estratega de contenido senior especializado en marcas Ed-Tech.
- **Tono:** Estratégico, creativo y profesional.
- **Estilo:** Directo y orientado a la acción.
- **Extensión:** 3 ideas, cada una con un título y una descripción de 1-2 frases.

**P - Pasos Estructurados:**
1.  **Contextualizar:** Tu cliente es Maia Kode, una IA con personalidad geek, didáctica y empática. Analizarás al influencer "${influencer.name}" para extraer estrategias aplicables.
2.  **Analizar Datos:**
    - Personalidad del Influencer: ${influencer.description.personality}
    - Tipo de Contenido del Influencer: ${influencer.contentType}
3.  **Generar y Formatear:** Crea las 3 ideas de contenido y preséntalas en formato Markdown. Cada idea debe tener un título en negrita.
`;
        document.getElementById(`contentStrategiesBtn_${influencer.id}`).addEventListener('click', (e) => callGenerativeAPI(contentStrategiesPrompt, e.target, document.getElementById(`contentStrategiesLoading_${influencer.id}`), document.getElementById(`contentStrategiesOutput_${influencer.id}`)));

        const communityQuestionsPrompt = `
### Metodología MAPAX+ ###

**M - Meta Clara:**
El objetivo es generar 3 preguntas abiertas y provocadoras para fomentar la interacción en la comunidad online de Maia Kode. Una respuesta exitosa consistirá en preguntas que no puedan responderse con un sí/no y que conecten el tema del influencer con la vida de la audiencia.

**A - Adaptación:**
- **Rol:** Eres un Community Manager experto en catalizar conversaciones en comunidades de aprendizaje.
- **Tono:** Curioso, inclusivo y estimulante.
- **Estilo:** Interrogativo y conversacional.
- **Extensión:** Exactamente 3 preguntas.

**P - Pasos Estructurados:**
1.  **Contextualizar:** La IA Maia Kode quiere construir una comunidad activa. El influencer de referencia es "${influencer.name}", experto en "${influencer.contentType}".
2.  **Idear:** Crea 3 preguntas que inviten a la reflexión, conectando el campo de "${influencer.contentType}" con las experiencias o aspiraciones personales de la audiencia.
3.  **Formatear:** Entrega el resultado como una lista numerada en Markdown.
`;
        document.getElementById(`communityQuestionsBtn_${influencer.id}`).addEventListener('click', (e) => callGenerativeAPI(communityQuestionsPrompt, e.target, document.getElementById(`communityQuestionsLoading_${influencer.id}`), document.getElementById(`communityQuestionsOutput_${influencer.id}`)));

        const aestheticAnalysisPrompt = `
### Metodología MAPAX+ ###

**M - Meta Clara:**
El objetivo es deconstruir la descripción estética de un influencer en 3 conceptos de branding clave, explicando por qué son efectivos. El resultado será exitoso si proporciona insights claros que un director de arte pueda usar para la identidad visual de Maia Kode.

**A - Adaptación:**
- **Rol:** Eres un Director de Arte y estratega de branding con experiencia en marcas tecnológicas.
- **Tono:** Analítico, profesional y creativo.
- **Estilo:** Descriptivo y justificativo.
- **Extensión:** 3 conceptos con su respectiva justificación.

**P - Pasos Estructurados:**
1.  **Analizar Descripción:** Lee la siguiente descripción estética del influencer "${influencer.name}":
    - Estética: "${influencer.description.esthetics}"
2.  **Extraer y Justificar:** Identifica 3 conceptos o principios de branding fundamentales. Para cada uno, justifica su efectividad en una frase.
3.  **Formatear:** Usa viñetas en Markdown con la estructura: "**Concepto:** [Nombre del concepto]. **Justificación:** [Explicación]".
`;
        document.getElementById(`aestheticAnalysisBtn_${influencer.id}`).addEventListener('click', (e) => callGenerativeAPI(aestheticAnalysisPrompt, e.target, document.getElementById(`aestheticAnalysisLoading_${influencer.id}`), document.getElementById(`aestheticAnalysisOutput_${influencer.id}`)));
    }

    function populateInfluencerSection(lang, selectorElement, detailElement) {
        const filteredInfluencers = influencers.filter(inf => inf.language === lang);
        if (!selectorElement) return;
        selectorElement.innerHTML = '';
        filteredInfluencers.forEach(influencer => {
            const card = document.createElement('div');
            card.className = 'influencer-card p-4 rounded-lg shadow';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Seleccionar influencer ${influencer.name.split('(')[0].trim()}`);
            card.setAttribute('data-influencer-id', influencer.id);
            const platformNames = influencer.platforms.map(p => p.name).slice(0, 2).join(', ');
            card.innerHTML = `<h4 class="font-semibold text-center">${influencer.name.split('(')[0].trim()}</h4>
                                    <p class="text-xs text-center mt-1">${platformNames}</p>`;
            
            const selectInfluencer = () => {
                const previouslySelected = selectorElement.querySelector('.selected');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected');
                    previouslySelected.setAttribute('aria-selected', 'false');
                }
                displayInfluencerDetail(influencer, detailElement);
                card.classList.add('selected');
                card.setAttribute('aria-selected', 'true');
                if (detailElement) {
                    const navElement = document.querySelector('nav.sticky');
                    let navHeight = navElement ? navElement.offsetHeight : 0;
                    const offsetPosition = detailElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            };
            
            card.addEventListener('click', selectInfluencer);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectInfluencer();
                }
            });
            selectorElement.appendChild(card);
        });
    }

    function normalizePlatformName(platformName, iconName) {
        // Create a mapping for consistent platform names
        const nameMapping = {
            'Youtube': 'YouTube',
            'Youtube 1/2': 'YouTube', 
            'Youtube 2/2': 'YouTube',
            'X': 'X (Twitter)',
            'Twitter': 'X (Twitter)',
            'Linkedin': 'LinkedIn',
            'Tiktok': 'TikTok'
        };
        
        // First try the exact name, then try removing parenthetical content
        const cleanName = platformName.split('(')[0].trim();
        return nameMapping[platformName] || nameMapping[cleanName] || cleanName;
    }

    function renderPlatformGrid() {
        if (influencers.length === 0 || !platformGrid) return;
        const platformData = {};
        influencers.forEach(inf => {
            inf.platforms.forEach(p => {
                const name = normalizePlatformName(p.name, p.iconName);
                if (!platformData[name]) {
                    platformData[name] = {
                        count: 0,
                        influencers: [],
                        icon: platformSVGIcons[p.iconName || name] || platformSVGIcons["Default"]
                    };
                }
                platformData[name].count++;
                platformData[name].influencers.push({
                    name: inf.name,
                    image: inf.image
                });
            });
        });
        const sortedPlatforms = Object.entries(platformData).sort(([, a], [, b]) => b.count - a.count);
        const maxCount = sortedPlatforms.length > 0 ? sortedPlatforms[0][1].count : 0;
        platformGrid.innerHTML = '';
        sortedPlatforms.forEach(([name, data]) => {
            const card = document.createElement('div');
            card.className = 'platform-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Plataforma ${name} con ${data.count} influencer${data.count > 1 ? 's' : ''}`);
            const popularityPercent = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
            const influencerAvatarsHTML = data.influencers.map(inf =>
                `<img src="${inf.image || 'https://placehold.co/40x40/37374A/FFC777?text=N/A'}" alt="${inf.name}" class="influencer-avatar" title="${inf.name}" loading="lazy">`
            ).join('');
            card.innerHTML = `
                <div class="influencer-tooltip" role="tooltip" id="tooltip-${name.replace(/[^a-zA-Z0-9]/g, '')}">${influencerAvatarsHTML}</div>
                <div class="icon-container">${data.icon}</div>
                <h5>${name}</h5>
                <p class="count">${data.count}</p>
                <div class="popularity-bar-bg">
                    <div class="popularity-bar-fg" style="width: ${popularityPercent}%;"></div>
                </div>
            `;
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Toggle tooltip visibility on keyboard interaction
                    const tooltip = card.querySelector('.influencer-tooltip');
                    tooltip.style.display = tooltip.style.display === 'flex' ? 'none' : 'flex';
                    tooltip.style.opacity = tooltip.style.display === 'flex' ? '1' : '0';
                }
            });
            
            platformGrid.appendChild(card);
        });
    }

    async function initializeApp() {
        influencers = await loadInfluencerData();
        if (!Array.isArray(influencers) || influencers.length === 0) return;
        populateInfluencerSection("Español", influencerSelectorHispanas, influencerDetailHispanas);
        populateInfluencerSection("Ingles", influencerSelectorInglesas, influencerDetailInglesas);

        if (comparisonTableBody) {
            comparisonTableBody.innerHTML = '';
            influencers.forEach(inf => {
                const tr = comparisonTableBody.insertRow();
                tr.innerHTML = `<td class="py-2 px-3">${inf.name.split('(')[0].trim()}</td><td class="py-2 px-3">${inf.language}</td><td class="py-2 px-3">${inf.description.personality.split('.')[0]}.</td><td class="py-2 px-3">${inf.description.esthetics.split('.')[0]}.</td><td class="py-2 px-3">${inf.contentType.split('.')[0]}.</td><td class="py-2 px-3">${inf.topLevelReason.split('.')[0]}.</td>`;
            });
        }
        showSection('mision');
    }

    if (summarizePatternsButton) summarizePatternsButton.addEventListener('click', (e) => {
        if (influencers.length === 0) {
            alert("No hay datos para analizar.");
            return;
        }
        const tableDataSummary = influencers.map(inf => `${inf.name}(${inf.language}):P-${inf.description.personality.substring(0,50)} E-${inf.description.esthetics.substring(0,50)} C-${inf.contentType.substring(0,50)}`).join("||");
        const prompt = `
    ### Metodología MAPAX+ ###

    **M - Meta Clara:**
    El objetivo es analizar un resumen de datos de 16 influencers para identificar los 3 patrones estratégicos más relevantes y su implicación para una nueva IA educativa, Maia Kode. Una respuesta exitosa debe ofrecer insights estratégicos, no solo un resumen de datos.

    **A - Adaptación:**
    - **Rol:** Eres un analista de mercado y estratega de marca.
    - **Tono:** Analítico, estratégico y conclusivo.
    - **Estilo:** Informe ejecutivo.
    - **Extensión:** 3 patrones, cada uno con su implicación.

    **P - Pasos Estructurados:**
    1.  **Analizar Datos:** A continuación se presentan los datos de 16 influencers:
        ${tableDataSummary}
    2.  **Identificar Patrones:** Extrae las 3 tendencias más significativas en personalidad, estética o contenido.
    3.  **Deducir Implicaciones:** Para cada patrón, explica cómo Maia Kode podría aplicar ese aprendizaje en su estrategia.
    4.  **Formatear:** Usa un encabezado de nivel 3 (###) para cada patrón y negrita para "Implicación para Maia".
    `;
        callGenerativeAPI(prompt, e.target, document.getElementById('summarizePatternsLoading'), document.getElementById('summarizePatternsOutput'));
    });

    if (generateIdealAIProfileButton) generateIdealAIProfileButton.addEventListener('click', (e) => {
        const conclusionText = "El estudio de estos referentes nos ha permitido definir un arquetipo de IA que no solo educa, sino que también inspira. Un perfil geek-didáctico, con un toque humano y una voz auténtica que resuena con una comunidad que busca el crecimiento.";
        const prompt = `
    ### Metodología MAPAX+ ###

    **M - Meta Clara:**
    El objetivo es traducir una conclusión estratégica en un manifiesto de personalidad fundacional para la IA "Maia Kode". La respuesta será exitosa si crea un perfil de marca claro, inspirador y práctico que pueda guiar la creación de todo el contenido futuro.

    **A - Adaptación:**
    - **Rol:** Eres un Arquitecto de Personalidad de IA, experto en branding y storytelling.
    - **Tono:** Inspirador, fundacional y claro.
    - **Estilo:** Manifiesto de marca.
    - **Extensión:** Un perfil organizado en 5 secciones clave.

    **P - Pasos Estructurados:**
    1.  **Internalizar Conclusión:** La conclusión del análisis previo es: "${conclusionText}".
    2.  **Construir Manifiesto:** A partir de esa conclusión, desarrolla la personalidad de Maia Kode.
    3.  **Formatear:** Estructura la respuesta en Markdown con los siguientes 5 encabezados en negrita: **Arquetipo Principal**, **Voz y Tono**, **Misión**, **Pilares de Contenido**, y **Promesa a la Comunidad**.
    `;
        callGenerativeAPI(prompt, e.target, document.getElementById('idealAIProfileLoading'), document.getElementById('idealAIProfileOutput')).then(() => {
            document.getElementById('generateTitleSloganButton').disabled = false;
        });
    });

    if (generateTitleSloganButton) generateTitleSloganButton.addEventListener('click', (e) => {
        const idealProfileOutput = document.getElementById('idealAIProfileOutput');
        let idealProfileText = idealProfileOutput ? idealProfileOutput.textContent : "";

        if (!idealProfileText || idealProfileText.length < 10 || idealProfileText.startsWith("Error")) {
            const outputDiv = document.getElementById('titleSloganOutput');
            outputDiv.innerHTML = "<p class='text-red-700'>Por favor, genera primero el 'Perfil de IA Ideal' para que la IA tenga contexto.</p>";
            outputDiv.style.display = 'block';
            return;
        }

        const prompt = `
    ### Metodología MAPAX+ ###

    **M - Meta Clara:**
    El objetivo es generar 3 nombres alternativos y 3 eslóganes creativos para la IA Maia Kode, basándose estrictamente en su manifiesto de personalidad. Una respuesta exitosa ofrecerá opciones de branding relevantes y justificadas.

    **A - Adaptación:**
    - **Rol:** Eres un experto en Naming y Copywriter creativo para marcas tecnológicas.
    - **Tono:** Creativo y estratégico.
    - **Estilo:** Propuesta de branding / Brainstorming.
    - **Extensión:** 3 nombres, 3 eslóganes, y una breve justificación.

    **P - Pasos Estructurados:**
    1.  **Analizar Manifiesto:** Lee el siguiente manifiesto de personalidad de Maia Kode:
        "${idealProfileText.substring(0, 500)}..."
    2.  **Generar Opciones:** Crea 3 nombres alternativos y 3 eslóganes que encapsulen la esencia del manifiesto.
    3.  **Justificar:** Elige tu eslogan favorito y explica su potencial en una frase.
    4.  **Formatear:** Usa encabezados de nivel 3 (###) para "Nombres Alternativos" y "Eslóganes Propuestos".
    `;
        callGenerativeAPI(prompt, e.target, document.getElementById('titleSloganLoading'), document.getElementById('titleSloganOutput'));
    });

    // Global function to update language from index.html
    window.updateAppLanguage = function(lang) {
        currentLanguage = lang;
        
        // Find currently selected influencers and refresh their details
        const selectedHispana = document.querySelector('#influencerSelectorHispanas .selected');
        const selectedInglesa = document.querySelector('#influencerSelectorInglesas .selected');
        
        if (selectedHispana) {
            const influencerId = selectedHispana.dataset.influencerId;
            const influencer = influencers.find(inf => inf.id == influencerId);
            if (influencer) {
                displayInfluencerDetail(influencer, influencerDetailHispanas);
            }
        }
        
        if (selectedInglesa) {
            const influencerId = selectedInglesa.dataset.influencerId;
            const influencer = influencers.find(inf => inf.id == influencerId);
            if (influencer) {
                displayInfluencerDetail(influencer, influencerDetailInglesas);
            }
        }
    };

    initializeApp();

});

// ============== FIN: Contenido completo para: app.js ==============