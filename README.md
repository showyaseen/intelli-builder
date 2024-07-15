### IntelliBuilder Plugin Documentation

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

#### Technical Documentation

**Key Files and Directories:**

- **`index.php`**: The main plugin file that initializes the plugin and hooks into WordPress.
- **`src/blocks/visibilty-settings/index.js`**: Entry point for the visibility settings block, handling the registration and rendering of the block in the Gutenberg editor.
- **`src/blocks/visibilty-settings/components/`**: React components for various settings and UI elements.
  - **conditions/**: Subdirectories categorize conditions into user, web-based, and date-time criteria.

**How It Works:**

1. **Initialization**: The plugin initializes by hooking into WordPress actions and filters via the `index.php` file.
2. **Gutenberg Integration**: The React components within `src/blocks/visibilty-settings/` render the visibility settings interface for each Gutenberg block.
3. **Rule Configuration**: Users configure visibility rules directly within the Gutenberg block settings panel.
4. **Conditional Rendering**: When a page or post is rendered, the plugin evaluates the visibility rules for each block to determine if it should be displayed.

#### Technologies Used

- **WordPress**: As the core CMS platform.
- **React.js**: For building the dynamic admin interface and Gutenberg blocks.
- **Gutenberg Blocks**: Utilized for creating a user-friendly interface within the WordPress block editor.
