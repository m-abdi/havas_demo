namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_URL: string;
    DATABASE_URL: string;
    DATABASE_URL_ELEPHANTSQL: string;
    NEXT_PUBLIC_MQTT_BROKER_URL: string;
    NEXT_PUBLIC_MQTT_BROKER_USERNAME: string;
    NEXT_PUBLIC_MQTT_BROKER_PASSWORD: string;
    NEXT_PUBLIC_MQTT_BROKER_PORT: string;
  }
}
