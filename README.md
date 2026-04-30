# FinCart Shipping Quote Calculator

A high-performance, modular shipping quote calculator built with React 19, TypeScript, and Material UI. This application allows merchants to calculate shipping costs across multiple couriers with real-time feedback and a streamlined multi-step workflow.

##  Key Features

- **Multi-Step Shipping Form**: Orchestrated with `react-hook-form` and `yup` validation.
  - Step 1: Origin Details
  - Step 2: Destination Details
  - Step 3: Package Dimensions & Weight
- **Real-Time Quote Summary**: A sticky sidebar that updates instantly as the merchant types, preventing "Prop Drilling" via a centralized Context API.
- **Dynamic Courier Cards**: Branded results for carriers like SMSA, Aramex, FedEx, UPS, and DHL.
  - Automatic highlighting of **"Cheapest"** and **"Fastest"** options.
  - Interactive selection that reflects chosen rates back to the summary.
- **Asynchronous UI/UX**:
  - Pulse Skeleton loaders during search "fetching" states.
  - Visually polished Empty States for initial and "no results" scenarios.
- **Storybook Integration**: Comprehensive component documentation and isolation testing for all UI elements.

##  Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **UI Framework**: [Material UI (MUI) 9](https://mui.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Yup](https://github.com/jquense/yup)
- **State Management**: React Context API
- **Documentation**: [Storybook](https://storybook.js.org/)

##  Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application
```bash
npm run dev
```

### 3. Run Storybook
To view and test components in isolation:
```bash
npm run storybook
```

##  Project Structure

- `src/component/shipping`: Contains the core multi-step form, stepper, and results area.
- `src/component/courierCards`: Branded card components for shipping rates.
- `src/context`: Centralized `QuoteContext` for application state.
- `src/stories`: Storybook files for component documentation.
- `src/theme`: Global MUI theme configuration and brand tokens.
- `src/utils`: Validation schemas and helper functions.



