# 🎨 T-Shirt Designer

A modern, interactive T-shirt design application with drag-and-drop functionality. Create stunning custom t-shirt designs with an intuitive interface inspired by modern web applications.

![T-Shirt Designer](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Interface**: Intuitive drag-and-drop system for adding and positioning design elements
- **Multiple T-Shirt Colors**: Choose from white, black, red, blue, and green t-shirts
- **Custom Image Upload**: Upload your own images (PNG, JPG, GIF) to use as design elements
- **Predefined Cool Designs**: Collection of emoji-based designs (rockets, lightning, music notes, etc.)
- **Text Addition**: Add custom text with font family, size, and color customization
- **Real-time Editing**: Live preview of your design as you make changes

### 🛠️ Advanced Features
- **Layer Management**: View and manage design layers with delete functionality
- **Element Properties**: Adjust size, opacity, color, and other properties of selected elements
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Design Export**: Save your finished design as a high-quality PNG image
- **Keyboard Shortcuts**: Delete (Del key) and deselect (Esc key) elements

### 🎨 Design Elements
- **Images**: Upload and resize custom images
- **Emojis**: Pre-loaded collection of popular emojis and symbols
- **Text**: Customizable text with multiple fonts and colors
- **Positioning**: Precise drag-and-drop positioning within the design area

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Visit the live demo: `https://itachigenjutsu77.github.io/tshirt-designer`
2. Start designing immediately!

### Option 2: Local Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/itachigenjutsu77/tshirt-designer.git
   cd tshirt-designer
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using Live Server (VS Code extension)
     Right-click on index.html → "Open with Live Server"
     ```

3. **Start designing:**
   - The application will load in your browser
   - No additional setup or dependencies required!

## 📱 How to Use

### 🎯 Getting Started
1. **Choose T-Shirt Color**: Click on the colored circles to select your base t-shirt color
2. **Add Design Elements**:
   - **Upload Images**: Click the upload area or drag files directly
   - **Use Predefined Designs**: Click on any emoji in the "Cool Designs" section
   - **Add Text**: Type your text and click "Add Text"

### ✏️ Editing Elements
1. **Select Elements**: Click on any design element to select it
2. **Move Elements**: Drag selected elements around the design area
3. **Adjust Properties**: Use the Properties panel to modify:
   - Text content and color
   - Font size and family
   - Element size and opacity
4. **Layer Management**: Use the Layers panel to:
   - View all design elements
   - Select specific layers
   - Delete unwanted elements

### 💾 Saving Your Design
1. Click the "Save Design" button in the header
2. Your design will be exported as a PNG image
3. The file will automatically download to your device

### ⌨️ Keyboard Shortcuts
- **Delete**: Remove selected element
- **Escape**: Deselect current element

## 🏗️ Project Structure

```
tshirt-designer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling (inspired by Claude Code)
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## 🎨 Design Inspiration

This application's UI is inspired by the modern, clean design of the [Claude Code website](https://www.claude.com/product/claude-code), featuring:
- Dark theme with gradient accents
- Smooth animations and transitions
- Clean typography using Inter font
- Modern card-based layout
- Responsive grid system

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure and canvas element for t-shirt rendering
- **CSS3**: Modern styling with flexbox, grid, and animations
- **Vanilla JavaScript**: Core functionality without external dependencies
- **Canvas API**: T-shirt rendering and design export
- **File API**: Image upload and processing

### Browser Compatibility
- Chrome 60+ ✅
- Firefox 55+ ✅
- Safari 12+ ✅
- Edge 79+ ✅

### Performance Features
- Lightweight vanilla JavaScript (no frameworks)
- Optimized image handling
- Efficient drag-and-drop implementation
- Responsive design for all screen sizes

## 🔧 Customization

### Adding New Predefined Designs
Edit the `predefinedDesigns` array in `script.js`:
```javascript
const predefinedDesigns = [
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '⚡', name: 'Lightning' },
    // Add your own designs here
    { emoji: '🔥', name: 'Fire' },
];
```

### Adding New T-Shirt Colors
1. Add a new button in the HTML:
```html
<button class="tshirt-btn" data-color="purple">Purple</button>
```

2. Add the color definition in `script.js`:
```javascript
const colors = {
    // existing colors...
    purple: '#8b5cf6'
};
```

3. Add CSS styling:
```css
.tshirt-btn[data-color="purple"] { background: #8b5cf6; }
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Ideas for Contributions
- Add more predefined designs
- Implement shape tools (rectangles, circles)
- Add design templates
- Improve mobile responsiveness
- Add undo/redo functionality
- Implement design sharing features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [Claude Code](https://www.claude.com/product/claude-code)
- Icons and emojis from Unicode standard
- Inter font family from Google Fonts

## 📞 Support

If you have any questions or need help:
1. Check the [Issues](https://github.com/itachigenjutsu77/tshirt-designer/issues) page
2. Create a new issue if your question isn't answered
3. Provide as much detail as possible about your problem

## 🚀 Future Enhancements

- [ ] Add more shape tools
- [ ] Implement design templates
- [ ] Add social sharing features
- [ ] Create mobile app version
- [ ] Add collaborative editing
- [ ] Implement design history/versioning
- [ ] Add 3D t-shirt preview
- [ ] Integration with print-on-demand services

---

⭐ **Star this repository if you found it helpful!**

[Live Demo](https://itachigenjutsu77.github.io/tshirt-designer) | [Report Bug](https://github.com/itachigenjutsu77/tshirt-designer/issues) | [Request Feature](https://github.com/itachigenjutsu77/tshirt-designer/issues)
