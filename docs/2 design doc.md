
# **TOMAT Navigator Design Document**  
**A Multimodal, Non-Linear Web Navigation System for Visually Impaired Users**  


version: 0.1,draft for prototype for codesing and usability evaluation  
author: Juan Nino  
date: 24 February 2025


## **Context**  
The **TOMAT Navigator** is a hardware and software **assistive human-computer interface** within the **LibreTactile** ecosystem (vision: *touching ideas*), designed to empower visually impaired users to navigate the internet through **nonlinear, multimodal interaction**. Traditional screen readers present content sequentially, forcing users to reconstruct webpage structure mentally. TOMAT addresses this by generating multimodal **interactable models** of webpages, enabling users to explore relationships between elements, adjust detail granularity, and interact contextually via audio-tactile feedback and gesture-based inputs. Algorithms and AI systems generate interactive webpage models from the DOM, representing structural (hierarchical), visuospatial, and/or semantic relationships. Alternatively, models for popular pages could be shared by community of users and developers. 

TOMAT Navigator transforms linear screen reader experiences into **multiscale, nonlinear navigation**. It dynamically models webpage structure as a **collapsible tree**, allowing users to "zoom in & out" between high-level overviews and granular details. Key innovations include:  
- **Multiperspective Modeling**: Represent webpages as information graphs that can be organized into multiple tree hierarchies, such as tables of contents. These hierarchies are shaped by the type of nonlinear information used to build them, including semantic ontologies, hierarchical relationships, or visuospatial layouts.
- **Multiscale Rendering**: Enable interaction with content through the generated table of contents, offering multiple levels of abstraction (e.g., from section summaries to full text).
- **AI Assistant**: Automatically annotate pages, predict navigation paths, and fix accessibility issues while allowing manual user control.  
- **Contextual Interactions**: Intuitive touch/button interactions to switch modes, adjust detail, or trigger actions.  

**Hardware Overview**:  
The TOMAT hardware module is a portable, 3D-printed tactile interface featuring:  
- A **4x4 vibratory matrix** to represent webpage elements through tactile "table of contents".  
- **Gesture-enabled buttons** (8 total) supporting taps, holds, and combos for contextual actions.  
- **Raspberry Pi Pico microcontroller** for real-time communication with the software module via USB/WiFi.  
- Ergonomic design (12cm x 8cm) with rounded edges for comfortable handheld use.  

---

## **Core Features**  

### **1. Multiperspective Modeling**  
- **Dynamic Graph/Tree Generation**: Extract relationships between DOM elements (headings, links, tables) and represent them as interactive tree hierarchies (e.g., tables of contents).  
- **Custom Ontologies**: Users or communities define semantic relationships (e.g., `#workflow`, `#socialnetworking`) to tailor generated webpage models.  

### **2. Multiscale Rendering (Levels of Detail)**  
- **Granularity Control**:  
  - **Zoom In/Out**: Adjust detail with `+/-` buttons (e.g., show all subheadings vs. top-level headings).  
  - **Auto-Summarization**: AI generates concise section summaries, enabling quick overviews. User can then manually dive deeper into the details of a section of interest.  
- **Adaptive Focus**:  
  - **Element Exploration Mode**: Interact with complex elements (e.g., tables, lists) using the full tactile matrix.  
  - **Type Grouping**: Group elements by type (e.g., links in one column) for focused navigation.  

### **3. AI Assistant & Automation**  
- **Pre-Annotation**:  
  - AI labels elements (e.g., "navigation menu," "article body") where human annotations are missing.  
  - Override AI suggestions manually (e.g., relabel, hide elements).  
- **Task Automation**:  
  - **Smart Navigation**: Predict frequent paths (e.g., "Skip to main content") based on user habits.  
  - **Accessibility Fixes**: Auto-correct ARIA roles or missing alt-text, pending user approval.  
- **Interruptible Workflow**: Pause/reset AI actions instantly via gestures (e.g., double-tap to halt automation).  

### **4. Contextual Interaction & Gestures**  
- **Gesture Library**:  
  | **Button/Gesture**       | **Action**                                  |  
  |---------------------------|--------------------------------------------|  
  | `Single Tap (T)`          | Read element description.                  |  
  | `Double Tap (TT)`         | Jump to element.                           |  
  | `Press & Hold (PH)`       | Save to favorites.                         |  
  | `Tap + Hold (TPH)`        | Trigger AI summary or custom script.       |  
- **Mode Switching**:  
  - Cycle through **Basic**, **Favorite**, and **Changes** modes with the `Star` button.  
  - **Interactive Help Mode**: On-demand tutorials for gestures and features.  

### **5. Accessibility & Customization**  
- **Hardware Flexibility**:  
  - Modular 3D-printed tactile matrix (4x4 grid) with adjustable vibration intensity.  
  - Open-source CAD files for community-driven hardware variants (e.g., larger matrices).  
- **Software Personalization**:  
  - Adjust speech rate, AI verbosity, and gesture sensitivity.  
  - Map gestures to plugins (e.g., `TPH` triggers a Python script for note-taking).  

### **6. Community & Plugin Ecosystems**  
- **Plugin Marketplace**:  
  - Review and download community-built tools: AI models (e.g., "e-commerce navigation expert"), gesture packs, or ontologies.  
  - Share custom plugins (e.g., Wikipedia-focused summarizers).  
- **Collaborative Resources**:  
  - Access and contribute to community resources.  
- **Hardware Customization**:  
  - Community-designed 3D-printed cases, alternative button layouts, or Bluetooth/WiFi modules.  

---

### **Simple User**  
- *“I want to navigate a news site without getting lost in menus. With TOMAT, I collapse the page to headings only, zoom into the ‘Sports’ section, and let AI provide  a quick overview of the article.”*  
- **Key Actions**:  
  - Use `#headings` perspective to skip irrelevant content.  
  - Double-tap `+` to expand the "Sports" subsection.  
  - Enable `AI Summary` .  

### **Advanced User**  
- *“I need to analyze research papers daily. I use TOMAT’s AI to pre-tag tables, then override labels for custom workflows.”*  
- **Key Actions**:  
  - Train AI to recognize academic paper structures.  
  - Use `Type Grouping` to isolate tables/figures.  
  - Integrate TOMAT with note-taking apps and export graphs/models. 

---

## **Technical Architecture**  

### **System Design**  
- **Model-View-Controller (MVC)**:  
  - **Model**: Hierarchical webpage graph (JSON-LD/HTML).  
  - **View**: Cross-platform UI (Android, screen reader, browser extension, tactile matrix).  
  - **Controller**: Gesture interpreter & AI assistant.  
- **Data Flow**:  
  1. Browser extension extracts DOM → builds graph.  
  2. AI annotates/optimizes graph → sends to hardware.  
  3. User interacts via gestures → updates model in real time.  

### **Hardware Specifications**  
- **Tactile Matrix**: 4x4 grid with vibration motors (spatial encoding of elements).  
- **Microcontroller**: Raspberry Pi Pico (WebSerial/USB HID).  
- **Connectivity**: USB-C, WiFi/Bluetooth (future iterations).  

### **AI/ML Integration**  
- **Models**:  
  - **Open Source LLM**: For text summarization and label prediction.  
  - **Accessibility Validator**: Flags ARIA/HTML5 compliance issues.  
- **Community Training**: Users contribute anonymized data to improve AI accuracy.  

---

## **Future Integrations**  
- **Annotation Studio**: Export TOMAT graphs for collaborative editing and note-taking.  
- **Plugin Marketplace**: Download community plugins, AI models, and hardware blueprints.  

> Note: not all features will be implemented on the first prototype, and other hardware implementations will be released as derivative in the future. 
