/**
 * Testimonial Wall Widget
 * Embeddable widget for displaying testimonials
 */

(function () {
    'use strict';

    // Widget configuration
    const WIDGET_VERSION = '1.0.0';
    const DEFAULT_CONFIG = {
        baseUrl: 'http://localhost:3000',
        theme: 'light',
        card: 'base',
        fontSize: 'medium',
        color: null,
        minHeight: '400px',
        autoResize: true,
        resizeInterval: 500
    };

    // Main widget class
    class TestimonialWall {
        constructor(config) {
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.iframe = null;
            this.container = null;
            this.resizeObserver = null;
            this.lastHeight = 0;
        }

        init() {
            // Validate required config
            if (!this.config.container) {
                console.error('[TestimonialWall] Container is required');
                return;
            }

            if (!this.config.organizationId) {
                console.error('[TestimonialWall] organizationId is required');
                return;
            }

            // Get container element
            if (typeof this.config.container === 'string') {
                this.container = document.querySelector(this.config.container);
            } else {
                this.container = this.config.container;
            }

            if (!this.container) {
                console.error('[TestimonialWall] Container not found');
                return;
            }

            // Create and inject iframe
            this.createIframe();

            // Setup auto-resize if enabled
            if (this.config.autoResize) {
                this.setupAutoResize();
            }

            console.log(`[TestimonialWall] v${WIDGET_VERSION} initialized`);
        }

        createIframe() {
            // Build URL with parameters
            const url = this.buildEmbedUrl();

            // Create iframe element
            this.iframe = document.createElement('iframe');
            this.iframe.src = url;
            this.iframe.style.width = '100%';
            this.iframe.style.minHeight = this.config.minHeight;
            this.iframe.style.border = 'none';
            this.iframe.style.display = 'block';
            this.iframe.scrolling = 'no';
            this.iframe.setAttribute('data-testimonial-wall', 'true');
            this.iframe.setAttribute('data-version', WIDGET_VERSION);

            // Add loading indicator
            const loader = this.createLoader();
            this.container.appendChild(loader);
            this.container.appendChild(this.iframe);

            // Remove loader when iframe loads
            this.iframe.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 300);
                }, 500);
            });
        }

        buildEmbedUrl() {
            const params = new URLSearchParams({
                theme: this.config.theme,
                card: this.config.card,
                fontSize: this.config.fontSize
            });

            if (this.config.color) {
                params.append('color', this.config.color);
            }

            return `${this.config.baseUrl}/embed/wall/${this.config.organizationId}?${params.toString()}`;
        }

        createLoader() {
            const loader = document.createElement('div');
            loader.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: ${this.config.minHeight};
        background: ${this.config.theme === 'dark' ? '#1f2937' : '#f9fafb'};
        border-radius: 8px;
        transition: opacity 0.3s ease;
      `;

            const spinner = document.createElement('div');
            spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid ${this.config.theme === 'dark' ? '#374151' : '#e5e7eb'};
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: testimonial-spin 1s linear infinite;
      `;

            loader.appendChild(spinner);

            // Add keyframes animation
            if (!document.getElementById('testimonial-wall-styles')) {
                const style = document.createElement('style');
                style.id = 'testimonial-wall-styles';
                style.textContent = `
          @keyframes testimonial-spin {
            to { transform: rotate(360deg); }
          }
        `;
                document.head.appendChild(style);
            }

            return loader;
        }

        setupAutoResize() {
            // Listen for messages from iframe
            window.addEventListener('message', (event) => {
                // Verify origin (in production, check against your domain)
                if (event.data && event.data.type === 'testimonial-wall-resize') {
                    const height = event.data.height;
                    if (height && this.iframe) {
                        this.iframe.style.height = height + 'px';
                        this.lastHeight = height;
                    }
                }
            });

            // Fallback: Poll for height changes
            if (this.config.resizeInterval > 0) {
                setInterval(() => {
                    this.checkHeight();
                }, this.config.resizeInterval);
            }
        }

        checkHeight() {
            if (!this.iframe || !this.iframe.contentWindow) return;

            try {
                // Try to get iframe content height (only works if same-origin)
                const iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
                if (iframeDoc && iframeDoc.body) {
                    const height = iframeDoc.body.scrollHeight;
                    if (height !== this.lastHeight && height > 0) {
                        this.iframe.style.height = height + 'px';
                        this.lastHeight = height;
                    }
                }
            } catch (e) {
                // Cross-origin, can't access - rely on postMessage
            }
        }

        destroy() {
            if (this.iframe) {
                this.iframe.remove();
                this.iframe = null;
            }
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }
            console.log('[TestimonialWall] Destroyed');
        }
    }

    // Global API
    window.TestimonialWall = {
        version: WIDGET_VERSION,

        init: function (config) {
            const widget = new TestimonialWall(config);
            widget.init();
            return widget;
        },

        create: function (config) {
            return new TestimonialWall(config);
        }
    };

    // Auto-init if data attributes are present
    document.addEventListener('DOMContentLoaded', function () {
        const autoInitElements = document.querySelectorAll('[data-testimonial-wall-auto]');

        autoInitElements.forEach(function (element) {
            const config = {
                container: element,
                organizationId: element.getAttribute('data-organization-id'),
                theme: element.getAttribute('data-theme') || 'light',
                card: element.getAttribute('data-card') || 'base',
                fontSize: element.getAttribute('data-font-size') || 'medium',
                color: element.getAttribute('data-color') || null,
                baseUrl: element.getAttribute('data-base-url') || DEFAULT_CONFIG.baseUrl
            };

            window.TestimonialWall.init(config);
        });
    });

    console.log(`[TestimonialWall] Widget loaded (v${WIDGET_VERSION})`);
})();
