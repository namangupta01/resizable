var elements = [];
const rightActiveDefault = 10;
const leftActiveDefault = 10;

function makeResizableElement(id, options = {}) {
    element = document.getElementById(id);
    if (elements.includes(element)) {
        return element;
    }
    minWidth = 20;
    if (options.minWidth != undefined && options.minWidth != null){
        if (isNaN(parseInt(options.minWidth)) == false){
            minWidth = parseInt(options.minWidth);
        }
        else{
            throw "Minwidth is NAN for element with id " + id;
        }
    }
    element.minWidth = minWidth;
    // minHeight = 0;
    // if (options.minHeight != undefined && options.minHeight != null){
    //     if (isNaN(parseInt(options.minHeight)) == false){
    //         minHeight = parseInt(options.minHeight);
    //         element.minHeight = minHeight;
    //     }
    //     else{
    //         throw "MinHeight is NAN for element with id " + id;
    //     }
    // }
    if (element != undefined && element != null) {
        let elementLeftActive;
        let elementRightActive;
        let resizingIsActive = false;
        let leftResizeActive = false;
        let rightResizeActive = false;
        element.resizingIsActive = resizingIsActive;
        element.leftResizeActive = leftResizeActive;
        element.rightResizeActive = rightResizeActive;
        if (options.elementLeftActive != undefined && options.elementLeftActive != null) {
            if (isNaN(parseInt(options.elementLeftActive)) == false) {
                elementLeftActive = parseInt(options.elementLeftActive);
            }
            else {
                throw "Type mismatch of property elementLeftActive of element with id " + id;
            }
        }
        else {
            elementLeftActive = leftActiveDefault;
        }
        element.elementLeftActive = elementLeftActive;
        element.addEventListener('click', function () {

        });
        if (options.elementRightActive != undefined && options.elementRightActive != null) {
            if (isNaN(parseInt(options.elementRightActive)) == false) {
                elementRightActive = parseInt(options.elementRightActive);
            }
            else {
                throw "Type mismatch of property elementRightActive of element with id " + id;
            }
        }
        else {
            elementRightActive = rightActiveDefault;
        }
        element.addEventListener('click', function () {

        });
        element.elementRightActive = elementRightActive;
        oldClientLeft = element.getBoundingClientRect().left;
        element.style.left =  element.offsetLeft + "px";
        element.defaultPosition = element.style.position;
        element.defaultLeft = element.style.left;
        element.previousWidth = element.getBoundingClientRect().width;
        element.style.width = element.previousWidth;
        element.style.position = "absolute";
        elements.push(element);
        bindResizableEvents(element);
    }
    else {
        throw "No Element With id " + id + " was found";
    }
}


function bindResizableEvents(element) {
    element.bindedMouseDownEvent = mouseDownEvent.bind(element);
    element.bindedMouseUpEvent = mouseUpEvent.bind(element);
    element.bindedMouseMoveEvent = mouseMoveEvent.bind(element);
    element.bindedMouseMoveEventOnDoucument = mouseMoveEventOnDoucument.bind(element);
    element.bindedMouseClickEventOnDocument = mouseClickEventOnDocument.bind(element);
    element.bindedMouseClickEventOnDocument = mouseClickEventOnDocument.bind(element);

    element.addEventListener('mousedown', element.bindedMouseDownEvent);
    element.addEventListener('mouseup', element.bindedMouseUpEvent);
    element.addEventListener('mousemove', element.bindedMouseMoveEvent);
    document.addEventListener('mousemove', element.bindedMouseMoveEventOnDoucument);
    document.addEventListener('click', element.bindedMouseClickEventOnDocument);
    document.addEventListener('mouseup', element.bindedMouseClickEventOnDocument);
}

function mouseDownEvent(event) {
    if (this.getBoundingClientRect().right - this.elementRightActive <= event.clientX) {
        this.resizingIsActive = true;
        this.rightResizeActive = true;
        this.leftResizeActive = false;
    }
    else if (this.getBoundingClientRect().left + this.elementLeftActive >= event.clientX){
        this.resizingIsActive = true;
        this.leftResizeActive = true;
        this.rightResizeActive = false;
    }
    else {
        this.resizingIsActive = false;
    }
}

function mouseUpEvent(event) {
    this.resizingIsActive = false;
    this.leftResizeActive = false;
    this.rightResizeActive = false;
}

function mouseMoveEvent(event) {
    if ((this.getBoundingClientRect().right - this.elementRightActive <= event.clientX)) {
        // this.style.cursor = "nwse-resize";
        this.style.cursor = "col-resize";
    }
    else if (this.getBoundingClientRect().left + this.elementLeftActive >= event.clientX) {
        // this.style.cursor = "nesw-resize";
        this.style.cursor = "col-resize";
    }
    else {
        this.style.cursor = "default";
    }
}

function mouseMoveEventOnDoucument(event) {
    if (this.resizingIsActive == true) {
        // height = parseInt(this.style.height.split("p")[0]) + event.movementY;
        // if (height < this.minHeight){
        //  height = this.minHeight
        // }
        // this.style.height = height + "px";
        let width = this.style.width;
        if (this.leftResizeActive == true){
            width = parseInt(this.style.width.split("p")[0]) - event.movementX;
            if (width < this.minWidth){
                width = this.minWidth;
            }
            this.style.left = (parseInt(this.style.left.split("p")[0]) + parseInt(this.style.width.split("p")[0]) - width) + "px";
            this.style.width = width + "px";
        }
        else if (this.rightResizeActive == true){
            width = parseInt(this.style.width.split("p")[0]) + event.movementX;
            if (width < this.minWidth){
                width = this.minWidth;
            }
            this.style.width = width + "px";
        }
    }
}

function mouseClickEventOnDocument(event) {
    this.resizingIsActive = false;
    this.leftResizeActive = false;
    this.resizingIsActive = false;
}


function removeResizableProperty(elementId) {
    element = document.getElementById(elementId);
    if (elements.includes(element)) {
        this.resizingIsActive = false;
        this.leftResizeActive = false;
        this.resizingIsActive = false;
        removeResizableEventsListeners(element);
        elements.pop(element);
    }
    else {
        throw "No such element of " + id + " is found";
    }
}

function removeResizableEventsListeners(element) {
    element.removeEventListener('mousedown', element.bindedMouseDownEvent);
    element.removeEventListener('mouseup', element.bindedMouseUpEvent);
    element.removeEventListener('mousemove', element.bindedMouseMoveEvent);
    document.removeEventListener('mousemove', element.bindedMouseMoveEventOnDoucument);
    document.removeEventListener('click', element.bindedMouseClickEventOnDocument);
    document.removeEventListener('mouseup', element.bindedMouseClickEventOnDocument);
}
