"use client";

import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import dataProvider from "@/helpers/api-platform/dataProvider";
import React from "react";
import { defaultTheme } from 'react-admin';

export default function Page() {
  const API_ENTRYPOINT = process.env.NEXT_PUBLIC_API_ENTRYPOINT || '';

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
      }
    }
  };

  return (
    <HydraAdmin
      theme={overrideTheme}
      dataProvider={dataProvider()}
      entrypoint={API_ENTRYPOINT}
    >
    </HydraAdmin>
  );
}