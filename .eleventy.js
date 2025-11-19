const fs = require("fs");

module.exports = function (eleventyConfig) {
    // Passthrough Copy
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("IMG_3523.png");
    eleventyConfig.addPassthroughCopy("feedback");
    eleventyConfig.addPassthroughCopy("CNAME"); // If it exists

    // --- Filters ---

    // Get Initials
    eleventyConfig.addFilter("getInitials", (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .filter((word) => word.length > 0)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("");
    });

    // First Name Only
    eleventyConfig.addFilter("firstNameOnly", (name) => {
        if (!name) return "";
        return name.split(" ")[0];
    });

    // Get Talk Gradient
    eleventyConfig.addFilter("getTalkGradient", (index) => {
        const gradients = [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
            "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
            "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
        ];
        return gradients[index % gradients.length];
    });

    // Get Talk Image Path
    eleventyConfig.addFilter("getTalkImagePath", (talk) => {
        if (talk.image && talk.image.trim() !== "") {
            return talk.image;
        }
        if (talk.talkId) {
            // Check if file exists locally to avoid 404s in build
            // Note: This assumes running from root
            const path = `media/conferences/${talk.talkId}/logo.png`;
            if (fs.existsSync(path)) {
                return "/" + path;
            }
        }
        return null;
    });

    // Date Formatting
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    });

    eleventyConfig.addFilter("shortDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    });

    // Array Filters
    eleventyConfig.addFilter("limit", (arr, limit) => {
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("upcomingTalks", (talks) => {
        const today = new Date().toISOString().split("T")[0];
        return talks
            .filter((t) => t.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date));
    });

    eleventyConfig.addFilter("pastTalks", (talks) => {
        const today = new Date().toISOString().split("T")[0];
        return talks
            .filter((t) => t.date < today)
            .sort((a, b) => b.date.localeCompare(a.date));
    });

    eleventyConfig.addFilter("featuredTalks", (talks) => {
        return talks.filter(t => t.featured === true);
    });

    eleventyConfig.addFilter("isPastDate", (dateStr) => {
        const today = new Date().toISOString().split("T")[0];
        return dateStr < today;
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data",
        },
    };
};
