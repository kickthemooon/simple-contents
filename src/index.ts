export default {
    sourceSelector: '',
    targetSelector: '',
    structuredHeadings: [],
    addLinkToHeading(heading: Element) {
        heading.innerHTML = '<a href="#' + heading.id + '">#</a> ' + heading.innerHTML;
    },
    addIdToHeading(heading: Element) {
        const textContent = heading.textContent || '';
        heading.id = textContent
            .toLowerCase()
            .trim()
            .replaceAll(' ', '-')
            .replaceAll(/[^a-z0-9\-]/gim,'');
    },
    addHeading(heading: Element, structuredHeadings: Array<any>) {
        const headingRank = parseInt(heading.tagName.replace('H', ''));
        const lastElement = structuredHeadings.slice(-1).pop()

        if (lastElement !== undefined && headingRank > lastElement.rank) {
            this.addHeading(heading, lastElement.subItems);
            return
        }

        structuredHeadings.push({
            value: heading.textContent,
            rank: headingRank,
            id: heading.id,
            subItems: []
        })
    },
    generateContents(target: Element, structuredHeadings: Array<any>) {
        const ul = document.createElement('ul');

        structuredHeadings.forEach(mappedHeading => {
            const li = document.createElement('li');
            const ahref = document.createElement('a');
            ahref.textContent = mappedHeading.value;
            ahref.href = '#' + mappedHeading.id;
            li.appendChild(ahref);
            ul.appendChild(li);
            if (mappedHeading.subItems.length > 0) {
                this.generateContents(li, mappedHeading.subItems);
            }
        })

        target.appendChild(ul);
    },
    addContentsTitle() {
        const target = this.getTarget();

        const heading = document.createElement('h1');
        heading.innerText = 'Contents';
        
        target.prepend(heading);

        return this;
    },
    init(sourceSelector: string, targetSelector: string) {
        this.sourceSelector = sourceSelector;
        this.targetSelector = targetSelector;

        const source = this.getSource();
        const target = this.getTarget();

        if (source === undefined || target === undefined) {
            return;
        }

        const headings: Array<Element> = Array.from(source.querySelectorAll('h1, h2, h3, h4, h5, h6'));

        headings.forEach(heading => {
            this.addIdToHeading(heading);
            this.addHeading(heading, this.structuredHeadings);
            this.addLinkToHeading(heading);
        })

        this.generateContents(target, this.structuredHeadings)

        return this;
    },
    getSource(): Element {
        return document.querySelector(this.sourceSelector)!;
    },
    getTarget(): Element {
        return document.querySelector(this.targetSelector)!;
    }
}

