"use client";

import React from "react";
import { defaultTheme } from 'react-admin';

export default function Page() {
  const API_ENTRYPOINT = `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}`;

  const overrideTheme = {
    ...defaultTheme,
    components: {
      ...defaultTheme.components,
      RaAppBar: {
        styleOverrides: {
          root: {
            display: "none",
          }
        }
      },
      RaLayout: {
        styleOverrides: {
          root: {
            width: "fit-content !important",
            zIndex: 0,
          }
        }
      }
    }
  };

  // return <HydraAdmin
  //   theme={overrideTheme}
  //   dataProvider={dataProvider()}
  //   entrypoint={API_ENTRYPOINT}
  // />
}