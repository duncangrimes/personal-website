"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode, FC } from "react";
import { RecoilRoot } from "recoil";

interface AppProvidersProps {
    children: ReactNode;
  }

const AppProviders: FC<AppProvidersProps> = ({ children }): JSX.Element => {
    return (
        <RecoilRoot>
            <Toaster position="bottom-center" />
            {children}
        </RecoilRoot>
    );
  };
  
  export default AppProviders;