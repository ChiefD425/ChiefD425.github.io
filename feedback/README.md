# Feedback Data Management

This folder contains feedback data from conference talks and presentations.

## Structure

- **`index.json`** - Summary metrics for all talks (used for quick lookups)
- **`[talkId].json`** - Detailed feedback for each individual talk
- **`TEMPLATE.json`** - Template for creating new feedback files

## Adding Feedback for a New Talk

### Step 1: Create Individual Feedback File

Create a new file named `[talkId].json` (matching the talkId from `talks.json`):

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
    {"text": "Quote from attendee feedback"},
    {"text": "Another testimonial"},
    {"text": "More feedback here"}
  ]
}
```

**Field Descriptions:**
- `valuablePct` - Percentage who found the session valuable (0-100)
- `hearAgainPct` - Percentage who would attend again (0-100)
- `responses` - Total number of feedback responses received
- `metrics` - Four key metrics (0-100 scale):
  - `relevant` - Content was relevant to their work
  - `actionable` - Takeaways they can implement
  - `engaging` - Presentation style was engaging
  - `inspiring` - Left them inspired/motivated
- `testimonials` - Array of quote objects with `text` field

### Step 2: Update index.json

Add an entry to `index.json` with the same talkId:

```json
{
  "2025-conference-name-topic": {
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

**Note:** The `index.json` does NOT include testimonials - those are only in the individual files.

## Data Sources

Feedback metrics can come from:

1. **Conference surveys** - Many conferences provide speaker feedback
2. **Post-event surveys** - Your own follow-up surveys
3. **LinkedIn comments** - Reactions and comments on posts
4. **Direct messages** - Feedback received via email/DM
5. **Event ratings** - Platforms like Sessionize or conference apps

## Calculating Percentages

If you have raw data:

- **valuablePct** = (Number who rated 4-5 stars / Total responses) × 100
- **hearAgainPct** = (Number who said "yes" / Total responses) × 100
- **metrics** = (Sum of ratings / (Total responses × Max rating)) × 100

Example: If 40 out of 42 people rated "actionable" as 4 or 5 stars:
- actionable = (40/42) × 100 = 95.2

## Best Practices

1. **Be honest** - Only include real feedback data
2. **Permission** - Get permission before using specific quotes with names
3. **Regular updates** - Add feedback within a week of the talk
4. **Quality over quantity** - 3-5 strong testimonials is better than 20 weak ones
5. **Context** - Note if feedback was from a specific audience (e.g., "technical audience" vs "leadership")

## Testimonials vs testimonials.json

There are TWO places for testimonials:

1. **`feedback/[talkId].json`** - All testimonials for a specific talk (shown in modal)
2. **`testimonials.json`** - Featured testimonials shown on homepage/services page

**Workflow:**
1. Collect all feedback → Add to `feedback/[talkId].json`
2. Select the BEST quotes → Also add to `testimonials.json` with `talkId` reference
3. Mark top 3-6 as `featured: true` in `testimonials.json`

## Example: Complete Workflow

After speaking at "Agile Days 2025":

1. **Create** `feedback/2025-agile-days-keynote.json`:
```json
{
  "valuablePct": 98,
  "hearAgainPct": 95,
  "responses": 55,
  "metrics": {
    "relevant": 96.5,
    "actionable": 94.2,
    "engaging": 98.1,
    "inspiring": 92.8
  },
  "testimonials": [
    {"text": "Best talk at the conference!"},
    {"text": "Immediately applicable to my team."},
    {"text": "Fred's energy and expertise really showed."}
  ]
}
```

2. **Update** `feedback/index.json`:
```json
{
  "2025-agile-days-keynote": {
    "valuablePct": 98,
    "hearAgainPct": 95,
    "responses": 55,
    "metrics": { "relevant": 96.5, "actionable": 94.2, "engaging": 98.1, "inspiring": 92.8 }
  }
}
```

3. **Add best quote** to `testimonials.json`:
```json
{
  "quote": "Best talk at the conference!",
  "author": "Sarah Johnson",
  "event": "Agile Days 2025",
  "talkId": "2025-agile-days-keynote",
  "featured": true
}
```

## Troubleshooting

**Modal not showing feedback?**
- Verify the talkId matches exactly between `talks.json` and `feedback/[talkId].json`
- Check JSON syntax using JSONLint
- Ensure the file is named correctly (case-sensitive)

**Metrics not displaying correctly?**
- All metric values should be 0-100 (percentages)
- Use one decimal place for precision
- Ensure all four metrics are present

**Testimonials not appearing?**
- Check the `testimonials` array exists and has correct syntax
- Each testimonial must have a `text` field
- Quotes should be properly escaped

## Privacy & Ethics

- **Anonymous by default** - Use "Attendee" if no permission for names
- **Aggregate data** - Percentages protect individual privacy
- **Consent** - Always get consent before using full names
- **Honest representation** - Don't cherry-pick or manipulate data

