document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("infiniteTable");

    let isDragging = false;
    let startX, startY;
    let offsetX = 0, offsetY = 0;

    table.addEventListener("mousedown", startDrag);
    table.addEventListener("mousemove", drag);
    table.addEventListener("mouseup", endDrag);
    table.addEventListener("mouseleave", endDrag);

    // Для тач-событий
    table.addEventListener("touchstart", startDrag, { passive: false });
    table.addEventListener("touchmove", drag, { passive: false });
    table.addEventListener("touchend", endDrag);

    function startDrag(e) {
        isDragging = true;

        if (e.type === "mousedown") {
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
        } else if (e.type === "touchstart") {
            startX = e.touches[0].clientX - offsetX;
            startY = e.touches[0].clientY - offsetY;
        }
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault(); // Отключить стандартное поведение

        let currentX, currentY;

        if (e.type === "mousemove") {
            currentX = e.clientX;
            currentY = e.clientY;
        } else if (e.type === "touchmove") {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }

        offsetX = currentX - startX;
        offsetY = currentY - startY;

        table.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function endDrag() {
        isDragging = false;
    }
});