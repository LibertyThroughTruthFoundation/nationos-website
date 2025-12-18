/**
 * NationOS PWA Installation Manager
 * Handles PWA installation prompts and user guidance
 * Version: 2.0.0
 * 
 * For the Outer Court - NationOS.io
 */

class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.isAndroid = /Android/.test(navigator.userAgent);
        this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           window.navigator.standalone || 
                           document.referrer.includes('android-app://');
        
        this.init();
    }

    init() {
        console.log('[NationOS PWA] Initializing...');
        console.log('[NationOS PWA] Platform - iOS:', this.isIOS, 'Android:', this.isAndroid);
        console.log('[NationOS PWA] Standalone mode:', this.isStandalone);
        
        // Listen for beforeinstallprompt event (Chrome/Edge/Android)
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('[NationOS PWA] beforeinstallprompt event fired');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', (e) => {
            console.log('[NationOS PWA] App installed successfully!');
            this.hideInstallUI();
            this.deferredPrompt = null;
        });

        // Check if already installed
        if (this.isStandalone) {
            console.log('[NationOS PWA] App is already installed');
            this.hideInstallUI();
        } else {
            // Show install section for iOS users (no beforeinstallprompt on iOS)
            if (this.isIOS) {
                console.log('[NationOS PWA] iOS detected - showing manual instructions');
                this.showInstallSection();
            }
        }

        // Add event listeners
        this.addEventListeners();
        
        // Register service worker
        this.registerServiceWorker();
    }

    showInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.style.display = 'inline-block';
            console.log('[NationOS PWA] Install button shown');
        }
        this.showInstallSection();
    }
    
    showInstallSection() {
        const installSection = document.getElementById('pwa-install-section');
        if (installSection) {
            installSection.style.display = 'block';
            console.log('[NationOS PWA] Install section shown');
        }
    }

    hideInstallUI() {
        const installBtn = document.getElementById('pwa-install-btn');
        const installSection = document.getElementById('pwa-install-section');
        
        if (installBtn) installBtn.style.display = 'none';
        if (installSection) installSection.style.display = 'none';
        
        console.log('[NationOS PWA] Install UI hidden');
    }

    async installPWA() {
        if (this.deferredPrompt) {
            console.log('[NationOS PWA] Triggering install prompt');
            this.deferredPrompt.prompt();
            
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log('[NationOS PWA] User choice:', outcome);
            
            if (outcome === 'accepted') {
                console.log('[NationOS PWA] User accepted installation');
                this.hideInstallUI();
            } else {
                console.log('[NationOS PWA] User dismissed installation');
            }
            
            this.deferredPrompt = null;
        } else if (this.isIOS) {
            // For iOS, show manual instructions
            this.showManualInstructions();
        } else {
            console.log('[NationOS PWA] Install prompt not available');
            this.showManualInstructions();
        }
    }

    showManualInstructions() {
        const modal = document.getElementById('pwa-instructions-modal');
        if (modal) {
            modal.style.display = 'flex';
            console.log('[NationOS PWA] Manual instructions modal shown');
        }
    }

    closeInstructions() {
        const modal = document.getElementById('pwa-instructions-modal');
        if (modal) {
            modal.style.display = 'none';
            console.log('[NationOS PWA] Manual instructions modal closed');
        }
    }

    addEventListeners() {
        // Install button
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                console.log('[NationOS PWA] Install button clicked');
                this.installPWA();
            });
        }

        // Manual instructions button
        const manualBtn = document.getElementById('pwa-manual-btn');
        if (manualBtn) {
            manualBtn.addEventListener('click', () => {
                console.log('[NationOS PWA] Manual instructions button clicked');
                this.showManualInstructions();
            });
        }

        // Close modal button
        const closeBtn = document.getElementById('pwa-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('[NationOS PWA] Close button clicked');
                this.closeInstructions();
            });
        }
        
        // Close modal on background click
        const modal = document.getElementById('pwa-instructions-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeInstructions();
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeInstructions();
            }
        });
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Register service worker from root
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('[NationOS PWA] Service Worker registered:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('[NationOS PWA] Service Worker update found');
                        
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('[NationOS PWA] New version available');
                                // Could show update notification here
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error('[NationOS PWA] Service Worker registration failed:', error);
                });
        } else {
            console.log('[NationOS PWA] Service Worker not supported');
        }
    }

    // Utility method to check PWA install criteria
    checkInstallCriteria() {
        const criteria = {
            https: location.protocol === 'https:',
            serviceWorker: 'serviceWorker' in navigator,
            manifest: !!document.querySelector('link[rel="manifest"]'),
            standalone: this.isStandalone
        };
        
        console.log('[NationOS PWA] Install criteria:', criteria);
        return criteria;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('[NationOS PWA] DOM loaded - initializing');
    window.pwaInstallManager = new PWAInstallManager();
    
    // Log install criteria for debugging
    setTimeout(() => {
        window.pwaInstallManager.checkInstallCriteria();
    }, 1000);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAInstallManager;
}
