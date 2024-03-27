const tpl = `
    {{#each items}}
        <li><a href="{{ url }}" page="{{ page }}">{{ title }}</a></li>
    {{/each}}
`;

export default tpl;
