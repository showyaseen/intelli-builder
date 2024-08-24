### IntelliBuilder Documentation

**Plugin Name:** IntelliBuilder
**Plugin URI:** [https://wordpress.com/plugins/intelli-builder](https://wordpress.com/plugins/intelli-builder)
**Description:** A WordPress plugin designed to control the visibility of Gutenberg blocks based on various user-defined rules.
**Version:** 1.0.0
**Author:** Yaseen Taha
**Author URI:** [mailto:showyaseen@hotmail.com](mailto:showyaseen@hotmail.com)
**License:** GPLv2 or later
**License URI:** [http://www.gnu.org/licenses/gpl-2.0.html](http://www.gnu.org/licenses/gpl-2.0.html)
**Text Domain:** intelli-builder
**Domain Path:** /languages
**Tested up to:** 6.6
**Stable tag:** 1.0.0
**Requires PHP:** 7.4
**Requires at least:** 7.4

---

#### Plugin Description

**IntelliBuilder** is a WordPress plugin designed to control the visibility of Gutenberg blocks based on various user-defined rules. By implementing Gutenberg hooks and filters, IntelliBuilder allows administrators to add visibility settings to each Gutenberg block. This feature is particularly useful for creating dynamic and personalized content experiences on WordPress websites.

---

#### User Documentation and Usage

**Using IntelliBuilder:**
1. **Access the Editor:** Open the WordPress editor and create or edit a post or page using the Gutenberg block editor.
2. **Select a Block:** Choose the Gutenberg block you want to control visibility for.
3. **Configure Visibility Settings:**
   - In the block settings panel on the right, locate the **"Conditional Visibility Settings"** section.
   - Configure visibility rules based on:
     - **User Roles:** Show or hide the block for specific user roles such as administrators, editors, or subscribers.
     - **Web-Based Criteria:** Control visibility based on the user's geolocation, browser, device type, operating system, or referral source.
     - **Scheduled Time:** Schedule the block to be visible or hidden at specific times or intervals.
4. **Apply and Publish:** Save or publish the post/page to apply the configured visibility settings.

**Example Use Cases:**
- **Membership Sites:** Display exclusive content to logged-in members only.
- **Marketing Campaigns:** Show promotional content to users coming from specific referral sources.
- **Localization:** Provide region-specific information based on the user's geolocation and language preferences.
- **Device-Specific Content:** Tailor content visibility based on the user's device type or operating system for optimized user experience.

---

#### How It Works

1. **Initialization:** The plugin initializes by hooking into WordPress actions and filters via the `intelli-builder.php` file.
2. **Gutenberg Integration:** React components within `src/blocks/visibility-settings/` render the visibility settings interface for each Gutenberg block.
3. **Rule Configuration:** Users set up visibility rules directly within the Gutenberg block settings panel.
4. **Conditional Rendering:** Upon rendering a page or post, the plugin evaluates the defined visibility rules for each block to determine whether it should be displayed to the current user.

---

#### Third-Party Dependencies

IntelliBuilder leverages several third-party APIs and packages to enhance its functionality and provide a robust set of features for controlling content visibility.

**1. CountriesNow API**

- **Repository:** [https://github.com/MartinsOnuoha/countriesNowAPI](https://github.com/MartinsOnuoha/countriesNowAPI)
- **Purpose:** Retrieves comprehensive lists of countries and their corresponding cities.
- **License:** [https://github.com/MartinsOnuoha/countriesNowAPI/blob/master/LICENSE](The MIT License (MIT)).
- **Usage in IntelliBuilder:**
  - **Component:** `GeoLocation` React component.
  - **Functionality:** Allows administrators to set visibility rules based on specific countries and cities. When configuring a block's visibility settings, users can select from an up-to-date list of countries and cities fetched from the API, enabling precise geolocation-based content delivery.
  - **Integration Details:**
    - The API data is fetched and cached to ensure optimal performance and reduce unnecessary network requests.
    - Users can select multiple countries and cities to define complex visibility rules tailored to their audience's geographic locations.

**2. IP-API**

- **Repository:** [https://github.com/arturgrigor/IPAPI](https://github.com/arturgrigor/IPAPI/)
- **Purpose:** Determines the geographical location of users based on their IP addresses.
- **License:** [https://github.com/arturgrigor/IPAPI/blob/master/LICENSE](The MIT License (MIT)).
- **Usage in IntelliBuilder:**
  - **Class:** `GeoIP` PHP class located in `YTAHA\IntelliBuilder\Utils\GeoIP.php`.
  - **Functionality:** Automatically detects and provides the country and city information of the visiting user. This information is utilized to evaluate geolocation-based visibility rules defined within the plugin, ensuring that content is displayed or hidden appropriately based on the user's actual location.
  - **Integration Details:**
    - The user's IP address is retrieved and sent to the IP-API service, which returns accurate location data.
    - The retrieved location data is used in real-time to assess whether specific content blocks should be visible to the user, enhancing personalization and relevance.

**3. hisorange/browser-detect**

- **Repository:** [https://github.com/hisorange/browser-detect](https://github.com/hisorange/browser-detect)
- **Purpose:** Detects detailed information about the user's browser, device type, and operating system.
- **License:** [https://github.com/hisorange/browser-detect/blob/stable/LICENSE](The MIT License (MIT)).
- **Usage in IntelliBuilder:**
  - **Classes:**
    - `BrowserName` (`YTAHA\IntelliBuilder\Rules\BrowserName.php`)
    - `DeviceType` (`YTAHA\IntelliBuilder\Rules\DeviceType.php`)
    - `OperatingSystem` (`YTAHA\IntelliBuilder\Rules\OperatingSystem.php`)
    - `BrowserLanguage` (`YTAHA\IntelliBuilder\Rules\BrowserLanguage.php`)
  - **Functionality:** Enables administrators to create sophisticated visibility rules based on the user's browsing environment. By detecting the user's browser name, device type, operating system, and browser language, content can be tailored and optimized for different platforms and user preferences.
  - **Integration Details:**
    - **Browser Name Detection:** Determines the specific browser (e.g., Chrome, Firefox, Safari) the user is utilizing, allowing for browser-specific content adjustments or announcements.
    - **Device Type Detection:** Identifies whether the user is on a desktop, tablet, mobile, or other device types, facilitating responsive and device-appropriate content delivery.
    - **Operating System Detection:** Recognizes the user's operating system (e.g., Windows, macOS, Linux, iOS, Android), enabling OS-specific optimizations and instructions.
    - **Browser Language Detection:** Detects the default language set in the user's browser, supporting multilingual content delivery and localization efforts.
  - **Benefits:**
    - Enhances user experience by delivering content that is most suitable for the user's specific browsing context.
    - Supports targeted marketing and communication strategies by understanding and leveraging user environment details.
    - Improves accessibility and usability across different devices and platforms.

---

#### Contributing

Contributions to IntelliBuilder are welcome and encouraged! To contribute:

1. **Fork the Repository:** Create your own fork of the project.
2. **Create a Branch:** Develop your feature or fix in a new branch.
3. **Commit Changes:** Ensure your commits are clear and descriptive.
4. **Submit a Pull Request:** Explain your changes and submit a pull request for review.

Please ensure that your code adheres to the project's coding standards and includes appropriate documentation.

---

#### License

IntelliBuilder is licensed under the **GPLv2 or later** license. For more information, please refer to the [GNU General Public License v2.0](http://www.gnu.org/licenses/gpl-2.0.html).

---

#### Support

For support and inquiries, please contact **Yaseen Taha** at [showyaseen@hotmail.com](mailto:showyaseen@hotmail.com).

---

**Thank you for using IntelliBuilder!**

Empower your WordPress site with dynamic and personalized content delivery through intuitive and powerful visibility controls.

---
