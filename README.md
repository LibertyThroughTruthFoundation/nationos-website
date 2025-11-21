# NationOS.org - Static Website

**A Covenant Alternative to Digital Tyranny**

This is the complete static website for NationOS.org, ready for deployment to any web hosting platform.

---

## 📁 What's Included

```
nationos-static/
├── index.html              # Homepage
├── about.html              # About NationOS
├── constitution.html       # The Sovereign Way Constitution
├── declaration.html        # Universal Declaration of Digital Sovereignty
├── pillars.html            # 12 Pillars detailed page
├── education.html          # Covenant Education Framework
├── join.html               # Join/Recruitment page
├── resources.html          # Resources and downloads
├── css/
│   └── style.css           # Main stylesheet (dark theme with gold accents)
├── js/
│   └── (reserved for future JavaScript)
├── images/
│   └── (42 branding assets - logos, icons, headers)
├── documents/
│   ├── The_Sovereign_Way_Constitution_FINAL_v3.0.md
│   ├── Universal_Declaration_of_Digital_Sovereignty_SOURCE.md
│   ├── Covenant_Education_Framework_FINAL_v2.0.md
│   ├── NationOS_12_Pillars_IMPLEMENTATION_GUIDE_v1.0.md
│   └── (HTML versions for web display)
└── README.md               # This file
```

---

## 🚀 Deployment Options

### Option 1: Free Hosting (Recommended for Static Sites)

#### **Netlify (Easiest)**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, or email
3. Drag and drop the entire `nationos-static` folder into Netlify
4. Your site will be live at `your-site-name.netlify.app` within seconds
5. Add custom domain (NationOS.org) in Site Settings → Domain Management

**Advantages:**
- Free for static sites
- Automatic HTTPS
- Global CDN (fast worldwide)
- Easy custom domain setup
- Zero configuration needed

#### **Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or email
3. Click "Add New Project"
4. Upload the `nationos-static` folder
5. Deploy (takes ~30 seconds)
6. Add custom domain in Project Settings

**Advantages:**
- Free for static sites
- Excellent performance
- Automatic HTTPS
- Easy to use

#### **GitHub Pages**
1. Create a GitHub account if you don't have one
2. Create a new repository called `nationos-org`
3. Upload all files from `nationos-static` folder
4. Go to Settings → Pages
5. Select branch `main` and folder `/` (root)
6. Your site will be live at `yourusername.github.io/nationos-org`
7. Add custom domain in Settings → Pages → Custom domain

**Advantages:**
- Completely free
- Integrated with version control
- Good for open-source projects

---

### Option 2: Your Vultr Server

If you want to use your existing Vultr server:

#### **Step 1: Access Your Server**
```bash
ssh your-username@your-server-ip
```

#### **Step 2: Install Web Server (if not already installed)**
```bash
# Install Nginx
sudo apt update
sudo apt install nginx -y

# Or install Apache
sudo apt install apache2 -y
```

#### **Step 3: Upload Files**
```bash
# From your local machine, upload the website
scp -r nationos-static/* your-username@your-server-ip:/var/www/html/
```

#### **Step 4: Configure Domain**
Point your domain (NationOS.org) to your Vultr server IP address in your DNS settings.

#### **Step 5: Set Up HTTPS (Optional but Recommended)**
```bash
# Install Certbot for free SSL certificate
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d nationos.org -d www.nationos.org
```

**Note:** Vultr basic VPS costs $5-10/month. For a static website, free hosting (Netlify/Vercel) is recommended to save costs.

---

### Option 3: Other Hosting Providers

The website will work on any web hosting service:
- **Cloudflare Pages** (free)
- **DigitalOcean App Platform** ($5/month)
- **AWS S3 + CloudFront** (pay-as-you-go, very cheap for static sites)
- **Traditional shared hosting** (Bluehost, SiteGround, etc.)

Simply upload the files to the web root directory (usually `public_html` or `www`).

---

## 🎨 Design & Features

**Theme:**
- Dark background with gold/bronze accents (matching HEX/PulseChain aesthetic)
- Professional, clean design
- Fully responsive (mobile-friendly)
- Fast loading (no heavy frameworks)

**Pages:**
1. **Homepage** - Vision overview, 12 Pillars grid, call-to-action
2. **About** - The vision, prophetic timeline, Sovereign Sentinel role
3. **Constitution** - Full text of The Sovereign Way Constitution
4. **Declaration** - Universal Declaration of Digital Sovereignty
5. **12 Pillars** - Complete architecture details
6. **Education** - Covenant Education Framework
7. **Join** - Recruitment forms for covenant members and builders
8. **Resources** - Downloads, branding assets, external links

**All documents are included** in both Markdown (for download) and HTML (for web display).

---

## 📝 Customization

### Update Content
- Edit the HTML files directly to change text
- All pages use the same header/footer structure for consistency

### Change Colors
- Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
  --primary-bg: #0a0a0a;
  --accent-gold: #d4af37;
  --accent-bronze: #cd7f32;
  /* etc. */
}
```

### Add/Replace Images
- Add new images to the `images/` folder
- Update the `<img src="images/your-image.png">` tags in HTML files

### Update Documents
- Replace files in `documents/` folder
- Re-run `python3 convert_docs.py` to regenerate HTML versions

---

## 🔗 Domain Setup

Once you've deployed to a hosting provider:

1. **Purchase domain** (if you haven't already)
   - NationOS.org (recommended)
   - Or use existing domain

2. **Point domain to hosting**
   - **For Netlify/Vercel:** Follow their custom domain instructions (usually just add DNS records)
   - **For Vultr/VPS:** Point A record to your server IP address

3. **Enable HTTPS**
   - Most free hosts (Netlify, Vercel) do this automatically
   - For VPS, use Certbot (see Vultr instructions above)

---

## 📧 Contact Forms

The Join page includes contact forms for:
- Covenant member applications
- Technical co-founder/builder applications

**Current Status:** Forms display a message to email directly (sentinel@nationos.org, builders@nationos.org)

**Future:** Once you have backend infrastructure, you can connect these forms to:
- Email service (SendGrid, Mailgun)
- Database (to store applications)
- CRM system

For now, the forms serve as UI placeholders and direct people to email.

---

## 🛡️ Security Notes

- This is a static website (HTML/CSS/JS only) - very secure by default
- No server-side code = no server vulnerabilities
- No database = no SQL injection risks
- HTTPS is still important for trust and SEO (free with Netlify/Vercel)

---

## 📊 Analytics (Optional)

To track visitors, you can add:
- **Google Analytics** (free)
- **Plausible** (privacy-friendly, $9/month)
- **Simple Analytics** (privacy-friendly, $19/month)

Add the tracking code to the `<head>` section of each HTML file.

---

## 🚀 Launch Checklist

- [ ] Choose hosting platform (Netlify recommended)
- [ ] Deploy website
- [ ] Add custom domain (NationOS.org)
- [ ] Enable HTTPS (automatic on Netlify/Vercel)
- [ ] Test all pages and links
- [ ] Test on mobile devices
- [ ] Set up email addresses (sentinel@nationos.org, builders@nationos.org)
- [ ] Announce launch on X/Twitter (@SovereignSentinel)

---

## 💡 Next Steps After Launch

1. **Recruit technical co-founder** (use the website to showcase the vision)
2. **Gather first covenant members** (Join page provides application process)
3. **Build backend infrastructure** (with technical co-founder)
4. **Connect forms to database**
5. **Launch core pillars** (JUBILEE, Chi Rho Passport, GodManMarkets)

---

## 📞 Support

For questions about deployment or customization:
- Email: sentinel@nationos.org
- X/Twitter: @SovereignSentinel

---

**"Unless the LORD builds the house, those who build it labor in vain." - Psalm 127:1**

Built with faith and purpose for the Kingdom. 🛡️☧
