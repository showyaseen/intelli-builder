### IntelliBuilder Documentation

**Plugin Name:** IntelliBuilder

**Plugin URI:** https://wordpress.com/plugins/intelli-builder

**Description:** A WordPress plugin designed to control the visibility of Gutenberg blocks based on various user-defined rules.

**Version:** 0.0.2

**Author:** Yaseen Taha

**Author URI:** showyaseen@hotmail.com

**License:** GPLv2 or later

**License URI:** http://www.gnu.org/licenses/gpl-2.0.html

**Text Domain:** intelli-builder

**Domain Path:** /languages

**Tested up to:** 6.6

**Stable tag:** 0.0.2

**Requires PHP:** 7.4

**Requires at least:** 7.4

#### Plugin Description

**IntelliBuilder** is a WordPress plugin designed to control the visibility of Gutenberg blocks based on various user-defined rules. By implementing Gutenberg hooks and filters, IntelliBuilder allows administrators to add visibility settings to each Gutenberg block. This feature is particularly useful for creating dynamic and personalized content experiences on WordPress websites.

#### User Documentation and Usage

**Using IntelliBuilder:**
1. Open the WordPress editor and create or edit a post or page using the Gutenberg block editor.
2. Select the Gutenberg block you want to control visibility for.
3. In the block settings panel on the right, you will see a section labeled "Conditional Visibility Settings."
4. Configure visibility rules based on:
   - **User Roles**: Show or hide the block for specific user roles such as administrators, editors, or subscribers.
   - **Web-Based Criteria**: Control visibility based on the user's geolocation, browser, device type, or referral source.
   - **Scheduled Time**: Schedule the block to be visible or hidden at specific times or intervals.
5. Save or publish the post/page to apply the visibility settings.

**Example Use Cases:**
- **Membership Sites**: Show exclusive content to logged-in members only.
- **Marketing Campaigns**: Display promotional content to users coming from specific referral sources.
- **Localization**: Provide region-specific information based on the user's geolocation.

**How It Works:**

1. **Initialization**: The plugin initializes by hooking into WordPress actions and filters via the `index.php` file.
2. **Gutenberg Integration**: The React components within `src/blocks/visibilty-settings/` render the visibility settings interface for each Gutenberg block.
3. **Rule Configuration**: Users configure visibility rules directly within the Gutenberg block settings panel.
4. **Conditional Rendering**: When a page or post is rendered, the plugin evaluates the visibility rules for each block to determine if it should be displayed.

#### Technologies Used

- **WordPress**: As the core CMS platform.
- **React.js**: For building the dynamic admin interface and Gutenberg blocks.
- **Gutenberg Blocks**: Utilized for creating a user-friendly interface within the WordPress block editor.
