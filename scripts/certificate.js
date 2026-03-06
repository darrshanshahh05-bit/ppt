/**
 * Certificate Generator for PrabhuPremi Trust
 * Generates tiered donation certificates (Bronze, Silver, Gold)
 */

const CertificateGenerator = {
    // Certificate tier configuration
    tiers: {
        bronze: {
            minAmount: 500,
            maxAmount: 10000,
            color: '#CD7F32',
            badge: '🥉',
            title: 'Bronze Donor',
            gradient: ['#CD7F32', '#8B4513']
        },
        silver: {
            minAmount: 10001,
            maxAmount: 25000,
            color: '#C0C0C0',
            badge: '🥈',
            title: 'Silver Donor',
            gradient: ['#C0C0C0', '#808080']
        },
        gold: {
            minAmount: 25001,
            maxAmount: Infinity,
            color: '#FFD700',
            badge: '🥇',
            title: 'Gold Donor',
            gradient: ['#FFD700', '#FFA500']
        }
    },

    /**
     * Determine tier based on amount
     */
    getTier(amount) {
        if (amount >= 25001) return 'gold';
        if (amount >= 10001) return 'silver';
        return 'bronze';
    },

    /**
     * Format currency in Indian format
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },

    /**
     * Get current date formatted
     */
    getFormattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-IN', options);
    },

    /**
     * Generate certificate PDF
     */
    generate(donorData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const { name, amount, category, paymentId } = donorData;
        const tier = this.getTier(amount);
        const tierConfig = this.tiers[tier];

        // Page dimensions
        const pageWidth = 297;
        const pageHeight = 210;

        // Background gradient effect
        doc.setFillColor(250, 248, 245);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Decorative border
        doc.setDrawColor(tierConfig.color);
        doc.setLineWidth(3);
        doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 5, 5, 'S');

        // Inner border
        doc.setLineWidth(0.5);
        doc.roundedRect(15, 15, pageWidth - 30, pageHeight - 30, 3, 3, 'S');

        // Header section
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('PRABHUPREMI TRUST', pageWidth / 2, 30, { align: 'center' });

        // Certificate title
        doc.setFontSize(36);
        doc.setTextColor(tierConfig.gradient[0]);
        doc.setFont('helvetica', 'bold');
        doc.text('CERTIFICATE OF APPRECIATION', pageWidth / 2, 50, { align: 'center' });

        // Badge/Tier indicator
        doc.setFontSize(48);
        doc.text(tierConfig.badge, pageWidth / 2, 75, { align: 'center' });

        doc.setFontSize(20);
        doc.setTextColor(tierConfig.gradient[1]);
        doc.text(tierConfig.title, pageWidth / 2, 88, { align: 'center' });

        // "This is to certify" text
        doc.setFontSize(14);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.text('This is to certify that', pageWidth / 2, 105, { align: 'center' });

        // Donor name
        doc.setFontSize(28);
        doc.setTextColor(30, 30, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(name.toUpperCase(), pageWidth / 2, 120, { align: 'center' });

        // Underline for name
        const nameWidth = doc.getTextWidth(name.toUpperCase());
        doc.setDrawColor(tierConfig.color);
        doc.setLineWidth(1);
        doc.line((pageWidth - nameWidth) / 2, 123, (pageWidth + nameWidth) / 2, 123);

        // Donation details
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.text('has generously contributed', pageWidth / 2, 135, { align: 'center' });

        // Amount
        doc.setFontSize(24);
        doc.setTextColor(tierConfig.gradient[0]);
        doc.setFont('helvetica', 'bold');
        doc.text(this.formatCurrency(amount), pageWidth / 2, 147, { align: 'center' });

        // Category
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'italic');
        doc.text(`towards ${this.getCategoryName(category)}`, pageWidth / 2, 157, { align: 'center' });

        // Gratitude message
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Your compassion creates ripples of hope. May your generosity be blessed manifold.', pageWidth / 2, 170, { align: 'center' });

        // Footer section
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);

        // Date
        doc.text(`Date: ${this.getFormattedDate()}`, 30, 190);

        // Transaction ID
        doc.text(`Transaction ID: ${paymentId}`, pageWidth - 30, 190, { align: 'right' });

        // Signature placeholder
        doc.text('____________________', pageWidth / 2, 188, { align: 'center' });
        doc.setFontSize(9);
        doc.text('Authorized Signatory', pageWidth / 2, 193, { align: 'center' });

        // Save/download the PDF
        const filename = `PrabhuPremi_${tier.charAt(0).toUpperCase() + tier.slice(1)}_Certificate_${name.replace(/\s+/g, '_')}.pdf`;
        doc.save(filename);

        return filename;
    },

    /**
     * Get human-readable category name
     */
    getCategoryName(category) {
        const categories = {
            'sarva-sadharan': 'General Welfare',
            'vaiyavachh': 'Vaiyavachh Seva',
            'jeevdaya': 'Jeevdaya (Animal Welfare)',
            'education': 'Education Support',
            'medical': 'Medical Aid',
            'sadharmik': 'Sadharmik Bhakti',
            'anukampa': 'Anukampa (Compassionate Aid)'
        };
        return categories[category] || 'General Welfare';
    }
};

// Make it globally available
window.CertificateGenerator = CertificateGenerator;
