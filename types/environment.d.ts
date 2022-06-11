namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXT_PUBLIC_URL: string;
    readonly DATABASE_URL: string;
    readonly DATABASE_URL_ELEPHANTSQL: string;
    readonly NEXT_PUBLIC_MQTT_BROKER_URL: string;
    readonly NEXT_PUBLIC_MQTT_BROKER_USERNAME: string;
    readonly NEXT_PUBLIC_MQTT_BROKER_PASSWORD: string;
    readonly NEXT_PUBLIC_MQTT_BROKER_PORT: string;
  }
}
