import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Living Index",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "yodg.netlify.app",
    ignorePatterns: ["private", "z-templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Allura",
        body: "Patrick Hand",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f6", // slightly warmer, less sterile
          lightgray: "#e6e3e1", // soft warm gray
          gray: "#b7b3af",
          darkgray: "#4a4745",
          dark: "#262524",
          secondary: "#2f5d73", // richer blue (more depth)
          tertiary: "#7fa8a0", // slightly desaturated sage
          highlight: "rgba(47, 93, 115, 0.12)", // tie highlight to blue
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#121214", // deeper, less gray
          lightgray: "#2f2c2f",
          gray: "#5f5b5f",
          darkgray: "#d6d2cf",
          dark: "#f1efed",
          secondary: "#89a9bd", // softened blue glow
          tertiary: "#8fb7ae", // slightly lifted for contrast
          highlight: "rgba(137, 169, 189, 0.12)",
          textHighlight: "#d4c80088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
