import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useLocation, useNavigationType } from "react-router";

interface NavigationHistoryContextType {
  previousPath: string | null;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({ previousPath: null });

export function NavigationHistoryProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [stack, setStack] = useState<string[]>([]);
  const currentPathRef = useRef(location.pathname + location.search);

  useEffect(() => {
    const newPath = location.pathname + location.search;
    const prevPath = currentPathRef.current;

    if (newPath === prevPath) return;
    currentPathRef.current = newPath;

    if (navigationType === "PUSH") {
      // Forward navigation — record where we came from
      setStack(prev =>
        prev[prev.length - 1] === prevPath ? prev : [...prev, prevPath]
      );
    } else if (navigationType === "POP") {
      // Back navigation — drop the top entry so label stays in sync
      setStack(prev => prev.slice(0, -1));
    }
    // REPLACE: leave stack unchanged
  }, [location.pathname, location.search, navigationType]);

  const previousPath = stack.length > 0 ? stack[stack.length - 1] : null;

  return (
    <NavigationHistoryContext.Provider value={{ previousPath }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  return useContext(NavigationHistoryContext);
}
