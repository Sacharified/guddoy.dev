import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = publicRuntimeConfig;