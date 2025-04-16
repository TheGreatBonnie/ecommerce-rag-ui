# E-commerce Frontend

A modern e-commerce frontend built with Next.js, featuring CopilotKit AI assistant integration, responsive design, and a comprehensive product browsing experience.

## Features

- **Product Catalog**: Browse and search through a variety of products
- **Shopping Cart**: Add, remove, and manage products in your cart
- **AI Assistant**: Integrated CopilotKit sidebar for enhanced shopping experience
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Theme Toggle**: Support for both light and dark modes

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives with custom styling
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [CopilotKit](https://docs.copilotkit.ai/)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme Switching**: next-themes

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── cart/           # Shopping cart page
│   ├── products/       # Product listing and detail pages
│   └── ...
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and mock data
└── styles/             # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS version)
- pnpm (recommended) or npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-frontend
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code quality issues

## AI Assistant Features

This project includes an integrated AI assistant powered by CopilotKit that can:

- Help users find products
- Answer questions about product details
- Track search and browsing history
- Provide personalized recommendations

## Development

### Adding New Products

Add new products to the mock data file at `src/lib/mock-data.ts`.

### Extending UI Components

The project uses a comprehensive set of UI components based on Radix UI primitives, located in the `src/components/ui` directory.

### Theme Customization

Modify the Tailwind configuration in `tailwind.config.ts` to customize the theme.

## License

[MIT](LICENSE)