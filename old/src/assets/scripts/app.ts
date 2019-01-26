export class App {
    public constructor(name: string = 'Scripts works!') {
        console.log(name);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    (window as any).app = new App();
});