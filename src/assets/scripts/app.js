export class App {
    constructor(name = 'Scripts works!') {
        console.log(name);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});