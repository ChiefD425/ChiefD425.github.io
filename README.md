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

### Resume (`resume.html`)

- Edit the experience, education, and certifications sections directly in the HTML
- Maintain the card-based structure for consistency

### Speaking Engagements (`talks.json`)

Add new talks in this format (note the required `talkId` used to link feedback files):

```json
{
  "talkId": "2025-agile-devops-des-moines-chatgpt",
  "event": "Conference Name",
  "year": "2025",
  "title": "Talk Title",
  "link": "https://optional-link-to-slides-or-video",
  "date": "2025-MM-DD"
}
```

**Note**: The `date` field is used for chronological sorting but is not displayed on the page.

#### Feedback data (optional)

- Create `feedback/index.json` with badge summaries keyed by `talkId`.
- Create one file per talk: `feedback/{talkId}.json` containing metrics and testimonials.
- Add curated quotes to `testimonials.json` for homepage display.

### Media (`media.html`)

Add new podcast or video appearances by editing the lists in `media.html`.

### Contact Information (`contact.html`)

Update email, phone, LinkedIn, or Linktree links as needed.

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
├── index.html          # Homepage with intro and navigation
├── resume.html         # Work experience, education, certifications
├── speaking.html       # Conference talks and presentations
├── media.html          # Podcasts, videos, and media appearances
├── contact.html        # Contact information
├── style.css           # All styles with dark mode support
├── script.js           # Navigation toggle and year display
├── talks.json          # Speaking data (loaded dynamically)
└── README.md           # This file
```

## 🔧 Customization Tips

### Add a Custom Domain

- In GitHub Pages settings, add your custom domain
- Create a `CNAME` file in the root with your domain name
- Configure DNS with your domain provider

### Add Images

- Create an `assets/` or `images/` folder
- Reference images with relative paths: `<img src="assets/photo.jpg">`

### Extend Sections

- Follow the existing card-based layout pattern
- Use the color variables defined in `:root` in `style.css`

## 📄 License

This is a personal website. Feel free to use this structure as inspiration for your own site.

---

Built with ❤️ by Fred Deichler
