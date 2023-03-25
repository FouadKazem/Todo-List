function clientHeight(selector) {
    const element = document.querySelector(selector)
    if (!element) {
        return 0
    }
    return element.clientHeight
}

export { clientHeight }