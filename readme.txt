=== IntelliBuilder ===
Contributors: showyaseen
Tags: content visibility, user roles, geolocation, conditional blocks, browser detection
Requires at least: 5.5
Tested up to: 6.6.1
Stable tag: 1.0.0
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

IntelliBuilder: Control Gutenberg block visibility with custom rules for user roles, devices, locations, and more.

== Description ==

**IntelliBuilder** empowers WordPress administrators to dynamically control the visibility of Gutenberg blocks by implementing a broad range of customizable conditions. By integrating seamlessly with the Gutenberg editor, IntelliBuilder adds a new dimension to content management, allowing for finely tuned, personalized content delivery.

### Key Features:

– **User Roles:** Target content based on specific user roles (e.g., Administrator, Editor, Subscriber).
– **Geolocation:** Display or hide content based on the user's country and city, leveraging real-time IP-based location detection.
– **Browser Detection:** Customize content visibility according to the user's browser (e.g., Chrome, Firefox, Safari).
– **Device Type:** Tailor content for different device types, including Desktop, Tablet, and Mobile.
– **Operating System:** Control visibility based on the user's operating system (e.g., Windows, macOS, Linux, iOS, Android).
– **Referral Source:** Show or hide content based on the user's referral source, ideal for targeted marketing campaigns.
– **Recurring vs New Users:** Differentiate content between first-time visitors and returning users.
– **User Status:** Display content conditionally for logged-in or logged-out users.
– **User-Specific Rules:** Target individual users by their username for a personalized experience.
– **Browser Language:** Adapt content based on the language settings of the user's browser.
– **Scheduled Content:** Schedule the visibility of Gutenberg blocks to appear or disappear at specific times and dates.

### Example Use Cases:

– **Membership Sites:** Display exclusive content to logged-in members only, enhancing membership value.
– **Marketing Campaigns:** Tailor promotional content based on referral sources to improve conversion rates.
– **Localization:** Serve region-specific information by utilizing the user’s geolocation and browser language.
– **Device-Specific Content:** Optimize content delivery for different devices and operating systems for a seamless user experience.

### How It Works:

1. **Initialization:** Hooks into WordPress actions and filters via the `intelli-builder.php` file to initialize the plugin.
2. **Gutenberg Integration:** React components within `src/blocks/visibility-settings/` render the visibility settings interface directly within the Gutenberg block editor.
3. **Rule Configuration:** Administrators configure visibility rules in the Gutenberg block settings panel.
4. **Conditional Rendering:** When rendering a post or page, IntelliBuilder evaluates the defined visibility rules to determine which blocks should be displayed.

== Installation ==

1. Upload the `intelli-builder` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to a post or page using the Gutenberg editor, select a block, and configure the visibility settings under the **"Conditional Visibility Settings"** section.

== Frequently Asked Questions ==

= Can I use IntelliBuilder with any WordPress theme? =

Yes, IntelliBuilder is designed to work seamlessly with any WordPress theme.

= Is IntelliBuilder compatible with the Gutenberg editor? =

Absolutely! IntelliBuilder integrates directly with the Gutenberg editor, allowing for easy configuration of block visibility settings.

= Does IntelliBuilder impact site performance? =

IntelliBuilder is optimized for performance. The plugin caches geolocation data and minimizes network requests to ensure your site runs efficiently.

== Screenshots ==

1. Example of setting visibility rules within the Gutenberg editor.
2. Operating system and device type visibility rules.
3. Browser names anf languages visibility rules.
4. User status loggedin/loggedout visibility rules.
5. User role-based content visibility configuration.
6. Specific User content visibility configuration.
7. Human readable summary for content visibility configuration.
8. Operating system and device type visibility rules.


== Changelog ==

= 1.0 =
* Initial release with comprehensive features including user roles, geolocation, browser and OS detection, device type control, and scheduling.

== Upgrade Notice ==

= 1.0 =
This is the first release of IntelliBuilder. Gain full control over your Gutenberg block visibility with this powerful plugin!

== Third-Party Dependencies ==

**1. CountriesNow API**
– **Purpose:** Provides a list of countries and their cities for precise geolocation-based visibility rules.
– **Integration:** Used in the `GeoLocation` React component to enable country and city selection.

**2. IP-API**
– **Purpose:** Detects the user's geographical location based on their IP address.
– **Integration:** Utilized in the `GeoIP` PHP class to automatically retrieve user location data for geolocation rules.

**3. hisorange/browser-detect**
– **Purpose:** Detects the user's browser, device type, operating system, and language.
– **Integration:** Powers several visibility rules, including browser name, device type, operating system, and browser language detection.

== License ==

This plugin is licensed under the GPLv2 or later. See the [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) for more details.
