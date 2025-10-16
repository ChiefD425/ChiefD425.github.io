# Media Assets

This folder contains all media assets for the website.

## Structure

- **`speakers/`** - Your professional headshots and photos
- **`conferences/`** - Conference and event photos, organized by talkId
- **`talks/`** - Talk-specific content like slides and diagrams

## Quick Start

### Adding Images for a Talk

1. Create a folder named after the talkId: `conferences/2025-conference-name-topic/`
2. Add at least one of these images:
   - `logo.jpg` - Conference logo (400x400px recommended)
   - `action.jpg` - Photo of you presenting (800x600px)
   - `venue.jpg` - Venue or event photo (800x600px)
3. Update the talk in `talks.json` to reference the image:
   ```json
   "image": "media/conferences/2025-conference-name-topic/logo.jpg"
   ```

### Image Guidelines

- **Format**: JPG for photos, PNG for logos with transparency
- **Size**: Keep under 200KB for fast loading
- **Dimensions**: 
  - Square images: 400x400px to 800x800px
  - Landscape: 800x600px or 1200x900px
  - Portrait: 600x800px

## Placeholder System

If no image is provided, the website will automatically generate a colorful placeholder using the conference initials.

See `../MEDIA_GUIDE.md` for complete documentation.

