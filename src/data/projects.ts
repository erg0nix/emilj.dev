export const projects = [
  {
    name: 'kontekst',
    description: 'A personal agent for the terminal, with saved conversations, reusable profiles, and tools.',
    detail: 'Go · Agent',
    href: '/projects/kontekst/',
    article: {
      heading: 'Pick up where you left off',
      paragraphs: [
        'Kontekst is a personal agent you can talk to from your terminal. It can read files, edit code, and run commands in a project. Conversations are saved, so you can leave a task and return to it later.',
        'Reusable agent profiles give each agent its own instructions, model, and tools. A single runtime looks after the sessions, whether you are working in the terminal, connecting an editor, or talking to another agent.',
        'It supports MCP for tools, ACP for editor connections, and A2A for communicating with other agents. These are different ways to connect the same underlying work.',
        'The repository is private for now. This page is a short introduction to what I’m building.'
      ],
    },
  },
  {
    name: 'display-mcp',
    description: 'Gives agents desktop windows for interactive charts, images, and little experiments.',
    detail: 'TypeScript · MCP',
    href: '/projects/display-mcp/',
    article: {
      heading: 'Give the conversation a window',
      paragraphs: [
        'Some things are easier to understand when you can see them. Display-mcp lets an agent open desktop windows for charts, tables, simulations, images, and video.',
        'A window can stay open while the conversation continues. The agent can update its contents, read interactions from the page, and inspect what is on screen. A chart or a small interactive experiment can become part of the conversation.',
        'It runs locally, using an installed Chromium browser, with a server built in TypeScript and Bun. Agents connect through MCP, so the display tools can be used by different clients.',
        'There isn’t a public repository to link to yet. For now, this is a look at what the project does.'
      ],
    },
  },
  {
    name: 'pumpkin-pi',
    description: 'My setup for Pi, bringing together search, language servers, memory, and personal defaults.',
    detail: 'Pi extensions',
    href: 'https://github.com/erg0nix/pumpkin-pi',
  },
  {
    name: 'aselekt',
    description: 'Pick the files you need and copy their contents to the clipboard, ready to paste.',
    detail: 'Go · CLI',
    href: 'https://github.com/erg0nix/aselekt',
  },
  {
    name: 'emilj.dev',
    description: 'This little corner of the web. Built with Astro, with seasonal details and a light and dark theme.',
    detail: 'Astro · Website',
    href: 'https://github.com/erg0nix/emilj.dev',
  },
];
