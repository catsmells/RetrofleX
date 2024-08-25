// Function to make windows draggable and handle z-index
function makeDraggable(element) {
    let offsetX, offsetY, mouseX, mouseY;

    element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
        // Bring the window to the front
        document.querySelectorAll('.window').forEach(win => win.style.zIndex = 1);
        element.style.zIndex = 2;

        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', stopMovingWindow);
    });

    function moveWindow(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        element.style.left = `${mouseX - offsetX}px`;
        element.style.top = `${mouseY - offsetY}px`;
    }

    function stopMovingWindow() {
        document.removeEventListener('mousemove', moveWindow);
        document.removeEventListener('mouseup', stopMovingWindow);
    }
}

// Function to make windows resizable
function makeResizable(element) {
    const handle = element.querySelector('.resize-handle');
    let startX, startY, startWidth, startHeight;

    handle.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
        document.addEventListener('mousemove', resizeWindow);
        document.addEventListener('mouseup', stopResizingWindow);
    });

    function resizeWindow(e) {
        element.style.width = `${startWidth + (e.clientX - startX)}px`;
        element.style.height = `${startHeight + (e.clientY - startY)}px`;
    }

    function stopResizingWindow() {
        document.removeEventListener('mousemove', resizeWindow);
        document.removeEventListener('mouseup', stopResizingWindow);
    }
}

// Function to close windows
function setupCloseButtons() {
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.window').style.display = 'none';
        });
    });
}

// Function to create a new window
function createNewWindow() {
    const windowCount = document.querySelectorAll('.window').length + 1;
    const newWindow = document.createElement('div');
    newWindow.className = 'window';
    newWindow.id = `window${windowCount}`;
    newWindow.innerHTML = `
        <div class="title-bar">
            <span class="title">New Window ${windowCount}</span>
            <button class="close-btn">X</button>
        </div>
        <div class="content">
            <p>This is a new RetrofleX window.</p>
        </div>
        <div class="resize-handle"></div>
    `;
    document.body.appendChild(newWindow);
    makeDraggable(newWindow);
    makeResizable(newWindow);
    setupCloseButtons();
}

// Initialize existing windows
document.querySelectorAll('.window').forEach(win => {
    makeDraggable(win);
    makeResizable(win);
});
setupCloseButtons();

// Set up the "New Window" button
document.getElementById('new-window-btn').addEventListener('click', createNewWindow);
