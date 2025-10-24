// Global variables
let canvas, ctx;
let currentTshirtColor = 'white';
let selectedElement = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let elements = [];
let elementCounter = 0;

// Predefined designs
const predefinedDesigns = [
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '⚡', name: 'Lightning' },
    { emoji: '🎵', name: 'Music' },
    { emoji: '🌟', name: 'Star' },
    { emoji: '🔥', name: 'Fire' },
    { emoji: '💎', name: 'Diamond' },
    { emoji: '🦄', name: 'Unicorn' },
    { emoji: '🌈', name: 'Rainbow' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    setupEventListeners();
    populatePredefinedDesigns();
    drawTshirt();
});

function initCanvas() {
    canvas = document.getElementById('tshirt-canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 500;
}

function setupEventListeners() {
    // File upload
    const fileInput = document.getElementById('file-input');
    const uploadArea = document.getElementById('upload-area');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    // Drag and drop for upload area
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleFileDrop);
    
    // T-shirt color selection
    const tshirtBtns = document.querySelectorAll('.tshirt-btn');
    tshirtBtns.forEach(btn => {
        btn.addEventListener('click', () => changeTshirtColor(btn.dataset.color));
    });
    
    // Add text button
    document.getElementById('add-text').addEventListener('click', addTextElement);
    
    // Design area interactions
    const designArea = document.getElementById('design-area');
    designArea.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Save design button
    document.getElementById('save-design').addEventListener('click', saveDesign);
    
    // Start designing button
    document.getElementById('start-designing').addEventListener('click', () => {
        document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);
}

function populatePredefinedDesigns() {
    const designGrid = document.getElementById('design-grid');
    
    predefinedDesigns.forEach(design => {
        const designItem = document.createElement('div');
        designItem.className = 'design-item';
        designItem.textContent = design.emoji;
        designItem.title = design.name;
        designItem.draggable = true;
        
        designItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', design.emoji);
            e.dataTransfer.setData('application/design-type', 'emoji');
        });
        
        designItem.addEventListener('click', () => {
            addEmojiElement(design.emoji);
        });
        
        designGrid.appendChild(designItem);
    });
}

function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(processFile);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
}

function processFile(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            addImageElement(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function changeTshirtColor(color) {
    currentTshirtColor = color;
    
    // Update active button
    document.querySelectorAll('.tshirt-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-color="${color}"]`).classList.add('active');
    
    drawTshirt();
}

function drawTshirt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set t-shirt color
    const colors = {
        white: '#ffffff',
        black: '#000000',
        red: '#dc2626',
        blue: '#2563eb',
        green: '#16a34a'
    };
    
    ctx.fillStyle = colors[currentTshirtColor];
    
    // Draw t-shirt shape
    ctx.beginPath();
    // T-shirt outline
    ctx.moveTo(80, 80);
    ctx.lineTo(120, 60);
    ctx.lineTo(140, 60);
    ctx.lineTo(160, 40);
    ctx.lineTo(240, 40);
    ctx.lineTo(260, 60);
    ctx.lineTo(280, 60);
    ctx.lineTo(320, 80);
    ctx.lineTo(320, 120);
    ctx.lineTo(300, 120);
    ctx.lineTo(300, 450);
    ctx.lineTo(100, 450);
    ctx.lineTo(100, 120);
    ctx.lineTo(80, 120);
    ctx.closePath();
    
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw neckline
    ctx.beginPath();
    ctx.arc(200, 80, 20, 0, Math.PI);
    ctx.fillStyle = currentTshirtColor === 'white' ? '#f0f0f0' : colors[currentTshirtColor];
    ctx.fill();
    ctx.stroke();
}

function addImageElement(src) {
    const img = new Image();
    img.onload = () => {
        const element = createDraggableElement('image');
        element.appendChild(img);
        
        // Scale image to fit reasonable size
        const maxSize = 100;
        const scale = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);
        img.style.width = (img.naturalWidth * scale) + 'px';
        img.style.height = (img.naturalHeight * scale) + 'px';
        
        addElementToDesignArea(element);
    };
    img.src = src;
}

function addEmojiElement(emoji) {
    const element = createDraggableElement('emoji');
    element.textContent = emoji;
    element.style.fontSize = '48px';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.width = '60px';
    element.style.height = '60px';
    
    addElementToDesignArea(element);
}

function addTextElement() {
    const textInput = document.getElementById('text-input');
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter some text');
        return;
    }
    
    const element = createDraggableElement('text');
    element.textContent = text;
    element.classList.add('draggable-text');
    
    // Apply text styles
    const fontFamily = document.getElementById('font-family').value;
    const fontSize = document.getElementById('font-size').value + 'px';
    const textColor = document.getElementById('text-color').value;
    
    element.style.fontFamily = fontFamily;
    element.style.fontSize = fontSize;
    element.style.color = textColor;
    
    addElementToDesignArea(element);
    
    // Clear input
    textInput.value = '';
}

function createDraggableElement(type) {
    const element = document.createElement('div');
    element.className = 'draggable-element';
    element.dataset.type = type;
    element.dataset.id = 'element-' + (++elementCounter);
    
    return element;
}

function addElementToDesignArea(element) {
    const designArea = document.getElementById('design-area');
    
    // Position element in center
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    
    designArea.appendChild(element);
    
    // Add to elements array
    elements.push({
        id: element.dataset.id,
        element: element,
        type: element.dataset.type
    });
    
    // Select the new element
    selectElement(element);
    
    // Update layers
    updateLayersList();
}

function selectElement(element) {
    // Deselect previous element
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    
    selectedElement = element;
    element.classList.add('selected');
    
    // Update properties panel
    updatePropertiesPanel(element);
    
    // Update layers selection
    updateLayersSelection(element.dataset.id);
}

function updatePropertiesPanel(element) {
    const propertiesContent = document.getElementById('properties-content');
    
    const type = element.dataset.type;
    let html = '';
    
    if (type === 'text') {
        html = `
            <div class="property-group">
                <label class="property-label">Text Content</label>
                <input type="text" class="property-input" id="prop-text" value="${element.textContent}">
            </div>
            <div class="property-group">
                <label class="property-label">Font Size</label>
                <input type="range" class="property-slider" id="prop-font-size" min="12" max="72" value="${parseInt(element.style.fontSize) || 24}">
                <span id="font-size-value">${parseInt(element.style.fontSize) || 24}px</span>
            </div>
            <div class="property-group">
                <label class="property-label">Text Color</label>
                <input type="color" class="property-input" id="prop-text-color" value="${rgbToHex(element.style.color) || '#000000'}">
            </div>
            <div class="property-group">
                <label class="property-label">Opacity</label>
                <input type="range" class="property-slider" id="prop-opacity" min="0" max="100" value="${(parseFloat(element.style.opacity) || 1) * 100}">
                <span id="opacity-value">${Math.round((parseFloat(element.style.opacity) || 1) * 100)}%</span>
            </div>
        `;
    } else {
        html = `
            <div class="property-group">
                <label class="property-label">Width</label>
                <input type="range" class="property-slider" id="prop-width" min="20" max="200" value="${parseInt(element.style.width) || 60}">
                <span id="width-value">${parseInt(element.style.width) || 60}px</span>
            </div>
            <div class="property-group">
                <label class="property-label">Opacity</label>
                <input type="range" class="property-slider" id="prop-opacity" min="0" max="100" value="${(parseFloat(element.style.opacity) || 1) * 100}">
                <span id="opacity-value">${Math.round((parseFloat(element.style.opacity) || 1) * 100)}%</span>
            </div>
        `;
    }
    
    propertiesContent.innerHTML = html;
    
    // Add event listeners to property controls
    setupPropertyControls(element);
}

function setupPropertyControls(element) {
    const propText = document.getElementById('prop-text');
    const propFontSize = document.getElementById('prop-font-size');
    const propTextColor = document.getElementById('prop-text-color');
    const propWidth = document.getElementById('prop-width');
    const propOpacity = document.getElementById('prop-opacity');
    
    if (propText) {
        propText.addEventListener('input', (e) => {
            element.textContent = e.target.value;
        });
    }
    
    if (propFontSize) {
        propFontSize.addEventListener('input', (e) => {
            element.style.fontSize = e.target.value + 'px';
            document.getElementById('font-size-value').textContent = e.target.value + 'px';
        });
    }
    
    if (propTextColor) {
        propTextColor.addEventListener('input', (e) => {
            element.style.color = e.target.value;
        });
    }
    
    if (propWidth) {
        propWidth.addEventListener('input', (e) => {
            element.style.width = e.target.value + 'px';
            element.style.height = e.target.value + 'px';
            document.getElementById('width-value').textContent = e.target.value + 'px';
        });
    }
    
    if (propOpacity) {
        propOpacity.addEventListener('input', (e) => {
            const opacity = e.target.value / 100;
            element.style.opacity = opacity;
            document.getElementById('opacity-value').textContent = e.target.value + '%';
        });
    }
}

function updateLayersList() {
    const layersList = document.getElementById('layers-list');
    layersList.innerHTML = '';
    
    elements.forEach((item, index) => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        layerItem.dataset.id = item.id;
        
        const layerName = item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' ' + (index + 1);
        
        layerItem.innerHTML = `
            <span>${layerName}</span>
            <button class="layer-delete" data-id="${item.id}">🗑️</button>
        `;
        
        layerItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('layer-delete')) {
                deleteElement(item.id);
            } else {
                selectElement(item.element);
            }
        });
        
        layersList.appendChild(layerItem);
    });
}

function updateLayersSelection(selectedId) {
    document.querySelectorAll('.layer-item').forEach(item => {
        item.classList.remove('selected');
        if (item.dataset.id === selectedId) {
            item.classList.add('selected');
        }
    });
}

function deleteElement(id) {
    const elementIndex = elements.findIndex(item => item.id === id);
    if (elementIndex !== -1) {
        const element = elements[elementIndex].element;
        element.remove();
        elements.splice(elementIndex, 1);
        
        if (selectedElement === element) {
            selectedElement = null;
            document.getElementById('properties-content').innerHTML = '<p class="empty-state">Select an element to edit its properties</p>';
        }
        
        updateLayersList();
    }
}

function handleMouseDown(e) {
    const element = e.target.closest('.draggable-element');
    if (element) {
        selectElement(element);
        isDragging = true;
        
        const rect = element.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        
        element.style.zIndex = '1000';
    }
}

function handleMouseMove(e) {
    if (isDragging && selectedElement) {
        const designArea = document.getElementById('design-area');
        const rect = designArea.getBoundingClientRect();
        
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;
        
        selectedElement.style.left = x + 'px';
        selectedElement.style.top = y + 'px';
        selectedElement.style.transform = 'none';
    }
}

function handleMouseUp() {
    if (isDragging && selectedElement) {
        selectedElement.style.zIndex = 'auto';
    }
    isDragging = false;
}

function handleKeyDown(e) {
    if (e.key === 'Delete' && selectedElement) {
        deleteElement(selectedElement.dataset.id);
    }
    
    if (e.key === 'Escape' && selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
        document.getElementById('properties-content').innerHTML = '<p class="empty-state">Select an element to edit its properties</p>';
    }
}

function saveDesign() {
    showLoading();
    
    // Create a temporary canvas to capture the design
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = 400;
    tempCanvas.height = 500;
    
    // Draw the t-shirt background
    tempCtx.drawImage(canvas, 0, 0);
    
    // Capture design area elements
    const designArea = document.getElementById('design-area');
    const canvasRect = canvas.getBoundingClientRect();
    const designRect = designArea.getBoundingClientRect();
    
    // Calculate offset from canvas to design area
    const offsetX = designRect.left - canvasRect.left;
    const offsetY = designRect.top - canvasRect.top;
    
    // Create promises for each element
    const elementPromises = elements.map(item => {
        return new Promise((resolve) => {
            const element = item.element;
            const rect = element.getBoundingClientRect();
            
            const x = rect.left - canvasRect.left;
            const y = rect.top - canvasRect.top;
            
            if (item.type === 'image') {
                const img = element.querySelector('img');
                if (img && img.complete) {
                    tempCtx.drawImage(img, x, y, rect.width, rect.height);
                }
                resolve();
            } else if (item.type === 'text' || item.type === 'emoji') {
                tempCtx.font = element.style.fontSize + ' ' + (element.style.fontFamily || 'Arial');
                tempCtx.fillStyle = element.style.color || '#000000';
                tempCtx.textAlign = 'center';
                tempCtx.fillText(element.textContent, x + rect.width / 2, y + rect.height / 2);
                resolve();
            } else {
                resolve();
            }
        });
    });
    
    Promise.all(elementPromises).then(() => {
        // Download the image
        const link = document.createElement('a');
        link.download = 'tshirt-design-' + Date.now() + '.png';
        link.href = tempCanvas.toDataURL();
        link.click();
        
        hideLoading();
        
        // Show success message
        setTimeout(() => {
            alert('Design saved successfully!');
        }, 100);
    });
}

function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// Utility functions
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    return '#' + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1);
}

// Add drag and drop support for the design area
const designArea = document.getElementById('design-area');
if (designArea) {
    designArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    designArea.addEventListener('drop', (e) => {
        e.preventDefault();
        
        const designType = e.dataTransfer.getData('application/design-type');
        const data = e.dataTransfer.getData('text/plain');
        
        if (designType === 'emoji') {
            addEmojiElement(data);
        }
    });
}