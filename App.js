import {AuthProvider} from './context/auth.context'
import Navigation from './Navigation'

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}