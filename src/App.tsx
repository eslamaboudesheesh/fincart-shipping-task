
import { Layout } from './component/layout'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { QuoteProvider } from './context/QuoteContext';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QuoteProvider>

          <Layout />
        </QuoteProvider>
      </ThemeProvider>
    </>
  )
}

export default App
