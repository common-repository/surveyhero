let el = window.wp.element.createElement;

/**
 * Get the SurveyHero "icon" as svg element
 *
 * @return {react.element}
 */
export function getIcon() {
    return el(
        'svg',
        {width: 24, height: 24},
        el('path', {d: "m0.4 9.1c-0.6 3.4 0.5 6.7 2.7 9.1l2.2-7.7-4.9-1.4z", fill: '#4F5B28'}),
        el('path', {d: "M6.9 7.5L3.6 18.8c1.1 1 2.5 1.9 4.1 2.4l3.5-12.3L6.9 7.5z", fill: '#6B7A34'}),
        el('path', {d: "m12.6 6.8l-4.2 14.5c1.8 0.4 3.5 0.4 5.2-0.1l3.8-13.1-4.8-1.3z", fill: '#83953A'}),
        el('path', {d: "m14.4 21c3.1-1.1 5.7-3.7 6.7-7.1 0-0.1 0.1-0.3 0.1-0.4v-0.1l0.6-2.1 0.5-1.7 1.2-4.3 0.2-0.8-0.7-0.2-3.5-1-5.1 17.7zm7.3-11.4z", fill: '#94A63A'}),
    );
}