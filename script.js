// Function to make windows draggable
function makeDraggable(element) {
    let offsetX, offsetY, mouseX, mouseY;

    element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
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
    `;
    document.body.appendChild(newWindow);
    makeDraggable(newWindow);
    setupCloseButtons();
}

// Initialize existing windows
document.querySelectorAll('.window').forEach(makeDraggable);
setupCloseButtons();

// Set up the "New Window" button
document.getElementById('new-window-btn').addEventListener('click', createNewWindow);
