/**
 * PWA Installation Manager
 * Handles PWA installation prompts and user guidance
 * For Sovereign Architecture - NationOS ARK
 */

class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           window.navigator.standalone || 
                           document.referrer.includes('android-app://');
        
        this.init();
    }

    init() {
        console.log('PWA Install Manager initialized');
        console.log('Is iOS:', this.isIOS);
        console.log('Is Standalone:', this.isStandalone);
        
        // Listen for beforeinstallprompt event (Chrome/Edge/Android)
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt event fired');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Check if already installed
        if (this.isStandalone) {
            console.log('App is already installed');
            this.hideInstallUI();
        } else {
            // Show install section for iOS users (no beforeinstallprompt on iOS)
            if (this.isIOS) {
                console.log('iOS detected - showing manual instructions');
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
            console.log('Install button shown');
        }
        this.showInstallSection();
    }
    
    showInstallSection() {
        const installSection = document.getElementById('pwa-install-section');
        if (installSection) {
            installSection.style.display = 'block';
            console.log('Install section shown');
        }
    }

    hideInstallUI() {
        const installBtn = document.getElementById('pwa-install-btn');
        const installSection = document.getElementById('pwa-install-section');
        
        if (installBtn) installBtn.style.display = 'none';
        if (installSection) installSection.style.display = 'none';
        
        console.log('Install UI hidden');
    }

    async installPWA() {
        if (this.deferredPrompt) {
            console.log('Triggering install prompt');
            this.deferredPrompt.prompt();
            
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log('User choice:', outcome);
            
            if (outcome === 'accepted') {
                console.log('User accepted PWA installation');
                this.hideInstallUI();
            } else {
                console.log('User dismissed PWA installation');
            }
            
            this.deferredPrompt = null;
        } else if (this.isIOS) {
            // For iOS, show manual instructions
            this.showManualInstructions();
        } else {
            console.log('Install prompt not available');
            this.showManualInstructions();
        }
    }

    showManualInstructions() {
        const modal = document.getElementById('pwa-instructions-modal');
        if (modal) {
            modal.style.display = 'flex';
            console.log('Manual instructions modal shown');
        }
    }

    closeInstructions() {
        const modal = document.getElementById('pwa-instructions-modal');
        if (modal) {
            modal.style.display = 'none';
            console.log('Manual instructions modal closed');
        }
    }

    addEventListeners() {
        // Install button
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                console.log('Install button clicked');
                this.installPWA();
            });
        }

        // Manual instructions button
        const manualBtn = document.getElementById('pwa-manual-btn');
        if (manualBtn) {
            manualBtn.addEventListener('click', () => {
                console.log('Manual instructions button clicked');
                this.showManualInstructions();
            });
        }

        // Close modal button
        const closeBtn = document.getElementById('pwa-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('Close button clicked');
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
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/nationos-website/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        } else {
            console.log('Service Worker not supported');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing PWA Install Manager');
    window.pwaInstallManager = new PWAInstallManager();
});
