import { makePseudoHtml } from './MakePseudoHtml';
import { PseudoHTML } from './PseudoHTML';
import { prepareString } from './PrepareEmmetString';

// String.prototype.toHtml = function () {
//     return emmetToHTML(this);
// }

// To make library https://aganglada.com/blog/how-to-create-your-own-typescript-library

export function emmetToHTML(emmetString: string): HTMLElement[] {
    const preparedString = prepareString(emmetString);
    const pseudoHtml = makePseudoHtml(preparedString);
    // Make real html from pseudoHtml
    // Catch errors
    return [ new HTMLDivElement() ];
}

// Remove this method later
export function emmetToPseudoHTML(emmetString: string): PseudoHTML[] {
    const preparedString = prepareString(emmetString);
    const pseudoHtml = makePseudoHtml(preparedString);
    return pseudoHtml;
}

export function appendEmmet(emmetString: string, container: HTMLElement): void {
    const elements = emmetToHTML(emmetString);
    elements.forEach(el => {
        container.appendChild(el);
    });
}
