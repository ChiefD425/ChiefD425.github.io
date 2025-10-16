# Quick Start Guide

Get started with your media and content management system in 5 minutes.

## What's New?

✅ **Media folder** - Organized place for all images  
✅ **Image support** - Use real photos instead of just initials  
✅ **Better organization** - Clear structure for talks, feedback, testimonials  
✅ **Backwards compatible** - Nothing breaks, old content still works  

## Folder Structure

```
personal_website/
├── media/
│   ├── speakers/          # Your headshots
│   ├── conferences/       # Conference photos (by talkId)
│   └── talks/            # Slides, diagrams
├── feedback/
│   ├── index.json        # Summary metrics
│   └── [talkId].json     # Detailed feedback per talk
├── talks.json            # Master list (now supports images!)
└── testimonials.json     # Featured testimonials
```

## Common Tasks

### 1. Add Your Headshot (1 minute)

```
1. Place file: media/speakers/headshot-primary.jpg
2. Use it anywhere you need a photo
```

### 2. Add Image to a Talk (2 minutes)

```
1. Create folder: media/conferences/2025-kcdc-predictable-delivery/
2. Add image: logo.jpg or action.jpg
3. Update talks.json:
   "image": "media/conferences/2025-kcdc-predictable-delivery/logo.jpg"
4. Done! Refresh speaking.html
```

### 3. Add a New Talk (3 minutes)

```json
// Add to talks.json
{
  "talkId": "2025-my-conference-topic",
  "event": "Conference Name",
  "year": "2025",
  "title": "Your Talk Title",
  "date": "2025-12-15",
  "category": "AI",
  "duration": "45 min",
  "format": "Keynote",
  "image": "media/conferences/2025-my-conference-topic/logo.jpg"
}
```

**talkId naming:** `YYYY-event-slug-topic-slug` (lowercase, hyphens)

**Categories:** AI, Technical, Leadership, Transformation

### 4. Add Feedback After a Talk (5 minutes)

```bash
# Copy template
cp feedback/TEMPLATE.json feedback/2025-my-conference-topic.json

# Edit with your data, then update feedback/index.json
```

### 5. Feature Your Best Talks

```json
// In talks.json, add:
"featured": true
```

Shows in "Featured Talks" section on speaking page.

## How Images Work

**With image:**
```json
"image": "media/conferences/[talkId]/logo.jpg"
```
→ Shows your real image

**Without image:**
```json
// No image field, or empty string
```
→ Shows colorful initials (like before)

**Nothing breaks if you don't add images!**

## File Naming Conventions

### talkId Format
`YYYY-event-slug-topic-slug`

✅ Good examples:
- `2025-agile-summit-austin-ai`
- `2024-kcdc-predictable-delivery`

❌ Bad examples:
- `agile-summit-2025` (year should be first)
- `2025_agile_summit` (use hyphens)
- `2025-Agile-Summit` (lowercase only)

### Image Files
- Conference logos: `logo.jpg` (400x400px)
- You speaking: `action.jpg` (800x600px)
- Venue shots: `venue.jpg` (800x600px)

## Quick Checklist: Complete Talk

- [ ] Add to `talks.json` with all required fields
- [ ] Create folder: `media/conferences/[talkId]/`
- [ ] Add image (logo or action shot)
- [ ] Update `image` field in talks.json
- [ ] After talk: Create `feedback/[talkId].json`
- [ ] After talk: Update `feedback/index.json`
- [ ] Add best quotes to `testimonials.json`
- [ ] Optional: Set `featured: true`

## Troubleshooting

**Image not showing?**
- Check path starts with `media/` (not `/media/` or `./media/`)
- Verify file exists in that location
- Check filename matches exactly (case-sensitive)

**Modal not opening?**
- Ensure `feedback/[talkId].json` exists
- Verify talkId matches exactly between files
- Validate JSON syntax at jsonlint.com

**Talk not appearing?**
- Check date format: `YYYY-MM-DD`
- Verify JSON syntax is valid
- Ensure category is: AI, Technical, Leadership, or Transformation

## Next Steps

1. **Add one image** - Pick your favorite talk, add a logo
2. **Test it** - Open speaking.html and see it work
3. **Need more details?** - See REFERENCE.md for comprehensive guide

## Key Points

- 📝 Manual updates via JSON files
- 🖼️ Images are optional (graceful fallback)
- ✅ Backwards compatible
- 📁 Organized folder structure
- 🎯 Simple workflows

---

**For detailed reference, see REFERENCE.md**
