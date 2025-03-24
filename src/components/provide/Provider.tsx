// import LayoutHome from "@/layouts/LayoutHome";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import QueryProvider from './QueryProvider';
export  function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* <GoogleOAuthProvider clientId={ process.env.NEXT_PUBLIC_ID_GOOGLE_CLOUND || ""} > */}
            {/* <AuthProvider> */}
              {/* <LayoutHome> */}
                {children}

              {/* </LayoutHome> */}
            {/* </AuthProvider> */}
          {/* </GoogleOAuthProvider> */}
      </ThemeProvider>
    </QueryProvider>
  );
}
