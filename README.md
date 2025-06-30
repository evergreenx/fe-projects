# Frontend Engineer Assessment

A comprehensive React application demonstrating modern frontend development skills through three distinct tasks: a feature-rich data table, a dynamic form builder, and a mini blog application.

## 🚀 Live Demo

[View Live Demo](https://fe-projects-one.vercel.app/)

## 📋 Assessment Overview

This project showcases proficiency in:
- **Data Management**: Complex table operations with sorting, filtering, and pagination
- **Dynamic UI Generation**: Configuration-driven form rendering with validation
- **CRUD Operations**: Full-stack blog functionality with state management
- **Modern React Patterns**: Hooks, context, performance optimization
- **Type Safety**: Comprehensive TypeScript implementation
- **User Experience**: Responsive design and accessibility

## 🛠 Tech Stack

### Core Technologies
- **React 18** - Modern React with hooks and concurrent features
- **React Router** -  Routing capabilities
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### Key Libraries
- **Zod** - Schema validation and type inference
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library


## 🎯 Task Implementations

### Task 1: Feature-Rich Data Table
**Location**: \`/data-table\`

**Features Implemented**:
- ✅ Data fetching from https://dummyjson.com/users
- ✅ Multi-column sorting with visual indicators
- ✅ Real-time search across multiple fields
- ✅ Pagination with page size controls
- ✅ Row selection with bulk actions
- ✅ Responsive design for mobile/desktop
- ✅ Accessibility with ARIA labels and keyboard navigation
- ✅ Performance optimization with React.memo and useMemo



### Task 2: Custom Form Builder
**Location**: \`/form-builder\`

**Features Implemented**:
- ✅ Dynamic form rendering from JSON configuration
- ✅ Multiple field types (text, email, select, textarea, checkbox, etc.)
- ✅ Zod schema validation with real-time feedback
- ✅ Conditional field rendering based on other field values
- ✅ Custom validation rules and error messages
- ✅ Form state management with TypeScript inference
- ✅ Accessibility with proper labels and ARIA attributes


### Task 3: Mini Blog App
**Location**: \`/blog\`

**Features Implemented**:
- ✅ Post listing with data from https://jsonplaceholder.typicode.com/posts
- ✅ Create new post functionality
- ✅ Edit existing posts
- ✅ Delete posts with confirmation
- ✅ Routing with Next.js App Router
- ✅ State management with Context
- ✅ Optimistic UI updates
- ✅ Error handling and loading states

**Routes**:
- \`/mini-blog\` - Post listing
- \`/mini-blog/new\` - Create new post
- \`/mini-blog/edit/[id]\` - Edit existing post

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/evergreenx/fe-projects
   cd fe-projects
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🎨 Design Decisions

### Architecture Choices
- **Component Composition**: Used compound component patterns for reusability
- **Custom Hooks**: Separated business logic from UI components
- **Type Safety**: Leveraged TypeScript generics for flexible, type-safe components
- **State Management**: Used context for simple, performant state management
- **Validation**: Chose Zod for schema-based validation with excellent TypeScript integration

### Performance Optimizations
- **Memoization**: Strategic use of React.memo, useMemo, and useCallback
- **Code Splitting**: Leveraged Next.js automatic code splitting
- **Efficient Re-renders**: Minimized unnecessary component updates
- **Optimistic Updates**: Immediate UI feedback for better user experience

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Comprehensive ARIA labels and live regions
- **Focus Management**: Proper focus indicators and tab order
- **Semantic HTML**: Used appropriate HTML elements and roles


## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. All APIs used are public endpoints.

### Customization
- **Tailwind Config**: Modify \`tailwind.config.ts\` for design system changes
- **Form Fields**: Add new field types in \`types/form-builder.ts\`
- **Table Columns**: Configure columns in individual page components

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically


## 🤔 Assumptions Made

### API Limitations
- **JSONPlaceholder**: Used for blog posts, limited to GET/POST/PUT/DELETE simulation
- **DummyJSON**: Used for user data, provides realistic test data
- **No Authentication**: Focused on frontend functionality over backend integration

### Browser Support
- **Modern Browsers**: Targeted ES2020+ features
- **JavaScript Enabled**: Application requires JavaScript to function
- **Local Storage**: Used for form state persistence (where applicable)

### Data Handling
- **Client-Side Filtering**: All filtering/sorting happens client-side for demo purposes
- **Mock Persistence**: CRUD operations simulate server responses
- **Error Boundaries**: Basic error handling implemented

## 🔮 Future Enhancements

### Potential Improvements
- **Unit Testing**: Add Jest and React Testing Library
- **E2E Testing**: Implement Playwright or Cypress tests
- **Internationalization**: Add multi-language support
- **Dark Mode**: Implement theme switching
- **Advanced Filtering**: Add date ranges, multi-select filters
- **Data Export**: CSV/Excel export functionality
- **Real Backend**: Integration with actual API endpoints
- **Caching**: Implement React Query for better data management

### Scalability Considerations
- **Virtual Scrolling**: For very large datasets
- **Server-Side Rendering**: For better SEO and performance
- **CDN Integration**: For static asset optimization
- **Database Integration**: For persistent data storage

## 📄 License

This project is created for assessment purposes.

## 👤 Author

**Ido Evergreen**
- GitHub: [@evergreenx](https://github.com/evergreenx)

---

**Assessment Completion Time**: ~22 hours
**Submission Date**: July 1, 2025
**Technologies Mastered**: React, TypeScript, Next.js, Tailwind CSS, Zod, Framer Motion
