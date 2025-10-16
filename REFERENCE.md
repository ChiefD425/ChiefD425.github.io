# Content Management Reference Guide

Complete reference for managing talks, images, feedback, and testimonials.

## Table of Contents

1. [Data Files Overview](#data-files-overview)
2. [Folder Structure](#folder-structure)
3. [Adding Talks](#adding-talks)
4. [Managing Images](#managing-images)
5. [Feedback Data](#feedback-data)
6. [Testimonials](#testimonials)
7. [Complete Example](#complete-example)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Data Files Overview

### talks.json - Master Talk Registry

**Purpose:** Central list of all talks (past, present, future)

**Required fields:**
- `talkId` - Unique identifier (YYYY-event-slug-topic-slug)
- `event` - Conference/event name
- `year` - Year as string
- `title` - Talk title
- `date` - ISO format (YYYY-MM-DD)
- `category` - One of: AI, Technical, Leadership, Transformation

**Optional fields:**
- `link` - Recording URL (YouTube, etc.)
- `duration` - e.g., "45 min" or "45-60 min"
- `format` - e.g., "Keynote, Workshop, Breakout"
- `featured` - Boolean, shows in Featured section
- `image` - Path to image file

**Example:**
```json
{
  "talkId": "2025-agile-summit-austin-ai",
  "event": "Agile Summit Austin",
  "year": "2025",
  "title": "AI-Powered Agile Teams",
  "link": "https://youtube.com/watch?v=example",
  "date": "2025-09-15",
  "category": "AI",
  "duration": "60 min",
  "format": "Keynote",
  "featured": true,
  "image": "media/conferences/2025-agile-summit-austin-ai/logo.jpg"
}
```

### testimonials.json - Featured Testimonials

**Purpose:** Best testimonials for homepage and services page

**Required fields:**
- `quote` - The testimonial text
- `event` - Conference/event name
- `talkId` - Links to specific talk

**Optional fields:**
- `author` - Person's name (if you have permission)
- `featured` - Boolean, shows on homepage

**Example:**
```json
{
  "quote": "Best session I've attended this year!",
  "author": "Sarah Johnson",
  "event": "Agile Summit Austin",
  "talkId": "2025-agile-summit-austin-ai",
  "featured": true
}
```

### feedback/[talkId].json - Detailed Feedback

**Purpose:** Complete feedback data for specific talk (shown in modal)

**Structure:**
```json
{
  "valuablePct": 95,
  "hearAgainPct": 90,
  "responses": 42,
  "metrics": {
    "relevant": 94.4,
    "actionable": 92.7,
    "engaging": 89.6,
    "inspiring": 89.6
  },
  "testimonials": [
    {"text": "Quote from attendee"},
    {"text": "Another testimonial"}
  ]
}
```

**All percentages are 0-100 scale**

### feedback/index.json - Summary Metrics

**Purpose:** Quick lookup of summary metrics

**Structure:**
```json
{
  "2025-agile-summit-austin-ai": {
    "valuablePct": 95,
    "hearAgainPct": 90,
    "responses": 42,
    "metrics": {
      "relevant": 94.4,
      "actionable": 92.7,
      "engaging": 89.6,
      "inspiring": 89.6
    }
  }
}
```

**Note:** Does NOT include testimonials (those are only in individual files)

---

## Folder Structure

```
personal_website/
├── media/
│   ├── speakers/                   # Your professional photos
│   │   ├── headshot-primary.jpg
│   │   ├── headshot-speaking.jpg
│   │   └── headshot-casual.jpg
│   ├── conferences/                # Conference-specific images
│   │   └── [talkId]/              # One folder per talk
│   │       ├── logo.jpg           # Conference logo
│   │       ├── action.jpg         # You presenting
│   │       └── venue.jpg          # Venue photo
│   └── talks/                      # Talk-specific content
│       └── [talkId]/
│           ├── slide-1.jpg
│           └── slide-2.jpg
├── feedback/
│   ├── index.json                  # Summary metrics
│   ├── [talkId].json              # Individual talk feedback
│   ├── README.md                   # Feedback guide
│   └── TEMPLATE.json               # Template for new talks
├── talks.json                      # Master talk registry
└── testimonials.json               # Featured testimonials
```

---

## Adding Talks

### Workflow 1: Upcoming Talk (Before Event)

1. **Add to talks.json:**
```json
{
  "talkId": "2025-conference-name-topic",
  "event": "Conference Name",
  "year": "2025",
  "title": "Your Talk Title",
  "date": "2025-12-15",
  "category": "AI",
  "duration": "45 min",
  "format": "Keynote"
}
```

2. **Optional - Add conference logo:**
```
media/conferences/2025-conference-name-topic/logo.jpg
```

3. **Update image field:**
```json
"image": "media/conferences/2025-conference-name-topic/logo.jpg"
```

**Result:** Appears in "Upcoming Talks" section

### Workflow 2: Past Talk (After Event)

1. **Update date** if it has passed (automatically moves to "Past Talks")

2. **Add photos:**
```
media/conferences/2025-conference-name-topic/
├── logo.jpg
├── action.jpg
└── venue.jpg
```

3. **Update image field** to your favorite photo

4. **Add feedback data** (see Feedback section)

5. **Optional - Feature it:**
```json
"featured": true
```

**Result:** Shows in past talks timeline, clickable modal with feedback

### talkId Naming Rules

**Format:** `YYYY-event-slug-topic-slug`

**Rules:**
- Year first (4 digits)
- Lowercase only
- Hyphens, not underscores or spaces
- No special characters
- Keep it concise but descriptive

**Good examples:**
- `2025-agile-summit-austin-ai`
- `2024-kcdc-predictable-delivery`
- `2025-scrum-gathering-banff-chatgpt`

**Bad examples:**
- `agile-summit-2025` ❌ (year should be first)
- `2025_Agile_Summit` ❌ (use lowercase, hyphens)
- `2025-agile-summit-austin-ai-powered-agile-teams-keynote` ❌ (too long)

---

## Managing Images

### Image Types & Sizes

| Type | File Name | Recommended Size | Use Case |
|------|-----------|------------------|----------|
| Conference logo | `logo.jpg` | 400x400px | Timeline, cards |
| Action shot | `action.jpg` | 800x600px | Featured talks |
| Venue photo | `venue.jpg` | 800x600px | Visual interest |
| Headshot | `headshot-*.jpg` | 600x600px | About page, etc. |

### Image Optimization

**Before adding images:**
1. Resize to recommended dimensions
2. Compress (aim for under 200KB)
3. Use JPG for photos, PNG for logos with transparency
4. Consider WebP for better compression (modern browsers)

**Tools:**
- [TinyJPG](https://tinyjpg.com) - Online compression
- [ImageOptim](https://imageoptim.com) - Mac app
- [Squoosh](https://squoosh.app) - Browser-based

### Adding Images to Existing Talks

**Step-by-step:**

1. **Find the talkId** in talks.json:
```json
"talkId": "2024-scanagile-growth-wheel"
```

2. **Create folder:**
```bash
media/conferences/2024-scanagile-growth-wheel/
```

3. **Add images:**
```
2024-scanagile-growth-wheel/
├── logo.jpg      # Conference logo
└── action.jpg    # You presenting
```

4. **Update talks.json:**
```json
"image": "media/conferences/2024-scanagile-growth-wheel/logo.jpg"
```

5. **Test** by opening speaking.html

### Image Path Rules

**✅ Correct:**
```json
"image": "media/conferences/2025-kcdc-chatgpt/logo.jpg"
```

**❌ Wrong:**
```json
"image": "/media/conferences/2025-kcdc-chatgpt/logo.jpg"    // Don't start with /
"image": "./media/conferences/2025-kcdc-chatgpt/logo.jpg"   // Don't use ./
"image": "C:/Users/.../media/conferences/..."               // Don't use absolute paths
```

### Fallback Behavior

**If no image specified:**
- Website generates colorful gradient
- Shows conference initials (first letters of words)
- Same behavior as before

**This means:**
- ✅ Old talks work fine without images
- ✅ You can add images gradually
- ✅ Missing images don't break anything

---

## Feedback Data

### Collecting Feedback

**Sources:**
1. Conference surveys (post-event feedback)
2. Your own surveys (Google Forms, Typeform)
3. LinkedIn comments and reactions
4. Direct messages and emails
5. Event platform ratings (Sessionize, etc.)

### Calculating Metrics

**Percentages (0-100 scale):**

```
valuablePct = (Responses rating 4-5 stars / Total responses) × 100
hearAgainPct = ("Yes" responses / Total responses) × 100

For individual metrics:
relevant = (Sum of ratings / (Total responses × Max rating)) × 100
```

**Example:**
- 40 out of 42 rated "actionable" as 4-5 stars
- actionable = (40/42) × 100 = 95.2%

### Adding Feedback

**Step 1: Create individual file**

```bash
cp feedback/TEMPLATE.json feedback/2025-my-conference-topic.json
```

Edit `feedback/2025-my-conference-topic.json`:
```json
{
  "valuablePct": 95,
  "hearAgainPct": 90,
  "responses": 42,
  "metrics": {
    "relevant": 96.2,
    "actionable": 93.8,
    "engaging": 97.1,
    "inspiring": 91.5
  },
  "testimonials": [
    {"text": "Amazing session! Very actionable."},
    {"text": "Best talk at the conference."},
    {"text": "Immediately implementing these strategies."}
  ]
}
```

**Step 2: Update index.json**

Add entry to `feedback/index.json`:
```json
{
  "2025-my-conference-topic": {
    "valuablePct": 95,
    "hearAgainPct": 90,
    "responses": 42,
    "metrics": {
      "relevant": 96.2,
      "actionable": 93.8,
      "engaging": 97.1,
      "inspiring": 91.5
    }
  }
}
```

**Result:** Talk becomes clickable on speaking page, opens modal with full feedback

### Privacy & Ethics

- ✅ Use "Attendee" if no permission for names
- ✅ Aggregate percentages protect privacy
- ✅ Get consent before using full names
- ❌ Don't cherry-pick or manipulate data
- ❌ Don't use testimonials without permission

---

## Testimonials

### Two Types of Testimonials

**1. feedback/[talkId].json testimonials:**
- All testimonials for a specific talk
- Shown in modal when talk is clicked
- Can include many quotes

**2. testimonials.json:**
- Your BEST testimonials only
- Shown on homepage and services page
- Should be your top 6-10 quotes

### Workflow: From Feedback to Featured

1. **Collect feedback** → Add all to `feedback/[talkId].json`
2. **Pick the best 2-3** → Also add to `testimonials.json`
3. **Mark top 6 as featured** → Set `"featured": true`

**Example:**

After great talk, you get 10 testimonials:

```json
// feedback/2025-agile-summit-austin-ai.json
{
  "testimonials": [
    {"text": "Best session ever!"},
    {"text": "Very actionable advice."},
    // ... all 10 testimonials
  ]
}
```

Pick your favorite and add to testimonials.json:

```json
// testimonials.json
{
  "quote": "Best session ever!",
  "author": "Sarah Johnson",
  "event": "Agile Summit Austin",
  "talkId": "2025-agile-summit-austin-ai",
  "featured": true
}
```

### Where Testimonials Appear

| File | Location | Purpose |
|------|----------|---------|
| feedback/[talkId].json | Modal on speaking page | Show all feedback for that talk |
| testimonials.json | Homepage (first 6) | Social proof on landing page |
| testimonials.json | Services page (all) | Detailed testimonials for services |

---

## Complete Example

### Scenario: "Agile Summit Austin 2025"

You spoke at Agile Summit Austin on September 15, 2025. Great feedback, photos available.

#### Step 1: Add to talks.json

```json
{
  "talkId": "2025-agile-summit-austin-ai",
  "event": "Agile Summit Austin",
  "year": "2025",
  "title": "AI-Powered Agile Teams",
  "link": "https://youtube.com/watch?v=example",
  "date": "2025-09-15",
  "category": "AI",
  "duration": "60 min",
  "format": "Keynote",
  "featured": true,
  "image": "media/conferences/2025-agile-summit-austin-ai/action.jpg"
}
```

#### Step 2: Add Images

```
media/conferences/2025-agile-summit-austin-ai/
├── logo.jpg       (Conference logo)
├── action.jpg     (You presenting - using this one)
└── venue.jpg      (Austin venue)
```

#### Step 3: Create Feedback File

`feedback/2025-agile-summit-austin-ai.json`:
```json
{
  "valuablePct": 95,
  "hearAgainPct": 92,
  "responses": 47,
  "metrics": {
    "relevant": 96.2,
    "actionable": 93.8,
    "engaging": 97.1,
    "inspiring": 91.5
  },
  "testimonials": [
    {"text": "This changed how I think about AI in teams."},
    {"text": "Best keynote of the conference."},
    {"text": "Implementing these strategies Monday."}
  ]
}
```

#### Step 4: Update feedback/index.json

```json
{
  "2025-agile-summit-austin-ai": {
    "valuablePct": 95,
    "hearAgainPct": 92,
    "responses": 47,
    "metrics": {
      "relevant": 96.2,
      "actionable": 93.8,
      "engaging": 97.1,
      "inspiring": 91.5
    }
  }
}
```

#### Step 5: Feature Best Testimonials

Add to `testimonials.json`:
```json
{
  "quote": "This changed how I think about AI in teams. The practical examples were spot-on!",
  "author": "Jennifer Martinez",
  "event": "Agile Summit Austin",
  "talkId": "2025-agile-summit-austin-ai",
  "featured": true
}
```

#### Result

**On speaking.html:**
- Shows in "Featured Talks" section
- Shows in "Past Talks" timeline with action photo
- Clickable → Opens modal with metrics and testimonials

**On index.html:**
- Appears in "Recent Highlights"
- Testimonial shows in testimonials section

**On services.html:**
- Testimonial shows in testimonials grid

---

## Best Practices

### Content Management

1. **Update promptly** - Add talks within a week of speaking
2. **Organize by talkId** - Keeps everything consistent
3. **Use templates** - Copy TEMPLATE.json for new talks
4. **Validate JSON** - Use [JSONLint](https://jsonlint.com) before saving
5. **Backup originals** - Keep high-res images separately

### Image Management

1. **Quality over quantity** - One great photo beats three mediocre ones
2. **Consistent sizing** - Stick to recommended dimensions
3. **Optimize before upload** - Keep files under 200KB
4. **Use descriptive names** - `logo.jpg`, `action.jpg`, not `IMG_1234.jpg`
5. **Test on mobile** - Ensure images look good at all sizes

### Data Quality

1. **Real data only** - Don't inflate numbers
2. **Get permission** - Before using names in testimonials
3. **Keep it current** - Remove very old talks if needed
4. **Document sources** - Note where feedback came from
5. **Regular audits** - Review data quarterly

### Workflow Tips

1. **Batch updates** - Update multiple talks at once after conferences
2. **Use checklists** - Follow the quick start checklist
3. **Test locally** - Check speaking.html before committing
4. **Version control** - Commit changes to git regularly
5. **Keep notes** - Document unique situations

---

## Troubleshooting

### Images Not Displaying

**Check:**
- [ ] File exists at specified path
- [ ] Path in talks.json starts with `media/` (not `/media/` or `./media/`)
- [ ] Filename matches exactly (case-sensitive on some systems)
- [ ] Image format is supported (jpg, png, webp)
- [ ] File size is reasonable (under 5MB)

**Browser cache:**
```bash
Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### Modal Not Opening

**Check:**
- [ ] `feedback/[talkId].json` exists
- [ ] talkId matches exactly between talks.json and feedback file
- [ ] JSON syntax is valid (use JSONLint)
- [ ] File has required fields (valuablePct, hearAgainPct, responses, metrics)

### Talk Not Appearing

**Check:**
- [ ] Date format is `YYYY-MM-DD`
- [ ] Category is one of: AI, Technical, Leadership, Transformation
- [ ] JSON syntax is valid
- [ ] No trailing commas
- [ ] talkId is unique (not duplicated)

**Date logic:**
- `date >= today` → Shows in "Upcoming Talks"
- `date < today` → Shows in "Past Talks"

### JSON Syntax Errors

**Common mistakes:**

❌ Trailing comma:
```json
{
  "name": "value",
}
```

✅ No trailing comma:
```json
{
  "name": "value"
}
```

❌ Single quotes:
```json
{'name': 'value'}
```

✅ Double quotes:
```json
{"name": "value"}
```

**Validation:**
1. Copy your JSON
2. Paste into [JSONLint](https://jsonlint.com)
3. Fix any errors it finds

### Performance Issues

**If page loads slowly:**

1. **Optimize images** - Compress to under 200KB each
2. **Check image count** - Remove unused images
3. **Use WebP** - Better compression than JPG
4. **Lazy loading** - Images load as you scroll (already implemented)

---

## Data File Relationships

```
talks.json
    └─ talkId: "2025-agile-summit-austin-ai"
           │
           ├─ image → media/conferences/2025-agile-summit-austin-ai/logo.jpg
           │
           ├─ Used to load → feedback/2025-agile-summit-austin-ai.json
           │                   └─ Shows in modal
           │
           └─ Referenced in → testimonials.json
                              └─ Shows on homepage/services
```

**Flow:**
1. User visits speaking.html
2. Script loads talks.json
3. Renders talks (uses image field if present)
4. User clicks talk
5. Script loads feedback/[talkId].json
6. Opens modal with metrics and testimonials

---

## Quick Reference

### Required talk Fields
- talkId, event, year, title, date, category

### Optional Talk Fields
- link, duration, format, featured, image

### Image Path Format
`media/conferences/[talkId]/filename.jpg`

### talkId Format
`YYYY-event-slug-topic-slug`

### Category Options
AI, Technical, Leadership, Transformation

### Date Format
`YYYY-MM-DD` (ISO 8601)

### Feedback Metrics
0-100 scale: valuablePct, hearAgainPct, relevant, actionable, engaging, inspiring

---

**For quick tasks, see QUICK_START.md**

