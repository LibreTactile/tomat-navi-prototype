# Touch Matrix Assistive Technology Navigator (TOMAT)
TOMAT (Touch Matrix Assistive Technology Navigator) is a versatile system that helps visually impaired users navigate the web more effectively. It complements traditional screen readers with an interactive, non-visual way to explore web content using touch, sound, and context-aware feedback. By combining a physical interface with audio-tactile cues, TOMAT makes it easier to understand complex websites. Its modular, open design allows for customization and ongoing improvements, ensuring it meets the unique needs of its users.

## System Architecture
**Hardware Module**  
The hardware module provides tactile and auditory feedback, allowing users to interact with web content intuitively and nonlinearly. Key features include:

* Compact Design: Ergonomic, 12x8x2 cm with rounded corners.
* Tactile Feedback: A 4x4 grid of vibration points, each representing webpage elements (e.g., headings, links). Patterns indicate element type and state.
* Interaction Buttons: Row-specific buttons for contextual actions (e.g., read, save) and control buttons for navigation, mode switching, and granularity adjustment.
* Gesture Support: Buttons recognize four gestures—tap, double tap, press-and-hold, and tap-hold—for various functions.
* Powered by Raspberry Pi Pico: Drives vibration motors and communicates with the software via WebSerial USB, with potential for wireless protocols in the future.
* Customizable 3D-Printed Enclosure: Affordable and easy to modify.

**Software Module**  
The software module powers the hardware interface, managing webpage content extraction, navigation, and tactile feedback. Key features include:

* Browser Extension: Extracts webpage elements (e.g., headings, links, images) to build a customizable, hierarchical page model.
* Personalized Navigation: Users can zoom between overviews and details, collapsing or expanding elements to match their preferences. Different modes highlight semantic, structural, or visuospatial relationships.
* Tactile Feedback Translation: Converts the webpage model into spatially encoded vibrations on the hardware, with distinct patterns for different element types.
* Operation Modes: Includes Basic (all elements), Favorite (user-selected), and Changes (recent updates). Special modes like Interactive Help and Element Exploration focus on specific elements or provide guided navigation.
* Future-Ready Design: Supports AI-driven features, task automation, cross-platform compatibility, and community-driven development for continuous improvement and broader accessibility.

---

## Key Features of Webpage Navigation

- **Navigating Webpage Elements**:  
  - Elements are grouped into "windows" (sets of four) displayed on the tactile grid.  
  - **Up/Down Buttons** allow users to scroll through windows or jump across multiple windows using gestures like taps or press-and-hold actions.  

- **Cursor and Feedback**:  
  - A pulsing vibration shows the cursor's position, while other elements provide constant feedback. The device automatically adjusts to keep the cursor visible.  

- **Interacting with Elements**:  
  - **Row Buttons** let users read, navigate to, save, or perform actions (e.g., summarization) on individual elements.  
  - **Next/Previous Buttons** allow element-by-element navigation or jumps between different types (e.g., headings to links).  

- **Detail Level Control**:  
  - Adjust granularity using **Plus/Minus Buttons** to show fewer or more details, group elements by type, or explore individual elements in-depth.  

- **Operation Modes**:  
  - **Basic Mode**: All elements.  
  - **Favorite Mode**: User-selected elements.  
  - **Changes Mode**: Highlights updates since the last visit.  
  - Special modes like **Interactive Help** or **Element Exploration** provide tailored views or guidance.  

- **Offline Exploration**:  
  - Navigate pre-downloaded content (e.g., Wikipedia articles) without internet, maintaining full tactile and feedback functionality.  

- **Customizable Settings**:  
  - Adjust vibration, verbosity, or speech rate during use for a personalized experience.  