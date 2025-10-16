# Fred Deichler — Personal Website

A minimal, clean personal résumé and speaking website designed for GitHub Pages.

## 🚀 Publishing to GitHub Pages

### Initial Setup

1. **Rename Repository** (if not already done):
   - Go to your repository: `https://github.com/ChiefD425/freddeichler.github.io`
   - Click **Settings** → Under "Repository name", rename to: `ChiefD425.github.io`
   - Click **Rename**

2. **Enable GitHub Pages**:
   - In repository **Settings** → **Pages**
   - Under "Source", select: **Deploy from a branch**
   - Under "Branch", select: **main** and folder: **/ (root)**
   - Click **Save**

3. **Access Your Site**:
   - Your site will be live at: `https://ChiefD425.github.io`
   - It may take a few minutes for the first deployment

### Making Updates

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your site within a few minutes.

## 📝 Updating Content

### 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[REFERENCE.md](REFERENCE.md)** - Complete reference guide

### Quick Reference

#### Adding a Talk

Add to `talks.json`:
```json
{
  "talkId": "2025-conference-name-topic",
  "event": "Conference Name",
  "year": "2025",
  "title": "Talk Title",
  "date": "2025-12-15",
  "category": "AI",
  "image": "media/conferences/2025-conference-name-topic/logo.jpg"
}
```

#### Adding Images

1. Create folder: `media/conferences/[talkId]/`
2. Add images: `logo.jpg`, `action.jpg`, etc.
3. Update `image` field in talks.json

#### Adding Feedback

1. Copy `feedback/TEMPLATE.json` to `feedback/[talkId].json`
2. Fill in metrics and testimonials
3. Update `feedback/index.json`

#### Other Pages

- **Resume** - Edit `resume.html` directly
- **Media** - Edit `media.html` directly
- **Contact** - Edit `contact.html` directly

**See [QUICK_START.md](QUICK_START.md) for detailed instructions.**

## 🎨 Design

- **Colors**: Orange `#FFA500`, Light Blue `#ADD8E6`, Dark Blue `#00008B`, White `#FFFFFF`, Grey `#D3D3D3`
- **Responsive**: Mobile-first design with breakpoints at 800px
- **Dark Mode**: Automatically adapts to system preferences
- **Fonts**: System fonts for fast loading and native appearance

## 🛠 Technical Details

- **Framework**: None — plain HTML, CSS, and vanilla JavaScript
- **Dependencies**: Zero external libraries
- **Browser Support**: All modern browsers
- **Performance**: Optimized for fast loading with minimal HTTP requests

## 📂 File Structure

```text
.
├── index.html              # Homepage with intro and navigation
├── resume.html             # Work experience, education, certifications
├── speaking.html           # Conference talks and presentations
├── media.html              # Podcasts, videos, and media appearances
├── contact.html            # Contact information
├── style.css               # All styles with dark mode support
├── script.js               # Navigation and talk rendering
├── talks.json              # Speaking data (supports images)
├── testimonials.json       # Featured testimonials
├── media/                  # All images and media assets
│   ├── speakers/           # Professional headshots
│   ├── conferences/        # Conference photos (by talkId)
│   └── talks/              # Talk-specific content
├── feedback/               # Talk feedback data
│   ├── index.json          # Summary metrics
│   ├── [talkId].json       # Individual talk feedback
│   └── TEMPLATE.json       # Template for new talks
├── QUICK_START.md          # Quick start guide
├── REFERENCE.md            # Complete reference
└── README.md               # This file
```

## 🔧 Customization Tips

### Add a Custom Domain

- In GitHub Pages settings, add your custom domain
- Create a `CNAME` file in the root with your domain name
- Configure DNS with your domain provider

### Add Images

- Use the `media/` folder for all images
- Conference images: `media/conferences/[talkId]/`
- Headshots: `media/speakers/`
- See [QUICK_START.md](QUICK_START.md) for details

### Extend Sections

- Follow the existing card-based layout pattern
- Use the color variables defined in `:root` in `style.css`

## 📄 License

This is a personal website. Feel free to use this structure as inspiration for your own site.

---

Built with ❤️ by Fred Deichler
